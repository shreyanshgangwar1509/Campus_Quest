
import Message from "../models/Chat.js";
import { Conversation } from "../models/conversation.js";

import User from "../models/User.model.js";

import { getReceiverSocketId, io } from "../socket/socket.js";

export const getMessage = async (req,res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user.userId;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] }
        }).populate("messages");

        if (!conversation) return res.status(200).json([]);

        const messages = conversation.messages;

        res.status(200).json(messages);
    } catch (error) {
        console.error("Error in getMessages controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const postMessage = async (req,res) =>{
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user.userId;
        
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        const newMessage = new Message({ 
            senderId,
            receiverId,
            message
        });

        conversation.messages.push(newMessage._id);

        await Promise.all([conversation.save(), newMessage.save()]);

const receiverSocketId = getReceiverSocketId(receiverId);
console.log("receiver socket id =>",receiverSocketId);

if (receiverSocketId) {
    io.to(receiverSocketId).emit("newMessage", newMessage);
}


        res.status(201).json(newMessage);
    } catch (error) {
        console.error("Error in sendMessage controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }

}

export const getActiveUsers = async (req,res) => {
    try {
        const loggedInUserId = req.user.userId;

        const filteredUsers = await User.find({_id:{$ne: loggedInUserId}}).select("-password")   // baki sare doc. expcept for (loggedInUserId)
        res.status(200).json(filteredUsers);

    } catch (error) {
        console.log("Error in user Controller -> ",error)
        res.status(500).json({error:"internal server error"});        
    }

}