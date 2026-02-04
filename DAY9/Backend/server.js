require('dotenv').config();
const path = require('path');
const express = require('express');   // ⭐ ADD THIS
const connectDB = require('./src/config/database'); 
const app = require('./src/app');

connectDB();

// Serve frontend static files
app.use(express.static(path.join(__dirname, "../Frontend/dist")));

// React routing support
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/dist/index.html"));
});

const PORT = process.env.PORT || 3000;  // ⭐ IMPORTANT FOR RENDER

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
