import { prisma } from "../config";
import { AppError } from "../middleware/errorHandler";

export const stadiumService = {
  async findAll() {
    return prisma.stadium.findMany({
      orderBy: { name: "asc" },
    });
  },

  async findById(id: number) {
    const stadium = await prisma.stadium.findUnique({
      where: { id },
    });
    if (!stadium) throw new AppError("Stadium not found", 404);
    return stadium;
  },
};
