import { useState } from "react";
import { jobs } from "./data/jobs";
import JobCard from "./components/JobCard";
import JobModal from "./components/JobModal";

function App() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [filter, setFilter] = useState("");

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="text-center mb-10">
        <h1 className="text-3xl font-bold">Job Portal</h1>
        <input
          type="text"
          placeholder="Search job title..."
          className="mt-4 px-4 py-2 border rounded w-full max-w-md"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
          <JobCard key={job.id} job={job} onSelect={setSelectedJob} />
        ))}
      </div>

      <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
    </div>
  );
}

export default App;
