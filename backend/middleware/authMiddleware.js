const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

// Middleware function to validate the JWT
exports.verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Decode and verify the token using jwt.verify
    const decoded = jwt.verify(token, SECRET_KEY);
    // Append decoded user information to the request object for subsequent routes
    req.user = decoded;
    // Proceed to the next middleware or route
    next();
  } catch (error) {
    // If the token is invalid or authentication fails, a 400 error is returned.
    res.status(400).json({ message: 'Invalid token.' });
  }
};
