const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

router.get("/ok", verifyToken, (req, res) => {
  res.status(200).json({ message: "protected route access" });
});

module.exports = router;
