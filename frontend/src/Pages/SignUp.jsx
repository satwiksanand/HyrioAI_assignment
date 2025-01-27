import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { signUp } from "../slices/userSlice";

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSubmit(data) {
    dispatch(signUp({ data, navigate }));
  }

  return (
    <form
      className=" rounded-2xl m-auto w-96 p-8 text-lg border-1"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-3">
        <label htmlFor="companyName" className="block mb-2">
          Company Name
        </label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          className="w-full p-2 rounded-sm border-1"
          {...register("companyName", {
            required: "company Name is a required field",
          })}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="companyEmail" className="block mb-2">
          Company Email
        </label>
        <input
          type="text"
          id="companyEmail"
          name="companyEmail"
          placeholder="Email of Company as registered"
          className="w-full p-2 rounded-sm border-1"
          {...register("companyEmail", {
            required: "company Email is a required field",
          })}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="companyPassword" className="block mb-2">
          Company Password
        </label>
        <input
          type="text"
          id="companyPassword"
          name="companyPassword"
          placeholder="Password of Company"
          className="w-full p-2 rounded-sm border-1"
          {...register("companyPassword", {
            required: "company Password is a required field",
          })}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="companyContact" className="block mb-2">
          Contact Number
        </label>
        <input
          type="text"
          id="companyContact"
          name="companyContact"
          className="w-full p-2 rounded-sm border-1"
          {...register("companyContact", {
            required: "company Contact is a required field",
          })}
        />
      </div>
      <div className="mb-3 flex justify-between items-end">
        <p>Have an account?</p>
        <Link to={"/signin"} className="underline text-blue-400">
          Signin
        </Link>
      </div>
      <button
        type="submit"
        className="w-full p-2 text-lg bg-blue-500 text-white rounded-sm cursor-pointer"
      >
        Submit
      </button>
    </form>
  );
}

export default SignUp;
