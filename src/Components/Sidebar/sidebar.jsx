// src/Sidebar.js
import React from 'react';
import "./Sidebar.css";

const Sidebar = ({ onSelect }) => {
  return (
    <div className="h-screen w-[313px] bg-[#1E1E1E] text-white flex flex-col shadow-custom-shadow fixed">


        <div>
        <img className="" src="./src/assets/rstreelogo.png"/>
        </div>
        
      <div className='flex ml-[9px] '>
        <div className="myName ml-[50px] mt-[20px] p-4 text-center">
      <img className="ml-[40px]" src="./src/assets/logo.png"/>
        <span className="text-[21px] font-semibold">Franklin Mayad </span>
        
        <p className="font-light text-[#4B4B4B]">Student</p>
        </div>
       
        </div>


        
      
      <div className="mr-5 mt-[30px] space-y-2 text-[20px] ">
        
        

        <button 
          className="myManuscript mx-10 whitespace-nowrap
                     focus:font-semibold 
                     focus:ml-[4rem] focus:bg-gradient-to-r from-[#0BF677] to-[#079774] 
                     hover:font-medium hover:ml-[4rem] hover:bg-gradient-to-r from-[#0BF677] to-[#079774]
                     text-white px-2 "
          onClick={() => onSelect('MyManuscript')}
        >
        <img className="inline-block mr-2 mb-1" src="./src/assets/Calendar.png"/>
          My Manuscript
        </button>

        <button 
          className="exploreManuscript mx-10 whitespace-nowrap
                     focus:font-semibold 
                     hover:mr-auto focus:mr-auto focus:ml-[4rem] focus:bg-gradient-to-r from-[#0BF677] to-[#079774] 
                     hover:font-medium hover:ml-[4rem] hover:bg-gradient-to-r from-[#0BF677] to-[#079774]
                     text-white px-2 "
          onClick={() => onSelect('ExploreManuscript')}
        >
        <img className="inline-block mr-2 mb-1" src="./src/assets/Calendar.png"/>
          Explore Manuscripts
        </button>

        

        <button 
          className="viewAnalytics mx-10 
                     focus:font-semibold 
                     hover:ml-[4rem]
                     focus:ml-[4rem] focus:bg-gradient-to-r from-[#0BF677] to-[#079774] 
                     hover:font-medium hover:bg-gradient-to-r from-[#0BF677] to-[#079774]
                     
                     text-white  px-2 "
          onClick={() => onSelect('ViewAnalytics')}
        >
         
          <img className="inline-block mr-2 mb-1" src="./src/assets/User.png"/>
          <span className="text">View Analytics</span>
          
          
        </button>

        <button 
          className="revision mx-10 whitespace-nowrap
                     focus:font-semibold 
                     focus:ml-[4rem] focus:bg-gradient-to-r from-[#0BF677] to-[#079774] 
                     hover:font-medium hover:ml-[4rem] hover:bg-gradient-to-r from-[#0BF677] to-[#079774]
                     text-white px-2 "
          onClick={() => onSelect('MyManuscript')}
        >
        <img className="inline-block mr-2 mb-1" src="./src/assets/Calendar.png"/>
          Revision
        </button>

        <button 
          className="revision mx-10 whitespace-nowrap
                     focus:font-semibold 
                     focus:ml-[4rem] focus:bg-gradient-to-r from-[#0BF677] to-[#079774] 
                     hover:font-medium hover:ml-[4rem] hover:bg-gradient-to-r from-[#0BF677] to-[#079774]
                     text-white px-2 "
          onClick={() => onSelect('MyManuscript')}
        >
        <img className="inline-block mr-2 mb-1" src="./src/assets/Folder.png"/>
          Profile Settings
        </button>
        
       
     
      
    
      
       
      
      </div>
      <button className="upload-btn w-[256px] h-[52px]  mt-[200px] ml-[25px] text-[20px]"> Upload<img className="inline-block ml-2 mb-1" src="./src/assets/Folder.png"/></button>

     
     <div className="divider bg-black"></div>
      <div className="mr-5 mt-[0px] space-y-2 text-[20px] ">
    
      <button 
            className="ml-[108px] mt-[6px] hover:text-black text-[#FF4444] px-2 rounded text-center "
            onClick={() => onSelect('Logout')}
          >
            <img className="inline-block mr-2 mb-1" />
            Logout
          </button> 
      </div>
     
    </div>
  );
};

export default Sidebar;