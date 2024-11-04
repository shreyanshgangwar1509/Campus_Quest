
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connectDB from './db/dbconnect.js';
import authRoutes from './Routes/auth.routes.js';
import chatRoutes from './Routes/chat.routes.js';
import huntRoutes from './Routes/hunt.routes.js';
import session from 'express-session';
dotenv.config(); // Load environment variables from .env file

// Connect to the database
try {
  await connectDB();
  console.log("Connected to database");
} catch (error) {
  console.error("Database connection failed:", error);
  process.exit(1); // Exit process if DB connection fails
}

const app = express();

// Middleware setup
app.use(express.json()); // For parsing JSON requests
app.use(cors()); // Enable CORS
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret_key', // Use a strong secret in production
  resave: false, // Don't save session if unmodified
  saveUninitialized: true, // Create a session even if it hasn't been modified
  cookie: { secure: false }, // Set to true if using HTTPS
}));
// Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/hunts', huntRoutes); // Hunt routes
app.use('/api/chat', chatRoutes); // Chat routes

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
