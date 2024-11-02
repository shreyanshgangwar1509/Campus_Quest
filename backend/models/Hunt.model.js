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
    title: String,
    host: String,
    leaderboard: [leaderboardEntrySchema],
    description: String,
    Questions: [String],
    Answers: [String],
    Hint1: [String],
    difficulty: ["easy", "medium", "hard"],
    solved:Number
})
const Hunt = mongoose.model("Hunt", huntSchema)
export { Hunt };

