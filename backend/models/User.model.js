import mongoose from 'mongoose'

const userSchema =new  mongoose.Schema({
    username: {
        type: String,
        unique:true,
    },
    email: {
        type: String,
        unique:true,
    },
    password: {
        type:string,
    },
    isVerified: {
        type: Boolean,
        required:true,
    },
    huntsolved:[{
            type: mongoose.Schema.Types.ObjectId,
        ref: "Hunt",
    }],
    teams: [
        {
            type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        }
    ],
    huntcount:Number,
    rating:Number
}, {timestamp:true})

  const User = mongoose.Schema("User", userSchema)
export { User }

