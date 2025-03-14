import mongoose from "mongoose";

const chatbotSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
  response: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const Chatbot = mongoose.model("Chatbot", chatbotSchema);
export default Chatbot;
