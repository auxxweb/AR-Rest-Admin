import React from "react";
import { useNavigate } from "react-router-dom";
import ProjectDetailsCard from "../reUsableCmponent/ProjectDetailsCard";

const ClientDetails = () => {
  const navigate = useNavigate();

  return (
    <div className="m-4">
      <svg
        onClick={() => navigate("/clients")}
        className="cursor-pointer mb-4"
        width="13"
        height="22"
        viewBox="0 0 13 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.505997 9.77797L10.284 0L12.728 2.44406L4.17209 11L12.728 19.5559L10.284 22L0.505997 12.222C0.181958 11.8979 -7.72476e-05 11.4583 -7.72476e-05 11C-7.72476e-05 10.5417 0.181958 10.1021 0.505997 9.77797Z"
          fill="black"
        />
      </svg>
      <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md">
        <img
          src="https://www.hollywoodreporter.com/wp-content/uploads/2024/02/Avatar__The_Last_Airbender_n_S1_00_13_15_10RC.jpgAvatar__The_Last_Airbender_n_S1_00_13_15_10RC-H-2024.jpg?w=1296&h=730&crop=1&resize=681%2C383"
          alt="Scene from Avatar: The Last Airbender"
          className="w-28 h-28 rounded-full mr-4 mt-[-120px]"
        />
        <div className="flex flex-col w-full border-1 border-r-gray-800">
          <h2 className="text-lg font-bold">Global Technologies</h2>
          <p className="text-gray-700">Adarsh Raj</p>
          <p className="text-gray-500">CEO</p>
          <p className="text-gray-500">Client ID: CL-0001</p>
          <button className="bg-green-600 text-white py-2 w-40 rounded-md mt-14 mb-8">
            Send Mail
          </button>
        </div>
        <div className="flex flex-col w-full mt-[-80px]">
          {" "}
          {/* Apply w-full to each flex-col */}
          <p className="text-gray-700 font-bold">Contact Information</p>
          <p className="text-gray-500">Phone: 9876543210</p>
          <p className="text-gray-500">Email: hari@example.com</p>
          <p className="text-gray-500">
            Address: 1861 Bayonne Ave, Manchester Township, NJ, 08759
          </p>
        </div>
      </div>
      <h1 className="mt-8 mb-8 text-2xl font-semibold">Projects</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 justify-center">
        <ProjectDetailsCard />
        <ProjectDetailsCard />
        <ProjectDetailsCard />
        <ProjectDetailsCard />
      </div>
    </div>
  );
};

export default ClientDetails;
