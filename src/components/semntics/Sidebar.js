import React from "react";
import { Transition } from "@headlessui/react";
import { useLocation, useNavigate } from "react-router-dom";

function Sidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Transition
      show={isOpen}
      enter="transition duration-300 transform"
      enterFrom="-translate-x-full"
      enterTo="translate-x-0"
      leave="transition duration-300 transform"
      leaveFrom="translate-x-0"
      leaveTo="-translate-x-full"
      className="bg-[#212529] w-[268px] h-full space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform lg:relative lg:translate-x-0 z-50"
    >
      {/* Sidebar content */}
      <div>
        {/* Close button for mobile */}
        <button
          className="lg:hidden text-white focus:outline-none absolute right-4 top-4"
          onClick={() => setIsOpen(false)}
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {/* Links */}
        <div
          className={`cursor-pointer flex items-center ${
            location?.pathname?.split("/")[1] === ""
              ? "text-[#25e2b6]"
              : "text-[#909294]"
          }  hover:text-[#75eed2]`}
          onClick={() => navigate("/")}
        >
          <span className="flex items-center ml-2">
            <svg
              width="20"
              height="24"
              viewBox="0 0 20 24"
              fill={
                location?.pathname?.split("/")[1] === ""
                  ? "#1DB290"
                  : "currentColor"
              }
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.375 0.8125H17.9708L17.675 1.075L14.1875 4.5625H5.3125C4.47361 4.5625 3.69306 4.77222 2.97083 5.19167C2.24583 5.61111 1.67361 6.18333 1.25417 6.90833C0.834722 7.63056 0.625 8.41111 0.625 9.25V18.625C0.625 19.4639 0.834722 20.2458 1.25417 20.9708C1.67361 21.6931 2.24583 22.2639 2.97083 22.6833C3.69306 23.1028 4.47361 23.3125 5.3125 23.3125H14.6875C15.5264 23.3125 16.3083 23.1028 17.0333 22.6833C17.7556 22.2639 18.3264 21.6931 18.7458 20.9708C19.1653 20.2458 19.375 19.4639 19.375 18.625V0.8125ZM14.9792 6.4375L17.5 3.91667V18.625C17.5 19.4056 17.2264 20.0694 16.6792 20.6167C16.1319 21.1639 15.4681 21.4375 14.6875 21.4375H5.3125C4.53194 21.4375 3.86806 21.1639 3.32083 20.6167C2.77361 20.0694 2.5 19.4056 2.5 18.625V9.25C2.5 8.46944 2.77361 7.80556 3.32083 7.25833C3.86806 6.71111 4.53194 6.4375 5.3125 6.4375H14.9792ZM12.8125 9.25H7.1875C6.67917 9.25 6.24028 9.43611 5.87083 9.80833C5.49861 10.1778 5.3125 10.6167 5.3125 11.125V16.75C5.3125 17.2583 5.49861 17.6972 5.87083 18.0667C6.24028 18.4389 6.67917 18.625 7.1875 18.625H16.9417L14.6875 16.3417V11.125C14.6875 10.6167 14.5014 10.1778 14.1292 9.80833C13.7597 9.43611 13.3208 9.25 12.8125 9.25ZM7.1875 16.75V11.125H12.8125V16.75H7.1875Z"
                fill={
                  location?.pathname?.split("/")[1] === ""
                    ? "#1DB290"
                    : "currentColor"
                }
              />
            </svg>
            <span className="text-custom-16 hover:text-[#75eed2] ml-4">
              Dashboard
            </span>
          </span>
        </div>
        <div
          onClick={() => navigate("/zones")}
          className={`cursor-pointer flex items-center ${
            location?.pathname?.split("/")[1] === "zones"
              ? "text-[#25e2b6]"
              : "text-[#909294]"
          }  hover:text-[#75eed2]`}
        >
          <span className="flex items-center ml-2 ">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={
                location?.pathname?.split("/")[1] === "zones"
                  ? "#1DB290"
                  : "currentColor"
              }
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
fill={
                  location?.pathname?.split("/")[1] === "zones"
                    ? "#1DB290"
                    : "currentColor"
                }
              />
            </svg>
            <span className={`text-custom-16 ml-4`}>Zones</span>
          </span>
        </div>

        <div
          onClick={() => navigate("/judges")}
          className={`cursor-pointer flex items-center ${
            location?.pathname?.split("/")[1] === "judges"
              ? "text-[#25e2b6]"
              : "text-[#909294]"
          }  hover:text-[#75eed2]`}
        >
          <span className="flex items-center ml-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 64 64"
              fill={
                location?.pathname?.split("/")[1] === "judges"
                  ? "#1DB290"
                  : "currentColor"
              }
              xmlns="http://www.w3.org/2000/svg"
              className="transition-colors duration-200"
            >
              <path
  d="M32 3l-30 15 30 15 30-15-30-15zm0 9.5l20 10-20 10-20-10 20-10zm0 11l-20 10v7l20-10 20 10v-7l-20-10zm0 8.5l-10 5v2l10-5 10 5v-2l-10-5z"
