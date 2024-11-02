// components/Chat.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Chat = ({ teamId, userId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        const fetchMessages = async () => {
            const response = await axios.get(`/api/chat/${teamId}`);
            setMessages(response.data);
        };
        fetchMessages();
    }, [teamId]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            const response = await axios.post('/api/chat/send', {
                teamId,
                userId,
                message: newMessage,
            });
            setMessages((prevMessages) => [...prevMessages, response.data]);
            setNewMessage('');
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-messages">
                {messages.map((msg) => (
                    <div key={msg._id} className="chat-message">
                        <strong>{msg.userId.username}:</strong> {msg.message}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSendMessage} className="chat-form">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="chat-input"
                />
                <button type="submit" className="chat-send">Send</button>
            </form>
        </div>
    );
};

export default Chat;
