// routes/chat.routes.js
import express from 'express';
import { getMessages, getMessagesteam, sendMessage } from '../Controller/Chat.controller.js';

const router = express.Router();

// Send a message
router.post('/send/:id', sendMessage);

router.get('/:userId',getMessages)
// Get messages for a team
router.get('/:teamId', getMessagesteam);

export default router;
