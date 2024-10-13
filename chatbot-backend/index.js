const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const axios = require("axios");
const Response = require("./models/Response"); // Ensure this path is correct
const Groq = require("groq-sdk");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Initialize Groq
const groq = new Groq({
  apiKey:
    process.env.GROQ_API_KEY ||
    "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",
});

// Middleware
app.use(
  cors({
    origin: "*", // Allow access from any origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Include cookies with requests
  })
);
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://tausifkhan4173:ZuCBVoDAOHLKAotH@cluster0.9uhg0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB connection error:", err)); // Improved error logging

// Chatbot Query Handler
app.post("/api/chatbot", async (req, res) => {
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
      summary: "Chatbot Response",
      result_text: responseMessage,
      result_table_path: "",
      result_visualization_path: "",
    };

    // Respond with the generated response data
    res.status(200).json(responseData);
  } catch (error) {
    console.error("Error fetching response from Groq:", error);
    res.status(500).json({
      summary: "",
      result_text: "",
      result_table_path: "",
      result_visualization_path: "",
      error: "An error occurred while fetching the response from Groq.",
    });
  }
});

// Route for saving responses to the database
app.post("/api/chatbot/save", async (req, res) => {
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
app.get("/api/chatbot/history", async (req, res) => {
  try {
    const responses = await Response.find().sort({ createdAt: -1 }); // Fetch all responses sorted by date
    res.json(responses);
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).json({ error: "Error fetching history" });
  }
});

// Route for fetching all saved responses
app.get("/api/chatbot/responses", async (req, res) => {
  try {
    const responses = await Response.find().sort({ createdAt: -1 }); // Fetch all responses sorted by date
    res.json(responses);
  } catch (error) {
    console.error("Error fetching responses:", error);
    res.status(500).json({ error: "Error fetching responses" });
  }
});

// Welcome Route
app.get("/", (req, res) => {
  res.send("Welcome to the Chatbot API!"); // You can customize this message
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
