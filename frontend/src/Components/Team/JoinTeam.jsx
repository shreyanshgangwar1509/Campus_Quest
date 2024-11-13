import axios from "axios";
import React, { useState } from "react";

const JoinTeam = () => {
  const [teamCode, setTeamCode] = useState("");
  const [message, setMessage] = useState("");

  const handleJoinTeam = async () => {
    try {
      const response = await axios.post("/api/team/join", { teamCode });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error joining team");
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">Join a Team</h1>
      <input
        type="text"
        placeholder="Enter Team Code"
        value={teamCode}
        onChange={(e) => setTeamCode(e.target.value)}
        className="input input-bordered w-full max-w-xs mb-4"
      />
      <button
        onClick={handleJoinTeam}
        className="btn btn-success w-full max-w-xs"
      >
        Join Team
      </button>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
};

export default JoinTeam;
