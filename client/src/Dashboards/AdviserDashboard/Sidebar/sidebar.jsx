// src/Sidebar.js
import React from 'react';
import "./Sidebar.css";
import { Link } from 'react-router-dom';
import UserAvatar from './Avatar'


const Sidebar = ({ onSelect }) => {

  const user = JSON.parse(localStorage.getItem('user'));
  
  return (
    <div className="sidebar z-1 h-screen w-[313px] bg-[#1E1E1E] text-white flex flex-col fixed">

        <div>
        <img className="" src="/src/assets/rstreelogo.png"/>
        </div>
        
      <div className='flex ml-[9px] '>
        <div className="myName ml-[50px] mt-[20px] p-4 text-center">
      <UserAvatar/>
        <span className="text-[21px] font-semibold">{user.name}</span>
        
        <p className="font-light text-[#4B4B4B]">{user.role}</p>
        </div>
       
        </div>
      
      <div className="mr-5 mt-[30px] space-y-2 text-[20px] ">
        
        <Link to="AdviserDashboard/MyAdvisee"
          className="myManuscript mx-10 whitespace-nowrap
                     focus:font-semibold 
                     focus:ml-[4rem] focus:bg-gradient-to-r from-[#0BF677] to-[#079774] 
                     hover:font-medium hover:ml-[4rem] 
                     text-white px-2 "
          
        >
        <img className="inline-block mr-2 mb-1" src="/src/assets/my-manuscript.png"/>
          My Advisee
        </Link>



        <Link to="AdviserDashboard/Publishing" 
          className="exploreManuscript mx-10 
                     
                     focus:font-semibold 
                     hover:mr-auto focus:mr-auto focus:ml-[4rem] focus:bg-gradient-to-r from-[#0BF677] to-[#079774] 
                     hover:font-medium hover:ml-[4rem] 
                     text-white px-2 "
         
        >
        <img className="inline-block mr-2 mb-1" src="/src/assets/my-manuscript.png"/>
          Panelist Group
        </Link>

        <Link to="AdviserDashboard/ExploreManuscript" 
          className="exploreManuscript mx-10 
                     
                     focus:font-semibold 
                     hover:mr-auto focus:mr-auto focus:ml-[4rem] focus:bg-gradient-to-r from-[#0BF677] to-[#079774] 
                     hover:font-medium hover:ml-[4rem] 
                     text-white px-2 "
         
        >
        <img className="inline-block mr-2 mb-1" src="/src/assets/explore-manuscript.png"/>
          Explore Manuscript
        </Link>

        

        <Link to="AdviserDashboard/ViewAnalytics"
          className="viewAnalytics mx-10 
                     focus:font-semibold 
                     hover:ml-[4rem]
                     focus:ml-[4rem] focus:bg-gradient-to-r from-[#0BF677] to-[#079774] 
                     hover:font-medium 
                     
                     text-white  px-2 "
     
        >
         
          <img className="inline-block mr-2 mb-1" src="/src/assets/User.png"/>
          <span className="text">View Analytics</span>
          
          
        </Link>

{/*         <Link to="AdviserDashboard/"
          className="revision mx-10 
                     focus:font-semibold 
                     focus:ml-[4rem] focus:bg-gradient-to-r from-[#0BF677] to-[#079774] 
                     hover:font-medium hover:ml-[4rem] 
                     text-white px-2 "
          
        >
        <img className="inline-block mr-2 mb-1" src="/src/assets/revision-icon.png"/>
          Revision
        </Link> */}

        

      
        
      </div>

   
     
    </div>
  );
};

export default Sidebar;