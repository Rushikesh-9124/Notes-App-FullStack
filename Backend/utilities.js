const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ success: false, message: "Token required" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userData) => {
    if (err) return res.status(403).json({ success: false, message: "Invalid or expired token" });
    req.user = userData;
    next();
  });
}

module.exports = {
  authenticateToken
};
