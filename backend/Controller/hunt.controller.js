import Hunt from "../models/Hunt.model.js";
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
    const { userId, score, time } = req.body;
    try {
        const hunt = await Hunt.findById(req.params.id);
        if (!hunt) {
            return res.status(404).json({ message: 'Hunt not found' });
        }
        hunt.leaderboard.push({ user: userId, score, time });
        await hunt.save();
        res.status(201).json(hunt.leaderboard);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get leaderboard
export const getLeaderboard = async (req, res) => {
    try {
        const hunt = await Hunt.findById(req.params.id).populate('leaderboard.user');
        const leaderboard = hunt.leaderboard.sort((a, b) => b.score - a.score);
        res.status(200).json(leaderboard);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Import preset hunts

export const presethunt =  async (req, res) => {
    try {
        await Hunt.insertMany(presetHunts);
        res.status(201).json({ message: 'Pre-set hunts added successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding pre-set hunts.', error });
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
