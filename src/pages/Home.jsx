import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-10 max-w-3xl w-full text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to JobConnect</h1>
        <p className="text-gray-700 mb-6 text-lg">
          JobConnect is your gateway to career opportunities. Whether you're looking for your first job or your next big move, 
          we connect you with top companies and personalized job recommendations.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition duration-300"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded transition duration-300"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
