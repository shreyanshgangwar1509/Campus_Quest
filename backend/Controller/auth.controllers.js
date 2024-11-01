import AsyncErrorHandler from "../ErrorHandlers/asyncerrorhandler";
import { User } from "../models/User.model";

const Register = AsyncErrorHandler(async (req, res,next) => {
    try {
        const { email, password, username } = req.body;
    
        const useremail = await User.findOne({email});
        const userbyusername = await User.findOne({username})
        if (useremail || userbyusername) {
            res.status(400).json({
                message: "User already exists",
                
            })
            return;
        }
        const hashedPassword = bcrypt.hash(password, 10);
        const User1 = new User({
            email,
            password:hashedPassword,
            username,
            isVerified:false,
        })
        const newUser = new User(User1);
    
        res.status(201).json({
          success:true,
          message: "User registered successfully",
          emailVerified: false,
        });
        
    } catch (error) {
        next(error);
    }
})


const login = AsyncErrorHandler(async (req, res) => {
    const { email, password  } = req.body;
    
    res.status(200).json({ message: "Login successful"});
})

const verifyemail = AsyncErrorHandler(async (req, res) => {
    
})
export { Register };

