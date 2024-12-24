import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET_KEY || "";

export const signupController = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { username, email, password } = req.body;

		// Check if user already exists
		const existingUser = await prisma.user.findFirst({
			where: {
				OR: [{ email }],
			},
		});
		if (existingUser) {
			res.status(400).json({ message: "User already exists" });
			return;
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create new user
		const newUser = await prisma.user.create({
			data: {
				username,
				email,
				passwordHash: hashedPassword,
			},
		});

		// Generate JWT
		const token = jwt.sign(
			{ id: newUser.id, email: newUser.email },
			SECRET_KEY,
			{
				expiresIn: "1h",
			}
		);

		res.status(201).json({
			message: "User created successfully",
			user: {
				id: newUser.id,
				username: newUser.username,
				email: newUser.email,
			},
			token,
		});
	} catch (error) {
		next(error);
	}
};

export const loginController = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { usernameOrEmail, password } = req.body;

		// Find user by username or email
		const user = await prisma.user.findFirst({
			where: {
				OR: [{ email: usernameOrEmail }],
			},
		});

		if (!user) {
			res.status(404).json({ message: "User not found" });
			return;
		}

		// Compare passwords
		const isMatch = await bcrypt.compare(password, user.passwordHash);
		if (!isMatch) {
			res.status(401).json({ message: "Invalid credentials" });
			return;
		}

		// Generate JWT
		const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
			expiresIn: "1h",
		});

		res.status(200).json({ message: "Login successful", token });
	} catch (error) {
		next(error);
	}
};

export const getProfileController = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const userId = req.user?.id; // Assuming user ID is stored in req.user via middleware

		if (!userId) {
			res.status(401).json({ message: "Unauthorized" });
			return;
		}

		// Fetch user profile
		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: {
				id: true,
				username: true,
				email: true,
				createdAt: true,
			},
		});

		if (!user) {
			res.status(404).json({ message: "User not found" });
			return;
		}

		res.status(200).json({ user });
	} catch (error) {
		next(error);
	}
};
