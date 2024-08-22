import React from 'react';
import './Styles/descriptions.css';


const ResearchCard = () => {
  return (
    <div className="headerCard">


<div className="ml-[320px]  border border-[#4B4B4B] bg-[#1E1E1E] p-[40px] pl-[80px] rounded-lg shadow-lg text-white">
    
      <div className="flex  items-center mb-4 ">
        <span className="bg-[#868686] text-white px-2 py-0 mr-2">Research Title</span>
        <span className="bg-[#1E1E] text-white px-2 py-0  mr-2">BSIT</span>
        <div className="absolute ml-[920px] "> 
        </div>
      </div>
      <h1 className="text-2xl font-bold mb-2">
        Exploring the Impact of Artificial Intelligence on Healthcare: A Comprehensive
         <br></br>Analysis of Adoption, Challenges, and Future Directions
      </h1>
      <p className="text-gray-500 font-bold mb-4">
        Franklin Mayad, Daniel De Torres, Lade Millera
      </p>
      <p className="text-gray-400 mb-2">
        <span className="font-bold text-white" >Adviser: </span>Crisanto Quilay
      </p>
      
      <div className="text-gray-400 mb-4">
        <span><span className="font-bold text-white">Uploaded:</span> <span className="mr-5">October 23, 2023</span></span>
        
        <span> <span className="font-bold text-white">Date of Published: </span><span> October 23, 2023</span> </span>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="mb-2 mt-4">Type of Research</h1>
          <span className="bg-purple-500 text-white px-2 py-1 mr-2">Machine Learning</span>
          <span className="bg-yellow-500 text-white px-2 py-1 ">Web and Mobile</span>
        </div>
        <div className="flex items-center">

          <a href="#" className="text-white">View Grade</a>
        </div>
      </div>
    </div>


    </div>
    
  );
};

export default ResearchCard;
