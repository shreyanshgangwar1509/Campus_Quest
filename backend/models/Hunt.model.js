import mongoose from 'mongoose';

const leaderboardEntrySchema = new mongoose.Schema({
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",  // Assuming you have a Team model
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",  // Assuming you have a User model
    },
    score: { type: Number, required: true, default: 0 },
    time: { type: Number, required: true },
});

// Create a model for leaderboard entry
const LeaderboardEntry = mongoose.model('LeaderboardEntry', leaderboardEntrySchema);

const huntSchema = new mongoose.Schema({
    title: { type: String, required: true },
    host: { type: String, required: true },
    leaderboard: [{ type: mongoose.Schema.Types.ObjectId, ref: 'LeaderboardEntry' }],
    description: { type: String, required: true },
    questions: [{ type: String, required: true }],
    answers: [{ type: String, required: true }],
    hints: [{ type: String, required: true }],
    difficulty: { 
        type: String, 
        enum: ["easy", "medium", "hard"], 
        required: true 
    },
    solved: { type: Number, default: 0 }
});

const Hunt = mongoose.model("Hunt", huntSchema);
export { Hunt, LeaderboardEntry };

