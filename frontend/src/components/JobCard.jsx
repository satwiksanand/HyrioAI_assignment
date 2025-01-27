const JobCard = ({
  title,
  description,
  experience,
  endDate,
  numberOfApplicants,
  onAddApplicant,
  onEmailAll,
}) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-2xl p-4 bg-white">
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
      <div className="flex justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={onAddApplicant}
        >
          Add Applicant
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={onEmailAll}
        >
          Send Email
        </button>
      </div>
    </div>
  );
};

export default JobCard;
