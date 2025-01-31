const express = require("express");
const User = require("../schemas/User");
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { name, email, fcm, token } = req.body;

    // Check if the user is already registered
    let existingUser = await User.findOne({ email });

    if (existingUser) {
      // User is already registered, return their details
      existingUser.fcm = fcm;
      existingUser.token = token;
      await existingUser.save();
      return res.status(200).json({
        userId: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        fcm: existingUser.fcm,
        isBlocked: existingUser.isBlocked,
        token: existingUser.token,
        coins: existingUser.coins,
        message: "User already registered!",
      });
    }

    // If user is not registered, create a new user
    const newUser = new User({
      name,
      email,
      fcm,
      token
      });

    const savedUser = await newUser.save();
      console.log(savedUser)
      // res.send({status: true})
    res.status(201).json({
      userId: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      fcm: savedUser.fcm,
      isBlocked: savedUser.isBlocked,
      token: savedUser.token,
      coins: savedUser.coins,
      message: "User successfully registered and default coins added!",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;