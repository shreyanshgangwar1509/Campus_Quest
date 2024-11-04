// models/business.js
import mongoose from 'mongoose';

const businessSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    contact: { type: String },
    category: { type: String },
    description: { type: String },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reviews: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        rating: { type: Number, required: true },
        comment: { type: String },
        createdAt: { type: Date, default: Date.now },
    }],
    offers: [{
        title: { type: String },
        description: { type: String },
        validUntil: { type: Date },
    }],
});

const Business = mongoose.model('Business', businessSchema);
export default Business ;

