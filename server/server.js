import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import moodRoutes from "./routes/moodTracker.js";
import chatbotRoutes from "./routes/chatbotRoutes.js";
import connectDB from "./config/db.js";
import errorHandler from "./middleware/errorHandler.js";
import surveyRoutes from './routes/surveyRoutes.js';
dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/mood", moodRoutes);
app.use("/api/chat", chatbotRoutes);
app.use('/api/surveys', surveyRoutes);

// Database Connection
connectDB();

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
