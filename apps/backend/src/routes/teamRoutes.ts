import { Router } from "express";
import { teamController } from "../controllers/teamController";

const router = Router();

router.get("/", teamController.getAll);
router.get("/:id", teamController.getById);
router.get("/:id/matches", teamController.getMatches);

export default router;
