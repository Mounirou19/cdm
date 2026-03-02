import { Router } from "express";
import { matchController } from "../controllers/matchController";

const router = Router();

router.get("/", matchController.getAll);
router.get("/live", matchController.getLive);
router.get("/today", matchController.getToday);
router.get("/:id", matchController.getById);
router.get("/:id/events", matchController.getEvents);

export default router;
