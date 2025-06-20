import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.find(user => user.email === formData.email);

    if (userExists) {
      alert("User with this email already exists.");
      return;
    }

    const updatedUsers = [...users, {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    }];

    localStorage.setItem('users', JSON.stringify(updatedUsers));
    alert("Signup successful!");
    navigate('/login');
  };

  return (
    <div
      className="h-[83vh] flex items-center justify-center px-4"
      style={{
        background: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)',
      }}
    >
      <div className="bg-white bg-opacity-95 backdrop-blur-sm shadow-2xl rounded-xl p-10 max-w-md w-full">
        <h2 className="text-3xl font-extrabold text-center text-green-700 mb-8">
          Create an Account
        </h2>
        <form onSubmit={handleSignup} className="space-y-6">
          <input
            name="name"
            required
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-green-400 transition"
          />
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-green-400 transition"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-green-400 transition"
          />
          <input
            name="confirmPassword"
            type="password"
            required
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-green-400 transition"
          />
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg shadow-lg transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-6 text-center text-black text-sm">
        Already have an account?{' '}
        <button
          onClick={() => navigate('/login')}
          className="text-green-300 hover:underline font-medium"
        >
          Log in
        </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
