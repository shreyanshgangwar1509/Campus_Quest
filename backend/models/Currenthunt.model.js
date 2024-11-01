const mongoose = require('mongoose')

const currenthunt = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    hunt: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hunt",
    },
    startTime: {
        type: Date,
        default: Date.now,
        required:true,
    },
    endTime: {
        type: Date,
        default:Date.now
    }

}, { timestamps: true })
const CurrentHunt = mongoose.model("CurrentHunt", currenthunt);
export { CurrentHunt };

