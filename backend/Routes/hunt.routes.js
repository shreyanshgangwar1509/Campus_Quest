// routes/hunt.routes.js
import express from 'express';
import {
    createHunt,
    getAllHunts,
    getHuntById,
    getLeaderboard,
    presethunt,
    updateLeaderboard,
} from '../Controller/hunt.controller.js';

const router = express.Router();

// Create a new hunt
router.post('/createhunt', createHunt);

// Get all hunts
router.get('/getallhunt', getAllHunts);

// Get a specific hunt by ID
router.get('/hunt/:id', getHuntById);

// Update leaderboard
router.post('/:id/leaderboard', updateLeaderboard);

// Get leaderboard
router.get('/:id/leaderboard', getLeaderboard);
// all checked
router.get('/import', presethunt);
export default router;
