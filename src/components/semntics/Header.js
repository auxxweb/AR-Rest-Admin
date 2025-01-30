import React, { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { LiaEdit } from "react-icons/lia";

import avatar from "../../assets/images/avatar.png";
import { PiSignOut } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import Modal from "../reUsableCmponent/modal/Modal";
import { useUpdatePasswordMutation } from "../../api/auth";
import { toast } from "sonner";
function Header({ toggleSidebar }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [updatePassword, { isLoading: isLoadingUpdatePassword }] =
    useUpdatePasswordMutation();
  const navigate = useNavigate();
  const handleSignout = () => {
    window.localStorage.removeItem("userCredential");
    navigate("/login");
  };

  const handleChangePasswordClick = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const onSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission
    const formData = new FormData(event.target);
    const oldPassword = formData.get("oldPassword"); 
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword"); 
    if (password !== confirmPassword) {
      toast.error("Password and confirm password do not match",{
        position: "top-right",
        duration: 2000,  
        style: {
          backgroundColor: "#fb0909", // Custom green color for success
          color: "#FFFFFF", // Text color
        },
      });
      return;
    }
    try {
      const body = {
        oldPassword,
        password,
      };
      const updateres = await updatePassword?.(body);
      if (updateres?.data?.success) {
        toast.success("Password changed successfully",{
          position: "top-right", 
          duration: 2000,  
          style: {
            backgroundColor: "#4CAF50", // Custom green color for success
            color: "#FFFFFF", // Text color
          },
          dismissible: true,  
        })
        handleModalClose();
      } else {
        // toast.error(updateres?.data?.message,{
        //   position: "top-right",
        //   style: {
        //     backgroundColor: "#fb0909", // Custom green color for success
        //     color: "#FFFFFF", // Text color
        //   },
        // })
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <header
      className="flex items-center justify-between p-4"
      style={{ background: "linear-gradient(135deg, #068A55, #16CABB)" }}
    >
      <button
        className="text-gray-200 focus:outline-none lg:hidden"
        onClick={toggleSidebar}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      <img src="/quranLogo.svg" alt="Description of Image" width="55" height="43" />


      <div className="flex items-center space-x-2">
        <img src={avatar} className="h-9 w-9 object-contain rounded-full" />
        <span className="text-white">Admin</span>
        <div className=" group cursor-pointer relative">
          <div>
            <HiDotsVertical className="text-white h-5 w-5" />
          </div>
          <div className="hidden cursor-default w-max max-w-xs group-hover:block absolute right-1 ">
            <div className="p-2  space-y-3  bg-white  rounded-md border border-slate-100 mt-2 shadow-lg  dark:border-slate-50/10 dark:bg-gray-800 dark:text-slate-200">
              <div
                onClick={() => handleChangePasswordClick()}
                className="  p-1 sm:p-2  hover:bg-slate-100 cursor-pointer flex flex-row space-x-1 items-center dark:hover:bg-slate-50/25 "
              >
                <LiaEdit className="text-black h-5 w-5 dark:text-white" />{" "}
                <span>Change Password</span>
              </div>
              <div
                onClick={handleSignout}
                className="p-1 sm:p-2 cursor-pointer hover:bg-slate-100 flex space-x-1 items-center dark:hover:bg-slate-400/25"
              >
                <PiSignOut className="text-black h-5 w-5 dark:text-white" />{" "}
                <span>Signout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isVisible={isModalVisible}
        onClose={handleModalClose}
        modalHeader={"Update Password"}
      >
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <div>
              <label
                htmlFor="oldPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Old password
              </label>
              <input
                type="text"
                name="oldPassword"
                id="oldPassword"
                className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                New password
              </label>
              <input
                type="text"
                name="password"
                id="password"
                className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm password
              </label>
              <input
                type="text"
                name="confirmPassword"
                id="confirmPassword"
                className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
          </div>
          <div className="flex justify-center p-6">
            <button
              disabled={isLoadingUpdatePassword}
              type="submit"
              className="bg-[#0EB599] hover:bg-[#068A55] text-white font-bold py-2 px-6 rounded-3xl"
            >
              {isLoadingUpdatePassword ? "loading..." : "Update"}
            </button>
          </div>
        </form>
      </Modal>
    </header>
  );
}

export default Header;
