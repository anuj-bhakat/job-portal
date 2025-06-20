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
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-blue-100 to-blue-200 p-8 flex flex-col">
      {/* Dashboard Header */}
      <header className="bg-white shadow-md rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-4 md:mb-0">
          Welcome, <span className="text-blue-600">{user?.name}</span>
        </h1>
        <button
          onClick={() => {
            localStorage.removeItem('loggedInUser');
            navigate('/login');
          }}
          className="text-sm md:text-base bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-5 rounded-lg transition shadow-md"
          aria-label="Logout"
        >
          Logout
        </button>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white rounded-xl shadow-md flex mb-8 overflow-hidden w-1/2 mx-auto">
        {['stats', 'search', 'profile'].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setIsEditing(false);
              setIsChangingPassword(false);
            }}
            className={`flex-1 py-4 text-center font-semibold transition-colors duration-300 focus:outline-none ${
              activeTab === tab
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-blue-700 hover:bg-blue-100'
            }`}
            aria-current={activeTab === tab ? 'page' : undefined}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </nav>

      {/* Content Area */}
      <section className="bg-white rounded-xl shadow-md p-8 max-w-6xl mx-auto w-full flex-grow">
        {activeTab === 'stats' && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-blue-800">Application Stats</h2>
            <p className="text-gray-700 mb-6">
              Track your job application progress here. Stay motivated and organized!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-100 p-6 rounded-xl text-center shadow-sm transition transform hover:scale-[1.02]">
                <p className="text-4xl font-extrabold text-blue-700">{appliedJobs.length}</p>
                <p className="text-blue-800 mt-2 font-semibold">Applications Sent</p>
              </div>
              <div className="bg-purple-100 p-6 rounded-xl text-center shadow-sm transition transform hover:scale-[1.02]">
                <p className="text-4xl font-extrabold text-purple-700">
                  {appliedJobs.length > 0 ? 'Active' : 'None'}
                </p>
                <p className="text-purple-800 mt-2 font-semibold">Applications Status</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'search' && <JobSearch />}

        {activeTab === 'profile' && user && (
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center text-blue-700">Your Profile</h2>

            {/* Profile View */}
            {!isChangingPassword && !isEditing && (
              <>
                <div className="space-y-5">
                  <div>
                    <label className="block text-gray-600 text-sm font-semibold mb-2">Name:</label>
                    <input
                      type="text"
                      value={user.name}
                      readOnly
                      className="w-full px-5 py-3 border rounded-lg bg-gray-100 cursor-not-allowed text-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 text-sm font-semibold mb-2">Email:</label>
                    <input
                      type="email"
                      value={user.email}
                      readOnly
                      className="w-full px-5 py-3 border rounded-lg bg-gray-100 cursor-not-allowed text-gray-700"
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-center space-x-6">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition"
                  >
                    Edit Name
                  </button>
                  <button
                    onClick={() => setIsChangingPassword(true)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition"
                  >
                    Change Password
                  </button>
                </div>
              </>
            )}

            {/* Edit Name */}
            {!isChangingPassword && isEditing && (
              <>
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">Edit Name:</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-5 py-3 border rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-400 text-gray-800"
                    autoFocus
                  />
                </div>

                <div className="mt-8 flex justify-center space-x-6">
                  <button
                    onClick={handleSaveProfile}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}

            {/* Change Password */}
            {isChangingPassword && (
              <div className="p-6 border rounded-xl bg-yellow-50 shadow-inner max-w-md mx-auto">
                <h3 className="text-xl font-semibold mb-6 text-center text-yellow-700">Change Password</h3>
                <div className="space-y-5">
                  <div>
                    <label className="block text-yellow-800 text-sm mb-1 font-medium">Current Password:</label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-5 py-3 border rounded-lg focus:outline-none focus:ring-3 focus:ring-yellow-400 text-yellow-900"
                      autoComplete="current-password"
                      autoFocus
                    />
                  </div>
                  <div>
                    <label className="block text-yellow-800 text-sm mb-1 font-medium">New Password:</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-5 py-3 border rounded-lg focus:outline-none focus:ring-3 focus:ring-yellow-400 text-yellow-900"
                      autoComplete="new-password"
                    />
                  </div>
                  <div>
                    <label className="block text-yellow-800 text-sm mb-1 font-medium">Confirm New Password:</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-5 py-3 border rounded-lg focus:outline-none focus:ring-3 focus:ring-yellow-400 text-yellow-900"
                      autoComplete="new-password"
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-center space-x-6">
                  <button
                    onClick={handleChangePassword}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition"
                  >
                    Update Password
                  </button>
                  <button
                    onClick={handleCancelPasswordChange}
                    className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition"
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
