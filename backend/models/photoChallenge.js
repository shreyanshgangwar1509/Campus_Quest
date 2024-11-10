// models/photoChallenge.js
import mongoose from 'mongoose';

const photoChallengeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date },
    imageurl:String,
    endDate: { type: Date },
    submissions: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        imageUrl: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
    }],
    votes: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        submissionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Submission' },
        createdAt: { type: Date, default: Date.now }
    }]
});

const PhotoChallenge = mongoose.model('PhotoChallenge', photoChallengeSchema);
export default PhotoChallenge ;

