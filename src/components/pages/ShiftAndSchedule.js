import React, { useState } from "react"
import Modal from "../reUsableCmponent/modal/Modal"

const ShiftAndSchedule = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible)
  };
  return (
    <>
      <div className="flex rounded-lg p-4">
        <h2 className="text-2xl font-semibold text-gray-700">
          Daily Scheduling
        </h2>
        <div className="ml-auto flex items-center space-x-4">
          {" "}
          <span className="rounded-3xl p-3 px-8 cursor-pointer hover:bg-[#1ae69b] bg-[#808080] flex items-center justify-center text-white">
            Shifts
          </span>
          <span className="flex items-center">
            <span
              className="bg-[#808080] hover:bg-[#1ae69b] text-white rounded-full p-3 cursor-pointer"
              onClick={toggleModal}
            >
              + Assign Schedule
            </span>
          </span>
        </div>

        <Modal
          isVisible={isModalVisible}
          onClose={toggleModal}
          modalHeader={"Add Shifts"}
        >
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="department"
                  className="block text-sm font-medium text-gray-700"
                >
                  Department
                </label>
                <select
                  id="department"
                  className="p-2 mt-1 block w-full border-2 border-gray-400 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="Web Developer">Web Developer</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="employeeName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Employee Name
                </label>
                <input
                  type="text"
                  name="employeeName"
                  id="employeeName"
                  className="p-2 mt-1 block w-full border-2 border-gray-400 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  className="p-2 mt-1 block w-full border-2 border-gray-400 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="shift"
                  className="block text-sm font-medium text-gray-700"
                >
                  Shifts
                </label>
                <select
                  id="shift"
                  className="p-2 mt-1 block w-full border-2 border-gray-400 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="Morning Shift">Morning Shift</option>
                  <option value="Evening Shift">Evening Shift</option>
                  <option value="Night Shift">Night Shift</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">

              <div>
                <label
                  htmlFor="empDescription"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <input
                  type="text"
                  name="empDescription"
                  id="empDescription"
                  className="p-2 mt-1 block w-full border-2 border-gray-400 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="John Doe"
                />
              </div>
            </div>



            <div className="grid grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="minStartTime"
                  className="block text-sm font-medium text-gray-700"
                >
                  Min Start Time
                </label>
                <input
                  type="time"
                  name="minStartTime"
                  id="minStartTime"
                  className="mt-1 block w-full border-2 border-gray-400 p-0.5 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="startTime"
                  className="block text-sm font-medium text-gray-700"
                >
                  Start Time
                </label>
                <input
                  type="time"
                  name="startTime"
                  id="startTime"
                  className="mt-1 block w-full border-2 border-gray-400 p-0.5 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
              </div>
              <div>
                <label
                  htmlFor="maxStartTime"
                  className="block text-sm font-medium text-gray-700"
                >
                  Max Start Time
                </label>
                <input
                  type="time"
                  name="maxStartTime"
                  id="maxStartTime"
                  className="mt-1 block w-full border-2 border-gray-400 p-0.5 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="minEndTime"
                  className="block text-sm font-medium text-gray-700"
                >
                  Min End Time
                </label>
                <input
                  type="time"
                  name="minEndTime"
                  id="minEndTime"
                  className="mt-1 block w-full border-2 border-gray-400 p-0.5 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
              </div>
              <div>
                <label
                  htmlFor="endTime"
                  className="block text-sm font-medium text-gray-700"
                >
                  End Time
                </label>
                <input
                  type="time"
                  name="endTime"
                  id="endTime"
                  className="mt-1 block w-full border-2 border-gray-400 p-0.5 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
              </div>
              <div>
                <label
                  htmlFor="maxEndTime"
                  className="block text-sm font-medium text-gray-700"
                >
                  Max End Time
                </label>
                <input
                  type="time"
                  name="maxEndTime"
                  id="maxEndTime"
                  className="mt-1 block w-full border-2 border-gray-400 p-0.5 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
              </div>
            </div>

            <div>
              <label
                htmlFor="breakTime"
                className="block text-sm font-medium text-gray-700"
              >
                Break Time
              </label>
              <input
                type="text"
                name="breakTime"
                id="breakTime"
                className="mt-1 block w-full border-2 border-gray-400 p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="e.g., 1 hour"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </div>
          </form>
        </Modal>
      </div>

      <div className="flex rounded-lg p-2 mb-4 space-x-6">
        <span className="flex items-center">
          <select
            className="rounded p-2 lg:w-[200px] w-full appearance-none bg-white border border-gray-400 focus:ring-indigo-500 focus:border-indigo-500 pr-10 bg-no-repeat bg-right"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14' fill='none' stroke='%23000000'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1' d='M12 5l-5 5-5-5' /%3E%3C/svg%3E")`,
              backgroundSize: "24px 24px",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 10px center",
              paddingRight: "40px",
            }}
          >
            <option
              value=""
              disabled
              selected
              className="text-gray-500 font-bold"
            >
              Select Designation
            </option>
            <option value="All">Medical Leave</option>
            <option value="Web Designer">Personal Leave</option>
            <option value="Web Developer">Bereavement Leave</option>
            <option value="FrontEnd Developer">Maternity Leave</option>
          </select>
        </span>

        <div className="ml-auto flex items-center space-x-6">
          <span className="flex items-center justify-center">
            <input
              className="p-2 lg:w-[150px] rounded w-full appearance-none bg-white border border-gray-500"
              placeholder="EmpId"
            />
          </span>

          <span className="flex items-center justify-center">
            <input
              className="p-2 lg:w-[150px] rounded w-full appearance-none bg-white border border-gray-500"
              placeholder="EmpId"
            />
          </span>

          <span className="flex items-center justify-center">
            <input
              className="p-2 lg:w-[150px] rounded w-full appearance-none bg-white border border-gray-500"
              placeholder="EmpId"
            />
          </span>

          <span className="flex items-center">
            <span
              // Call selectRole when the Search button is clicked
              className="cursor-pointer bg-[#808080] text-white p-2 lg:w-[228px] rounded text-center"
            >
              Search
            </span>
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border-y border-gray-200 px-4 py-2">
                Scheduled Shift
              </th>
              <th className="border-y border-gray-200 px-4 py-2">Fri 21</th>
              <th className="border-y border-gray-200 px-4 py-2">Sat 22</th>
              <th className="border-y border-gray-200 px-4 py-2">Sun 23</th>
              <th className="border-y border-gray-200 px-4 py-2">Mon 24</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-y border-gray-200 px-4 py-2">
                Bernardo Web Developer
              </td>

              <td className="border-y border-gray-200 px-4 py-2 border-solid text-center ">
                <div className="flex justify-center items-center">
                  <span className="border-2 border-green-500 px-4 py-4 border-dashed text-center text-sm">
                    08:30 am - 08:00 pm (11 hr 30 min) Admin <br /> page - Yolo
                    App
                  </span>
                </div>
              </td>
              <td className="border-y border-gray-200 px-4 py-2 border-solid text-center ">
                <div className="flex justify-center items-center font-bold text-6xl pt-0">
                  <span onClick={toggleModal} className="cursor-pointer border-2 border-gray-500 px-4 py-4 border-dashed text-center">
                    <p className="mt-[-14px]">+</p>
                  </span>
                </div>
              </td>
              <td className="border-y border-gray-200 px-4 py-2 border-solid text-center ">
                <div className="flex justify-center items-center font-bold text-6xl pt-0">
                  <span onClick={toggleModal} className="cursor-pointer border-2 border-gray-500 px-4 py-4 border-dashed text-center">
                    <p className="mt-[-14px]">+</p>
                  </span>
                </div>
              </td>
              <td className="border-y border-gray-200 px-4 py-2 border-solid text-center ">
                <div className="flex justify-center items-center">
                  <span className="border-2 border-green-500 px-4 py-4 border-dashed text-center">
                    08:30 am - 08:00 pm <br /> page - Yolo App
                  </span>
                </div>
              </td>
            </tr>
            {/* ... other rows ... */}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ShiftAndSchedule;
