import { Request, Response, NextFunction } from "express";
import { matchService } from "../services/matchService";
import { Phase } from "@prisma/client";
import { PHASE_SLUGS, SLUG_TO_PHASE } from "@cdm/shared";
import { AppError } from "../middleware/errorHandler";

export const phaseController = {
  async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const phases = Object.values(Phase).map((p) => ({
        value: p,
        label: PHASE_SLUGS[p as keyof typeof PHASE_SLUGS],
        slug: PHASE_SLUGS[p as keyof typeof PHASE_SLUGS],
      }));
      res.json({ success: true, data: phases });
    } catch (err) {
      next(err);
    }
  },

  async getMatchesBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const phase = SLUG_TO_PHASE[req.params.slug];
      if (!phase) throw new AppError("Phase not found", 404);
      const matches = await matchService.findByPhase(phase);
      res.json({ success: true, data: matches });
    } catch (err) {
      next(err);
    }
  },
};
