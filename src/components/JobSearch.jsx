import React, { useEffect, useState } from 'react';

const JobSearch = () => {
  const [query, setQuery] = useState('');
  const [jobs, setJobs] = useState([]);
  const [results, setResults] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState(() => {
    const saved = localStorage.getItem('appliedJobs');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    fetch('/data/jobs.json')
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setResults(data);
      })
      .catch((err) => console.error('Failed to load jobs:', err));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = jobs.filter((job) =>
      job.title.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  };

  const handleApply = (jobId) => {
    if (!appliedJobs.includes(jobId)) {
      const updatedApplied = [...appliedJobs, jobId];
      setAppliedJobs(updatedApplied);
      localStorage.setItem('appliedJobs', JSON.stringify(updatedApplied));
      alert('Successfully applied for the job!');
    }
  };

  const handleCancel = (jobId) => {
    const updatedApplied = appliedJobs.filter((id) => id !== jobId);
    setAppliedJobs(updatedApplied);
    localStorage.setItem('appliedJobs', JSON.stringify(updatedApplied));
    alert('Application cancelled.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">Search Jobs</h2>
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row gap-4 mb-10 max-w-3xl mx-auto"
      >
        <input
          type="text"
          placeholder="Search job titles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-5 py-3 border border-gray-300 rounded-md shadow-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md
            font-semibold transition shadow-md"
        >
          Search
        </button>
      </form>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {results.map((job) => {
            const isApplied = appliedJobs.includes(job.id);
            return (
              <div
                key={job.id}
                className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900">{job.title}</h3>
                  <p className="mt-2 text-gray-700 text-lg">{job.company}</p>
                  <p className="mt-1 text-gray-500">{job.location}</p>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  {isApplied ? (
                    <>
                      <button
                        onClick={() => handleCancel(job.id)}
                        className="px-5 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white font-semibold transition shadow-sm"
                      >
                        Cancel Application
                      </button>
                      <span className="inline-block px-4 py-2 rounded-md bg-green-100 text-green-700 font-semibold text-sm">
                        Applied
                      </span>
                    </>
                  ) : (
                    <button
                      onClick={() => handleApply(job.id)}
                      className="px-5 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white font-semibold transition shadow-sm"
                    >
                      Apply
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg mt-12">
          No jobs found. Try a different keyword.
        </p>
      )}
    </div>
  );
};

export default JobSearch;
