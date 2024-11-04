// models/Chat.js
import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
    teamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    messages: [{
        type: String,
        required: true,
    }],
},{timestamps:true,}
        
);

const Chat = mongoose.model('Chat', chatSchema);
export default Chat ;

