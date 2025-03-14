import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import moodRoutes from "./routes/moodTracker.js";



dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
// authentication
app.use("/api/auth", authRoutes);
//mood tracker
app.use("/api/mood", moodRoutes);

// Database Connection
import connectDB from "./config/db.js";
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
