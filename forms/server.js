const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // Allow cross-origin requests

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/contactDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
});

// Create the model
const Contact = mongoose.model("Contact", contactSchema);

// Handle POST request to save contact form data
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Save the data in MongoDB
    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();

    res.status(201).json({ message: "Your message has been sent. Thank you!" });
  } catch (error) {
    console.error("Error saving contact form data:", error);
    res.status(500).json({ error: "Failed to send message. Please try again." });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
