import express from "express";
import userRoutes from "./routes/user";
import dotenv from "dotenv";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
dotenv.config();
app.use("/users", userRoutes);

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
