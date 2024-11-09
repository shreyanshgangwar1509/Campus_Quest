import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const cookie = document.cookie;
  
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
        
        <Link to="/login" className="px-4 py-1 bg-green-500 rounded hover:bg-blue-600">
          Login
        </Link>
        
        
      </div>
    </nav>
  );
};

export default Navbar;
