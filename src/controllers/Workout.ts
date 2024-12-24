// src/controllers/workout.ts
import { Request, Response, NextFunction } from "express";
import prisma from "../prisma";

// Create a new workout
export const createWorkoutController = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { name, description } = req.body;
		const userId = req.user?.id;

		if (!userId) {
			res.status(401).json({ message: "Unauthorized" });
			return;
		}

		const newWorkout = await prisma.workout.create({
			data: {
				name,
				description,
				userId,
			},
		});

		res
			.status(201)
			.json({ message: "Workout created successfully", workout: newWorkout });
	} catch (error) {
		next(error);
	}
};

// Get all workouts for a user
export const getAllWorkoutsController = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const userId = req.user?.id;

		if (!userId) {
			res.status(401).json({ message: "Unauthorized" });
			return;
		}

		const workouts = await prisma.workout.findMany({
			where: { userId },
			include: {
				segments: true,
			},
		});

		res.status(200).json({ workouts });
	} catch (error) {
		next(error);
	}
};

// Get a single workout
export const getWorkoutController = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { id } = req.params;
		const userId = req.user?.id;

		if (!userId) {
			res.status(401).json({ message: "Unauthorized" });
			return;
		}

		const workout = await prisma.workout.findUnique({
			where: { id },
			include: {
				segments: {
					include: {
						segmentExercises: {
							include: {
								exercise: true,
								timer: true,
							},
						},
					},
				},
			},
		});

		if (!workout || workout.userId !== userId) {
			res.status(404).json({ message: "Workout not found" });
			return;
		}

		res.status(200).json({ workout });
	} catch (error) {
		next(error);
	}
};

// Delete a workout
export const deleteWorkoutController = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { id } = req.params;
		const userId = req.user?.id;

		if (!userId) {
			res.status(401).json({ message: "Unauthorized" });
			return;
		}

		const workout = await prisma.workout.findUnique({ where: { id } });

		if (!workout || workout.userId !== userId) {
			res.status(404).json({ message: "Workout not found" });
			return;
		}

		await prisma.workout.delete({ where: { id } });

		res.status(200).json({ message: "Workout deleted successfully" });
	} catch (error) {
		next(error);
	}
};
