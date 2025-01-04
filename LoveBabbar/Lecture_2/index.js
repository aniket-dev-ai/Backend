const express = require("express");
const dbConnect = require("./config/database");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());


// Routes
const TodoRoutes = require("./routes/todo");
app.use("/api/v1", TodoRoutes);

// Connect to DB
dbConnect();

// Test Route
app.get("/", (req, res) => {
  res.send(`<h1>This Is HomePage Baby</h1>`);
});

// Start Server
app.listen(PORT, () => {
  console.log(`App Started on Port ${PORT}`);
});
