import React from 'react';
import ActivityRow from './ActivityRow';

const activities = [
  { name: 'Feeding Program', url: 'cataloggapp.io', progress: 60, date: 'Jan 22 2024', status: 'In Progress', icon: 'https://via.placeholder.com/32/feeding.png' },
  { name: 'Brigada', url: 'cataloggapp.io', progress: 100, date: 'Jan 22 2024', status: 'Done', icon: 'https://via.placeholder.com/32/brigada.png' },
  { name: 'Feeding Program', url: 'cataloggapp.io', progress: 87, date: 'Jan 22 2024', status: 'In Progress', icon: 'https://via.placeholder.com/32/feeding.png' },
  { name: 'Feeding Program', url: 'cataloggapp.io', progress: 32, date: 'Jan 22 2024', status: 'In Progress', icon: 'https://via.placeholder.com/32/feeding.png' },
  { name: 'Feeding Program', url: 'cataloggapp.io', progress: 15, date: 'Jan 22 2024', status: 'In Progress', icon: 'https://via.placeholder.com/32/feeding.png' },
  { name: 'Feeding Program', url: 'cataloggapp.io', progress: 100, date: 'Jan 22 2024', status: 'Done', icon: 'https://via.placeholder.com/32/feeding.png' },
  { name: 'Feeding Program', url: 'cataloggapp.io', progress: 10, date: 'Jan 22 2024', status: 'Undone', icon: 'https://via.placeholder.com/32/feeding.png' },
];

const ActivityTable = () => {
  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-lg">
      <div className="p-4 flex justify-between items-center">
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">View All</button>
          <button className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">In Progress</button>
          <button className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">Done</button>
          <button className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">Undone</button>
        </div>
        <input
          type="text"
          placeholder="Search Activities"
          className="px-4 py-2 bg-gray-700 rounded focus:outline-none"
        />
        <button className="px-4 py-2 bg-green-600 rounded hover:bg-green-500">+ Add Project</button>
      </div>
      <div className="p-4">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Activities</th>
              <th className="text-left">Progress</th>
              <th className="text-left">Last assessed</th>
              <th className="text-left">Status</th>
              <th className="text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => (
              <ActivityRow key={index} activity={activity} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActivityTable;
