// routes/event.js
import express from 'express';
import { Event } from '../models/event.js';

const router = express.Router();

// Create a new event
router.post('/', async (req, res) => {
    const { title, description, date, time, location, createdBy, category } = req.body;
    const newEvent = new Event({ title, description, date, time, location, createdBy, category });
    await newEvent.save();
    res.status(201).json(newEvent);
});

// Get all events
router.get('/', async (req, res) => {
    const events = await Event.find();
    res.json(events);
});

// Get an event by ID
router.get('/:id', async (req, res) => {
    const event = await Event.findById(req.params.id);
    res.json(event);
});

// RSVP for an event
router.post('/:id/rsvp', async (req, res) => {
    const { userId } = req.body;
    const event = await Event.findById(req.params.id);
    if (!event.attendees.includes(userId)) {
        event.attendees.push(userId);
        await event.save();
    }
    res.json(event);
});

export default router;
