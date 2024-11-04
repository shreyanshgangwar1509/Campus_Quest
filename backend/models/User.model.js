import mongoose from 'mongoose';

const userSchema =new  mongoose.Schema({
    username: {
        type: String,
        unique:true,
    },
    googleId: String,
    githubId: String,
    email: {
        type: String,
        unique:true,
    },
    password: {
        type:String,
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
}, { timestamp: true })

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to check password
userSchema.methods.isValidPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema)
export default  User 

