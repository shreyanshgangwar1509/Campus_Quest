// pages/events.js
import React from 'react';
import { Link } from 'react-router-dom';
import EventCard from '../Components/EventCard';

const events = [
  {
    title: "Tech Workshop",
    description: "An introductory workshop on AI and Machine Learning.",
    date: "2024-11-18T14:00:00Z",
    time: "2:00 PM",
    location: "Auditorium A",
    createdBy: "634bf6e43a86f56a70989e01",
    attendees: ["634bf6e43a86f56a70989e02", "634bf6e43a86f56a70989e03"],
    category: "Workshop",
    hunts: [
      {
        title: "Culrav - Aviskhar Quiz",
        host: "Shreyansh Gangwar",
        description: "Introductory challenges in Culrav - Avishkar.",
        questions: ["What is culrav", "What is Avishkar"],
        answers: ["Cultural fest ", "Tech Fest"],
        hints: ["Think robots", "It's about data"],
        difficulty: "easy",
        solved: 10,
        leaderboard: [
          { user: "634bf6e43a86f56a70989e20", score: 50 },
          { user: "634bf6e43a86f56a70989e21", score: 40 }
        ]
      }
    ]
  }
];


const EventPage = () => {
  return (
    <div className="relative">
      
      <Link to="/eventform"
        
        className="absolute  bg-gradient-to-r from-green-400  to-green-500 text-white font-semibold rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-green-400top-0 right-4 px-4 py-2 "
      >
        Add Event
      </Link>

      
      <div className="flex flex-wrap justify-center gap-4 p-4 mt-8">
        {events.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventPage;
