// models/event.js
import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    hunts: [
        {
            type:mongoose.Schema.Types.ObjectId,ref:"Hunt",
        }
    ],

    category: { type: String, enum: ['Workshop', 'Seminar', 'Sports', 'Cultural', 'Other'], required: true },
});

const Event = mongoose.model('Event', eventSchema);
export default Event ;

