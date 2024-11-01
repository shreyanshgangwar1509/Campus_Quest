import express from 'express';
const router = express.Router();

router.post('/register', Register);

router.post('/login', Login);

router.post('/verifyemail', verification);

router.post('/forgetpassword', forgetpassword);

