import { prisma } from "../config";
import { AppError } from "../middleware/errorHandler";

export const teamService = {
  async findAll() {
    return prisma.team.findMany({
      include: { group: true },
      orderBy: [{ groupId: "asc" }, { name: "asc" }],
    });
  },

  async findById(id: number) {
    const team = await prisma.team.findUnique({
      where: { id },
      include: { group: true },
    });
    if (!team) throw new AppError("Team not found", 404);
    return team;
  },

  async findMatches(teamId: number) {
    const team = await prisma.team.findUnique({ where: { id: teamId } });
    if (!team) throw new AppError("Team not found", 404);

    return prisma.match.findMany({
      where: {
        OR: [{ homeTeamId: teamId }, { awayTeamId: teamId }],
      },
      include: { homeTeam: true, awayTeam: true, stadium: true, group: true },
      orderBy: { dateUtc: "asc" },
    });
  },
};
