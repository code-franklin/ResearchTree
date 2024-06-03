// src/Sidebar.js
import React from 'react';
import "./Sidebar.css";
const Sidebar = ({ onSelect }) => {
  return (
    <div className="h-screen w-[313px] bg-[#1E1E1E] text-white flex flex-col shadow-custom-shadow">
      <div className='flex ml-[9px] '>
        <div className="myName ml-[50px] mt-[70px] p-4 text-[21px] font-semibold text-center">
      <img className="ml-[40px]" src="./src/assets/logo.png"/>
        Franklin Mayad</div>
        </div>
      
      <div className="mt-20 space-y-2 text-[20px]">
        
        <button 
          className="viewAnalytics mx-10 whitespace-nowrap
                     hover:ml-[4rem] 
                     focus:ml-[4rem] focus:font-bold focus:bg-gradient-to-r from-[#0066FF] to-[#8F00FF] 
                     hover:font-bold hover:bg-gradient-to-r from-[#0066FF] to-[#8F00FF] 
                     text-white  px-4 "
          onClick={() => onSelect('ViewAnalytics')}
        >
          <img className="inline-block mr-2 mb-1" src="./src/assets/User.png"/>
          View Analytics
        </button>

        <button 
          className="mx-10 whitespace-nowrap
                     focus:ml-[4rem] focus:font-bold focus:bg-gradient-to-r from-[#0066FF] to-[#8F00FF] 
                     hover:ml-[4rem] hover:font-bold hover:bg-gradient-to-r from-[#0066FF] to-[#8F00FF] 
                     text-white px-4 "
          onClick={() => onSelect('ViewActivities')}
        >
        <img className="inline-block mr-2 mb-1" src="./src/assets/Calendar.png"/>
          View Activities
        </button>

        <div className=''>
        <button 
          className="whitespace-nowrap mx-10 py-[0px] mt-[350px] 
                     focus:ml-[4rem] focus:font-bold focus:bg-gradient-to-r from-[#0066FF] to-[#8F00FF] 
                     hover:ml-[4rem] hover:font-bold hover:bg-gradient-to-r from-[#0066FF] to-[#8F00FF] 
                     text-white  py-2 px-4"
          onClick={() => onSelect('ProfileSettings')}
        >
            <img className="inline-block mr-2 mb-1 " src="./src/assets/Folder.png"/>
          Profile Settings
        </button>
        <button 
          className=" mx-10 py-0  hover:bg-black text-white  py-0 px-4 rounded"
          onClick={() => onSelect('Logout')}
        >
          <img className="inline-block mr-2 mb-1" src="./src/assets/Setting.png"/>
          Logout
        </button>
        </div>
      
      </div>
    </div>
  );
};

export default Sidebar;