import { Router } from "express";
import {
	createWorkoutController,
	getAllWorkoutsController,
	getWorkoutController,
	deleteWorkoutController,
} from "../controllers/Workout";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

// Create a new workout
router.post("/create", authMiddleware, createWorkoutController);

// Get all workouts for the authenticated user
router.get("/", authMiddleware, getAllWorkoutsController);

// Get a specific workout by ID
router.get("/:id", authMiddleware, getWorkoutController);

// Delete a workout by ID
router.delete("/:id", authMiddleware, deleteWorkoutController);

export default router;
