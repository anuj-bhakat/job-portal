export default function JobModal({ job, onClose }) {
  if (!job) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold">{job.title}</h2>
        <p className="text-gray-700">{job.company}</p>
        <p className="text-sm text-gray-500 mb-4">{job.location} • {job.type}</p>
        <p>{job.description}</p>
      </div>
    </div>
  );
}
