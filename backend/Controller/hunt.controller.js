import mongoose from "mongoose";
import { Hunt, LeaderboardEntry } from "../models/Hunt.model.js";
import presetHunts from '../utills/PreSetHunts.js';


// Create a new hunt
export const createHunt = async (req, res) => {
    console.log('making hunt');
    
    const { title, host, description, questions, answers, hints, difficulty } = req.body;
    try {
        const newHunt = new Hunt({
            title,
            host,
            description,
            Questions: Array.isArray(questions) ? questions : [], 
            Answers: Array.isArray(answers) ? answers : [], 
            Hint1: Array.isArray(hints) ? hints : [], 
            difficulty,
            solved: 0
        });
        await newHunt.save();
        res.status(201).json(newHunt);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all hunts
export const getAllHunts = async (req, res) => {
    console.log('now getting all hunts');
    
    try {
        const hunts = await Hunt.find();
        res.status(200).json(hunts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a specific hunt by ID
export const getHuntById = async (req, res) => {
    try {
        const hunt = await Hunt.findById(req.params.id);
        if (!hunt) {
            return res.status(404).json({ message: 'Hunt not found' });
        }
        res.status(200).json(hunt);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update leaderboard

export const updateLeaderboard = async (req, res) => {
    const { userId, score, time, difficulty, host } = req.body; // Include difficulty and host if they are part of the request
    console.log('Leaderboard is updating');
    console.log(userId, score, time, difficulty, host);

    try {
        // Ensure difficulty is a single string and not an array
        if (Array.isArray(difficulty)) {
            return res.status(400).json({ error: 'Difficulty should be a single value, not an array.' });
        }

        // Ensure host is provided
        if (!host) {
            return res.status(400).json({ error: 'Host is required.' });
        }

        // Find the hunt by ID
        const hunt = await Hunt.findById(req.params.id);
        if (!hunt) {
            return res.status(404).json({ message: 'Hunt not found' });
        }
        console.log('Just before pushing data');

        // Create a new leaderboard entry using the LeaderboardEntry model
        const newEntry = new LeaderboardEntry({
            user: new mongoose.Types.ObjectId(userId),  // Corrected here
            score,
            time,
        });

        // Save the new entry to the database (if necessary, depending on your logic)
        await newEntry.save();  // If needed, you can save this entry individually

        // Push the new entry's ObjectId to the leaderboard array
        hunt.leaderboard.push(newEntry._id);
        console.log('Data pushed:', hunt.leaderboard);

        // Save the hunt document to persist changes
        await hunt.save();

        // Log and send the response
        console.log('Hunt leaderboard after saving:', hunt.leaderboard);
        console.log('Data saved successfully');
        
        res.status(201).json(hunt.leaderboard);
    } catch (error) {
        console.error('Error while updating leaderboard:', error);
        res.status(400).json({ error: error.message });
    }
};

// Get leaderboard
export const getLeaderboard = async (req, res) => {
    console.log('trying to get leaderborad');
    
    try {
        const hunt = await Hunt.findById(req.params.id).populate('leaderboard.user');
        const leaderboard = hunt.leaderboard //.sort((a, b) => b.score - a.score);
        res.status(200).json(leaderboard);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// Import preset hunts

export const presethunt =  async (req, res) => {
    try {
        await Hunt.insertMany(presetHunts);
        res.status(201).json({ message: 'Pre-set hunts added successfully.' });
    } catch (error) {
        res.status(400).json({ message: 'Error adding pre-set hunts.', error });
    }
};

// router.post('/hunts/:id/leaderboard', async (req, res) => {
//     const { userId, teamId, score, time } = req.body;
//     try {
//         const hunt = await Hunt.findById(req.params.id);
//         hunt.leaderboard.push({ user: userId, team: teamId, score, time });
//         await hunt.save();
//         res.status(201).json({ message: 'Score added successfully' });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // Retrieve leaderboard
// router.get('/hunts/:id/leaderboard', async (req, res) => {
//     try {
//         const hunt = await Hunt.findById(req.params.id).populate('leaderboard.user').populate('leaderboard.team');
//         const leaderboard = hunt.leaderboard.sort((a, b) => b.score - a.score); // Sort by score descending
//         res.status(200).json(leaderboard);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });
