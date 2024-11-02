// routes/business.js
import express from 'express';
import { Business } from '../models/business.js';

const router = express.Router();

// Create a new business
router.post('/', async (req, res) => {
    const { name, address, contact, category, description, ownerId } = req.body;
    const newBusiness = new Business({ name, address, contact, category, description, ownerId });
    await newBusiness.save();
    res.status(201).json(newBusiness);
});

// Get all businesses
router.get('/', async (req, res) => {
    const businesses = await Business.find();
    res.json(businesses);
});

// Get a single business
router.get('/:id', async (req, res) => {
    const business = await Business.findById(req.params.id);
    res.json(business);
});

// Add a review
router.post('/:id/review', async (req, res) => {
    const { userId, rating, comment } = req.body;
    const business = await Business.findById(req.params.id);
    business.reviews.push({ userId, rating, comment });
    await business.save();
    res.json(business);
});

// Add an offer
router.post('/:id/offer', async (req, res) => {
    const { title, description, validUntil } = req.body;
    const business = await Business.findById(req.params.id);
    business.offers.push({ title, description, validUntil });
    await business.save();
    res.json(business);
});

export default router;
