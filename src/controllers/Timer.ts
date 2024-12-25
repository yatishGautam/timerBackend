import { Request, Response, NextFunction } from "express";
import prisma from "../prisma";

// Create a new Timer
export const createTimer = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { type, duration, interval, repeats } = req.body;

		const timer = await prisma.timer.create({
			data: {
				type,
				duration,
				interval,
				repeats,
			},
		});

		res.status(201).json({ message: "Timer created successfully", timer });
	} catch (error) {
		next(error);
	}
};

// Get all Timers
export const getAllTimers = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const timers = await prisma.timer.findMany();
		res.status(200).json(timers);
	} catch (error) {
		next(error);
	}
};

// Update a Timer by ID
export const updateTimer = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { id } = req.params;
		const { type, duration, interval, repeats } = req.body;

		const timer = await prisma.timer.update({
			where: { id },
			data: {
				type,
				duration,
				interval,
				repeats,
			},
		});

		res.status(200).json({ message: "Timer updated successfully", timer });
	} catch (error) {
		next(error);
	}
};

// Delete a Timer by ID
export const deleteTimer = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { id } = req.params;

		await prisma.timer.delete({
			where: { id },
		});

		res.status(200).json({ message: "Timer deleted successfully" });
	} catch (error) {
		next(error);
	}
};
