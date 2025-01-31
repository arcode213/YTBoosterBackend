require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");


const SignupRoute = require("./routes/SignupRoute");
const coinsCount = require("./routes/CoinsRoute"); // Use the correct file name
// const vpnMiddleware = require("./middleware/vpnMiddleware");



async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // Exit the process if the database connection fails
  }
}
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());


// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the Node.js Backend App!");
});

// User-related routes
app.use("/user", SignupRoute);
app.use("/coin", coinsCount);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
