import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LandingHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-[#574964] text-white p-4 flex justify-between items-center shadow-md">
      {/* Logo and Name */}
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
        <img src="/images/logo.png" alt="Logo" className="h-8" />
        <span className="text-2xl font-bold">BridgeCareer</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex items-center gap-6">
        <button
          onClick={() => document.getElementById('about-us').scrollIntoView({ behavior: 'smooth' })}
          className="text-sm font-medium cursor-pointer hover:text-gray-300 transition"
        >
          About Us
        </button>
        <button
          onClick={() => navigate('/contact-us')}
          className="text-sm cursor-pointer font-medium hover:text-gray-300 transition"
        >
          Contact Us
        </button>
        <Link to="/register/user" className="text-sm cursor-pointer font-medium hover:text-gray-300 transition">
          Register
        </Link>
        <Link to="/login/user" className="text-sm cursor-pointer font-medium hover:text-gray-300 transition">
          Login
        </Link>
      </nav>
    </header>
  );
};

export default LandingHeader;