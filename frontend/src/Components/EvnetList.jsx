// components/EventList.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const EventList = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const response = await axios.get('/api/event');
            setEvents(response.data);
        };
        fetchEvents();
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold">Upcoming College Events</h1>
            <ul>
                {events.map((event) => (
                    <li key={event._id} className="p-4 border-b">
                        <h2 className="text-xl">{event.title}</h2>
                        <p>{event.description}</p>
                        <p>{new Date(event.date).toLocaleDateString()} at {event.time}</p>
                        <p>Location: {event.location}</p>
                        <button className="bg-blue-500 text-white px-4 py-2" onClick={() => handleRSVP(event._id)}>
                            RSVP
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const handleRSVP = async (eventId) => {
    const userId = 'userId'; // Replace with actual user ID
    await axios.post(`/api/event/${eventId}/rsvp`, { userId });
};

export default EventList;
