const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    res.status(401).json({ error: "Access Denied" });
  }
  try {
    const decode = jwt.verify(token, "your-secret-key");
    req.userId = decode.userId;
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = verifyToken;
