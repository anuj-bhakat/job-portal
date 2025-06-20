import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const matchedUser = users.find(
      user => user.email === email && user.password === password
    );

    if (matchedUser) {
      localStorage.setItem('loggedInUser', JSON.stringify(matchedUser));
      alert(`Welcome, ${matchedUser.name}!`);
      navigate('/dashboard');
    } else {
      alert("Invalid email or password.");
    }
  };

  return (
    <div
      className="h-[83.5vh] flex items-center justify-center px-4"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #6b8dd6 100%)',
      }}
    >
      <div className="bg-white bg-opacity-95 backdrop-blur-sm shadow-2xl rounded-xl p-10 max-w-md w-full">
        <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-8">
          Login to <span className="text-blue-600">JobConnect</span>
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-gray-700 text-sm">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/signup')}
            className="text-blue-600 hover:underline font-medium"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
