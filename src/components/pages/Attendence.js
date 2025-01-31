import { useState } from "react";

const Attendence = () => {
  const employeeData = [
    { name: "John Doe", attendance: [true, false, true, false,true, true, true, false,true, false, true] },
    { name: "Anu", attendance: [true, false, true, false,true, true, true, false,true, false, true] },
    { name: "Vinu", attendance: [false, false, false, true,true, true, true, false,true, false, true] },
    { name: "Sinu", attendance: [true, false, true, false,true, false, true, false,true, false, true] },
    { name: "Tom", attendance: [true, true, true, false,true, true, true, false,false, false, true] },
    { name: "Lan", attendance: [true, false, true, false,true, true, true, true,true, false, true] },
    // ... other employee data
  ];
  const [selectedDesignation, setSelectedDesignation] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  // const handleCheckboxChange = (index, column) => {
  //   const updatedData = employeeData.map((employee, i) => {
  //     if (i === index) {
  //       return {
  //         ...employee,
  //         attendance: employee.attendance.map((present, j) => {
  //           if (j < column && !employee.attendance.slice(0, j).every(Boolean)) {
  //             // Disable previous checkboxes if current one is unchecked
  //             return false;
  //           }
  //           return j === column ? !present : present;
  //         }),
  //       };
  //     }
  //     return employee;
  //   });

  //   setEmployeeData(updatedData);
  // };

  const selectProfession = (event) => {
    setSelectedDesignation(event.target.value);
  }

  const selectRole = () => {
    setSelectedRole("");
    setSelectedDesignation("");
  }

  const handleInputChange = (event) => {
    setSelectedRole(event.target.value);
  }

  return (
    <div>
         <h2 className="text-2xl font-semibold text-gray-700 pl-2 mb-4 mt-4">Attendence</h2>
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
            <span
              onClick={selectRole} // Call selectRole when the Search button is clicked
              className="cursor-pointer bg-[#808080] text-white p-2 lg:w-[228px] rounded text-center"
            >
              Search
            </span>
          </span>
        </div>
      </div>

      <div className="overflow-x-auto w-full max-w-full mt-8">
  <table className="min-w-max w-full table-auto border-collapse border border-gray-500">
    <thead>
      <tr>
        <th align="left" className="border border-gray-200 px-4 py-2">Name</th>
        <th className="border border-gray-200 px-4 py-2">1</th>
        <th className="border border-gray-200 px-4 py-2">2</th>
        <th className="border border-gray-200 px-4 py-2">3</th>
        <th className="border border-gray-200 px-4 py-2">4</th>
        <th className="border border-gray-200 px-4 py-2">5</th>
        <th className="border border-gray-200 px-4 py-2">6</th>
        <th className="border border-gray-200 px-4 py-2">7</th>
        <th className="border border-gray-200 px-4 py-2">8</th>
        <th className="border border-gray-200 px-4 py-2">9</th>
        <th className="border border-gray-200 px-4 py-2">10</th>
        <th className="border border-gray-200 px-4 py-2">31</th>
      </tr>
    </thead>
    <tbody>
      {employeeData.map((employee, index) => (
        <tr key={index}>
          <td className="border border-gray-200 px-4 py-2">{employee.name}</td>
          {employee.attendance.map((present, column) => (
            <td key={column} className="border border-gray-200 px-4 py-2">
              {present ? (
                <svg
                  width="20"
                  height="16"
                  viewBox="0 0 15 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.65051 11.2812L1.11145 6.74219C0.838013 6.46875 0.838013 6.00391 1.11145 5.73047L2.09583 4.74609C2.36926 4.47266 2.80676 4.47266 3.0802 4.74609L6.17004 7.80859L12.7325 1.24609C13.006 0.972656 13.4435 0.972656 13.7169 1.24609L14.7013 2.23047C14.9747 2.50391 14.9747 2.96875 14.7013 3.24219L6.66223 11.2812C6.38879 11.5547 5.92395 11.5547 5.65051 11.2812Z"
                    fill="#36BA45"
                  />
                </svg>
              ) : (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 11 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.03723 5.75L9.77161 8.51172C10.1271 8.83984 10.1271 9.38672 9.77161 9.71484L9.17004 10.3164C8.84192 10.6719 8.29504 10.6719 7.96692 10.3164L5.23254 7.58203L2.47083 10.3164C2.1427 10.6719 1.59583 10.6719 1.2677 10.3164L0.666138 9.71484C0.310669 9.38672 0.310669 8.83984 0.666138 8.51172L3.40051 5.75L0.666138 3.01562C0.310669 2.6875 0.310669 2.14062 0.666138 1.8125L1.2677 1.21094C1.59583 0.855469 2.1427 0.855469 2.47083 1.21094L5.23254 3.94531L7.96692 1.21094C8.29504 0.855469 8.84192 0.855469 9.17004 1.21094L9.77161 1.8125C10.1271 2.14062 10.1271 2.6875 9.77161 3.01562L7.03723 5.75Z"
                    fill="#FC133D"
                  />
                </svg>
              )}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
};

export default Attendence;