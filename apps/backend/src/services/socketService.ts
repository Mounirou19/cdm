import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
import { config } from "../config";

let io: Server | null = null;

export const socketService = {
  init(httpServer: HttpServer) {
    io = new Server(httpServer, {
      cors: {
        origin: config.corsOrigin,
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", (socket: Socket) => {
      console.log(`Socket connected: ${socket.id}`);

      socket.on("subscribe:match", (matchId: number) => {
        socket.join(`match:${matchId}`);
      });

      socket.on("unsubscribe:match", (matchId: number) => {
        socket.leave(`match:${matchId}`);
      });

      socket.on("subscribe:live", () => {
        socket.join("live");
      });

      socket.on("unsubscribe:live", () => {
        socket.leave("live");
      });

      socket.on("disconnect", () => {
        console.log(`Socket disconnected: ${socket.id}`);
      });
    });

    return io;
  },

  getIO() {
    return io;
  },

  emitMatchUpdate(match: Record<string, unknown>) {
    if (!io) return;
    io.to("live").emit("match:update", match);
    io.to(`match:${match.id}`).emit("match:update", match);
  },

  emitMatchEvent(event: Record<string, unknown> & { matchId: number }) {
    if (!io) return;
    io.to("live").emit("match:event", event);
    io.to(`match:${event.matchId}`).emit("match:event", event);
  },

  emitStatusChange(data: { matchId: number; oldStatus: string; newStatus: string; match: Record<string, unknown> }) {
    if (!io) return;
    io.to("live").emit("match:status_change", data);
    io.to(`match:${data.matchId}`).emit("match:status_change", data);
  },

  emitStandingsUpdate(standings: unknown[]) {
    if (!io) return;
    io.to("live").emit("standings:update", standings);
  },
};
