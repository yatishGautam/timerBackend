import { Request, Response, NextFunction } from "express";
import prisma from "../prisma";

// Create a new exercise
export const createExerciseController = async (
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

		const newExercise = await prisma.exercise.create({
			data: {
				name,
				description,
				userId,
			},
		});

		res.status(201).json({
			message: "Exercise created successfully",
			exercise: newExercise,
		});
	} catch (error) {
		next(error);
	}
};

// Get all exercises for a user
export const getAllExercisesController = async (
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

		const exercises = await prisma.exercise.findMany({
			where: { userId },
		});

		res.status(200).json({ exercises });
	} catch (error) {
		next(error);
	}
};

// Get a single exercise
export const getExerciseController = async (
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

		const exercise = await prisma.exercise.findUnique({
			where: { id: id },
		});

		if (!exercise || exercise.userId !== userId) {
			res.status(404).json({ message: "Exercise not found" });
			return;
		}

		res.status(200).json({ exercise });
	} catch (error) {
		next(error);
	}
};

// Delete an exercise
export const deleteExerciseController = async (
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

		const exercise = await prisma.exercise.findUnique({
			where: { id: id },
		});

		if (!exercise || exercise.userId !== userId) {
			res.status(404).json({ message: "Exercise not found" });
			return;
		}

		await prisma.exercise.delete({ where: { id: id } });

		res.status(200).json({ message: "Exercise deleted successfully" });
	} catch (error) {
		next(error);
	}
};
