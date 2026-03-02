import { Router } from "express";
import { stadiumController } from "../controllers/stadiumController";

const router = Router();

router.get("/", stadiumController.getAll);
router.get("/:id", stadiumController.getById);

export default router;
