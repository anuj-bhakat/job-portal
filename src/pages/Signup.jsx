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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-6">Create an Account</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <input name="name" required placeholder="Name" value={formData.name} onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500" />
          <input name="email" type="email" required placeholder="Email" value={formData.email} onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500" />
          <input name="password" type="password" required placeholder="Password" value={formData.password} onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500" />
          <input name="confirmPassword" type="password" required placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500" />
          <button type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition duration-300">
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{' '}
          <button onClick={() => navigate('/login')} className="text-green-600 hover:underline">
            Log in
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
