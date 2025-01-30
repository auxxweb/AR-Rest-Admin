import React from 'react'
import { useNavigate } from 'react-router-dom';

const ProjectDetailsCard = () => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate("/detailedprojectpage")} className="cursor-pointer bg-white shadow-md rounded-lg p-6 w-full max-w-sm mx-auto">
    {/* Project Title and Tasks */}
    <div className="mb-4">
      <h2 className="text-xl font-bold text-gray-700 mb-2">Office Management</h2>
      <p className="text-gray-500">
        <span className="font-semibold text-white bg-gray-700 rounded-full px-1">2</span> open tasks,{' '}
        <span className="font-semibold text-white bg-gray-700 rounded-full px-1">4</span> tasks completed
      </p>
    </div>

    {/* Project Description */}
    <div className="mb-16">
      <p className="text-sm text-gray-900">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. When an unknown printer took a galley of type and scrambled
        it...When an unknown printer took a galley of type and scrambled it...
      </p>
    </div>

    {/* Deadline */}
    <div className="mb-4">
      <p className="font-semibold text-black text-lg">Deadline:</p>
      <p className="text-gray-500">17 Apr 2019</p>
    </div>

    {/* Project Leader */}
    <div className="mb-4">
      <p className="font-semibold text-black text-lg mb-2">Project Leader :</p>
      <div className="flex items-center">
        <img
          src="https://www.hollywoodreporter.com/wp-content/uploads/2024/02/Avatar__The_Last_Airbender_n_S1_00_13_15_10RC.jpgAvatar__The_Last_Airbender_n_S1_00_13_15_10RC-H-2024.jpg?w=1296&h=730&crop=1&resize=681%2C383"
          alt="leader"
          className="h-8 w-8 rounded-full mr-2"
        />
        <span className="text-gray-700">Rahul , Guru</span>
      </div>
    </div>

    {/* Team Members */}
    <div className="mb-4">
      <p className="font-semibold text-gray-700">Team :</p>
      <div className="flex items-center">
        {/* Loop over the team members to create similar avatars */}
        <img
          src="https://media.gettyimages.com/id/1354842602/photo/portrait-of-a-young-businesswoman-working-on-a-laptop-in-an-office.jpg?s=1024x1024&w=gi&k=20&c=hoAhrKHX9FVYs3EaxBgZ1WmIw4qi4cdc1JrB5xsXsuI="
          alt="team"
          className="h-10 w-10 rounded-full  ml-[-8px] border-2 border-white"
        />
        <img
          src="https://media.gettyimages.com/id/1369199360/photo/portrait-of-a-handsome-young-businessman-working-in-office.jpg?s=612x612&w=gi&k=20&c=BFc13n-vhT4GMd0ohRt0PFD3IzJ_Onf6nKDAObgh1CA="
          alt="team"
          className="h-10 w-10 rounded-full ml-[-12px] border-2 border-white"
        />
        <img
          src="https://media.gettyimages.com/id/1299077582/photo/positivity-puts-you-in-a-position-of-power.jpg?s=612x612&w=gi&k=20&c=xBZQF30WrZt9HWBKseqwDmKotwJGWe8jkEI9cajC1RM="
          alt="team"
          className="h-10 w-10 rounded-full ml-[-12px] border-2 border-white"
        />
        <img
          src="https://www.hollywoodreporter.com/wp-content/uploads/2024/02/Avatar__The_Last_Airbender_n_S1_00_13_15_10RC.jpgAvatar__The_Last_Airbender_n_S1_00_13_15_10RC-H-2024.jpg?w=1296&h=730&crop=1&resize=681%2C383"
          alt="team"
          className="h-10 w-10 rounded-full ml-[-12px] border-2 border-white "
        />
        <div className="h-10 w-10 rounded-full bg-red-500 text-white flex items-center justify-center">
          +5
        </div>
      </div>
    </div>

    {/* Progress Bar */}
    <div className="mb-4">
      <p className="font-semibold text-gray-700">Progress</p>
      <div className="relative pt-1">
        <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
          <div
            style={{ width: '60%' }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
          ></div>
        </div>
      </div>
      <p className="text-green-600 font-semibold text-right mt-1">60%</p>
    </div>
  </div>
  )
}

export default ProjectDetailsCard
