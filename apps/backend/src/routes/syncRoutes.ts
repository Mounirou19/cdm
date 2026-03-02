import { Router, Request, Response, NextFunction } from "express";
import { syncService } from "../services/syncService";

const router = Router();

router.post("/matches", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    await syncService.syncMatches();
    res.json({ success: true, data: { message: "Match sync triggered" } });
  } catch (err) {
    next(err);
  }
});

router.post("/standings", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    await syncService.recalculateStandings();
    res.json({ success: true, data: { message: "Standings recalculated" } });
  } catch (err) {
    next(err);
  }
});

export default router;
