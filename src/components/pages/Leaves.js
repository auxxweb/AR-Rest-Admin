import { useState } from "react";
import TableLeaves from "../reUsableCmponent/TableLeaves";

function Leaves() {
  const [selectedDesignation, setSelectedDesignation] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const handleInputChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const selectProfession = (event) => {
    setSelectedDesignation(event.target.value);
  };

  const selectRole = () => {
    setSelectedRole("");
    setSelectedDesignation("");
  };

  // Handle file input change

  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-700 pl-2">Leaves</h2>
      <div className=" mt-4 mb-4 flex space-x-6 p-2 rounded-md text-2xl">
        <div className="flex flex-col items-center justify-center w-full border border-gray-500 bg-blue-100 rounded-md">
          <p className="text-gray-700 font-semibold text-sm">Today Presents</p>
          <p className="text-gray-70 font-semibold">12/60</p>
        </div>
        <div className="flex flex-col items-center justify-center w-full border border-gray-500 bg-white p-2 rounded-md">
          <p className="text-gray-700 font-semibold text-sm">Planned Leaves</p>
          <p className="text-gray-70 font-semibold">8</p>
        </div>
        <div className="flex flex-col items-center justify-center w-full border border-gray-500 bg-white rounded-md">
          <p className="text-gray-700 font-semibold text-sm">
            Unplanned Leaves
          </p>
          <p className="text-gray-70 font-semibold">0</p>
        </div>
        <div className="flex flex-col items-center justify-center w-full border border-gray-500 bg-white rounded-md">
          <p className="text-gray-700 font-semibold text-sm">Pending Leaves</p>
          <p className="text-gray-70 font-semibold">3</p>
        </div>
      </div>

      <div className="flex rounded-lg p-2 mb-4">
        <div
          value={selectedDesignation}
          onChange={selectProfession}
          className="p-2  rounded lg:w-[100px] h-11 appearance-none text-gray-500 font-semibold bg-white border border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 pr-10 bg-no-repeat bg-right"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg%20width='16'%20height='18'%20viewBox='0%200%2016%2018'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3E%3Cpath%20d='M10%209V16.88C10.04%2017.18%209.94001%2017.5%209.71001%2017.71C9.61749%2017.8027%209.50761%2017.8762%209.38663%2017.9264C9.26566%2017.9766%209.13598%2018.0024%209.00501%2018.0024C8.87404%2018.0024%208.74436%2017.9766%208.62338%2017.9264C8.50241%2017.8762%208.39252%2017.8027%208.30001%2017.71L6.29001%2015.7C6.18101%2015.5933%206.09812%2015.4629%206.04782%2015.319C5.99751%2015.175%205.98115%2015.0213%206.00001%2014.87V9H5.97001L0.210009%201.62C0.0476172%201.41153-0.0256572%201.14726%200.00619692%200.88493C0.038051%200.622602%200.172444%200.383546%200.380009%200.22C0.570009%200.08%200.780009%200%201.00001%200H15C15.22%200%2015.43%200.08%2015.62%200.22C15.8276%200.383546%2015.962%200.622602%2015.9938%200.88493C16.0257%201.14726%2015.9524%201.41153%2015.79%201.62L10.03%209H10Z'%20fill='gray'/%3E%3C/svg%3E")`,
            backgroundSize: "20px 20px",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 12px center",
            paddingRight: "40px",
          }}
        >
          Filter
        </div>

        <div className="ml-auto flex items-center space-x-6">
          {/* Parent div for span elements */}
          <span className="flex items-center justify-center">
            <input
              value={selectedRole} // Bind the state to the input value
              onChange={handleInputChange} // Call handleInputChange on input change
              className="p-2 lg:w-[200px] rounded w-full appearance-none bg-white border border-gray-500"
              placeholder="EmpId"
            />
          </span>

          <span className="flex items-center">
            <select
              value={selectedDesignation}
              onChange={selectProfession}
              className="rounded p-2 lg:w-[150px] w-full appearance-none bg-white border border-gray-400 focus:ring-indigo-500 focus:border-indigo-500 pr-10 bg-no-repeat bg-right"
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
                Leave Type
              </option>
              <option value="All">Medical Leave</option>
              <option value="Web Designer">Personal Leave</option>
              <option value="Web Developer">Bereavement Leave</option>
              <option value="FrontEnd Developer">Maternity Leave</option>
            </select>
          </span>
          <span className="flex items-center">
            <span
              onClick={selectRole} // Call selectRole when the Search button is clicked
              className="cursor-pointer bg-[#808080] text-white p-2 lg:w-[228px] rounded text-center"
            >
              Search
            </span>
          </span>
        </div>
      </div>

      <div className="p-2">
        <TableLeaves />
      </div>

    </>
  );
}

export default Leaves;
