import { Request, Response, NextFunction } from "express";
import { matchService } from "../services/matchService";
import { Phase, MatchStatus } from "@prisma/client";

export const matchController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { phase, status, date, teamId, groupId } = req.query;
      const matches = await matchService.findAll({
        phase: phase as Phase | undefined,
        status: status as MatchStatus | undefined,
        date: date as string | undefined,
        teamId: teamId ? parseInt(teamId as string, 10) : undefined,
        groupId: groupId ? parseInt(groupId as string, 10) : undefined,
      });
      res.json({ success: true, data: matches });
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const match = await matchService.findById(parseInt(req.params.id, 10));
      res.json({ success: true, data: match });
    } catch (err) {
      next(err);
    }
  },

  async getLive(_req: Request, res: Response, next: NextFunction) {
    try {
      const matches = await matchService.findLive();
      res.json({ success: true, data: matches });
    } catch (err) {
      next(err);
    }
  },

  async getToday(_req: Request, res: Response, next: NextFunction) {
    try {
      const matches = await matchService.findToday();
      res.json({ success: true, data: matches });
    } catch (err) {
      next(err);
    }
  },

  async getEvents(req: Request, res: Response, next: NextFunction) {
    try {
      const events = await matchService.findEvents(parseInt(req.params.id, 10));
      res.json({ success: true, data: events });
    } catch (err) {
      next(err);
    }
  },
};
