import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow py-2 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <img src={logo} alt="OM Logo" className="h-10 w-10" />
        <h1 className="text-xl font-bold text-omred">OM ENTERPRISES</h1>
      </div>
      <button
        onClick={() => navigate('/admin')}
        className="bg-omred text-white px-4 py-1.5 rounded hover:bg-opacity-90 transition"
      >
        Admin Login
      </button>
    </nav>
  );
};

export default Navbar;
