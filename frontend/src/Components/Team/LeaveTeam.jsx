import axios from "axios";
import React, { useState } from "react";

const LeaveTeam = () => {
  const [teamId, setTeamId] = useState("");
  const [message, setMessage] = useState("");

  const handleLeaveTeam = async () => {
    try {
      const response = await axios.post("/api/team/leave", { teamId });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error leaving team");
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">Leave a Team</h1>
      <input
        type="text"
        placeholder="Enter Team ID"
        value={teamId}
        onChange={(e) => setTeamId(e.target.value)}
        className="input input-bordered w-full max-w-xs mb-4"
      />
      <button
        onClick={handleLeaveTeam}
        className="btn btn-warning w-full max-w-xs"
      >
        Leave Team
      </button>
      {message && <p className="mt-4 text-yellow-600">{message}</p>}
    </div>
  );
};

export default LeaveTeam;
