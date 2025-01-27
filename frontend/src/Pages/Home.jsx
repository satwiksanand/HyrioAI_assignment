import { useDispatch, useSelector } from "react-redux";
import JobCard from "../components/JobCard";
import { Link } from "react-router-dom";
import { getAllJobs } from "../slices/jobSlice";

function Home() {
  const jobs = useSelector((state) => state.jobs.allJobs);
  const dispatch = useDispatch();

  function handleSubmit() {
    dispatch(getAllJobs());
  }

  return (
    <div className="w-[90%]  h-screen p-4 rounded-sm">
      <div className="flex justify-between">
        <h2 className="font-bold text-2xl">
          All of Your Job Postings in one place
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
      <div className="flex gap-2">
        {jobs && jobs.length > 0 ? (
          jobs.map((job, ind) => (
            <JobCard
              title={job.title}
              description={job.description}
              experience={job.experience}
              endDate={job.endDate}
              numberOfApplicants={job.candidate.length}
              key={ind}
            />
          ))
        ) : (
          <p>No jobs available. Click Refresh to load jobs.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
