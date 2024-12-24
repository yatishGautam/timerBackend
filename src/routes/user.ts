import { Router } from "express";
import { signupController, loginController } from "../controllers/Login";

const router = Router();

// Get all users (placeholder endpoint)
router.get("/", async (req, res) => {
	res.json({ hellofrom: "the otherside" });
});

// Signup endpoint
router.post("/signup", signupController);

// Login endpoint
router.post("/login", loginController);

export default router;
