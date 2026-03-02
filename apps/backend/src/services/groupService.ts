import { prisma } from "../config";
import { AppError } from "../middleware/errorHandler";

export const groupService = {
  async findAll() {
    return prisma.group.findMany({
      include: {
        teams: true,
        standings: {
          include: { team: true },
          orderBy: [{ points: "desc" }, { goalDifference: "desc" }, { goalsFor: "desc" }],
        },
      },
      orderBy: { name: "asc" },
    });
  },

  async findByName(name: string) {
    const group = await prisma.group.findUnique({
      where: { name: name.toUpperCase() },
      include: {
        teams: true,
        standings: {
          include: { team: true },
          orderBy: [{ points: "desc" }, { goalDifference: "desc" }, { goalsFor: "desc" }],
        },
      },
    });
    if (!group) throw new AppError("Group not found", 404);
    return group;
  },

  async findStandings(name: string) {
    const group = await prisma.group.findUnique({ where: { name: name.toUpperCase() } });
    if (!group) throw new AppError("Group not found", 404);

    return prisma.groupStanding.findMany({
      where: { groupId: group.id },
      include: { team: true },
      orderBy: [{ points: "desc" }, { goalDifference: "desc" }, { goalsFor: "desc" }],
    });
  },

  async findMatches(name: string) {
    const group = await prisma.group.findUnique({ where: { name: name.toUpperCase() } });
    if (!group) throw new AppError("Group not found", 404);

    return prisma.match.findMany({
      where: { groupId: group.id },
      include: { homeTeam: true, awayTeam: true, stadium: true },
      orderBy: { dateUtc: "asc" },
    });
  },
};
