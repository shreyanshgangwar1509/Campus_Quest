// routes/hunt.routes.js
import express from 'express';
import {
    createHunt,
    getAllHunts,
    getHuntById,
    getLeaderboard,
    updateLeaderboard,
} from '../Controller/hunt.controller.js';

const router = express.Router();

// Create a new hunt
router.post('/', createHunt);

// Get all hunts
router.get('/', getAllHunts);

// Get a specific hunt by ID
router.get('/:id', getHuntById);

// Update leaderboard
router.post('/:id/leaderboard', updateLeaderboard);

// Get leaderboard
router.get('/:id/leaderboard', getLeaderboard);

export default router;
