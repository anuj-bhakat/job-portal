import React, { useState } from 'react';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('stats');

  const handleSearch = (e) => {
    e.preventDefault();
    // TODO: Implement job search logic
    alert(`Searching for jobs matching: "${searchTerm}"`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Dashboard Header */}
      <header className="bg-white shadow rounded-md p-4 flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold text-blue-600 mb-4 md:mb-0">Dashboard</h1>
        <form onSubmit={handleSearch} className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-300"
          >
            Search
          </button>
        </form>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white rounded-md shadow flex mb-6">
        {['stats', 'profile', 'logout'].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              if (tab === 'logout') {
                // TODO: Add logout functionality
                alert('Logging out...');
              } else {
                setActiveTab(tab);
              }
            }}
            className={`flex-1 py-3 text-center font-semibold transition-colors
              ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'text-blue-600 hover:bg-blue-100'
              } rounded-md`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </nav>

      {/* Content Area */}
      <section className="bg-white rounded-md shadow p-6 min-h-[300px]">
        {activeTab === 'stats' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Stats</h2>
            <p>Here you can see your job application stats, interviews, and more.</p>
            {/* Replace with real stats visualization */}
          </div>
        )}

        {activeTab === 'profile' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Profile</h2>
            <p>Manage your profile information, update resume, and settings here.</p>
            {/* Add profile edit form here */}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;