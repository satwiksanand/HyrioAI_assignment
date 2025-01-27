import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { verifyMobile } from "../slices/userSlice";
import { useSelector } from "react-redux";

function VerifyEmail() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { companyId } = useSelector((state) => state.user.currentUser);

  function onSubmit(data) {
    data.companyId = companyId;
    dispatch(verifyMobile({ data, navigate }));
  }

  return (
    <form
      className=" rounded-2xl m-auto w-96 p-8 text-lg border-1"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-3">
        <label htmlFor="otp" className="block mb-2">
          One Time Password sent to the Mobile
        </label>
        <input
          type="text"
          id="otp"
          name="otp"
          placeholder="otp of Company"
          className="w-full p-2 rounded-sm border-1"
          {...register("otp", { required: "otp is a requred field" })}
        />
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

export default VerifyEmail;
