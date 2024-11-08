import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EventCard = ({ event }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleJoinEventClick = () => {
    setIsExpanded(!isExpanded);
    };
    const Navigate = useNavigate();


  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-md mb-4">
      <h2 className="text-2xl font-bold">{event.title}</h2>
      <p className="text-gray-600">{event.description}</p>
      <p className="text-sm text-gray-500">Date: {new Date(event.date).toLocaleDateString()}</p>
      <p className="text-sm text-gray-500">Time: {event.time}</p>
      <p className="text-sm text-gray-500">Location: {event.location}</p>
      <p className="text-sm text-gray-500">Category: {event.category}</p>

      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleJoinEventClick}
      >
        {isExpanded ? "Close" : "Join Event"}
      </button>

      {isExpanded && (
        <div className="mt-6 bg-gray-100 rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-2">Hunts</h3>
          {event.hunts.map((hunt, index) => (
            <div key={index} className="bg-white rounded-lg p-4 mb-4 shadow">
              <h4 className="font-bold text-lg">{hunt.title}</h4>
              <p>Host: {hunt.host}</p>
              <p>Description: {hunt.description}</p>
              <p>Difficulty: {hunt.difficulty}</p>
              <p>Solved: {hunt.solved}</p>
                  <button onClick={() => {
                            
                            Navigate(`/currenthunt` , {state:{hunt}});
                        }} className="mt-2 px-3 py-1 bg-green-500 text-white rounded">Join Hunt</button>
                  
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventCard;
