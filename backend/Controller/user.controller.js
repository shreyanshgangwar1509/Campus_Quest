// server/controllers/user.controller.js

import { User } from "../models/user.model.js";



 // Assuming you have a User model

export const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Get user ID from the decoded token
        const user = await User.findById(userId).select('-password'); // Exclude password
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
};
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) { // Assuming you have a method to match password
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // Generate JWT
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1h', // Token expiration time
        });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
};
