const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  prompt: { type: String, required: true },
  result: { type: String, required: true },
  result_table_path: { type: String },
  result_visualization_path: { type: String },
  error: { type: String, default: "" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Response", responseSchema);
