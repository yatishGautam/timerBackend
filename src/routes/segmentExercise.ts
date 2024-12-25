import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import {
	createSegmentExercise,
	getSegmentExercisesBySegment,
	updateSegmentExercise,
	deleteSegmentExercise,
} from "../controllers/SegmentExercise";

const router = Router();

// Get all segment exercises for a segment
router.get("/:segmentId", authMiddleware, getSegmentExercisesBySegment);

// Create a new segment exercise
router.post("/create", authMiddleware, createSegmentExercise);

// Update a segment exercise by ID
router.put("/:id", authMiddleware, updateSegmentExercise);

// Delete a segment exercise by ID
router.delete("/:id", authMiddleware, deleteSegmentExercise);

export default router;
