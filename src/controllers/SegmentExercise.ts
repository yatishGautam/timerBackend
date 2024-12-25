import { Request, Response, NextFunction } from "express";
import prisma from "../prisma";

// Create a new SegmentExercise
export const createSegmentExercise = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { segmentId, exerciseId, timerId, sequenceOrder } = req.body;

		const segmentExercise = await prisma.segmentExercise.create({
			data: {
				segmentId,
				exerciseId,
				timerId,
				sequenceOrder,
			},
		});

		res.status(201).json({
			message: "SegmentExercise created successfully",
			segmentExercise,
		});
	} catch (error) {
		next(error);
	}
};

// Get all SegmentExercises for a specific Segment
export const getSegmentExercisesBySegment = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { segmentId } = req.params;

		const segmentExercises = await prisma.segmentExercise.findMany({
			where: { segmentId },
			orderBy: { sequenceOrder: "asc" },
		});

		res.status(200).json(segmentExercises);
	} catch (error) {
		next(error);
	}
};

// Update a SegmentExercise
export const updateSegmentExercise = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { id } = req.params;
		const { exerciseId, timerId, sequenceOrder } = req.body;

		const segmentExercise = await prisma.segmentExercise.update({
			where: { id },
			data: {
				exerciseId,
				timerId,
				sequenceOrder,
			},
		});

		res.status(200).json({
			message: "SegmentExercise updated successfully",
			segmentExercise,
		});
	} catch (error) {
		next(error);
	}
};

// Delete a SegmentExercise
export const deleteSegmentExercise = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { id } = req.params;

		await prisma.segmentExercise.delete({
			where: { id },
		});

		res.status(200).json({ message: "SegmentExercise deleted successfully" });
	} catch (error) {
		next(error);
	}
};
