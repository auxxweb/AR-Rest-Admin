import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../api/auth";
import { getUserCredential } from "../../common/utils";
import { PiEyeFill, PiEyeSlashFill } from "react-icons/pi";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const userData = getUserCredential();
  const [login, { isLoading }] = useLoginMutation();

  if (userData) return <>Loading</>;

  const onSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission
    const formData = new FormData(event.target); // Make sure event.target is the form
    const email = formData.get("email"); // Get email input value
    const password = formData.get("password");
    try {
      const body = {
        email,
        password,
      };
      const res = await login?.(body);
      if (res?.data?.success) {
        localStorage.setItem(
          "userCredential",
          JSON.stringify(res?.data?.admin?.token)
        );
        navigate("/"); // Redirect after form submission
      } else {
        toast.error(res.data.message,{
          position: "top-right",
          duration: 2000,  
          style: {
            backgroundColor: "#fb0909", // Custom green color for success
            color: "#FFFFFF", // Text color
          },
          dismissible: true,  
        });
      }
    } catch (error) {
      console.log("error", error);
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
              // onSubmit={onSubmit}
              className="bg-white border space-y-3 sm:space-y-4 border-[#C19D5C] shadow-lg rounded-lg text-center py-8 sm:py-10 px-3 sm:px-8  w-full"
            >
              <h1 className=" text-4xl sm:text-5xl text-[#C19D5C] font-semibold">
                Log In
              </h1>
              <h3 className=" text-sm sm:text-base text-[#686219]">
                Enter your Username And Password To Login in!
              </h3>

              {/* Email Input Field */}
              <div className="relative mb-10 group space-y-1 items-center">
                {/* Increased margin for spacing */}
                <label
                  className=" px-2 sm:px-3 py-1 text-base sm:text-lg font-medium text-[#C19D5C] bg-transparent m-auto" // Increased padding and adjusted label positioning
                  htmlFor="name"
                >
                  User Name
                </label>
                <input
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 border border-[#CCCCCC] text-gold-500 placeholder-gold-500 rounded-[22px] bg-transparent outline-none focus:border-gold-600 "
                  type="email"
                  id="email"
                  placeholder="Email"
                  name="email"
                  required
                />
              </div>

              {/* Password Input Field */}
              <div className="relative  group  space-y-1">
                <label
                  className=" px-2 sm:px-3 py-1 text-base sm:text-lg font-medium text-[#C19D5C] bg-transparent m-auto" // Increased padding and adjusted label positioning
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 border border-[#CCCCCC] text-gold-500 placeholder-gold-500 rounded-[22px] bg-transparent outline-none focus:border-gold-600 "
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
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

              {/* Forgot Password Link (Right-aligned under Password) */}
              <div className="flex justify-between mb-8 text-sm text-[#C19D5C] ">
                <span className="space-x-2 flex items-center">
                  <input type="checkbox" className="bg-[#C19D5C] h-4 w-4" />
                  <span className="hover:underline cursor-pointer">
                    Remember me
                  </span>
                </span>
                {/* <span
                  onClick={() => navigate("/forgotPassword")}
                  className="hover:underline cursor-pointer"
                >
                  Forgot Password?
                </span> */}
              </div>

              {/* Sign In Button */}
              <div className="pt-3">
                <button
                  disabled={isLoading}
                  className="w-full  py-3 max-w-[217px] hover:-translate-y-1 transform transition rounded-lg bg-gradient-to-r from-[#C19D5C] to-[#5F4D2D]  text-white  "
                  type="submit"
                  onClick={()=> navigate("/")}
                >
                  Log In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
