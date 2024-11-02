import cors from 'cors'
import express from 'express'
import connectDB from './db/dbconnect.js'
import authRoutes from './Routes/auth.routes.js'
import chatRoutes from './Routes/chat.routes.js'
import huntRoutes from './Routes/hunt.routes.js'



connectDB();
const app = express();


app.use(cors()); 
app.use(express.json());

// Middleware for session management
app.use(session({
    secret: 'your_secret_key', // Change this to a secure secret
    resave: false,
    saveUninitialized: true,
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/auth', authRoutes);

app.use('/api/hunts', huntRoutes);

// Use Chat Routes
app.use('/api/chat', chatRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
    
})