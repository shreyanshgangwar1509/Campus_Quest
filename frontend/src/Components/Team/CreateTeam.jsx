import React, { useState } from "react";
import axios from "axios";

const CreateTeam = () => {
  const [teamName, setTeamName] = useState("");
  const [message, setMessage] = useState("");

  const handleCreateTeam = async () => {
    try {
      const response = await axios.post("/api/team/create", { teamName });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error creating team");
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">Create a Team</h1>
      <input
        type="text"
        placeholder="Enter Team Name"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        className="input input-bordered w-full max-w-xs mb-4"
      />
      <button
        onClick={handleCreateTeam}
        className="btn btn-primary w-full max-w-xs"
      >
        Create Team
      </button>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
};

export default CreateTeam;
