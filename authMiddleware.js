const jwt = require('jsonwebtoken');
const config = require('../config/jwt');

exports.authenticateUser = (req, res, next) => {
  try {
    // Get the token from the request headers
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized - No token provided' });
    }

    // Verify the token
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized - Invalid token' });
      }

      // Attach the decoded user information to the request object for later use
      req.userId = decoded.userId;
      req.userRole = decoded.role;

      // Continue to the next middleware or route handler
      next();
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
