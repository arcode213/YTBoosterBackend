const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fcm: {
      type: String, // Firebase Cloud Messaging token
      required: true,
    },
    isBlocked: {
      type: Boolean,
      default: false, // Default to false (user is not blocked)
    },
    token: {
      type: String, // Token for session management
      required: true,
    },
    coins: {
      type: Number,
      default: 600, // Default coins for new users
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;