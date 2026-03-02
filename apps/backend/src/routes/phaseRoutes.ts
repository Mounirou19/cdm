import { Router } from "express";
import { phaseController } from "../controllers/phaseController";

const router = Router();

router.get("/", phaseController.getAll);
router.get("/:slug/matches", phaseController.getMatchesBySlug);

export default router;
