import { Request, Response, NextFunction } from "express";
import { standingService } from "../services/standingService";

export const standingController = {
  async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const standings = await standingService.findAll();
      res.json({ success: true, data: standings });
    } catch (err) {
      next(err);
    }
  },
};
