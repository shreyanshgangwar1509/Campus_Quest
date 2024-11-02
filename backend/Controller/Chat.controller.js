// controllers/chat.controller.js
import { Chat } from '../models/Chat.js';

// Send a message
export const sendMessage = async (req, res) => {
    const { teamId, userId, message } = req.body;
    try {
        const newMessage = new Chat({ teamId, userId, message });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get messages for a team
export const getMessages = async (req, res) => {
    const { teamId } = req.params;
    try {
        const messages = await Chat.find({ teamId }).populate('userId', 'username'); // Populate userId to get usernames
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
