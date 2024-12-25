import express from "express";
import userRoutes from "./routes/user";
import workoutRoutes from "./routes/workout";
import segmentRoutes from "./routes/segment";
import segmentExerciseRoutes from "./routes/segmentexercise";
import timerRoutes from "./routes/timer";
import dotenv from "dotenv";
const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();
app.use(express.json());

// Route handlers
app.use("/users", userRoutes);
app.use("/timer", timerRoutes);
app.use("/workouts", workoutRoutes);
app.use("/segments", segmentRoutes);
app.use("/segment-exercises", segmentExerciseRoutes);

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
