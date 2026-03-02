import { prisma } from "../config";
import { footballDataAdapter } from "../adapters/footballDataAdapter";
import { MatchStatus } from "@prisma/client";

export const syncService = {
  async syncMatches() {
    if (!footballDataAdapter.isConfigured()) {
      console.log("Football-data.org API key not configured, skipping sync");
      return [];
    }

    const externalMatches = await footballDataAdapter.fetchLiveMatches();
    const updates = [];

    for (const ext of externalMatches) {
      const match = await prisma.match.findUnique({
        where: { externalId: String(ext.id) },
      });

      if (!match) continue;

      const newStatus = ext.status as MatchStatus;
      const homeScore = ext.score?.fullTime?.home;
      const awayScore = ext.score?.fullTime?.away;

      const hasChanged =
        match.status !== newStatus ||
        match.homeScore !== homeScore ||
        match.awayScore !== awayScore ||
        match.minute !== (ext.minute ?? null);

      if (hasChanged) {
        const updated = await prisma.match.update({
          where: { id: match.id },
          data: {
            status: newStatus,
            homeScore,
            awayScore,
            homePenalties: ext.score?.penalties?.home ?? null,
            awayPenalties: ext.score?.penalties?.away ?? null,
            minute: ext.minute ?? null,
          },
          include: { homeTeam: true, awayTeam: true, stadium: true, group: true },
        });
        updates.push(updated);
      }
    }

    return updates;
  },

  async recalculateStandings() {
    const groups = await prisma.group.findMany({ include: { teams: true } });

    for (const group of groups) {
      for (const team of group.teams) {
        const matches = await prisma.match.findMany({
          where: {
            groupId: group.id,
            status: "FINISHED",
            OR: [{ homeTeamId: team.id }, { awayTeamId: team.id }],
          },
        });

        let won = 0, drawn = 0, lost = 0, goalsFor = 0, goalsAgainst = 0;

        for (const m of matches) {
          const isHome = m.homeTeamId === team.id;
          const scored = isHome ? (m.homeScore ?? 0) : (m.awayScore ?? 0);
          const conceded = isHome ? (m.awayScore ?? 0) : (m.homeScore ?? 0);
          goalsFor += scored;
          goalsAgainst += conceded;

          if (scored > conceded) won++;
          else if (scored === conceded) drawn++;
          else lost++;
        }

        await prisma.groupStanding.upsert({
          where: { groupId_teamId: { groupId: group.id, teamId: team.id } },
          update: {
            played: matches.length,
            won,
            drawn,
            lost,
            goalsFor,
            goalsAgainst,
            goalDifference: goalsFor - goalsAgainst,
            points: won * 3 + drawn,
          },
          create: {
            groupId: group.id,
            teamId: team.id,
            played: matches.length,
            won,
            drawn,
            lost,
            goalsFor,
            goalsAgainst,
            goalDifference: goalsFor - goalsAgainst,
            points: won * 3 + drawn,
          },
        });
      }
    }
  },
};
