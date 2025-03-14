import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import Mood from "../models/Mood.js";

const router = express.Router();

//  Add a Mood Entry
router.post("/", authMiddleware, async (req, res) => {
  const { mood, note } = req.body;

  if (!mood) {
    return res.status(400).json({ error: "Mood is required." });
  }

  try {
    const moodEntry = new Mood({ userId: req.user, mood, note });
    await moodEntry.save();
    res.json(moodEntry);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//  Get Mood History
router.get("/", authMiddleware, async (req, res) => {
  try {
    const moods = await Mood.find({ userId: req.user }).sort({ date: -1 });
    res.json(moods);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 📌 Get Mood Statistics for Graphs
router.get("/stats", authMiddleware, async (req, res) => {
  try {
    const moods = await Mood.find({ userId: req.user });

    // Count occurrences of each mood
    const moodCounts = moods.reduce((acc, mood) => {
      acc[mood.mood] = (acc[mood.mood] || 0) + 1;
      return acc;
    }, {});

    // Aggregate data for visualization
    const moodTrends = moods.map((entry) => ({
      date: entry.date.toISOString().split("T")[0], // Format as YYYY-MM-DD
      mood: entry.mood,
    }));

    res.json({ moodCounts, moodTrends });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
