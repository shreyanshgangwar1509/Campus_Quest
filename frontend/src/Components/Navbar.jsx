
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-blue-500 text-white">
      <h1 className="text-xl font-bold">She_knows</h1>
      <div className="space-x-4">
        <Link to="/login" className="px-4 py-2 bg-blue-700 rounded hover:bg-blue-600">
          Login
        </Link>
        <Link to="/register" className="px-4 py-2 bg-green-700 rounded hover:bg-green-600">
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
