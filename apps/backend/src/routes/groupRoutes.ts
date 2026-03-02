import { Router } from "express";
import { groupController } from "../controllers/groupController";

const router = Router();

router.get("/", groupController.getAll);
router.get("/:name", groupController.getByName);
router.get("/:name/standings", groupController.getStandings);
router.get("/:name/matches", groupController.getMatches);

export default router;
