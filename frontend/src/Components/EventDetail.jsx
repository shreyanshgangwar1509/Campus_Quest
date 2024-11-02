// components/EventDetail.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const EventDetail = ({ eventId }) => {
    const [event, setEvent] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            const response = await axios.get(`/api/event/${eventId}`);
            setEvent(response.data);
        };
        fetchEvent();
    }, [eventId]);

    if (!event) return <div>Loading...</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold">{event.title}</h1>
            <p>{event.description}</p>
            <p>{new Date(event.date).toLocaleDateString()} at {event.time}</p>
            <p>Location: {event.location}</p>
            <h2>Attendees:</h2>
            <ul>
                {event.attendees.map((attendeeId) => (
                    <li key={attendeeId}>{attendeeId}</li>
                ))}
            </ul>
        </div>
    );
};

export default EventDetail;
