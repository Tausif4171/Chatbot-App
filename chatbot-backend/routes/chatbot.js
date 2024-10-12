const express = require("express");
const axios = require("axios");
const Response = require("../models/Response");

const router = express.Router();
const HUGGING_FACE_API_KEY = "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"; // Your Hugging Face API Key

// Route for handling chatbot queries
router.post("/", async (req, res) => {
  const { query } = req.body;

  try {
    // Request to Hugging Face API
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/gpt2", // Use a specific model endpoint
      { inputs: query },
      {
        headers: {
          Authorization: `Bearer ${HUGGING_FACE_API_KEY}`, // Add your API key here
        },
      }
    );

    // Extract the generated text from the response
    const responseMessage =
      response.data[0]?.generated_text || "No response generated.";

    // Construct response data object
    const responseData = {
      summary: "Chatbot Response",
      result_text: responseMessage,
      result_table_path: "", // Optional
      result_visualization_path: "", // Optional
    };

    // Respond with the generated response data
    res.status(200).json(responseData);
  } catch (error) {
    console.error("Error fetching response:", error);
    res.status(500).json({
      summary: "",
      result_text: "",
      result_table_path: "",
      result_visualization_path: "",
      error: "An error occurred while fetching the response.",
    });
  }
});

// Route for saving responses to the database
router.post("/save", async (req, res) => {
  const { summary, result_text } = req.body;

  try {
    const savedResponse = await Response.create({ summary, result_text });
    res.status(200).json(savedResponse);
  } catch (error) {
    console.error("Error saving response:", error);
    res.status(500).json({ error: "Error saving response" });
  }
});

// Route for fetching all saved responses (for History tab)
router.get("/history", async (req, res) => {
  try {
    const responses = await Response.find().sort({ createdAt: -1 }); // Fetch all responses sorted by date
    res.json(responses);
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).json({ error: "Error fetching history" });
  }
});

// Route for fetching all saved responses
router.get("/responses", async (req, res) => {
  try {
    const responses = await Response.find().sort({ createdAt: -1 }); // Fetch all responses sorted by date
    res.json(responses);
  } catch (error) {
    console.error("Error fetching responses:", error);
    res.status(500).json({ error: "Error fetching responses" });
  }
});

module.exports = router;
