import { Router } from "express";
import { standingController } from "../controllers/standingController";

const router = Router();

router.get("/", standingController.getAll);

export default router;
