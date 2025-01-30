import React from "react";

const SettingAndConfi = () => {
  return (
    <>
    <div><h1 className="font-semibold text-2xl m-4">Settings</h1></div>
<div className="bg-white p-8 rounded-lg border border-gray-300 shadow-md max-w-5xl mx-auto">
  <h2 className="text-xl font-semibold mb-4 flex items-center">
    <span className="mr-2">🔑</span> Change Password
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

    <div>
      <label className="block text-sm font-medium mb-2" for="old-password">Old Password</label>
      <input
        type="password"
        id="old-password"
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
      />
    </div>


    <div>
      <label className="block text-sm font-medium mb-2" for="new-password">New Password</label>
      <input
        type="password"
        id="new-password"
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
      />
    </div>


    <div>
      <label className="block text-sm font-medium mb-2" for="confirm-password">Confirm Password</label>
      <input
        type="password"
        id="confirm-password"
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
      />
    </div>
  </div>

  <div className="text-center">
    <button className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400">
      Update
    </button>
  </div>
</div>


<div className="bg-teal-50 p-4 rounded-lg max-w-6xl mx-auto">

  <div className="border border-gray-300 flex items-center bg-white p-4 mb-4 rounded-lg shadow-sm hover:bg-gray-50 cursor-pointer">
    <span className="mr-3">

      <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10c0 3.866-3.134 7-7 7a6.978 6.978 0 01-4.928-2.071l-4.29 1.072 1.073-4.29A6.978 6.978 0 013 10c0-3.866 3.134-7 7-7s7 3.134 7 7zM7 9a1 1 0 112 0 1 1 0 01-2 0zm2.293 2.707a1 1 0 00-1.414 1.415 2 2 0 102.829 0 1 1 0 00-1.415-1.415z" clip-rule="evenodd"/></svg>
    </span>
    <span className="text-lg font-medium text-black">FAQ</span>
  </div>


  <div className=" border border-gray-300 flex items-center bg-white p-4 rounded-lg shadow-sm hover:bg-gray-50 cursor-pointer">
    <span className="mr-3">
      <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10c0 3.866-3.134 7-7 7a6.978 6.978 0 01-4.928-2.071l-4.29 1.072 1.073-4.29A6.978 6.978 0 013 10c0-3.866 3.134-7 7-7s7 3.134 7 7zM9 9a1 1 0 012-0 1 1 0 00-2 0zm1.707 2.707a1 1 0 10-1.414 1.415 2 2 0 112.829 0 1 1 0 00-1.415-1.415z" clip-rule="evenodd"/></svg>
    </span>
    <span className="text-lg font-medium text-black">Help Center</span>
  </div>
</div>

    </>
  );
};

export default SettingAndConfi;
