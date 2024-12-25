import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import {
	createExerciseController,
	getAllExercisesController,
	deleteExerciseController,
} from "../controllers/Exercise";

const router = Router();

// Get all exercises
router.post("/", authMiddleware, getAllExercisesController);

// Create a new exercise
router.post("/create", authMiddleware, createExerciseController);

// Delete an exercise by ID
router.delete("/:id", authMiddleware, deleteExerciseController);

export default router;