fill={
                  location?.pathname?.split("/")[1] === "judges"
                    ? "#1DB290"
                    : "currentColor"
                }
              />
            </svg>

            <span className="text-custom-16 ml-4">Judges</span>
          </span>
        </div>
        <div
          onClick={() => navigate("/participants")}
          className={`cursor-pointer flex items-center ${
            location?.pathname?.split('/')[1] === "participants"
              ? "text-[#25e2b6]"
              : "text-[#909294]"
          }  hover:text-[#75eed2]`}
        >
          <span className="flex items-center ml-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 22 20"
              fill={
                location?.pathname?.split("/")[1] === "participants"
                  ? "#1DB290"
                  : "currentColor"
              }
              xmlns="http://www.w3.org/2000/svg"
              className="transition-colors duration-200"
            >
              <path
                d="M7.62667 0.5C7.15778 0.5 6.72 0.616667 6.31333 0.85C5.90667 1.08556 5.58556 1.40667 5.35 1.81333C5.11667 2.22 5 2.65778 5 3.12667C5 3.59333 5.11667 4.03 5.35 4.43667C5.58556 4.84333 5.90667 5.16444 6.31333 5.4C6.72 5.63333 7.15778 5.75 7.62667 5.75C8.09333 5.75 8.53 5.63333 8.93667 5.4C9.34333 5.16444 9.66444 4.84333 9.9 4.43667C10.1333 4.03 10.25 3.59333 10.25 3.12667C10.25 2.65778 10.1333 2.22 9.9 1.81333C9.66444 1.40667 9.34333 1.08556 8.93667 0.85C8.53 0.616667 8.09333 0.5 7.62667 0.5ZM14.3767 0.5C13.9078 0.5 13.47 0.616667 13.0633 0.85C12.6567 1.08556 12.3356 1.40667 12.1 1.81333C11.8667 2.22 11.75 2.65778 11.75 3.12667C11.75 3.59333 11.8667 4.03 12.1 4.43667C12.3356 4.84333 12.6567 5.16444 13.0633 5.4C13.47 5.63333 13.9078 5.75 14.3767 5.75C14.8433 5.75 15.28 5.63333 15.6867 5.4C16.0933 5.16444 16.4144 4.84333 16.65 4.43667C16.8833 4.03 17 3.59333 17 3.12667C17 2.65778 16.8833 2.22 16.65 1.81333C16.4144 1.40667 16.0933 1.08556 15.6867 0.85C15.28 0.616667 14.8433 0.5 14.3767 0.5ZM7.62667 2C7.93778 2 8.20333 2.10889 8.42333 2.32667C8.64111 2.54667 8.75 2.81333 8.75 3.12667C8.75 3.43778 8.64111 3.70333 8.42333 3.92333C8.20333 4.14111 7.93778 4.25 7.62667 4.25C7.31333 4.25 7.04667 4.14111 6.82667 3.92333C6.60889 3.70333 6.5 3.43778 6.5 3.12667C6.5 2.81333 6.60889 2.54667 6.82667 2.32667C7.04667 2.10889 7.31333 2 7.62667 2ZM14.3767 2C14.6878 2 14.9533 2.10889 15.1733 2.32667C15.3911 2.54667 15.5 2.81333 15.5 3.12667C15.5 3.43778 15.3911 3.70333 15.1733 3.92333C14.9533 4.14111 14.6878 4.25 14.3767 4.25C14.0633 4.25 13.7967 4.14111 13.5767 3.92333C13.3589 3.70333 13.25 3.43778 13.25 3.12667C13.25 2.81333 13.3589 2.54667 13.5767 2.32667C13.7967 2.10889 14.0633 2 14.3767 2ZM4.25 5C3.70333 5 3.20333 5.13667 2.75 5.41C2.29667 5.68333 1.93333 6.04667 1.66 6.5C1.38667 6.95333 1.25 7.45333 1.25 8C1.25 8.40667 1.33222 8.79333 1.49667 9.16C1.66111 9.52667 1.88333 9.85111 2.16333 10.1333C1.64778 10.4778 1.24222 10.9233 0.946667 11.47C0.648889 12.0167 0.5 12.61 0.5 13.25H2C2 12.6256 2.21889 12.0944 2.65667 11.6567C3.09444 11.2189 3.62556 11 4.25 11C4.87444 11 5.40556 11.2189 5.84333 11.6567C6.28111 12.0944 6.5 12.6256 6.5 13.25H8C8 12.61 7.85111 12.0167 7.55333 11.47C7.25778 10.9233 6.85222 10.4778 6.33667 10.1333C6.61667 9.85111 6.83889 9.52667 7.00333 9.16C7.16778 8.79333 7.25 8.40667 7.25 8C7.25 7.45333 7.11333 6.95333 6.84 6.5C6.56667 6.04667 6.20333 5.68333 5.75 5.41C5.29667 5.13667 4.79667 5 4.25 5ZM8 13.25C7.5 13.9211 7.25 14.6711 7.25 15.5H8.75C8.75 14.8756 8.96889 14.3444 9.40667 13.9067C9.84444 13.4689 10.3756 13.25 11 13.25C11.6244 13.25 12.1556 13.4689 12.5933 13.9067C13.0311 14.3444 13.25 14.8756 13.25 15.5H14.75C14.75 14.6711 14.5 13.9211 14 13.25C13.7511 12.9056 13.4467 12.6167 13.0867 12.3833C13.3667 12.1011 13.5889 11.7767 13.7533 11.41C13.9178 11.0433 14 10.6567 14 10.25C14 9.70333 13.8633 9.20333 13.59 8.75C13.3167 8.29667 12.9533 7.93333 12.5 7.66C12.0467 7.38667 11.5467 7.25 11 7.25C10.4533 7.25 9.95333 7.38667 9.5 7.66C9.04667 7.93333 8.68333 8.29667 8.41 8.75C8.13667 9.20333 8 9.70333 8 10.25C8 10.6567 8.08222 11.0433 8.24667 11.41C8.41111 11.7767 8.63333 12.1011 8.91333 12.3833C8.55556 12.6167 8.25111 12.9056 8 13.25ZM14 13.25H15.5C15.5 12.6256 15.7189 12.0944 16.1567 11.6567C16.5944 11.2189 17.1256 11 17.75 11C18.3744 11 18.9056 11.2189 19.3433 11.6567C19.7811 12.0944 20 12.6256 20 13.25H21.5C21.5 12.61 21.3511 12.0167 21.0533 11.47C20.7578 10.9233 20.3522 10.4778 19.8367 10.1333C20.1167 9.85111 20.3389 9.52667 20.5033 9.16C20.6678 8.79333 20.75 8.40667 20.75 8C20.75 7.45333 20.6133 6.95333 20.34 6.5C20.0667 6.04667 19.7033 5.68333 19.25 5.41C18.7967 5.13667 18.2967 5 17.75 5C17.2033 5 16.7033 5.13667 16.25 5.41C15.7967 5.68333 15.4333 6.04667 15.16 6.5C14.8867 6.95333 14.75 7.45333 14.75 8C14.75 8.40667 14.8322 8.79333 14.9967 9.16C15.1611 9.52667 15.3833 9.85111 15.6633 10.1333C15.1478 10.4778 14.7422 10.9233 14.4467 11.47C14.1489 12.0167 14 12.61 14 13.25ZM4.25 6.5C4.67222 6.5 5.02778 6.64444 5.31667 6.93333C5.60556 7.22222 5.75 7.57778 5.75 8C5.75 8.42222 5.60556 8.77778 5.31667 9.06667C5.02778 9.35556 4.67222 9.5 4.25 9.5C3.82778 9.5 3.47222 9.35556 3.18333 9.06667C2.89444 8.77778 2.75 8.42222 2.75 8C2.75 7.57778 2.89444 7.22222 3.18333 6.93333C3.47222 6.64444 3.82778 6.5 4.25 6.5ZM17.75 6.5C18.1722 6.5 18.5278 6.64444 18.8167 6.93333C19.1056 7.22222 19.25 7.57778 19.25 8C19.25 8.42222 19.1056 8.77778 18.8167 9.06667C18.5278 9.35556 18.1722 9.5 17.75 9.5C17.3278 9.5 16.9722 9.35556 16.6833 9.06667C16.3944 8.77778 16.25 8.42222 16.25 8C16.25 7.57778 16.3944 7.22222 16.6833 6.93333C16.9722 6.64444 17.3278 6.5 17.75 6.5ZM11 8.75C11.4222 8.75 11.7778 8.89444 12.0667 9.18333C12.3556 9.47222 12.5 9.82778 12.5 10.25C12.5 10.6722 12.3556 11.0278 12.0667 11.3167C11.7778 11.6056 11.4222 11.75 11 11.75C10.5778 11.75 10.2222 11.6056 9.93333 11.3167C9.64444 11.0278 9.5 10.6722 9.5 10.25C9.5 9.82778 9.64444 9.47222 9.93333 9.18333C10.2222 8.89444 10.5778 8.75 11 8.75Z"

