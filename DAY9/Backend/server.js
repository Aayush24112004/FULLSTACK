require('dotenv').config();
const path = require('path');
const express = require('express');
const connectDB = require('./src/config/database');
const app = require('./src/app');

connectDB();

// Absolute path to frontend build folder
const distPath = path.join(__dirname, "../Frontend/dist");

// Serve static frontend files (CSS, JS, assets)
app.use(express.static(distPath));

// IMPORTANT: Do NOT let this catch API routes
// Only send index.html for non-API requests
app.get(/^(?!\/notes).*/, (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
