import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createJob } from "../slices/jobSlice";
const CreateJob = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSubmit(data) {
    dispatch(createJob({ data, navigate }));
  }

  return (
    <div className="rounded-2xl m-auto w-96 p-8 text-lg border-1">
      <h1 className="text-2xl font-bold mb-6">Create Job</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700">Job Title:</label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors.jobTitle && (
            <span className="text-red-500">Job Title is required</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Job Description:</label>
          <textarea
            {...register("description", { required: true })}
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors.jobDescription && (
            <span className="text-red-500">Job Description is required</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Experience Level:</label>
          <select
            {...register("experience", { required: true })}
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="BEGINNER">BEGINNER</option>
            <option value="INTERMEDIATE">INTERMEDIATE</option>
            <option value="EXPERT">EXPERT</option>
          </select>
          {errors.experienceLevel && (
            <span className="text-red-500">Experience Level is required</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">End Date:</label>
          <input
            type="date"
            {...register("endDate", { required: true })}
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors.endDate && (
            <span className="text-red-500">End Date is required</span>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg"
        >
          Create Job
        </button>
      </form>
    </div>
  );
};

export default CreateJob;
