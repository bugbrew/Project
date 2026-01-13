const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Temporary in-memory storage
let resumes = [];

// API routes
app.post("/api/resume", (req, res) => {
  const resumeData = req.body;
  resumes.push(resumeData); // store in memory
  res.status(200).json({ message: "Resume submitted successfully!", data: resumeData });
});

app.get("/api/resumes", (req, res) => {
  res.status(200).json(resumes);
});

// Start server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
