import React from 'react'
import { employeeData } from '../api/constents'
import { useNavigate } from 'react-router-dom';

const PaymentTable = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="overflow-x-auto w-full max-w-full">
        <table className="w-full bg-white border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th align="left" className="p-2 border-b">
                Name
              </th>
              <th align="left" className="p-2 border-b">
                EmpId
              </th>
              <th align="left" className="p-2 border-b">
                Email
              </th>
              <th align="left" className="p-2 border-b">
                Date
              </th>
              <th align="left" className="p-2 border-b">
                Role
              </th>
              <th align="left" className="p-2 border-b">
                Salary
              </th>
              <th align="left" className="p-2 border-b">
                PaySlip
              </th>
              <th align="left" className="p-2 border-b">
                Action
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
                <td className="p-2 border-b">{employee.employId}</td>
                <td className="p-2 border-b">{employee.eMail}</td>
                <td className="p-2 border-b">{employee.to}</td>
                <td className="p-2 border-b">{employee.role}</td>
                <td className="p-2 border-b">{employee.salary}</td>
                <td className="p-2 border-b">
                <button onClick={() => navigate("/payslip")}  className="h-18 bg-no-repeat bg-center inline-block rounded-full px-2 py-0.5 border bg-green-700 text-sm text-center text-white">
                    PaySlip
                    </button>

                </td>
                <td align='center' className="p-2 border-b">
                <svg width="5" height="18" viewBox="0 0 5 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.09938 1.006C1.83417 1.00435 1.57917 1.10813 1.39047 1.2945C1.20178 1.48087 1.09484 1.73456 1.0932 1.99977C1.09155 2.26499 1.19533 2.51999 1.3817 2.70869C1.56806 2.89738 1.82176 3.00432 2.08697 3.00596C2.35218 3.00761 2.60719 2.90383 2.79588 2.71746C2.98458 2.53109 3.09151 2.2774 3.09316 2.01219C3.0948 1.74698 2.99103 1.49197 2.80466 1.30328C2.61829 1.11458 2.3646 1.00765 2.09938 1.006ZM2.05594 8.00587C1.79073 8.00422 1.53572 8.108 1.34703 8.29436C1.15833 8.48073 1.0514 8.73443 1.04975 8.99964C1.0481 9.26485 1.15188 9.51985 1.33825 9.70855C1.52462 9.89725 1.77831 10.0042 2.04352 10.0058C2.30873 10.0075 2.56374 9.9037 2.75243 9.71733C2.94113 9.53096 3.04806 9.27726 3.04971 9.01205C3.05136 8.74684 2.94758 8.49184 2.76121 8.30314C2.57484 8.11445 2.32115 8.00751 2.05594 8.00587ZM2.01249 15.0057C1.74728 15.0041 1.49228 15.1079 1.30358 15.2942C1.11488 15.4806 1.00795 15.7343 1.0063 15.9995C1.00466 16.2647 1.10843 16.5197 1.2948 16.7084C1.48117 16.8971 1.73486 17.004 2.00008 17.0057C2.26529 17.0073 2.52029 16.9036 2.70899 16.7172C2.89768 16.5308 3.00462 16.2771 3.00626 16.0119C3.00791 15.7467 2.90413 15.4917 2.71776 15.303C2.5314 15.1143 2.2777 15.0074 2.01249 15.0057Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PaymentTable
