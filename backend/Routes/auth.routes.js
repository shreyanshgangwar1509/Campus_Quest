import express from 'express';
import passport from 'passport';
import { Login, Register } from '../Controller/auth.controllers.js';
import { getUserProfile } from '../Controller/user.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', Register);

router.post('/login', Login);

router.post('/verifyemail', verification);

router.post('/forgetpassword', forgetpassword);

// Protected route
router.get('/profile', authMiddleware, getUserProfile); // Protect this route with authMiddleware


// Auth with Google
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
    // Successful authentication, redirect to your desired location
    res.redirect('/dashboard');
});

// Auth with GitHub
router.get('/github', passport.authenticate('github'));

router.get('/github/callback', passport.authenticate('github'), (req, res) => {
    // Successful authentication, redirect to your desired location
    res.redirect('/dashboard');
});

export default router

