const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const chatbotRoutes = require("./api/chatbot");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
// Middleware for CORS
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
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB connection error:", err)); // Improved error logging

// Routes
app.use("/api/chatbot", chatbotRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Chatbot API!"); // You can customize this message
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
