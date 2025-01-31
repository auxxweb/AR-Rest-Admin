import React, { useState } from "react";
import Modal from "../reUsableCmponent/modal/Modal";
import PaymentTable from "../PaymentTable";

const PaymentPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedDesignation, setSelectedDesignation] =
    useState("Total Project : 3");

  const selectRole = () => {
    setSelectedRole("");
    setSelectedDesignation("");
  };
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const selectProfession = (event) => {
    setSelectedDesignation(event.target.value);
  };

  const handleInputChange = (event) => {
    setSelectedRole(event.target.value);
  };
  return (
    <>
      <div className="flex rounded-lg p-4">
        <h2 className="text-2xl font-semibold text-gray-700">
          Payment Details
        </h2>
        <div className="ml-auto flex items-center space-x-4">
          {" "}
          <span className="flex items-center">
            <span
              className="bg-[#808080] text-white rounded-full p-3 cursor-pointer"
              onClick={toggleModal}
            >
              + Add Salary
            </span>

            <Modal
              isVisible={isModalVisible}
              onClose={toggleModal}
              modalHeader={"Add Staff Salary"}
            >
            <div className="max-h-[80vh] overflow-y-auto pr-4">
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="department"
                  className="block text-sm font-medium text-gray-700"
                >
                  Select staff
                </label>
                <select
                  id="department"
                  className="p-1 mt-1 block w-full border-2 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="Web Developer">John Doe</option>
                  <option value="Other">Other</option>
                </select>
              </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Net Salary
                    </label>
                    <input
                      type="text"
                      name="netSalary"
                      id="netSalary"
                      className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Net salary"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="earnings"
                      className="block text-sm font-medium text-blue-700"
                    >
                      Earnings
                    </label>
                    <input
                      type="text"
                      name="earnings"
                      id="earnings"
                      className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Earnings"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-blue-700"
                    >
                      Deduction
                    </label>
                    <input
                      type="deduction"
                      name="deduction"
                      id="deduction"
                      className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Deduction"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="da"
                      className="block text-sm font-medium text-gray-700"
                    >
                      DA 40%
                    </label>
                    <input
                      type="text"
                      name="da"
                      id="da"
                      className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Da 40%"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="esi"
                      className="block text-sm font-medium text-gray-700"
                    >
                      ESI
                    </label>
                    <input
                      type="text"
                      name="esi"
                      id="esi"
                      className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="ESI"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="hra"
                      className="block text-sm font-medium text-gray-700"
                    >
                      HRA
                    </label>
                    <input
                      type="text"
                      name="hra"
                      id="hra"
                      className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="HRA"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="pfi"
                      className="block text-sm font-medium text-gray-700"
                    >
                      PFI
                    </label>
                    <input
                      type="text"
                      name="pfi"
                      id="pfi"
                      className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="PFI"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="conveyance"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Conveyance
                    </label>
                    <input
                      type="text"
                      name="conveyance"
                      id="conveyance"
                      className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Conveyance"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="leave"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Leave
                    </label>
                    <input
                      type="text"
                      name="leave"
                      id="leave"
                      className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="leave"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Address"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="location"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      id="location"
                      className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Location"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="allowance"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Allowance
                    </label>
                    <input
                      type="text"
                      name="allowance"
                      id="allowance"
                      className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Allowance"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="Prof.Tax"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Prof.Tax
                    </label>
                    <input
                      type="text"
                      name="prof.tax"
                      id="prof.tax"
                      className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="prof.tax"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="medicalAllowance"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Madical Allowance
                    </label>
                    <input
                      type="text"
                      name="medicalAllowance"
                      id="medicalAllowance"
                      className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Medical Allowance"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="labourWelFare"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Labour WellFare
                    </label>
                    <input
                      type="text"
                      name="labourWllFare"
                      id="labourWllFare"
                      className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="labourWllFare"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="others"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Others
                    </label>
                    <input
                      type="text"
                      name="others1"
                      id="others1"
                      className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Others"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="Others"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Others
                    </label>
                    <input
                      type="text"
                      name="others2"
                      id="others2"
                      className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="others2"
                      required
                    />
                  </div>
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
              </div>
            </Modal>
          </span>
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
                All
              </option>
              <option value="All">All</option>
              <option value="Web Designer">Web Designer</option>
              <option value="Web Developer">Web Developer</option>
              <option value="FrontEnd Developer">FrontEnd Developer</option>
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
        <PaymentTable />
      </div>
    </>
  );
};

export default PaymentPage;
