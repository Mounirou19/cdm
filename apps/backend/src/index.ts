import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { createServer } from "http";
import { config, prisma } from "./config";
import { errorHandler, notFound } from "./middleware/errorHandler";
import { socketService } from "./services/socketService";

// Routes
import matchRoutes from "./routes/matchRoutes";
import teamRoutes from "./routes/teamRoutes";
import groupRoutes from "./routes/groupRoutes";
import stadiumRoutes from "./routes/stadiumRoutes";
import standingRoutes from "./routes/standingRoutes";
import phaseRoutes from "./routes/phaseRoutes";
import syncRoutes from "./routes/syncRoutes";

const app = express();
const httpServer = createServer(app);

// Middleware
app.use(helmet());
app.use(cors({ origin: config.corsOrigin }));
app.use(express.json());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// API Routes
app.use("/api/v1/matches", matchRoutes);
app.use("/api/v1/teams", teamRoutes);
app.use("/api/v1/groups", groupRoutes);
app.use("/api/v1/stadiums", stadiumRoutes);
app.use("/api/v1/standings", standingRoutes);
app.use("/api/v1/phases", phaseRoutes);
app.use("/api/v1/sync", syncRoutes);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

// Socket.io
socketService.init(httpServer);

// Start
httpServer.listen(config.port, () => {
  console.log(`🚀 CDM 2026 Backend running on http://localhost:${config.port}`);
  console.log(`📡 Socket.io ready`);
});

// Graceful shutdown
process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  httpServer.close();
  process.exit(0);
});
