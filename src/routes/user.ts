import { Router } from "express";
import {
	signupController,
	loginController,
	getProfileController,
} from "../controllers/Login";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

// Get all users (placeholder endpoint)
router.get("/", async (req, res) => {
	res.json({ hellofrom: "the otherside" });
});

// Signup endpoint
router.post("/signup", signupController);

// Login endpoint
router.post("/login", loginController);

// Profile endpoint
router.get("/profile", authMiddleware, getProfileController);

export default router;
