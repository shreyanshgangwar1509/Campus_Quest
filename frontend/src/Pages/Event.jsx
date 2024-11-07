// pages/events.js
import React from 'react';
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
        title: "AI Basics",
        host: "John Doe",
        description: "Introductory challenges in AI.",
        questions: ["What is AI?", "Define Machine Learning."],
        answers: ["Artificial Intelligence", "A subset of AI"],
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
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {events.map((event, index) => (
        <EventCard key={index} event={event} />
      ))}
    </div>
  );
};

export default EventPage;
