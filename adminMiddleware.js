exports.checkAdmin = (req, res, next) => {
    try {
      // Check if the authenticated user has admin privileges
      if (req.userRole !== 'admin') {
        return res.status(403).json({ error: 'Forbidden - You do not have admin privileges' });
      }
  
      // Continue to the next middleware or route handler
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  