import React, { useState } from "react";
import ProjectSummary from "../ProjectSummary";
import ProjectUploadedImage from "../ProjectUploadedImage";
import UploadedProjectFiles from "../UploadedProjectFiles";
import ProjectStatusTab from "../ProjectStatusTab";
import RightPaneProjectDetails from "../RightPaneProjectDetails";
import AssignedEngineers from "../AssignedEngineers";
import Modal from "../reUsableCmponent/modal/Modal";

const ProjectDetailedPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const toggleModal2 = () => {
    setIsModalVisible2(!isModalVisible2);
  };

  return (
    <>
      <div className=" p-2 rounded-md">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">Hospital Administration</h2>
          <div className="flex space-x-2">
            <button
              onClick={toggleModal}
              className="bg-teal-500 text-white rounded-full px-4 py-2"
            >
              <span className="text-lg">+ Assign</span>
            </button>
            <button className="bg-teal-500 text-white rounded-full px-3 py-1">
              <span onClick={toggleModal2} className="text-lg">
                + Edit Project
              </span>
            </button>
          </div>
        </div>
        <p className="text-gray-500">2 open tasks, 5 tasks completed</p>
      </div>

      <Modal
        isVisible={isModalVisible}
        onClose={toggleModal}
        modalHeader={"Assign work"}
      >
        <div className="max-h-[80vh] overflow-y-auto pr-4">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden">
            <div>
              <label
                for="leader"
                className="block text-sm font-medium text-gray-700"
              >
                Leader/Employee
              </label>
              <select
                id="leader"
                name="leader"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option>Choose an option</option>
              </select>
            </div>

            <div>
              <label
                for="designation"
                className="block text-sm font-medium text-gray-700"
              >
                Designation
              </label>
              <select
                id="designation"
                name="designation"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option>Choose a designation</option>
              </select>
            </div>

            <div>
              <label
                for="employeeID"
                className="block text-sm font-medium text-gray-700"
              >
                Employee ID
              </label>
              <input
                type="text"
                id="employeeID"
                name="employeeID"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label
                for="employeeName"
                className="block text-sm font-medium text-gray-700"
              >
                Employee Name
              </label>
              <select
                id="employeeName"
                name="employeeName"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option>Select a name</option>
              </select>
            </div>

            <div>
              <label
                for="date"
                className="block text-sm font-medium text-gray-700"
              >
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label
                for="location"
                className="block text-sm font-medium text-gray-700"
              >
                Link/Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label
                for="startTime"
                className="block text-sm font-medium text-gray-700"
              >
                Start Time
              </label>
              <input
                type="time"
                id="startTime"
                name="startTime"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label
                for="endTime"
                className="block text-sm font-medium text-gray-700"
              >
                End Time
              </label>
              <input
                type="time"
                id="endTime"
                name="endTime"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label
                for="reviewer"
                className="block text-sm font-medium text-gray-700"
              >
                Reviewer
              </label>
              <select
                id="reviewer"
                name="reviewer"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option>Select a reviewer</option>
              </select>
            </div>

            <div>
              <label
                for="verificationStatus"
                className="block text-sm font-medium text-gray-700"
              >
                Verification Status
              </label>
              <select
                id="verificationStatus"
                name="verificationStatus"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option>Choose a status</option>
              </select>
            </div>

            <div>
              <label
                for="status"
                className="block text-sm font-medium text-gray-700"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option>Select status</option>
              </select>
            </div>

            <div>
              <label
                for="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="ml-auto flex items-center space-x-4">
              <div className="w-[218px]">
                <label
                  for="location"
                  className="block text-sm font-medium text-gray-700"
                >
                  Link/Location
                </label>
                <textarea
                  id="location"
                  name="location"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                ></textarea>
              </div>

              <div className="w-[218px] border border-gray-300 border-dashed rounded p-4 h-16 mt-6">
                <div className="space-y-1 text-center mt-[-28px]">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M24 35.88l-7.03-7.03a1 1 0 00-1.41 0l-3.74 3.74v-8.65a1 1 0 00-1-1h-2a1 1 0 00-1 1v15a1 1 0 001 1h15a1 1 0 001-1v-2a1 1 0 00-1-1h-8.65l3.74 3.74a1 1 0 001.41 0L24 35.88z"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <div className="text-sm text-gray-600">
                    <label
                      for="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 flex justify-center mt-6">
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-6 rounded-full shadow hover:bg-green-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </Modal>

      <Modal
        isVisible={isModalVisible2}
        onClose={toggleModal2}
        modalHeader="Edit Project"
      >
        <div className="max-h-[80vh] overflow-y-auto pr-4">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white shadow-md rounded-md">
            <div>
              <label
                htmlFor="projectName"
                className="block text-sm font-medium text-gray-700"
              >
                Project Name
              </label>
              <input
                type="text"
                id="projectName"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label
                htmlFor="client"
                className="block text-sm font-medium text-gray-700"
              >
                Client
              </label>
              <input
                type="text"
                id="client"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label
                htmlFor="startDate"
                className="block text-sm font-medium text-gray-700"
              >
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label
                htmlFor="endDate"
                className="block text-sm font-medium text-gray-700"
              >
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="flex space-x-2">
              <div className="flex-1">
                <label
                  htmlFor="rate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Rate
                </label>
                <input
                  type="text"
                  id="rate"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  value="₹1200"
                />
              </div>
              <div>
                <label
                  htmlFor="rateType"
                  className="block text-sm font-medium text-gray-700"
                >
                  Rate Type
                </label>
                <select
                  id="rateType"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option>Fixed</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="priority"
                className="block text-sm font-medium text-gray-700"
              >
                Priority
              </label>
              <select
                id="priority"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option>High</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="projectLeader"
                className="block text-sm font-medium text-gray-700"
              >
                Add Project Leader
              </label>
              <select
                id="projectLeader"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option>Select Leader</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="teamMembers"
                className="block text-sm font-medium text-gray-700"
              >
                Add Team Members
              </label>
              <select
                id="teamMembers"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option>Select Members</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Team Leaders
              </label>
              <div className="flex space-x-2 mt-1">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Leader"
                  className="w-10 h-10 rounded-full"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Team Members
              </label>
              <div className="flex space-x-2 mt-1">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Member"
                  className="w-10 h-10 rounded-full"
                />
                <img
                  src="https://via.placeholder.com/40"
                  alt="Member"
                  className="w-10 h-10 rounded-full"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                rows="3"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              ></textarea>
            </div>

            <div className="md:col-span-2 flex space-x-4">
              <div className="flex-1">
                <label
                  htmlFor="addImages"
                  className="block text-sm font-medium text-gray-700"
                >
                  Add Images
                </label>
                <div type='file' className="mt-1 border border-gray-300 rounded-md shadow-sm p-4 flex justify-center items-center">
                  <svg
                    className="w-10 h-10 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    ></path>
                  </svg>
                </div>
              </div>
              <div>
                <img
                  src="https://via.placeholder.com/100"
                  alt="Uploaded"
                  className="w-24 h-24 object-cover rounded-md"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="uploadFile"
                className="block text-sm font-medium text-gray-700"
              >
                Upload File
              </label>
              <input
                type="file"
                id="uploadFile"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="md:col-span-2 flex justify-center">
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-6 rounded-full shadow hover:bg-green-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </Modal>

      <div className="flex flex-col lg:flex-row lg:space-x-4">
        <div className="w-full lg:w-9/12">
          <ProjectSummary />
          <ProjectUploadedImage />
          <UploadedProjectFiles />
          <ProjectStatusTab />
        </div>
        <div className="w-full lg:w-3/12">
          <RightPaneProjectDetails />
          <AssignedEngineers />
        </div>
      </div>
    </>
  );
};

export default ProjectDetailedPage;
