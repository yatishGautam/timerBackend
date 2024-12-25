import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import {
	createTimer,
	getAllTimers,
	updateTimer,
	deleteTimer,
} from "../controllers/Timer";

const router = Router();

// Get all timers
router.get("/", authMiddleware, getAllTimers);

// Create a new timer
router.post("/create", authMiddleware, createTimer);

// Update a timer by ID
router.put("/:id", authMiddleware, updateTimer);

// Delete a timer by ID
router.delete("/:id", authMiddleware, deleteTimer);

export default router;
