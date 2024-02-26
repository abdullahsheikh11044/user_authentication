const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// router.post("/register", async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({ username, hashedPassword });
//     await user.save();
//     res.status(200).json({ message: "User successfully registered." });
//   } catch (error) {
//     res.status(500).json({ message: "Registration failed." });
//   }
// });
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      res.status(401).json({ error: "User not found." });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).json({ error: "password is incorrect." });
    }
    const token = jwt.sign({ userId: user._id }, "your-secret-key", {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
