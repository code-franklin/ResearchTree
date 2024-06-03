import React from 'react';

const ActivityRow = ({ activity }) => {
  const { name, url, progress, date, status, icon } = activity;

  const getStatusClasses = () => {
    switch (status) {
      case 'In Progress':
        return 'bg-yellow-500 text-black';
      case 'Done':
        return 'bg-green-500 text-white';
      case 'Undone':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <tr className="border-b border-gray-700">
      <td className="py-2 flex items-center space-x-2">
        <img src={icon} alt="" className="w-8 h-8 rounded-full" />
        <div>
          <div>{name}</div>
          <div className="text-gray-400 text-sm">{url}</div>
        </div>
      </td>
      <td className="py-2">
        <div className="flex items-center space-x-2">
          <div className="w-full bg-gray-600 rounded-full h-2.5">
            <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
          <span>{progress}%</span>
        </div>
      </td>
      <td className="py-2">{date}</td>
      <td className="py-2">
        <span className={`px-2 py-1 rounded ${getStatusClasses()}`}>{status}</span>
      </td>
      <td className="py-2 flex space-x-2">
        <button className="text-red-500 hover:text-red-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <button className="text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12H9m0 0h6M9 16h6" />
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default ActivityRow;
