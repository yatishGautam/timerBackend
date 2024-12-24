// src/middlewares/auth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.SECRET_KEY || "your_jwt_secret";

interface JwtPayload {
	id: string;
	email: string;
}

export const authMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			res.status(401).json({ message: "Unauthorized: No token provided" });
			return;
		}

		const token = authHeader.split(" ")[1];

		// Verify JWT
		const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

		// Attach user information to the request object
		req.user = {
			id: decoded.id,
			email: decoded.email,
		};

		next();
	} catch (error) {
		res.status(401).json({ message: "Unauthorized: Invalid token" });
	}
};

// Extend the Express Request interface to include `user`
declare global {
	namespace Express {
		interface Request {
			user?: {
				id: string;
				email: string;
			};
		}
	}
}
