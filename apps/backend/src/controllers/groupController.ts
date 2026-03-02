import { Request, Response, NextFunction } from "express";
import { groupService } from "../services/groupService";

export const groupController = {
  async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const groups = await groupService.findAll();
      res.json({ success: true, data: groups });
    } catch (err) {
      next(err);
    }
  },

  async getByName(req: Request, res: Response, next: NextFunction) {
    try {
      const group = await groupService.findByName(req.params.name);
      res.json({ success: true, data: group });
    } catch (err) {
      next(err);
    }
  },

  async getStandings(req: Request, res: Response, next: NextFunction) {
    try {
      const standings = await groupService.findStandings(req.params.name);
      res.json({ success: true, data: standings });
    } catch (err) {
      next(err);
    }
  },

  async getMatches(req: Request, res: Response, next: NextFunction) {
    try {
      const matches = await groupService.findMatches(req.params.name);
      res.json({ success: true, data: matches });
    } catch (err) {
      next(err);
    }
  },
};
