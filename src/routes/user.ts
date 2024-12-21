import { Router } from "express";

const router = Router();

// Get all users
router.get("/", async (req, res) => {
	res.json({ hellofrom: "the otherside" });
});

export default router;
