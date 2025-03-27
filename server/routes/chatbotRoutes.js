import express from 'express';
import Chatbot from '../models/Chatbot.js';

const router = express.Router();

// Handle chatbot interaction
router.post('/', async (req, res, next) => {
  const { userId, message } = req.body;

  try {
    // Replace this line with your AI logic
    const response = `Echo: ${message}`;

    const chatEntry = await Chatbot.create({ userId, message, response });
    res.status(201).json(chatEntry);
  } catch (error) {
    next(error);
  }
});

// Fetch chat history for a user
router.get('/:userId', async (req, res, next) => {
  try {
    const history = await Chatbot.find({ userId: req.params.userId }).sort({ timestamp: 1 });
    res.status(200).json(history);
  } catch (error) {
    next(error);
  }
});

export default router;
