import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.post("/", authMiddleware);
router.post("/create", authMiddleware);
router.delete("/:id", authMiddleware);

export default router;
