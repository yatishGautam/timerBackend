import { Request, Response, NextFunction } from "express";
import prisma from "../prisma";

export const createExerciseController = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
    try{
        const { name, description } = req.body;
    }
};
