import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    location: '',
  });

  const [message, setMessage] = useState(null); // { type: 'error' | 'success', text: string }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (message) setMessage(null); // clear message on input change
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage({ type: 'error', text: "Passwords do not match!" });
      return;
    }

    if (!formData.location.trim()) {
      setMessage({ type: 'error', text: "Please enter your location." });
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.find(user => user.email === formData.email);

    if (userExists) {
      setMessage({ type: 'error', text: "User with this email already exists." });
      return;
    }

    const updatedUsers = [...users, {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      location: formData.location.trim(),
    }];

    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setMessage({ type: 'success', text: "Signup successful! Redirecting to login..." });

    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  return (
    <div
      className="h-[80vh] flex items-center justify-center px-4"
      style={{
        background: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)',
      }}
    >
      <div className="bg-white bg-opacity-95 backdrop-blur-sm shadow-2xl rounded-xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-extrabold text-center text-green-700 mb-5">
          Create an Account
        </h2>

        {message && (
          <div
            className={`mb-5 px-4 py-2 rounded-lg font-semibold text-center ${
              message.type === 'error'
                ? 'bg-red-100 text-red-700 border border-red-300'
                : 'bg-green-100 text-green-700 border border-green-300'
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            name="name"
            required
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
          <input
            name="location"
            type="text"
            required
            placeholder="Location (City, Address, etc.)"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
          <input
            name="confirmPassword"
            type="password"
            required
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg shadow-lg transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-5 text-center text-black text-sm">
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
