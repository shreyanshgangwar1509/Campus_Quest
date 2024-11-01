import mongoose from 'mongoose';

const huntSchema = new mongoose.Schema({
    title: String,
    host: String,
    leaderboard:[
      {
        type: mongoose.Schema.Types.ObjectId,
            ref: "Team",
        time:String,
        },
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        time:String,
        }
    ],
    description: String,
    Questions: [String],
    Answers: [String],
    Hint1: [String],
    difficulty: ["easy", "medium", "hard"],
    solved:Number
})
const Hunt = mongoose.model("Hunt", huntSchema)
export { Hunt };

