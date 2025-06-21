import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editName, setEditName] = useState('');
  const [editLocation, setEditLocation] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [message, setMessage] = useState(null); // { type: 'error' | 'success', text: string }

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!storedUser) {
      setMessage({ type: 'error', text: 'You must be logged in to view this page.' });
      setTimeout(() => window.location.href = '/login', 3000);
      return;
    }
    setUser(storedUser);
    setEditName(storedUser.name || '');
    setEditLocation(storedUser.location || '');
  }, []);

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
  };

  const clearMessage = () => setMessage(null);

  const handleSaveProfile = () => {
    if (!editName.trim()) {
      setMessage({ type: 'error', text: 'Name cannot be empty.' });
      return;
    }

    const updatedUser = {
      ...user,
      name: editName.trim(),
      location: editLocation.trim(),
    };
    updateUser(updatedUser);
    setIsEditing(false);
    setMessage({ type: 'success', text: 'Profile updated successfully!' });
  };

  const handleCancelEdit = () => {
    setEditName(user.name);
    setEditLocation(user.location || '');
    setIsEditing(false);
    clearMessage();
  };

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage({ type: 'error', text: 'Please fill in all password fields.' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'New password and confirmation do not match.' });
      return;
    }

    if (user.password && currentPassword !== user.password) {
      setMessage({ type: 'error', text: 'Current password is incorrect.' });
      return;
    }

    const updatedUser = { ...user, password: newPassword };
    updateUser(updatedUser);

    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setIsChangingPassword(false);
    setMessage({ type: 'success', text: 'Password changed successfully!' });
  };

  const handleCancelPasswordChange = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setIsChangingPassword(false);
    clearMessage();
  };

  // Clear messages on input changes
  const onEditNameChange = (e) => {
    setEditName(e.target.value);
    if (message) clearMessage();
  };
  const onEditLocationChange = (e) => {
    setEditLocation(e.target.value);
    if (message) clearMessage();
  };
  const onCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
    if (message) clearMessage();
  };
  const onNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    if (message) clearMessage();
  };
  const onConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (message) clearMessage();
  };

  if (!user)
    return (
      <div className="text-center mt-6 text-blue-700 font-semibold">
        Loading...
      </div>
    );

  return (
    <main className="min-h-[80vh] bg-gradient-to-tr from-blue-50 via-blue-100 to-blue-200 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-lg p-8 sm:p-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center tracking-wide select-none">
          Your Profile
        </h2>

        {message && (
          <div
            className={`mb-6 px-6 py-3 rounded-md font-semibold text-center ${
              message.type === 'error'
                ? 'bg-red-50 text-red-700 border border-red-200'
                : 'bg-green-50 text-green-700 border border-green-200'
            }`}
            role="alert"
          >
            {message.text}
          </div>
        )}

        {/* View mode */}
        {!isChangingPassword && !isEditing && (
          <div className="space-y-6">
            <div>
              <label className="text-gray-700 text-sm font-semibold block mb-1 tracking-wide">
                Name
              </label>
              <input
                type="text"
                value={user.name}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 cursor-not-allowed font-semibold shadow-sm"
              />
            </div>

            <div>
              <label className="text-gray-700 text-sm font-semibold block mb-1 tracking-wide">
                Email
              </label>
              <input
                type="email"
                value={user.email}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 cursor-not-allowed font-semibold shadow-sm"
              />
            </div>

            <div>
              <label className="text-gray-700 text-sm font-semibold block mb-1 tracking-wide">
                Location
              </label>
              <input
                type="text"
                value={user.location || 'Not set'}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 cursor-not-allowed font-semibold shadow-sm"
              />
            </div>

            <div className="mt-8 flex justify-center gap-5">
              <button
                onClick={() => {
                  setIsEditing(true);
                  clearMessage();
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold shadow-md transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Edit Profile
              </button>
              <button
                onClick={() => {
                  setIsChangingPassword(true);
                  clearMessage();
                }}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2.5 rounded-xl font-semibold shadow-md transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                Change Password
              </button>
            </div>
          </div>
        )}

        {/* Edit mode */}
        {isEditing && !isChangingPassword && (
          <div>
            <label className="block text-gray-800 text-md font-semibold mb-2 tracking-wide">
              Edit Name
            </label>
            <input
              type="text"
              value={editName}
              onChange={onEditNameChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 font-semibold text-gray-900 mb-5 shadow-sm"
              autoFocus
            />

            <label className="block text-gray-800 text-md font-semibold mb-2 tracking-wide">
              Edit Location
            </label>
            <input
              type="text"
              value={editLocation}
              onChange={onEditLocationChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 font-semibold text-gray-900 shadow-sm"
            />

            <div className="mt-6 flex justify-center gap-5">
              <button
                onClick={handleSaveProfile}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-xl font-semibold shadow-md transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Save Changes
              </button>
              <button
                onClick={handleCancelEdit}
                className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2.5 rounded-xl font-semibold shadow-md transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Change Password mode */}
        {isChangingPassword && (
          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-900 text-center tracking-wide select-none">
              Change Password
            </h3>

            <div className="space-y-5">
              <div>
                <label className="block text-gray-800 text-md font-semibold mb-1 tracking-wide">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={onCurrentPasswordChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 font-semibold text-gray-900 shadow-sm"
                  autoComplete="current-password"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-gray-800 text-md font-semibold mb-1 tracking-wide">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={onNewPasswordChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 font-semibold text-gray-900 shadow-sm"
                  autoComplete="new-password"
                />
              </div>

              <div>
                <label className="block text-gray-800 text-md font-semibold mb-1 tracking-wide">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={onConfirmPasswordChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 font-semibold text-gray-900 shadow-sm"
                  autoComplete="new-password"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-center gap-5">
              <button
                onClick={handleChangePassword}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-xl font-semibold shadow-md transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Update Password
              </button>
              <button
                onClick={handleCancelPasswordChange}
                className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2.5 rounded-xl font-semibold shadow-md transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Profile;
