// // server/middleware/authMiddleware.js

// import dotenv from 'dotenv';
// import jwt from 'jsonwebtoken';

// dotenv.config();

// // Middleware to protect routes
// const authMiddleware = (req, res, next) => {
//     // Get token from headers
//     const token = req.header('accesstoken')?.split('=')[1]; // Assuming "Bearer TOKEN"

//     // If no token, return 401 Unauthorized
//     if (!token) {
//         return res.status(401).json({ message: 'Access denied. No token provided.' });
//     }

//     try {
//         // Verify token
//         const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your JWT secret
//         req.user = decoded; // Attach the decoded user data to the request
//         next(); // Call the next middleware or route handler
//     } catch (error) {
//         res.status(400).json({ message: 'Invalid token.' });
//     }
// };

// export default authMiddleware;

import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

const authMiddleware = (req, res, next) => {
    // Get token from the Authorization header
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1]; // Extract the token after "Bearer"

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECERET);
        console.log(decoded);
        
        req.user = decoded; // Attach decoded user data to the request
        next(); 
    } catch (error) {
        res.status(403).json({ message: 'Invalid or expired token.' });
    }
};

export default authMiddleware;
