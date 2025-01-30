import React from 'react'

const RightPaneProjectDetails = () => {
  return (
<div className="bg-white rounded-lg shadow-md border border-gray-300 p-4 pb-6 mb-4 text-sm font-semibold">
  <h3 className="text-lg font-bold mb-2">Project Details</h3>
  <ul className="space-y-1">
    <li className="flex justify-between bg-gray-200 px-2 py-1">
      <span className="text-gray-700">Cost</span>
      <span className="text-gray-900">₹1200</span>
    </li>
    <li className="flex justify-between px-2 py-1">
      <span className="text-gray-700">Total Hours</span>
      <span className="text-gray-900">100 Hours</span>
    </li>
    <li className="flex justify-between bg-gray-200 px-2 py-1">
      <span className="text-gray-700">Created</span>
      <span className="text-gray-500">25 Feb, 2019</span>
    </li>
    <li className="flex justify-between px-2 py-1">
      <span className="text-gray-700">Deadline</span>
      <span className="text-gray-500">12 Jun, 2019</span>
    </li>
    <li className="flex justify-between bg-gray-200 px-2 py-1">
      <span className="text-gray-700">Priority</span>
      <span className="text-red-500 font-bold">High</span>
    </li>
    <li className="flex justify-between px-2 py-1">
      <span className="text-gray-700">Created by</span>
      <span className="text-gray-500">Barry Cuda</span>
    </li>
    <li className="flex justify-between bg-gray-200 px-2 py-1">
      <span className="text-gray-700">Status</span>
      <span className="text-gray-500">Working</span>
    </li>
  </ul>
  <div>
  <span className="flex justify-between px-2 py-1">
    <span className="text-gray-700">Progress</span>
    <span className="text-green-500">40%</span>
    </span>
    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
      <div className="bg-green-500 h-2 rounded-full" style={{ width: '40%' }}></div>
    </div>
  </div>
</div>
  )
}

export default RightPaneProjectDetails
