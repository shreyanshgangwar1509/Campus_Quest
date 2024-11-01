
import User from '../models/user.model.js';
import { setToken } from '../utills/token.js';
import { emailverification } from './otp.controller.js';

export const Register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    // baad me hashed password rakh lenge 
    const user = new User({ username, email, password });
    await user.save();

    await emailverification(req, res);

  } catch (error) {
    res.status(500).json({ error: 'Server error', error });
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (!user.isVerified) {
      return emailverification(req, res); 
    }

    const userId = user._id;
    setToken(res, { userId });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie('token'); 
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error', error });
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
