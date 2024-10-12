const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  summary: { type: String, required: true },
  result_text: { type: String, required: true },
  result_table_path: { type: String }, // Optional
  result_visualization_path: { type: String }, // Optional
  error: { type: String, default: "" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Optional: if you associate responses with users
  createdAt: { type: Date, default: Date.now }, // Automatically add timestamp for when the response was created
});

module.exports = mongoose.model("Response", responseSchema);
