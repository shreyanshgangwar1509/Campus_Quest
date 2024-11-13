// models/Chat.js
import mongoose from 'mongoose';
const chatSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
    }],
},{timestamps:true,}
        
);

const Message = mongoose.model('Message', chatSchema);
export default Message ;

