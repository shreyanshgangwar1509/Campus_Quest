import axios from "axios";
import React, { useState } from "react";

const TeamMembers = () => {
  const [teamId, setTeamId] = useState("");
  const [members, setMembers] = useState([]);
  const [message, setMessage] = useState("");

  const handleGetMembers = async () => {
    try {
      const response = await axios.get(`/api/team/members/${teamId}`);
      setMembers(response.data.member);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error fetching members");
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">Team Members</h1>
      <input
        type="text"
        placeholder="Enter Team ID"
        value={teamId}
        onChange={(e) => setTeamId(e.target.value)}
        className="input input-bordered w-full max-w-xs mb-4"
      />
      <button
        onClick={handleGetMembers}
        className="btn btn-info w-full max-w-xs"
      >
        Get Members
      </button>
      {message && <p className="mt-4 text-blue-600">{message}</p>}
      {members.length > 0 && (
        <ul className="list-disc mt-4">
          {members.map((member, index) => (
            <li key={index} className="text-lg">
              {member}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TeamMembers;
