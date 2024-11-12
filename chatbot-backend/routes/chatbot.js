const express = require("express");
const axios = require("axios");
const Response = require("../models/Response");

const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey:
    process.env.GROQ_API_KEY ||
    "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",
});

const router = express.Router();

router.post("/", async (req, res) => {
  const { query } = req.body;

  try {
    // Request to Groq API for chat completions
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: query,
        },
      ],
      model: "llama3-8b-8192",
    });

    // Extract the generated text from the response
    const responseMessage =
      response.choices[0]?.message?.content || "No response generated.";

    // Construct response data object
    const responseData = {
      prompt: query,
      result: responseMessage,
      result_table_path: "",
      result_visualization_path: "",
    };

    // Respond with the generated response data
    res.status(200).json(responseData);
  } catch (error) {
    console.error("Error fetching response from Groq:", error);
    res.status(500).json({
      prompt: "",
      result: "",
      result_table_path: "",
      result_visualization_path: "",
      error: "An error occurred while fetching the response from Groq.",
    });
  }
});

router.post("/save", async (req, res) => {
  const { prompt, result } = req.body;

  try {
    const savedResponse = await Response.create({ prompt, result });
    res.status(200).json(savedResponse);
  } catch (error) {
    console.error("Error saving response:", error);
    res.status(500).json({ error: "Error saving response" });
  }
});

router.get("/history", async (req, res) => {
  try {
    const responses = await Response.find().sort({ createdAt: -1 });
    res.json(responses);
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).json({ error: "Error fetching history" });
  }
});

router.get("/responses", async (req, res) => {
  try {
    const responses = await Response.find().sort({ createdAt: -1 });
    res.json(responses);
  } catch (error) {
    console.error("Error fetching responses:", error);
    res.status(500).json({ error: "Error fetching responses" });
  }
});

module.exports = router;