fill={
                  location?.pathname?.split("/")[1] === "participants"
                    ? "#1DB290"
                    : "currentColor"
                }
              />
            </svg>

            <span className="text-custom-16 ml-4">Participants</span>
          </span>
        </div>
        <div
          onClick={() => navigate("/questions")}
          className={`cursor-pointer flex items-center ${
            location?.pathname?.split('/')[1] === "questions"
              ? "text-[#25e2b6]"
              : "text-[#909294]"
          }  hover:text-[#75eed2]`}
        >
          <span className="flex items-center ml-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 64 64"
              fill={
                location?.pathname?.split("/")[1] === "questions"
                  ? "#1DB290"
                  : "currentColor"
              }
              xmlns="http://www.w3.org/2000/svg"
              className="transition-colors duration-200"
            >
              <path
d="M32 2C15.4 2 2 15.4 2 32s13.4 30 30 30 30-13.4 30-30S48.6 2 32 2zm0 52C18.8 54 8 43.2 8 32S18.8 10 32 10s24 10.8 24 24-10.8 24-24 24zm0-14a4 4 0 110 8 4 4 0 010-8zm1-6c-.6 0-1-.4-1-1v-2c0-3.6 3.4-5 5.4-6.1 1.6-.8 2.6-2.5 2.6-4.4 0-2.9-2.4-5.2-5.5-5.2-3.3 0-5.5 2.3-5.5 5.5 0 .6-.4 1-1 1h-2c-.6 0-1-.4-1-1 0-5.1 4.1-9.5 9.5-9.5 5.2 0 9.5 4.2 9.5 9.2 0 3.2-1.7 6-4.5 7.5-2.2 1.2-3.5 2.1-3.5 3.8v2c0 .6-.4 1-1 1h-2z"
fill={
                  location?.pathname?.split("/")[1] === "questions"
                    ? "#1DB290"
                    : "currentColor"
                }
              />
            </svg>

            <span className="text-custom-16 ml-4">Questions</span>
          </span>
        </div>
        <div
          onClick={() => navigate("/bundles")}
          className={`cursor-pointer flex items-center ${
            location?.pathname?.split('/')[1] === "bundles"
              ? "text-[#25e2b6]"
              : "text-[#909294]"
          }  hover:text-[#75eed2]`}
        >
          <span className="flex items-center ml-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill={
                location?.pathname?.split("/")[1] === "bundles"
                  ? "#1DB290"
                  : "currentColor"
              }
              xmlns="http://www.w3.org/2000/svg"
              className="transition-colors duration-200"
            >
              <path
                d="M3 3h18v18H3V3zm3 2v3h3V5H6zm5 0v3h3V5h-3zm5 0v3h3V5h-3zM5 10v3h3v-3H5zm5 0v3h3v-3h-3zm5 0v3h3v-3h-3zm-10 5v3h3v-3H5zm5 0v3h3v-3h-3zm5 0v3h3v-3h-3z"
                fill={
                  location?.pathname?.split("/")[1] === "bundles"
                    ? "#1DB290"
                    : "currentColor"
                }
              />
            </svg>

            <span className="text-custom-16 ml-4">Bundles</span>
          </span>
        </div>


        <div
          onClick={() => navigate("/result")}
          className={`cursor-pointer flex items-center ${
            location?.pathname?.split("/")[1] === "result"
              ? "text-[#25e2b6]"
              : "text-[#909294]"
          }  hover:text-[#75eed2]`}
        >
          <span className="flex items-center ml-2">
            <svg
              width="22"
              height="21"
              viewBox="0 0 24 24"
              fill={
                location?.pathname === "/result" ? "#1DB290" : "currentColor"
              }
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 9l-6 6-3-3 1.41-1.41L12 14.17l4.59-4.59L17 11z"
fill={
                  location?.pathname === "/result" ? "#1DB290" : "currentColor"
                }
              />
            </svg>

            <span className="text-custom-16 ml-4">
              Competition Result
            </span>
          </span>
        </div>
      </div>
    </Transition>
  );
}

export default Sidebar;
