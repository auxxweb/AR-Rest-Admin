import React, { useState } from 'react';

const ProjectStatusTab = () => {
  const [selectedTab, setSelectedTab] = useState('All Tasks');
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Patient appointment booking', completed: false },
    { id: 2, name: 'Appointment booking with payment gateway', completed: true },
    { id: 3, name: 'Doctor available module', completed: false },
    { id: 4, name: 'Pricate chat module', completed: true },
    { id: 5, name: 'Patient rofile add', completed: true },
  ]);

  const filterTasks = (task) => {
    if (selectedTab === 'All Tasks') {
      return true;
    } else if (selectedTab === 'Pending Tasks') {
      return !task.completed;
    } else if (selectedTab === 'Completed Tasks') {
      return task.completed;
    }
    return false;
  };

  const handleTaskCompletion = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-300 p-4 pb-6 mb-4">
      <div className="flex justify-between mt-2 mb-4">
        <h3 className="text-lg font-bold">Tasks</h3>
        <ul className="flex space-x-4">
          <li
            className={`cursor-pointer text-gray-500 ${selectedTab === 'All Tasks' ? 'font-bold text-teal-500' : ''}`}
            onClick={() => setSelectedTab('All Tasks')}
          >
            All Tasks
          </li>
          <li
            className={`cursor-pointer text-gray-500 ${selectedTab === 'Pending Tasks' ? 'font-bold text-teal-500' : ''}`}
            onClick={() => setSelectedTab('Pending Tasks')}
          >
            Pending Tasks
          </li>
          <li
            className={`cursor-pointer text-gray-500 ${selectedTab === 'Completed Tasks' ? 'font-bold text-teal-500' : ''}`}
            onClick={() => setSelectedTab('Completed Tasks')}
          >
            Completed Tasks
          </li>
        </ul>
      </div>
      <ul className="space-y-2">
  {tasks.filter(filterTasks).map((task) => (
    <li key={task.id} className="flex items-center border  rounded-md py-2 px-4">
    <input
        type="checkbox"
        className="mr-2 rounded-full w-4 h-4 border border-gray-300 checked:bg-green-500"
        checked={task.completed}
        onChange={() => handleTaskCompletion(task.id)}
        />
      <p className="text-gray-700">{task.name}</p>
    </li>
  ))}
</ul>
    </div>
  );
};

export default ProjectStatusTab;