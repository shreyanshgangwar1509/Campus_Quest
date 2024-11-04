
import mongoose from 'mongoose';
const teamSchema = new mongoose.Schema({
    member: [{
            type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    
    solved: [{
            type: mongoose.Schema.Types.ObjectId,
        ref: "Hunt",
        }],
    Chat:[String],
})

const Team = mongoose.model("Team", teamSchema);
export default Team ;

