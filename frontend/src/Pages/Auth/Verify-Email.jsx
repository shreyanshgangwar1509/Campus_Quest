import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const api = axios.create({
  baseURL: "http://localhost:3000", // Set the base URL here
});
export default function VerifyOtp({email}) {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
   try {
  const response = await api.post("/api/auth/verifyemail", { otp, email });
  setMessage(response.data.message);
  navigate('/');
} catch (error) {
  console.error("Error during OTP verification:", error.response?.data); // Improved logging
  if (error.response) {
    setMessage(error.response.data.message || "Invalid OTP or OTP expired. Please try again.");
  } else {
    setMessage("An unexpected error occurred. Please try again.");
  }
}

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Enter OTP</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-gray-700 font-semibold">OTP</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-all duration-200"
          >
            Verify OTP
          </button>
        </form>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
}
