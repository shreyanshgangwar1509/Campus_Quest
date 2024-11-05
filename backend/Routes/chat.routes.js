// import express from 'express';
// import { createChat, getChatHistory, sendMessage } from '../controllers/chatController.js';

// const router = express.Router();

// // Route to create a new chat
// router.post('/create', createChat);

// // Route to send a message
// router.post('/:chatId/message', sendMessage);

// // Route to get chat history
// router.get('/:chatId/history', getChatHistory);

// export default router;

import express from "express";
import { getActiveUsers, getMessage, postMessage } from "../Controller/Chat.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { io } from "../socket/socket.js";


const router = express.Router();

router.get("/:id",getMessage);

router.post("/send/:id",(req,res)=>postMessage(req,res,io));

router.get("/active",authMiddleware,getActiveUsers);

export default router;