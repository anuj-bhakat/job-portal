import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          JobConnect
        </Link>
        <nav className="space-x-4">
          <Link to="/" className="text-gray-700 hover:text-blue-600 transition">
            Home
          </Link>
          <Link to="/login" className="text-gray-700 hover:text-blue-600 transition">
            Login
          </Link>
          <Link to="/signup" className="text-gray-700 hover:text-blue-600 transition">
            Sign Up
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;