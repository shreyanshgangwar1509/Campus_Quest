import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Leaderboard = ({ huntId }) => {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await axios.get(`/api/hunts/${huntId}/leaderboard`);
                setLeaderboard(response.data);
            } catch (error) {
                console.error('Error fetching leaderboard:', error);
            }
        };

        fetchLeaderboard();
    }, [huntId]);

    return (
        <div className="mt-6 p-4 bg-white rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Leaderboard</h2>
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
