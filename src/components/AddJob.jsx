import React, { useState } from 'react';

const AddJob = ({ jobs, setJobs }) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    mode: 'On-site',
    salary: '',
  });

  const [alert, setAlert] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'salary') {
      // Allow only numbers and prevent negative values
      const numericValue = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
      setFormData((prev) => ({
        ...prev,
        [name]: numericValue ? `₹${numericValue}` : '',
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newJob = {
      ...formData,
      id: Date.now(),
    };

    setJobs([newJob, ...jobs]);

    // Show success alert
    setAlert({
      type: 'success',
      message: '✅ Job added successfully!',
    });

    // Reset the form fields
    setFormData({
      title: '',
      company: '',
      location: '',
      type: 'Full-time',
      mode: 'On-site',
      salary: '',
    });

    // Automatically hide the alert after 3 seconds
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 bg-white rounded-xl shadow">
      <h2 className="text-3xl font-extrabold mb-4 text-blue-700 text-center">Add a Job</h2>

      {/* Display Alert Message */}
      {alert && (
        <div
          className={`mb-4 p-3 rounded-md text-sm font-semibold ${
            alert.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {alert.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Job Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Company</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            >
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Internship</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Work Mode</label>
            <select
              name="mode"
              value={formData.mode}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            >
              <option>On-site</option>
              <option>Hybrid</option>
              <option>Remote</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Salary (₹/month)</label>
          <input
            type="text"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="e.g. ₹40,000 - ₹70,000"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
        >
          Add Job
        </button>
      </form>
    </div>
  );
};

export default AddJob;
