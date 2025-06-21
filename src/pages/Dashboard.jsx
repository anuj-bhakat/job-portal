import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import JobSearch from '../components/JobSearch';
import AddJob from '../components/AddJob';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('stats');
  const [user, setUser] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]); // Move appliedJobs state here
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
      alert('Please log in to access the dashboard.');
      navigate('/login');
    } else {
      setUser(loggedInUser);
    }

    // Fetch saved applied jobs from localStorage
    const savedAppliedJobs = localStorage.getItem('appliedJobs');
    if (savedAppliedJobs) {
      setAppliedJobs(JSON.parse(savedAppliedJobs));
    }

    fetch('/data/jobs.json')
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error('Failed to load jobs:', err));
  }, [navigate]);

  const tabs = [
    { key: 'stats', label: 'Stats' },
    { key: 'jobs', label: 'Jobs' },
    { key: 'add-job', label: 'Add a Job' },
  ];

  // Get the applied job details (titles, companies, and locations)
  const appliedJobDetails = appliedJobs
    .map((jobId) => {
      return jobs.find((job) => job.id === jobId);
    })
    .filter(Boolean); // Only include valid jobs

  // Group jobs by role and company for better presentation
  const roles = appliedJobDetails.reduce((acc, job) => {
    const { title, company } = job;

    if (!acc[company]) {
      acc[company] = [];
    }
    acc[company].push(title);

    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-blue-100 to-blue-200 p-8 flex flex-col">
      <header className="bg-white shadow-md rounded-xl p-6 flex items-center relative mb-8">
        <h1 className="text-3xl font-extrabold text-blue-700 whitespace-nowrap">
          Welcome, <span className="text-blue-600">{user?.name}</span>
        </h1>

        <nav className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex rounded-xl overflow-hidden border border-blue-300 shadow-sm">
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-7 py-3 text-lg font-semibold transition-colors duration-300 focus:outline-none whitespace-nowrap ${
                activeTab === key
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-blue-700 hover:bg-blue-100'
              }`}
              aria-current={activeTab === key ? 'page' : undefined}
            >
              {label}
            </button>
          ))}
        </nav>
      </header>

      <section className="bg-white rounded-xl shadow-md p-8 max-w-6xl mx-auto w-full flex-grow">
        {activeTab === 'stats' && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-blue-800">Application Stats</h2>
            <p className="text-gray-700 mb-6">
              Track your job application progress here. Stay motivated and organized!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-blue-100 p-6 rounded-xl text-center shadow-sm transition transform hover:scale-[1.02]">
                <p className="text-4xl font-extrabold text-blue-700">{appliedJobs.length}</p>
                <p className="text-blue-800 mt-2 font-semibold">Applications Sent</p>
              </div>
              <div className="bg-purple-100 p-6 rounded-xl text-center shadow-sm transition transform hover:scale-[1.02]">
                <p className="text-4xl font-extrabold text-purple-700">
                  {appliedJobs.length > 0 ? 'Active' : 'None'}
                </p>
                <p className="text-purple-800 mt-2 font-semibold">Application Status</p>
              </div>
            </div>

            {/* Applied Jobs Overview */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-blue-700 mb-4">Applied Jobs Overview</h3>
              {Object.keys(roles).length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {Object.keys(roles).map((company) => (
                    <div
                      key={company}
                      className="bg-gradient-to-r from-blue-200 to-blue-300 text-gray-800 p-6 rounded-lg text-center shadow-lg hover:scale-[1.03] transition-transform"
                    >
                      <h4 className="text-xl font-semibold text-gray-800 mb-4">{company}</h4>
                      <div className="flex justify-center items-center mb-4">
                        <span className="text-2xl mr-2">🏢</span>
                        <span className="text-2xl font-bold">{roles[company].length}</span>
                      </div>
                      <ul className="list-disc pl-6 text-gray-600 text-left space-y-2">
                        {roles[company].map((role, index) => (
                          <li key={index} className="text-sm font-semibold text-blue-700">
                            {role}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">You haven't applied to any jobs yet.</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'jobs' && (
          <JobSearch jobs={jobs} appliedJobs={appliedJobs} setAppliedJobs={setAppliedJobs} />
        )}

        {activeTab === 'add-job' && <AddJob jobs={jobs} setJobs={setJobs} />}
      </section>
    </div>
  );
};

export default Dashboard;
