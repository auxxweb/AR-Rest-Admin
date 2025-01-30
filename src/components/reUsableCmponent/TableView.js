import React from 'react';
import { employeeData } from '../../api/constents';

const TableView = ({ selectedDesignation, selectedRole }) => {

    const filteredEmployees = employeeData.filter(employee => {
        const matchesDesignation = 
          selectedDesignation === "" || 
          selectedDesignation === "All" || 
          employee.role === selectedDesignation;
      
        const matchesRole = 
          selectedRole === "" || 
          selectedRole === "All" || 
          employee.employId.toLowerCase().includes(selectedRole.toLowerCase()) ||
          employee.name.toLowerCase().includes(selectedRole.toLowerCase()) 
        return matchesDesignation && matchesRole;
      });


  return (
    <div className="overflow-x-auto w-full max-w-full p-4">
      <table className="w-full bg-white border border-gray-300 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th align='left' className="p-2 border-b"></th>
            <th align='left' className="p-2 border-b">Name</th>
            <th align='left' className="p-2 border-b">EmpID</th>
            <th align='left' className="p-2 border-b">Email</th>
            <th align='left' className="p-2 border-b">Mobile</th>
            <th align='left' className="p-2 border-b">Code</th>
            <th align='left' className="p-2 border-b">Role</th>
            <th align='left' className="p-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees?.map((employee, index) => (
            <tr key={index} className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-[#dafff9]' : ''}`}>
              <td className="p-2 border-b">
                <img
                  src={employee.avatar}
                  alt={employee.name}
                  className="w-10 h-10 rounded-full"
                />
              </td>
              <td className="p-1 border-b">{employee.name}</td>
              <td className="p-2 border-b">{employee.employId}</td>
              <td className="p-2 border-b">{employee.eMail}</td>
              <td className="p-2 border-b">{employee.mobile}</td>
              <td className="p-2 border-b">{employee.strideCode}</td>
              <td className="p-2 border-b">
              <span className="inline-block rounded-full p-2 border border-gray-400 text-sm w-[145px] text-center">
                {employee.role}
                </span>


              </td>
              <td className="p-2 border-b">
                <h1 className="text-black mr-2 font-bold">...</h1>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableView;
