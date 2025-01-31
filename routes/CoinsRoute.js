const express = require("express");
const User = require("../schemas/User");
const router = express.Router();

// Get user's coin balance from User collection
router.get("/coins", async (req, res) => {
  try {
    const { userId } = req.body; // Get userId from query parameters

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      userId: user._id,
      coins: user.coins,
      message: "Coins retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
