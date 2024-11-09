import express from 'express';
import { getProfile, googleSignIn, Login, logoutUser, Register, tokencontroller, verifyemail } from '../Controller/auth.controllers.js';

import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', Register);

router.post('/login',Login);

router.post('/verifyemail',verifyemail);

router.post('/logout', authMiddleware,logoutUser);
// Protected route
router.get('/profile', authMiddleware, getProfile); // Protect this route with authMiddleware
router.get('/generate-token', tokencontroller);
router.post('/google', googleSignIn);
// // Auth with Google
// router.get('/google', passport.authenticate('google', {
//     scope: ['profile', 'email']
// }));

// router.get('/google/callback', passport.authenticate('google'), (req, res) => {
//     // Successful authentication, redirect to your desired location
//      res.redirect('http://localhost:3001/dashboard'); // Redirect to frontend
// });

// // Auth with GitHub
// router.get('/github', passport.authenticate('github'));

// router.get('/github/callback', passport.authenticate('github'), (req, res) => {
//     // Successful authentication, redirect to your desired location
//      res.redirect('http://localhost:3001/dashboard'); // Redirect to frontend
// });

export default router

