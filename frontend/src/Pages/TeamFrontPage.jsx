import axios from 'axios';
import React, { useState } from 'react';

const api = axios.create({
  baseURL:'http://localhost:3000'
})
const TeamFrontPage = () => {
  const [teamName, setTeamName] = useState('');
  const [leaderId, setLeaderId] = useState('');
  const [teamId, setTeamId] = useState('');
  const [userId, setUserId] = useState('');
  const [invites, setInvites] = useState([]);
  const [participatingTeams, setParticipatingTeams] = useState([]);

  // Handler functions for each route
  const createTeam = async () => {
    try {
      const response = await axios.post("/api/team/create",{ teamName },
    );

    const teamId = response.data.team._id;
    console.log("Team created successfully with ID:", teamId);

    // Store the teamId or use it as needed
    localStorage.setItem("teamId", teamId);
      alert('Team created successfully: ' + response.data.teamName);
    } catch (error) {
      console.error(error);
      alert('Error creating team');
    }
  };
  const updateTeam = async () => {
    try {
      await api.patch(`/api/team/update/${teamId}, { teamName }`);
      alert('Team updated successfully');
    } catch (error) {
      console.error(error);
      alert('Error updating team');
    }
  };

  const deleteTeam = async () => {
    try {
      await api.delete(`/api/team/delete/${teamId}/${userId}`);
      alert('Team deleted successfully');
    } catch (error) {
      console.error(error);
      alert('Error deleting team');
    }
  };

  

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Team Management</h1>
      {/* Team Creation Section */}
      <div className="p-6 bg-white shadow rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Create a Team</h2>
        <input
          type="text"
          placeholder="Team Name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Leader ID"
          value={leaderId}
          onChange={(e) => setLeaderId(e.target.value)}
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <button onClick={createTeam} className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700">Create Team</button>
      </div>

      

      {/* Delete Team */}
      <div className="p-6 bg-white shadow rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Delete Team</h2>
        <input
          type="text"
          placeholder="Team ID"
          value={teamId}
          onChange={(e) => setTeamId(e.target.value)}
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <button onClick={deleteTeam} className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700">Delete Team</button>
      </div>
    </div>
  );
};

export default TeamFrontPage;