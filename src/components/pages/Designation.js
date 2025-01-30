import React from "react";

const Designation = () => {
  return (
    <>
    <h1 className="text-2xl font-semibold m-4 mb-12">Designation</h1>
      <div className="flex items-center justify-center">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div>
              <label
                for="department"
                className="block text-sm font-medium text-gray-700"
              >
                Department
              </label>
              <select
                id="department"
                className="mt-1 w-[300px] py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              >
                <option>Select Department</option>
                <option>Web Development</option>
                <option>Marketing</option>
                <option>HR</option>
              </select>
            </div>

            <button className="w-[300px] mt-4 py-2 px-4 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500">
              SEARCH
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Designation;
