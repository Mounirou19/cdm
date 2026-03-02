import { prisma } from "../config";

export const standingService = {
  async findAll() {
    const groups = await prisma.group.findMany({
      include: {
        standings: {
          include: { team: true },
          orderBy: [{ points: "desc" }, { goalDifference: "desc" }, { goalsFor: "desc" }],
        },
      },
      orderBy: { name: "asc" },
    });
    return groups;
  },
};
