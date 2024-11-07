import mongoose from 'mongoose';

const leaderboardEntrySchema = new mongoose.Schema({
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    score: { type: Number, required: true, default: 0 },
    time: { type: Number, required: true },
});

const huntSchema = new mongoose.Schema({
    title: { type: String, required: true },
    host: { type: String, required: true },
    leaderboard: [leaderboardEntrySchema],
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
export default Hunt;
