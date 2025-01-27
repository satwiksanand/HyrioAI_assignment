import { useDispatch, useSelector } from "react-redux";
import JobCard from "../components/JobCard";
import { Link } from "react-router-dom";
import { addCandidate, getAllJobs } from "../slices/jobSlice";
import { useState } from "react";

function Home() {
  const jobs = useSelector((state) => state.jobs.allJobs);
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [currentJobId, setCurrentJobId] = useState(null);
  const [email, setEmail] = useState("");

  function handleSubmit() {
    dispatch(getAllJobs());
  }

  function handleAddApplicant(jobId) {
    setCurrentJobId(jobId);
    setModalOpen(true);
  }

  function handleModalSubmit() {
    if (email.trim()) {
      dispatch(addCandidate({ jobId: currentJobId, candidateEmail: email }));
      setModalOpen(false);
      setEmail("");
    } else {
      alert("Please enter a valid email address.");
    }
  }

  function closeModal() {
    setModalOpen(false);
    setEmail("");
  }

  return (
    <div className="w-[90%] h-screen p-4 rounded-sm">
      <div className="flex justify-between">
        <h2 className="font-bold text-2xl">
          All of Your Job Postings in One Place
        </h2>
        <div>
          <Link
            to={"/createJob"}
            className="border-1 rounded-md bg-blue-500 text-white p-2 cursor-pointer mr-2"
          >
            Create Job
          </Link>
          <button
            className="border-1 rounded-md bg-blue-500 text-white p-2 cursor-pointer"
            onClick={handleSubmit}
          >
            Refresh
          </button>
        </div>
      </div>
      <div className="flex gap-2 flex-wrap">
        {jobs && jobs.length > 0 ? (
          jobs.map((job) => (
            <JobCard
              title={job.title}
              description={job.description}
              experience={job.experience}
              endDate={job.endDate}
              numberOfApplicants={job.candidate.length}
              key={job._id}
              onAddApplicant={() => handleAddApplicant(job._id)}
            />
          ))
        ) : (
          <p>No jobs available. Click Refresh to load jobs.</p>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Add Applicant</h3>
            <input
              type="email"
              placeholder="Enter applicant's email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleModalSubmit}
              >
                Add Applicant
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
