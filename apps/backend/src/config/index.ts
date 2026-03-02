import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const config = {
  port: parseInt(process.env.PORT || "4000", 10),
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:3000",
  footballDataApiKey: process.env.FOOTBALL_DATA_API_KEY || "",
  nodeEnv: process.env.NODE_ENV || "development",
};
