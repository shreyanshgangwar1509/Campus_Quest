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
  const [TeamCode, setTeamCode] = useState('');

  const token = localStorage.getItem('token');
  // Handler functions for each route
  const createTeam = async () => {
    
    try {
      
      const response = await axios.post("http://localhost:3000/api/team/createTeam", { teamName },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token in the Authorization header
          },
        }
      );

    const teamId = response.data.team._id;
    console.log("Team created successfully with ID:", teamId);

    localStorage.setItem("teamId", teamId);
      alert('Team created successfully: ' + response.data.teamName);
    } catch (error) {
      console.error(error);
      alert('Error creating team');
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

  const joinTeam = async() => {
    try {
      const response = await axios.post('http://localhost:3000/api/team/jointeam', { TeamCode }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
    } catch (error) {
      
    }
  }

  

  return (
    <div className="p-1 space-y-1 bg-gray-50 flex ">

      {/* Team Creation Section */}
      <div className="p-6 bg-white shadow rounded-lg w-96 ">
        <h2 className="text-lg font-semibold ">Create a Team</h2>
        <input
          type="text"
          placeholder=" Team Name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          className="w-full  mb-1 border border-gray-300 rounded"
        />
        <button onClick={createTeam} className="text-sm w-full bg-indigo-600 text-white  p-1 rounded hover:bg-indigo-700">Create Team</button>
      </div>

      {/* <div className="p-6 bg-white shadow rounded-lg w-96">
        <h2 className="text-lg font-semibold ">Delete Team</h2>
        <input
          type="text"
          placeholder=" Team Name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          className="w-full  mb-1 border border-gray-300 rounded"
        />
        <button onClick={deleteTeam} className="text-sm w-full bg-red-600 text-white  p-1 rounded hover:bg-red-700">Delete Team</button>
      </div> */}

      

      

       <div className="p-6 bg-white shadow rounded-lg w-96">
        <h2 className="text-lg font-semibold ">Join Team</h2>
        <input
          type="text"
          placeholder=" Team Name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          className="w-full  mb-1 border border-gray-300 rounded"
        />
        <button onClick={joinTeam} className="text-sm w-full bg-green-600 text-white  p-1 rounded hover:bg-green-700">Join Team</button>
      </div>

    </div>
  );
};

export default TeamFrontPage;