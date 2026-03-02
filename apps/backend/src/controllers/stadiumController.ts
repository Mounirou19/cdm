import { Request, Response, NextFunction } from "express";
import { stadiumService } from "../services/stadiumService";

export const stadiumController = {
  async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const stadiums = await stadiumService.findAll();
      res.json({ success: true, data: stadiums });
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const stadium = await stadiumService.findById(parseInt(req.params.id, 10));
      res.json({ success: true, data: stadium });
    } catch (err) {
      next(err);
    }
  },
};
