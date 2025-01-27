const JobCard = ({
  title,
  description,
  experience,
  endDate,
  numberOfApplicants,
}) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white">
      <div className="font-bold text-xl mb-2">{title}</div>
      <p className="text-gray-700 text-base mb-4">{description}</p>
      <div className="mb-4">
        <span className="font-semibold">Experience Required: </span>
        <span>{experience}</span>
      </div>
      <div className="mb-4">
        <span className="font-semibold">Application Deadline: </span>
        <span>{endDate}</span>
      </div>
      <div className="mb-4">
        <span className="font-semibold">Number of Applicants: </span>
        <span>{numberOfApplicants}</span>
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Apply Now
      </button>
    </div>
  );
};

export default JobCard;
