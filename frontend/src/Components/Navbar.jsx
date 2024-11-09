import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

const Navbar = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  const logout = async () => {
    try {
      
      const response = await api.post('/api/auth/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.removeItem('token');
      setToken(null);
      navigate('/');
    } catch (error) {
      console.log("Error in logout", error);
    }
  };
  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('token');
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
    } else {
      setToken(null);
    }
  }, [token,navigate]);

  return (
    <nav className="flex items-center justify-between p-2 bg-blue-500 text-white">
      < Link to="/" className="text-xl font-bold">She_knows</Link>
      <div className="space-x-4">
        <Link to="/allhunts" className="px-4 py-1 bg-green-500 rounded hover:bg-blue-600">
           Hunts
        </Link>
        <Link to="/events" className="px-4 py-1 bg-green-500 rounded hover:bg-blue-600">
          Events
        </Link>
        <Link to="/dashboard" className="px-4 py-1 bg-green-500 rounded hover:bg-blue-600">
          Dashboard
        </Link>
        <Link to="/createhunt" className="px-4 py-2 bg-blue-700 rounded hover:bg-blue-600">
          Create Hunt
        </Link>

        {!token ? (
          <Link to="/login" className="px-4 py-2 bg-blue-700 rounded hover:bg-blue-600">
            Login
          </Link>
        ) : (
          <button onClick={logout} className="px-4 py-2 bg-red-700 rounded hover:bg-red-400">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
