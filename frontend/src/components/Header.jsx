import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FileText, Home, LogOut, Search, User } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login/user");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (role === "company") {
      navigate(`/dashboard/company?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate(`/dashboard/user?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-[#5C5C99] text-white p-4 flex justify-between items-center shadow-md">
      <div className='flex gap-5 items-center'>
        <div className='flex  items-center'>
          <img
            src="/images/logo.svg"
            alt="BridgeCareer Logo"
            className="w-10 h-10 object-contain"
          />

          <Link to="/" className="text-2xl font-bold hover:text-gray-300 transition">
            BridgeCareer
          </Link>
        </div>

        {role && (
          <form onSubmit={handleSearchSubmit} className="flex items-center bg-white  rounded-md">
            <input
              type="text"
              placeholder="Search internships"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-2 py-1 text-black bg-white rounded-l-md focus:outline-none"
            />
            <button type="submit" className="px-2 py-1 cursor-pointer rounded-r-md bg-black hover:bg-gray-700 transition">
              <Search />
            </button>
          </form>
        )}
      </div>
      <nav className="space-x-6 flex items-center">

        <button
          onClick={() => navigate('/')}
          className="text-sm font-medium hover:text-gray-300 transition flex items-center"
        >
          <Home className="mr-1" size={18} />
          Homepage
        </button>

        <button
          onClick={() => navigate('/contact-us')}
          className="text-sm font-medium hover:text-gray-300 transition"
        >
          Contact Us
        </button>


        {role === "user" && (
          <>
            <Link to="/dashboard/user" className="text-sm font-medium hover:text-gray-300 transition">
              User Dashboard
            </Link>
            <Link to="/upload-resume" className="text-sm font-medium hover:text-gray-300 transition flex items-center">
              <FileText className="mr-1" size={18} />
              Upload Resume
            </Link>
            <Link to="/track-application" className="text-sm font-medium hover:text-gray-300 transition">
              Track Application
            </Link>

            <Link to="/profile" className="text-sm font-medium hover:text-gray-300 transition flex items-center">
              <User className="mr-1" size={18} />
              Profile
            </Link>
            <button onClick={handleLogout} className="bg-red-500 text-sm px-4 py-2 rounded hover:bg-red-600 transition flex items-center">
              <LogOut className="mr-1" size={18} />
              Logout
            </button>

          </>
        )}
        {role === "company" && (
          <>
            <Link to="/dashboard/company" className="text-sm font-medium hover:text-gray-300 transition">
              Company Dashboard
            </Link>

            {/* <Link to="/candidate-list" className="text-sm font-medium hover:text-gray-300 transition flex items-center">
              <Users className="mr-1" size={18} />
              Candidate List
            </Link> */}

            <Link to="/profile" className="text-sm font-medium hover:text-gray-300 transition flex items-center">
              <User className="mr-1" size={18} />
              Profile
            </Link>
            <button onClick={handleLogout} className="bg-red-500 text-sm px-4 py-2 rounded hover:bg-red-600 transition flex items-center">
              <LogOut className="mr-1" size={18} />
              Logout
            </button>
          </>



        )}

        {!role && (
          <>
            <button
              onClick={() => navigate('/', { state: { scrollTo: 'about-us' } })}
              className="text-sm font-medium cursor-pointer hover:text-gray-300 transition"
            >
              About Us
            </button>
            <Link to="/register/user" className="text-sm font-medium hover:text-gray-300 transition">
              Register
            </Link>
            <Link to="/login/user" className="text-sm font-medium hover:text-gray-300 transition">
              Login
            </Link>
          </>
        )}


      </nav>
    </header>
  );
};

export default Header;