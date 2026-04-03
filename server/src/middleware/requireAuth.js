const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'simple_secret_key';

module.exports = function requireAuth(req, res, next) {
  const auth = req.headers.authorization;
  let token = null;

  if (auth && auth.startsWith('Bearer ')) token = auth.slice(7);
  if (!token && req.cookies?.token) token = req.cookies.token;
  if (!token && req.query?.token) token = req.query.token;

  if (!token) return res.status(401).json({ message: 'Auth required' });

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload.id;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
