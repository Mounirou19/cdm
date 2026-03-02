import { Request, Response, NextFunction } from "express";
import { teamService } from "../services/teamService";

export const teamController = {
  async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const teams = await teamService.findAll();
      res.json({ success: true, data: teams });
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const team = await teamService.findById(parseInt(req.params.id, 10));
      res.json({ success: true, data: team });
    } catch (err) {
      next(err);
    }
  },

  async getMatches(req: Request, res: Response, next: NextFunction) {
    try {
      const matches = await teamService.findMatches(parseInt(req.params.id, 10));
      res.json({ success: true, data: matches });
    } catch (err) {
      next(err);
    }
  },
};
