export default function JobCard({ job, onSelect }) {
  return (
    <div
      onClick={() => onSelect(job)}
      className="bg-white p-5 rounded-lg shadow hover:shadow-xl cursor-pointer transition"
    >
      <h2 className="text-xl font-semibold">{job.title}</h2>
      <p className="text-gray-700">{job.company}</p>
      <p className="text-sm text-gray-500">{job.location} • {job.type}</p>
    </div>
  );
}
