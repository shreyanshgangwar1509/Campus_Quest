// routes/chat.routes.js
import express from 'express';
import { getMessages, sendMessage } from '../Controller/Chat.controller.js';

const router = express.Router();

// Send a message
router.post('/send', sendMessage);

// Get messages for a team
router.get('/:teamId', getMessages);

export default router;
