import User from '../models/User.model.js';
import VerificationToken from '../models/VerificationToken.js';
import sendverificationemail from '../utills/send-otp.js';
// auth.controller.js
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { setToken } from '../utills/token.js';
// Initialize OAuth2Client with your Google Client ID
const client = new OAuth2Client('YOUR_GOOGLE_CLIENT_ID');

export const googleSignIn = async (req, res) => {
  const { token } = req.body;

  try {
    // Verify the token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: 'YOUR_GOOGLE_CLIENT_ID',
    });

    const payload = ticket.getPayload(); // Contains user info
    const { sub, email, name, picture } = payload;

    // You can create or find the user in your database here
    const user = {
      googleId: sub,
      email,
      name,
      picture,
    };

    // Respond with user data or handle it as needed
    res.status(200).json(user);
  } catch (error) {
    console.error('Error verifying Google ID token:', error);
    res.status(401).json({ message: 'Invalid Google ID token' });
  }
};

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
    return res.status(200).json({ message: "User registered successfully",user });
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
    const accesstoken = setToken(user);
    res.cookie(process.env.ACCESS_TOKEN, accesstoken, { httpOnly: true, secure: true });
    const refereshToken = jwt.sign({ user }, process.env.JET_SECERET || '', { expiresIn: "1d" })
    res.cookie(process.env.REFERESH_TOKEN, refereshToken, {
      httpOnly: true,
      secure: true,
    
    });
    // Set token and respond
    
    return res.status(200).json({ message: "User logged in successfully" });
  } catch (error) {
    console.error("Error in Login function:", error);
    return res.status(500).json({ message: 'Server error', error });
  }
};

export const logoutUser = async (req, res) => {
  try {
    // Clear the cookie; ensure to match the options used when setting the cookie
    res.clearCookie('accesstoken', {
      httpOnly: true, // if set when creating the cookie
      secure: process.env.NODE_ENV === 'production', // if set when creating the cookie
      sameSite: 'Strict', // or 'Lax' depending on your implementation
    });
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error', error });
  }
};


export const verifyemail = async (req, res) => {

  const { email, otp } = req.body;
  console.log('Email verification is happining');

  try {
    // Find the verification token for the provided email
    const verificationToken = await VerificationToken.findOne({ email });

    // Check if the token exists and if the OTP matches
    if (!verificationToken) {
      return res.status(400).json({ message: "Invalid or expired OTP." });
    }

    // Check if the provided OTP matches the stored token
    if (otp !== verificationToken.token) {
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

export const tokencontroller = async (req, res) => {
  const { refereshToken } = res.cookies;

  try {
    if (!refereshToken) {
      return res.status(400).json({ message: "Verification erro" });
    }
    jwt.verify(refereshToken, process.env.JET_SECERET, (err,user) => {
      if (err) {
        res.status(403).json({ message: "Verification failed" })
        const accesstoken = setToken(user);
        res.cookie(process.env.ACCESS_TOKEN, accesstoken, {
      httpOnly: true,
      secure: true,
    
    });
    // Set token and respond
    
    return res.status(200).json({ message: "token refereshed successfully" });
      }
    })
  } catch (error) {
    return res.status(500).json({message:"Erro in refresh token making"})
  }
}
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
