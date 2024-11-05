import User from '../models/User.model.js';
import VerificationToken from '../models/VerificationToken.js';
import sendverificationemail from '../utills/send-otp.js';
import { setToken } from '../utills/token.js';

export const Register = async (req, res) => {
  console.log('auth routes called register');

  const { username, email, password } = req.body;
  console.log("Received email:", email);

  try {
    const existingUser = await User.findOne({ email });
    console.log("Existing user:", existingUser);
    
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ username, email, password, isVerified: false });
    await user.save();
    console.log("User saved successfully:", user);

    await sendverificationemail(req,email);
    return res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error in Register function:", error);
    return res.status(500).json({ message: 'Server error', error });
  }
};


export const Login = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt for email:", email);
  
  try {
    const user = await User.findOne({ email });
    
    // Check if user is found
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials: user not found' });
    }

    // Check password match
    const isMatch = (password === user.password); // Use a secure method for password comparison
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials: password does not match' });
    }

    // Check if user is verified
    if (!user.isVerified) {
      await sendverificationemail(req,email); 
      return res.status(403).json({ message: 'User not verified. Verification email sent.' });
    }
    req.session.email = email;
    // Set token and respond
    const userId = user._id;
    const token = setToken(res, { userId });
    return res.status(200).json({ message: "User logged in successfully" },token);
  } catch (error) {
    console.error("Error in Login function:", error);
    return res.status(500).json({ message: 'Server error', error });
  }
};

export const logoutUser = async (req, res) => {
  try {
    // Clear the cookie; ensure to match the options used when setting the cookie
    res.clearCookie('token', {
      httpOnly: true, // if set when creating the cookie
      secure: process.env.NODE_ENV === 'production', // if set when creating the cookie
      sameSite: 'Strict', // or 'Lax' depending on your implementation
    });
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error', error });
  }
};


// export const verifyemail = async (req, res) => {
//   const { otp } = req.body;

//   try {
//     const email = req.session.email; // Retrieve email from session

//     if (!email) {
//       return res.status(401).json({ message: 'No email found in session' });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "Register first" });
//     }

//     user.isVerified = true;
//     await user.save();
//     return res.status(200).json({ message: "User verified successfully" });
//   } catch (error) {
//     console.error("Error in verifyemail:", error);
//     return res.status(500).json({ message: "Server error", error });
//   }
// };
export const verifyemail = async (req, res) => {

  const { email, otp } = req.body;
  console.log('Email verification is');

  try {
    // Find the verification token for the provided email
    const verificationToken = await VerificationToken.findOne({ email });

    // Check if the token exists and if the OTP matches
    if (!verificationToken) {
      return res.status(400).json({ message: "Invalid or expired OTP." });
    }

    // Check if the provided OTP matches the stored token
    if (parseInt(otp) !== verificationToken.token) {
      return res.status(400).json({ message: "Invalid OTP." });
    }

    // Mark user as verified (this would depend on your user model)
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    user.isVerified = true;
    await user.save(); // Save user verification status

    // Optionally, delete the token after successful verification
    await VerificationToken.deleteOne({ email });

    res.status(200).json({ message: "Email verified successfully." });
  } catch (error) {
    console.error("Error in verifyOtp:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};


export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password'); 
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
