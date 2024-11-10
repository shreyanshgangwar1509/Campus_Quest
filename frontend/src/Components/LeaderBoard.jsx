import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

const Leaderboard = () => {
  const location = useLocation();
  const { huntId } = location.state || {};

    const [leaderboard, setLeaderboard] = useState([
        {
            user: { _id: '1', username: 'JohnDoe' },
            userId:"67292845aa01971d91e433a3",
            team: { name: 'Team A' },
            score: 85,
            time: 120
        }
    ]);

  // Fetch leaderboard data
  const fetchLeaderboard = async () => {
    try {
      const response = await api.get(`/api/hunts/${huntId}/leaderboard`);
      setLeaderboard(response.data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  // Update leaderboard data
  const updateLeaderboard = async () => {
    try {
      await api.post(`/api/hunts/${huntId}/leaderboard`, {userId:"67292845aa01971d91e433a3",score:80,time:120});
      console.log('Leaderboard updated successfully.');
    } catch (error) {
      console.log('Error in posting data to leaderboard:', error);
    }
  };

  // Fetch leaderboard when component mounts
  useEffect(() => {
    if (huntId) {
      fetchLeaderboard();
    }
  }, [huntId]);

  // Optionally, you can add a button to manually update the leaderboard
  const handleUpdate = () => {
      updateLeaderboard();
      fetchLeaderboard();
  };

  return (
    <div className="mt-6 p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Leaderboard</h2>
      <button
        onClick={handleUpdate}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Update Leaderboard
      </button>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Rank</th>
            <th className="border border-gray-300 p-2">User</th>
            <th className="border border-gray-300 p-2">Team</th>
            <th className="border border-gray-300 p-2">Score</th>
            <th className="border border-gray-300 p-2">Time</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, index) => (
            <tr key={entry.user._id}>
              <td className="border border-gray-300 p-2">{index + 1}</td>
              <td className="border border-gray-300 p-2">{entry.user.username}</td>
              <td className="border border-gray-300 p-2">{entry.team ? entry.team.name : 'N/A'}</td>
              <td className="border border-gray-300 p-2">{entry.score}</td>
              <td className="border border-gray-300 p-2">{entry.time}s</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
