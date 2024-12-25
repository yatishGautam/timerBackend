import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import {
	createSegment,
	getSegmentsByWorkout,
	updateSegment,
	deleteSegment,
} from "../controllers/Segments";

const router = Router();

// Get all segments for a workout
router.get("/:workoutId", authMiddleware, getSegmentsByWorkout);

// Create a new segment
router.post("/create", authMiddleware, createSegment);

// Update a segment by ID
router.put("/:id", authMiddleware, updateSegment);

// Delete a segment by ID
router.delete("/:id", authMiddleware, deleteSegment);

export default router;
