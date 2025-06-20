import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import JobSearch from '../components/JobSearch';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('stats');
  const [user, setUser] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);

  // Profile edit states
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');

  // Password change states
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
      alert('Please log in to access the dashboard.');
      navigate('/login');
    } else {
      setUser(loggedInUser);
      setEditName(loggedInUser.name);
    }

    const savedAppliedJobs = localStorage.getItem('appliedJobs');
    if (savedAppliedJobs) {
      setAppliedJobs(JSON.parse(savedAppliedJobs));
    }
  }, [navigate]);

  const handleSaveProfile = () => {
    if (!editName.trim()) {
      alert('Name cannot be empty.');
      return;
    }

    const updatedUser = { ...user, name: editName.trim() };
    setUser(updatedUser);
    localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleCancelEdit = () => {
    setEditName(user.name);
    setIsEditing(false);
  };

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('Please fill in all password fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('New password and confirmation do not match.');
      return;
    }

    if (user.password && currentPassword !== user.password) {
      alert('Current password is incorrect.');
      return;
    }

    const updatedUser = { ...user, password: newPassword };
    setUser(updatedUser);
    localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));

    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setIsChangingPassword(false);

    alert('Password changed successfully!');
  };

  const handleCancelPasswordChange = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setIsChangingPassword(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col">
      {/* Dashboard Header */}
      <header className="bg-white shadow rounded-md p-4 flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold text-blue-600 mb-4 md:mb-0">Welcome, {user?.name}</h1>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white rounded-md shadow flex mb-6 overflow-hidden">
        {['stats', 'search', 'profile'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-center font-semibold transition-colors ${
              activeTab === tab ? 'bg-blue-600 text-white' : 'text-blue-600 hover:bg-blue-100'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </nav>

      {/* Content Area */}
      <section className="bg-white rounded-md shadow p-6 flex-grow flex items-center justify-center">
        {activeTab === 'stats' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Stats</h2>
            <p>You can track your job application progress here.</p>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-100 p-4 rounded-md text-center">
                <p className="text-lg font-bold">{appliedJobs.length}</p>
                <p>Applications Sent</p>
              </div>
              <div className="bg-purple-100 p-4 rounded-md text-center">
                <p className="text-lg font-bold">{appliedJobs.length > 0 ? 'Active' : 'None'}</p>
                <p>Applications Status</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'search' && <JobSearch />}

        {activeTab === 'profile' && user && (
          <div className="w-full max-w-md">
            <h2 className="text-xl font-bold mb-6 text-center">Profile</h2>

            {/* Show name edit only if NOT changing password */}
            {!isChangingPassword && (
              <>
                {!isEditing ? (
                  <>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-gray-600 text-sm font-semibold mb-1">Name:</label>
                        <input
                          type="text"
                          value={user.name}
                          readOnly
                          className="w-full px-4 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 text-sm font-semibold mb-1">Email:</label>
                        <input
                          type="email"
                          value={user.email}
                          readOnly
                          className="w-full px-4 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
                        />
                      </div>
                    </div>

                    <div className="mt-6 flex space-x-4 justify-center">
                      <button
                        onClick={() => setIsEditing(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition"
                      >
                        Edit Name
                      </button>
                      <button
                        onClick={() => setIsChangingPassword(true)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-md transition"
                      >
                        Change Password
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-600 text-sm font-semibold mb-1">Name:</label>
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          autoFocus
                        />
                      </div>
                    </div>

                    <div className="mt-6 flex space-x-4 justify-center">
                      <button
                        onClick={handleSaveProfile}
                        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md transition"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="bg-gray-400 hover:bg-gray-500 text-white px-5 py-2 rounded-md transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                )}
              </>
            )}

            {/* Show password change ONLY if isChangingPassword is true */}
            {isChangingPassword && (
              <div className="p-6 border rounded-md bg-gray-50 shadow-inner">
                <h3 className="text-lg font-semibold mb-4 text-center">Change Password</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 text-sm mb-1">Current Password:</label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      autoComplete="current-password"
                      autoFocus
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm mb-1">New Password:</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      autoComplete="new-password"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm mb-1">Confirm New Password:</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      autoComplete="new-password"
                    />
                  </div>
                </div>

                <div className="mt-6 flex space-x-4 justify-center">
                  <button
                    onClick={handleChangePassword}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-md transition"
                  >
                    Update Password
                  </button>
                  <button
                    onClick={handleCancelPasswordChange}
                    className="bg-gray-400 hover:bg-gray-500 text-white px-5 py-2 rounded-md transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
