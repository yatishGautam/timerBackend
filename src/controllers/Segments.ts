import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new Segment
export const createSegment = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { workoutId, name, sequenceOrder } = req.body;

		const segment = await prisma.segment.create({
			data: {
				workoutId,
				name,
				sequenceOrder,
			},
		});

		res.status(201).json({ message: "Segment created successfully", segment });
	} catch (error) {
		next(error);
	}
};

// Get all Segments for a specific Workout
export const getSegmentsByWorkout = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { workoutId } = req.params;

		const segments = await prisma.segment.findMany({
			where: { workoutId },
			orderBy: { sequenceOrder: "asc" },
		});

		res.status(200).json(segments);
	} catch (error) {
		next(error);
	}
};

// Update a Segment
export const updateSegment = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { id } = req.params;
		const { name, sequenceOrder } = req.body;

		const segment = await prisma.segment.update({
			where: { id },
			data: {
				name,
				sequenceOrder,
			},
		});

		res.status(200).json({ message: "Segment updated successfully", segment });
	} catch (error) {
		next(error);
	}
};

// Delete a Segment
export const deleteSegment = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { id } = req.params;

		await prisma.segment.delete({
			where: { id },
		});

		res.status(200).json({ message: "Segment deleted successfully" });
	} catch (error) {
		next(error);
	}
};
