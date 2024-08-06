// src/Sidebar.js
import React from 'react';
import "./Sidebar.css";
import { Link } from 'react-router-dom';


const Sidebar = ({ onSelect }) => {
  return (
    <div className="sidebar z-1 h-screen w-[313px] bg-[#1E1E1E] text-white flex flex-col fixed">

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
        
        <Link to="/MyManuscript"
          className="myManuscript mx-10 whitespace-nowrap
                     focus:font-semibold 
                     focus:ml-[4rem] focus:bg-gradient-to-r from-[#0BF677] to-[#079774] 
                     hover:font-medium hover:ml-[4rem] hover:bg-gradient-to-r from-[#0BF677] to-[#079774]
                     text-white px-2 "
          
        >
        <img className="inline-block mr-2 mb-1" src="./src/assets/my-manuscript.png"/>
          My Manuscript
        </Link>

        <Link to="/ExploreManuscript" 
          className="exploreManuscript mx-10 
                     
                     focus:font-semibold 
                     hover:mr-auto focus:mr-auto focus:ml-[4rem] focus:bg-gradient-to-r from-[#0BF677] to-[#079774] 
                     hover:font-medium hover:ml-[4rem] hover:bg-gradient-to-r from-[#0BF677] to-[#079774]
                     text-white px-2 "
         
        >
        <img className="inline-block mr-2 mb-1" src="./src/assets/explore-manuscript.png"/>
          Explore Manuscript
        </Link>

        

        <Link to="/ViewAnalytics"
          className="viewAnalytics mx-10 
                     focus:font-semibold 
                     hover:ml-[4rem]
                     focus:ml-[4rem] focus:bg-gradient-to-r from-[#0BF677] to-[#079774] 
                     hover:font-medium hover:bg-gradient-to-r from-[#0BF677] to-[#079774]
                     
                     text-white  px-2 "
     
        >
         
          <img className="inline-block mr-2 mb-1" src="./src/assets/User.png"/>
          <span className="text">View Analytics</span>
          
          
        </Link>

        <Link to="/"
          className="revision mx-10 
                     focus:font-semibold 
                     focus:ml-[4rem] focus:bg-gradient-to-r from-[#0BF677] to-[#079774] 
                     hover:font-medium hover:ml-[4rem] hover:bg-gradient-to-r from-[#0BF677] to-[#079774]
                     text-white px-2 "
          
        >
        <img className="inline-block mr-2 mb-1" src="./src/assets/Calendar.png"/>
          Revision
        </Link>

        

      
        
      </div>
      <button className="upload-btn w-[256px] h-[52px]  mt-[260px] ml-[25px] text-[20px]"> Upload<img className="inline-block ml-2 mb-1" src="./src/assets/Folder.png"/></button>

     
     <div className="divider bg-black"></div>
      <div className="mr-5 mt-[0px] space-y-2 text-[20px] ">
    
      <Link to="/" 
            className="ml-[108px] mt-[6px] hover:text-black text-[#FF4444] px-2 rounded text-center "
          
          >
            <img className="inline-block mr-2 mb-1" />
            Logout
          </Link> 
      </div>
     
    </div>
  );
};

export default Sidebar;