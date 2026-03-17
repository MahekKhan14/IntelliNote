//Token ke through user authentication ko find/verify krne k liye middleware 
//userId ko find/extract krna h from token.js and with this we'll have our current user in req.userId and then we can use this req.userId in our controllers to find the user in database and perform operations accordingly
// Middleware for user authentication using JWT

import jwt from 'jsonwebtoken';

const isAuth = (req, res, next) => {
  try {
    // Read token from cookies OR headers (FIX for production / mobile users)
    const token =
      req.cookies?.token ||
      req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized, Token not found. Please login again." });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized, Invalid token. Please login again." });
    }

    // Attach userId from token payload to request object
    req.userId = decoded.userId;

    // Continue to next middleware/controller
    next();

  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export default isAuth;