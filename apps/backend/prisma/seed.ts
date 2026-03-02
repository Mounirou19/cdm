import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ─── Stadiums ───────────────────────────────────────
  const stadiums = await Promise.all([
    prisma.stadium.create({ data: { name: "MetLife Stadium", city: "East Rutherford", country: "USA", capacity: 82500 } }),
    prisma.stadium.create({ data: { name: "SoFi Stadium", city: "Inglewood", country: "USA", capacity: 70240 } }),
    prisma.stadium.create({ data: { name: "AT&T Stadium", city: "Arlington", country: "USA", capacity: 80000 } }),
    prisma.stadium.create({ data: { name: "Hard Rock Stadium", city: "Miami Gardens", country: "USA", capacity: 64767 } }),
    prisma.stadium.create({ data: { name: "NRG Stadium", city: "Houston", country: "USA", capacity: 72220 } }),
    prisma.stadium.create({ data: { name: "Mercedes-Benz Stadium", city: "Atlanta", country: "USA", capacity: 71000 } }),
    prisma.stadium.create({ data: { name: "Lincoln Financial Field", city: "Philadelphia", country: "USA", capacity: 69176 } }),
    prisma.stadium.create({ data: { name: "Lumen Field", city: "Seattle", country: "USA", capacity: 68740 } }),
    prisma.stadium.create({ data: { name: "Arrowhead Stadium", city: "Kansas City", country: "USA", capacity: 76416 } }),
    prisma.stadium.create({ data: { name: "Gillette Stadium", city: "Foxborough", country: "USA", capacity: 65878 } }),
    prisma.stadium.create({ data: { name: "Levi's Stadium", city: "Santa Clara", country: "USA", capacity: 68500 } }),
    prisma.stadium.create({ data: { name: "BMO Field", city: "Toronto", country: "Canada", capacity: 45000 } }),
    prisma.stadium.create({ data: { name: "BC Place", city: "Vancouver", country: "Canada", capacity: 54500 } }),
    prisma.stadium.create({ data: { name: "Estadio Azteca", city: "Mexico City", country: "Mexico", capacity: 87523 } }),
    prisma.stadium.create({ data: { name: "Estadio BBVA", city: "Monterrey", country: "Mexico", capacity: 53500 } }),
    prisma.stadium.create({ data: { name: "Estadio Akron", city: "Guadalajara", country: "Mexico", capacity: 49850 } }),
  ]);
  console.log(`✅ ${stadiums.length} stadiums created`);

  // ─── Groups ─────────────────────────────────────────
  const groupNames = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
  const groups = await Promise.all(
    groupNames.map((name) => prisma.group.create({ data: { name } }))
  );
  console.log(`✅ ${groups.length} groups created`);

  // ─── Teams (48 teams - Official WC 2026 draw, Dec 2025) ───
  // UEFA Playoff Paths A/B/C/D and Intercontinental Playoffs 1/2 TBD (March 26-31 2026)
  interface TeamData { name: string; code: string; confederation: string; groupName: string }
  const teamsData: TeamData[] = [
    // Group A
    { name: "Mexico", code: "MEX", confederation: "CONCACAF", groupName: "A" },
    { name: "South Korea", code: "KOR", confederation: "AFC", groupName: "A" },
    { name: "South Africa", code: "RSA", confederation: "CAF", groupName: "A" },
    { name: "UEFA Playoff D", code: "PDA", confederation: "UEFA", groupName: "A" },
    // Group B
    { name: "Canada", code: "CAN", confederation: "CONCACAF", groupName: "B" },
    { name: "Switzerland", code: "SUI", confederation: "UEFA", groupName: "B" },
    { name: "Qatar", code: "QAT", confederation: "AFC", groupName: "B" },
    { name: "UEFA Playoff A", code: "PAA", confederation: "UEFA", groupName: "B" },
    // Group C
    { name: "Brazil", code: "BRA", confederation: "CONMEBOL", groupName: "C" },
    { name: "Scotland", code: "SCO", confederation: "UEFA", groupName: "C" },
    { name: "Morocco", code: "MAR", confederation: "CAF", groupName: "C" },
    { name: "Haiti", code: "HAI", confederation: "CONCACAF", groupName: "C" },
    // Group D
    { name: "USA", code: "USA", confederation: "CONCACAF", groupName: "D" },
    { name: "Paraguay", code: "PAR", confederation: "CONMEBOL", groupName: "D" },
    { name: "Australia", code: "AUS", confederation: "AFC", groupName: "D" },
    { name: "UEFA Playoff C", code: "PCA", confederation: "UEFA", groupName: "D" },
    // Group E
    { name: "Germany", code: "GER", confederation: "UEFA", groupName: "E" },
    { name: "Ivory Coast", code: "CIV", confederation: "CAF", groupName: "E" },
    { name: "Ecuador", code: "ECU", confederation: "CONMEBOL", groupName: "E" },
    { name: "Curaçao", code: "CUW", confederation: "CONCACAF", groupName: "E" },
    // Group F
    { name: "Netherlands", code: "NED", confederation: "UEFA", groupName: "F" },
    { name: "Japan", code: "JPN", confederation: "AFC", groupName: "F" },
    { name: "Tunisia", code: "TUN", confederation: "CAF", groupName: "F" },
    { name: "UEFA Playoff B", code: "PBA", confederation: "UEFA", groupName: "F" },
    // Group G
    { name: "Belgium", code: "BEL", confederation: "UEFA", groupName: "G" },
    { name: "Egypt", code: "EGY", confederation: "CAF", groupName: "G" },
    { name: "Iran", code: "IRN", confederation: "AFC", groupName: "G" },
    { name: "New Zealand", code: "NZL", confederation: "OFC", groupName: "G" },
    // Group H
    { name: "Spain", code: "ESP", confederation: "UEFA", groupName: "H" },
    { name: "Uruguay", code: "URU", confederation: "CONMEBOL", groupName: "H" },
    { name: "Saudi Arabia", code: "KSA", confederation: "AFC", groupName: "H" },
    { name: "Cape Verde", code: "CPV", confederation: "CAF", groupName: "H" },
    // Group I
    { name: "France", code: "FRA", confederation: "UEFA", groupName: "I" },
    { name: "Senegal", code: "SEN", confederation: "CAF", groupName: "I" },
    { name: "Norway", code: "NOR", confederation: "UEFA", groupName: "I" },
    { name: "IC Playoff 2", code: "IP2", confederation: "TBD", groupName: "I" },
    // Group J
    { name: "Argentina", code: "ARG", confederation: "CONMEBOL", groupName: "J" },
    { name: "Algeria", code: "ALG", confederation: "CAF", groupName: "J" },
    { name: "Austria", code: "AUT", confederation: "UEFA", groupName: "J" },
    { name: "Jordan", code: "JOR", confederation: "AFC", groupName: "J" },
    // Group K
    { name: "Portugal", code: "POR", confederation: "UEFA", groupName: "K" },
    { name: "Colombia", code: "COL", confederation: "CONMEBOL", groupName: "K" },
    { name: "Uzbekistan", code: "UZB", confederation: "AFC", groupName: "K" },
    { name: "IC Playoff 1", code: "IP1", confederation: "TBD", groupName: "K" },
    // Group L
    { name: "England", code: "ENG", confederation: "UEFA", groupName: "L" },
    { name: "Croatia", code: "CRO", confederation: "UEFA", groupName: "L" },
    { name: "Ghana", code: "GHA", confederation: "CAF", groupName: "L" },
    { name: "Panama", code: "PAN", confederation: "CONCACAF", groupName: "L" },
  ];

  // FIFA code -> ISO 3166-1 alpha-2 mapping for flagcdn.com
  const fifaToIso: Record<string, string> = {
    MEX: "mx", KOR: "kr", RSA: "za", PDA: "", CAN: "ca", SUI: "ch", QAT: "qa", PAA: "",
    BRA: "br", SCO: "gb-sct", MAR: "ma", HAI: "ht", USA: "us", PAR: "py", AUS: "au", PCA: "",
    GER: "de", CIV: "ci", ECU: "ec", CUW: "cw", NED: "nl", JPN: "jp", TUN: "tn", PBA: "",
    BEL: "be", EGY: "eg", IRN: "ir", NZL: "nz", ESP: "es", URU: "uy", KSA: "sa", CPV: "cv",
    FRA: "fr", SEN: "sn", NOR: "no", IP2: "", ARG: "ar", ALG: "dz", AUT: "at", JOR: "jo",
    POR: "pt", COL: "co", UZB: "uz", IP1: "", ENG: "gb-eng", CRO: "hr", GHA: "gh", PAN: "pa",
  };

  const groupMap = new Map(groups.map((g) => [g.name, g.id]));
  const teams = await Promise.all(
    teamsData.map((t) => {
      const iso = fifaToIso[t.code] || "";
      const flagUrl = iso ? `https://flagcdn.com/w80/${iso}.png` : null;
      return prisma.team.create({
        data: {
          name: t.name,
          code: t.code,
          confederation: t.confederation,
          flagUrl,
          groupId: groupMap.get(t.groupName)!,
        },
      });
    })
  );
  console.log(`✅ ${teams.length} teams created`);

  // ─── Group Standings ────────────────────────────────
  const standings = await Promise.all(
    teams.map((t) =>
      prisma.groupStanding.create({
        data: { groupId: t.groupId!, teamId: t.id },
      })
    )
  );
  console.log(`✅ ${standings.length} group standings created`);

  // ─── Group Stage Matches ────────────────────────────
  // Each group: 6 matches (round-robin of 4 teams), 3 match days
  const teamsByGroup = new Map<string, typeof teams>();
  for (const group of groups) {
    teamsByGroup.set(
      group.name,
      teams.filter((t) => t.groupId === group.id)
    );
  }

  let matchCount = 0;
  const baseDate = new Date("2026-06-11T18:00:00Z");

  for (const group of groups) {
    const gTeams = teamsByGroup.get(group.name)!;
    // Round-robin pairs: (0,1)(2,3) day1, (0,2)(1,3) day2, (0,3)(1,2) day3
    const pairings = [
      { day: 1, pairs: [[0, 1], [2, 3]] },
      { day: 2, pairs: [[0, 2], [1, 3]] },
      { day: 3, pairs: [[0, 3], [1, 2]] },
    ];

    for (const { day, pairs } of pairings) {
      for (const [hi, ai] of pairs) {
        const dateOffset = (groupNames.indexOf(group.name) * 3 + day - 1);
        const matchDate = new Date(baseDate);
        matchDate.setDate(matchDate.getDate() + dateOffset);
        matchDate.setHours(18 + (matchCount % 3) * 3);

        await prisma.match.create({
          data: {
            phase: "GROUP_STAGE",
            groupId: group.id,
            matchDay: day,
            dateUtc: matchDate,
            stadiumId: stadiums[matchCount % stadiums.length].id,
            homeTeamId: gTeams[hi].id,
            awayTeamId: gTeams[ai].id,
            status: "SCHEDULED",
          },
        });
        matchCount++;
      }
    }
  }
  console.log(`✅ ${matchCount} group stage matches created`);

  // ─── Knockout Matches (placeholders) ────────────────
  const knockoutPhases: { phase: "ROUND_OF_32" | "ROUND_OF_16" | "QUARTER_FINAL" | "SEMI_FINAL" | "THIRD_PLACE" | "FINAL"; count: number; dateOffset: number }[] = [
    { phase: "ROUND_OF_32", count: 16, dateOffset: 40 },
    { phase: "ROUND_OF_16", count: 8, dateOffset: 44 },
    { phase: "QUARTER_FINAL", count: 4, dateOffset: 48 },
    { phase: "SEMI_FINAL", count: 2, dateOffset: 51 },
    { phase: "THIRD_PLACE", count: 1, dateOffset: 54 },
    { phase: "FINAL", count: 1, dateOffset: 55 },
  ];

  let knockoutCount = 0;
  for (const { phase, count, dateOffset } of knockoutPhases) {
    for (let i = 0; i < count; i++) {
      const matchDate = new Date(baseDate);
      matchDate.setDate(matchDate.getDate() + dateOffset + Math.floor(i / 2));
      matchDate.setHours(18 + (i % 2) * 3);

      await prisma.match.create({
        data: {
          phase,
          dateUtc: matchDate,
          stadiumId: stadiums[(matchCount + knockoutCount) % stadiums.length].id,
          status: "SCHEDULED",
        },
      });
      knockoutCount++;
    }
  }
  console.log(`✅ ${knockoutCount} knockout matches created`);
  console.log(`✅ Total: ${matchCount + knockoutCount} matches`);
  console.log("🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
