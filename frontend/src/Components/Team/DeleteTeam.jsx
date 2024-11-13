import axios from "axios";
import React, { useState } from "react";

const DeleteTeam = () => {
  const [teamId, setTeamId] = useState("");
  const [message, setMessage] = useState("");

  const handleDeleteTeam = async () => {
    try {
      const response = await axios.delete(`/api/team/${teamId}`);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error deleting team");
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">Delete a Team</h1>
      <input
        type="text"
        placeholder="Enter Team ID"
        value={teamId}
        onChange={(e) => setTeamId(e.target.value)}
        className="input input-bordered w-full max-w-xs mb-4"
      />
      <button
        onClick={handleDeleteTeam}
        className="btn btn-danger w-full max-w-xs"
      >
        Delete Team
      </button>
      {message && <p className="mt-4 text-red-600">{message}</p>}
    </div>
  );
};

export default DeleteTeam;
