import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { signIn } from "../slices/userSlice";

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSubmit(data) {
    dispatch(signIn({ data, navigate }));
  }
  return (
    <form
      className=" rounded-2xl m-auto w-96 p-8 text-lg border-1"
      onSubmit={handleSubmit(onSubmit)}
    >
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
            required: "company email is a required field",
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
            required: "company passwrod is a required field",
          })}
        />
      </div>
      <div className="mb-3 flex justify-between items-end">
        <p>New Here?</p>
        <Link to={"/signup"} className="underline text-blue-400">
          Signup
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

export default SignIn;
