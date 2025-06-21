import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    setUser(loggedInUser);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setUser(null);
    navigate('/login');
  };

  const buttonClasses = `
    text-base
    bg-white
    border
    border-blue-500
    text-blue-600
    font-semibold
    rounded-lg
    px-5
    py-2
    shadow-md
    transition
    duration-300
    ease-in-out
    hover:bg-blue-600
    hover:text-white
    focus:outline-none
    focus:ring-2
    focus:ring-blue-400
  `;

  const logoutButtonClasses = `
    text-base
    bg-red-500
    text-white
    font-semibold
    rounded-lg
    px-5
    py-2
    shadow-md
    transition
    duration-300
    ease-in-out
    hover:bg-red-600
    focus:outline-none
    focus:ring-2
    focus:ring-red-300
  `;

  return (
    <header className="bg-white shadow-md h-[10vh]">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          JobConnect
        </Link>

        <nav className="flex space-x-4 font-medium">
          <Link to="/" className={buttonClasses.trim()}>
            Home
          </Link>

          {user ? (
            <>
              <Link to="/dashboard" className={buttonClasses.trim()}>
                Dashboard
              </Link>
              <Link to="/profile" className={buttonClasses.trim()}>
                Profile
              </Link>
              <button onClick={handleLogout} className={logoutButtonClasses.trim()}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={buttonClasses.trim()}>
                Login
              </Link>
              <Link to="/signup" className={buttonClasses.trim()}>
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
