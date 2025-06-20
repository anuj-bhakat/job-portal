import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex-grow flex items-center justify-center px-4 py-12"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #6b8dd6 100%)',
        minHeight: '84vh',
      }}
    >
      <div className="bg-white bg-opacity-90 backdrop-blur-md shadow-xl rounded-xl p-10 md:p-16 max-w-4xl w-full text-center">
        <h1 className="text-5xl font-extrabold text-blue-700 mb-6 leading-tight">
          Welcome to <span className="text-blue-600">JobConnect</span>
        </h1>
        <p className="text-gray-700 text-lg md:text-xl mb-8">
          Discover your next opportunity with JobConnect. Whether you're entering the workforce or seeking a new challenge, 
          we match you with top employers and personalized career paths.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-md transition duration-300 shadow-md"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-md transition duration-300 shadow-md"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
