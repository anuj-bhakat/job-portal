import React, { useEffect, useState } from 'react';

const JobSearch = ({ jobs, appliedJobs, setAppliedJobs }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    setResults(jobs);
  }, [jobs]);

  const handleSearch = (e) => {
    e.preventDefault();
    const q = query.trim().toLowerCase();
    setResults(
      jobs.filter(job =>
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        job.location.toLowerCase().includes(q)
      )
    );
  };

  const handleApply = (jobId) => {
    if (!appliedJobs.includes(jobId)) {
      const updated = [...appliedJobs, jobId];
      setAppliedJobs(updated);
      localStorage.setItem('appliedJobs', JSON.stringify(updated));
      showToast('✅ Applied successfully!', 'green');
    }
  };

  const handleCancel = (jobId) => {
    const updated = appliedJobs.filter(id => id !== jobId);
    setAppliedJobs(updated);
    localStorage.setItem('appliedJobs', JSON.stringify(updated));
    showToast('❌ Application cancelled!', 'red');
  };

  const showToast = (msg, type) => {
    const toast = document.getElementById('jd-toast');
    toast.innerText = msg;
    toast.className = `fixed bottom-6 right-6 px-4 py-2 rounded shadow-md text-sm text-${type}-800 bg-${type}-100 show`;
    setTimeout(() => {
      toast.className = toast.className.replace('show', '');
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-extrabold text-center mb-8 text-blue-800">
        Find the Right <span className="text-blue-600">Job</span> for You
      </h2>

      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row items-center gap-4 mb-10 max-w-2xl mx-auto"
      >
        <input
          type="text"
          placeholder="Search job title, company, or location..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-5 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow font-semibold text-sm"
        >
          Search
        </button>
      </form>

      <div id="jd-toast" className="opacity-0 transition-opacity duration-300"></div>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.map((job) => {
            const isApplied = appliedJobs.includes(job.id);
            return (
              <div
                key={job.id}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition border border-gray-100 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-2xl font-bold text-blue-900">{job.title}</h3>
                  <p className="text-gray-600 mt-1 text-sm">
                    <span className="font-medium">{job.company}</span> &middot;{' '}
                    <span className="flex items-center text-gray-500">
                      {/* Location Icon */}
                      <span className="mr-1 text-xl">📍</span>
                      {job.location}
                    </span>
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                      {job.type}
                    </span>
                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                      {job.mode}
                    </span>
                  </div>

                  <p className="mt-4 text-gray-700 text-sm">
                    <span className="font-semibold text-blue-700">Salary:</span>{' '}
                    {job.salary || 'Not specified'}
                  </p>
                </div>

                <div className="mt-6 flex justify-between items-center">
                  {isApplied ? (
                    <>
                      <button
                        onClick={() => handleCancel(job.id)}
                        className="bg-red-600 hover:bg-red-700 text-white text-xs px-4 py-2 rounded-md font-medium"
                      >
                        Cancel
                      </button>
                      <span className="text-green-600 text-xs font-semibold">Applied</span>
                    </>
                  ) : (
                    <button
                      onClick={() => handleApply(job.id)}
                      className="bg-green-600 hover:bg-green-700 text-white text-sm px-5 py-2 rounded-md font-semibold"
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
        <p className="text-center text-gray-500 text-lg mt-12">No jobs found. Try different keywords.</p>
      )}
    </div>
  );
};

export default JobSearch;
