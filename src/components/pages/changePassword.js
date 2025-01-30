import { useRef, useState } from "react";
import { PiEyeFill, PiEyeSlashFill } from "react-icons/pi";
import { useChangePasswordMutation } from "../../api/auth";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const { forgotId } = useParams();
  const formRef = useRef();

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const password = formData.get("newPassword");
    const confirmPassword = formData.get("confirmPassword");
    if (password !== confirmPassword) {
      toast.error("Password and confirm password do not match");
      return;
    }

    try {
      const body = {
        password,
        forgotId,
      };
      const res = await changePassword?.(body);
      toast.success(res?.data?.msg);
      formRef.current.reset();
      navigate("/login");
    } catch (error) {
      console.log("error", error);
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <>
      <div
        className="relative min-h-screen bg-cover bg-center "
        style={{ backgroundImage: 'url("/quranBackground.jpeg")' }}
      >
        <div className="relative z-10 flex flex-col h-full items-center space-y-4 justify-center p-3 ">
          <div className="flex flex-row w-28 h-auto justify-center">
            <img
              src="/quranLogo.svg"
              alt=" Logo"
              className="h-full w-full object-contain"
              priority
            />
          </div>
          <div className="w-full max-w-lg ">
            <form
              ref={formRef}
              onSubmit={onSubmit}
              className="bg-white border space-y-10 sm:space-y-4 border-[#C19D5C] shadow-lg rounded-lg text-center py-8 sm:py-10 px-3 sm:px-8  w-full"
            >
              <h1 className=" text-4xl sm:text-5xl text-[#C19D5C] font-semibold">
                Change Password
              </h1>
              <h3 className=" text-sm sm:text-base text-[#686219]">
                Enter your New Password and Login!
              </h3>

              {/* Password Input Field */}
              <div className="relative  group  space-y-1">
                <label
                  className=" px-2 sm:px-3 py-1 text-base sm:text-lg font-medium text-[#C19D5C] bg-transparent m-auto" // Increased padding and adjusted label positioning
                  htmlFor="newPassword"
                >
                  New Password
                </label>
                <div className="relative">
                  <input
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 border border-[#CCCCCC] text-gold-500 placeholder-gold-500 rounded-[22px] bg-transparent outline-none focus:border-gold-600 "
                    type={showPassword ? "text" : "password"}
                    id="newPassword"
                    name="newPassword"
                    placeholder="Password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    class="absolute inset-y-0 end-0 text-xl  flex items-center  z-20 px-3  cursor-pointer text-[#888888] rounded-e-md   "
                  >
                    {showPassword ? <PiEyeSlashFill /> : <PiEyeFill />}
                  </button>
                </div>
              </div>
              <div className="relative  group  space-y-1">
                <label
                  className=" px-2 sm:px-3 py-1 text-base sm:text-lg font-medium text-[#C19D5C] bg-transparent m-auto" // Increased padding and adjusted label positioning
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 border border-[#CCCCCC] text-gold-500 placeholder-gold-500 rounded-[22px] bg-transparent outline-none focus:border-gold-600 "
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    class="absolute inset-y-0 end-0 text-xl  flex items-center  z-20 px-3  cursor-pointer text-[#888888] rounded-e-md   "
                  >
                    {showPassword ? <PiEyeSlashFill /> : <PiEyeFill />}
                  </button>
                </div>
              </div>

              {/* Sign In Button */}
              <div className="pt-3">
                <button
                  disabled={isLoading}
                  className="w-full  py-3 max-w-[217px] hover:-translate-y-1 transform transition rounded-lg bg-gradient-to-r from-[#C19D5C] to-[#5F4D2D]  text-white  "
                  type="submit"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
