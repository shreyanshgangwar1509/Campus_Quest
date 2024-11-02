// routes/photoChallenge.js
import express from 'express';
import { PhotoChallenge } from '../models/photoChallenge.js';

const router = express.Router();

// Create a new photo challenge
router.post('/', async (req, res) => {
    const { title, description, startDate, endDate } = req.body;
    const newChallenge = new PhotoChallenge({ title, description, startDate, endDate });
    await newChallenge.save();
    res.status(201).json(newChallenge);
});

// Submit a photo
router.post('/:id/submit', async (req, res) => {
    const { userId, imageUrl } = req.body;
    const challenge = await PhotoChallenge.findById(req.params.id);
    challenge.submissions.push({ userId, imageUrl });
    await challenge.save();
    res.status(201).json(challenge);
});

// Vote for a submission
router.post('/:id/vote', async (req, res) => {
    const { userId, submissionId } = req.body;
    const challenge = await PhotoChallenge.findById(req.params.id);
    challenge.votes.push({ userId, submissionId });
    await challenge.save();
    res.status(201).json(challenge);
});

export default router;
