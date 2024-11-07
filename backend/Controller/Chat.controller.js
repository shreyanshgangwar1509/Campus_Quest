import Chat from '../models/Chat.js';
import Message from '../models/message.model.js';
import { getReceiverSocketId } from '../socket/socket.js';

// Retrieve all messages for a chat
export const getMessage = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        // Find the chat with both participants
        const chat = await Chat.findOne({
            participants: { $all: [senderId, userToChatId] }
        }).populate("messages");

        if (!chat) return res.status(200).json([]); // No chat history found

        res.status(200).json(chat.messages);
    } catch (error) {
        console.error("Error in getMessages controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const postMessage = async (req, res, io) => {  // io passed here for socket
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        // Find or create the chat
        let chat = await Chat.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!chat) {
            chat = await Chat.create({
                participants: [senderId, receiverId],
                messages: []
            });
        }

        // Create a new message
        const newMessage = new Message({ 
            senderId,
            receiverId,
            message
        });

        // Save the message to the chat
        chat.messages.push(newMessage._id);
        await Promise.all([chat.save(), newMessage.save()]);

        // Send real-time message using Socket.IO
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.error("Error in postMessage controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get list of active users excluding the logged-in user
export const getActiveUsers = async (req, res) => {
    try {
        const loggedInUserId = req.user.userId;

        // Fetch all users except the logged-in user
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error in getActiveUsers controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
