const jwt = require("jsonwebtoken");

module.exports = function requireAuth(req, res, next) {
  // 1) Header (fetch ishlatganda)
  const auth = req.headers.authorization;
  let token = null;

  if (auth && auth.startsWith("Bearer ")) token = auth.slice(7);

  // 2) Cookie (video tag uchun)
  if (!token && req.cookies?.token) token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "Auth required" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.id || payload.userId || payload._id;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};