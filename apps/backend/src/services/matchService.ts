import { prisma } from "../config";
import { Phase, MatchStatus } from "@prisma/client";
import { AppError } from "../middleware/errorHandler";

const matchInclude = {
  homeTeam: true,
  awayTeam: true,
  stadium: true,
  group: true,
};

export const matchService = {
  async findAll(filters: {
    phase?: Phase;
    status?: MatchStatus;
    date?: string;
    teamId?: number;
    groupId?: number;
  }) {
    const where: Record<string, unknown> = {};

    if (filters.phase) where.phase = filters.phase;
    if (filters.status) where.status = filters.status;
    if (filters.groupId) where.groupId = filters.groupId;
    if (filters.date) {
      const start = new Date(filters.date);
      const end = new Date(filters.date);
      end.setDate(end.getDate() + 1);
      where.dateUtc = { gte: start, lt: end };
    }
    if (filters.teamId) {
      where.OR = [
        { homeTeamId: filters.teamId },
        { awayTeamId: filters.teamId },
      ];
    }

    return prisma.match.findMany({
      where,
      include: matchInclude,
      orderBy: { dateUtc: "asc" },
    });
  },

  async findById(id: number) {
    const match = await prisma.match.findUnique({
      where: { id },
      include: { ...matchInclude, events: { include: { team: true }, orderBy: { minute: "asc" } } },
    });
    if (!match) throw new AppError("Match not found", 404);
    return match;
  },

  async findLive() {
    return prisma.match.findMany({
      where: {
        status: { in: ["IN_PLAY", "HALF_TIME", "EXTRA_TIME", "PENALTY_SHOOTOUT", "PAUSED"] },
      },
      include: matchInclude,
      orderBy: { dateUtc: "asc" },
    });
  },

  async findToday() {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const end = new Date(start);
    end.setDate(end.getDate() + 1);

    return prisma.match.findMany({
      where: { dateUtc: { gte: start, lt: end } },
      include: matchInclude,
      orderBy: { dateUtc: "asc" },
    });
  },

  async findByPhase(phase: Phase) {
    return prisma.match.findMany({
      where: { phase },
      include: matchInclude,
      orderBy: { dateUtc: "asc" },
    });
  },

  async findEvents(matchId: number) {
    const match = await prisma.match.findUnique({ where: { id: matchId } });
    if (!match) throw new AppError("Match not found", 404);

    return prisma.matchEvent.findMany({
      where: { matchId },
      include: { team: true },
      orderBy: [{ minute: "asc" }, { extraMinute: "asc" }],
    });
  },
};
