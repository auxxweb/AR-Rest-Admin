import React from "react";
import { employeeData } from "../../api/constents";

const TableLeaves = () => {
  return (
    <div>
      <div className="overflow-x-auto w-full max-w-full">
        <table className="w-full bg-white border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th align="left" className="p-2 border-b">
                Employee
              </th>
              <th align="left" className="p-2 border-b">
                LeaveType
              </th>
              <th align="left" className="p-2 border-b">
                From
              </th>
              <th align="left" className="p-2 border-b">
                To
              </th>
              <th align="left" className="p-2 border-b">
                NoOfDays
              </th>
              <th align="left" className="p-2 border-b">
                Reason
              </th>
              <th align="left" className="p-2 border-b">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {employeeData?.map((employee, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-50 ${
                  index % 2 === 0 ? "bg-[#dafff9]" : ""
                }`}
              >
                <td className="flex p-0 border-b">
                  <span>
                    <img
                      src={employee.avatar}
                      alt={employee.name}
                      className="w-14 h-14 p-2 rounded-full"
                    />
                  </span>
                  <span className="p-4">{employee.name}</span>
                </td>
                <td className="p-2 border-b">{employee.LeaveType}</td>
                <td className="p-2 border-b">{employee.from}</td>
                <td className="p-2 border-b">{employee.to}</td>
                <td className="p-2 border-b">{employee.noOfDays}</td>
                <td className="p-2 border-b">{employee.reason}</td>
                <td className="p-2 border-b">
                <span
  className="h-18 bg-no-repeat bg-center inline-block rounded-full p-2 border border-gray-400 text-sm w-[145px] text-center"
  style={{
    backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 124 124"><circle cx="62" cy="62" r="40" fill="${employee.roundColor}"/><circle cx="62" cy="62" r="22" fill="white"/><circle cx="62" cy="62" r="11" fill="${employee.roundColor}"/></svg>')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'left top', // Align it to the left
  }}
>
  {employee.leaveStatus}
</span>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableLeaves;
