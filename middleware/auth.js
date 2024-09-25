// middleware/auth.js

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ status: false, message: 'Missing or invalid Authorization header' });
  }

  const token = authHeader.split(' ')[1];
  // Implement token validation logic
  if (token !== process.env.BEARER_TOKEN) {
    return res.status(401).json({ status: false, message: 'Invalid token' });
  }

  // Attach user info to request if needed
  req.user = { id: 'user123', name: 'John Doe' };
  next();
};
