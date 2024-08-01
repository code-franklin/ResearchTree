import React from 'react';

const ResearchCard = () => {
  return (
    <div className="ml-[320px] border border-[#4B4B4B] bg-[#1E1E1E] p-6 rounded-lg shadow-lg text-white">
      <div className="flex justify-between items-center mb-4">
        <span className="bg-red-500 text-white px-2 py-1 rounded">Research Title</span>
        <div>
          <span className="bg-red-500 text-white px-2 py-1 rounded mr-2">Pending Upload</span>
          <span className="bg-red-500 text-white px-2 py-1 rounded">Revise</span>
        </div>
      </div>
      <h1 className="text-2xl font-bold mb-2">
        Exploring the Impact of Artificial Intelligence on Healthcare: A Comprehensive
         <br></br>Analysis of Adoption, Challenges, and Future Directions
      </h1>
      <p className="text-gray-400 mb-4">
        Franklin Maysad, Daniel De Torres, Lode Millera
      </p>
      <p className="text-gray-400 mb-2">
        Advisor: Crisanto Quilay
      </p>
      <div className="flex justify-between text-gray-400 mb-4">
        <span>Uploaded: October 23, 2023</span>
        <span>Date of Published: October 23, 2024</span>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <span className="bg-purple-500 text-white px-2 py-1 rounded mr-2">Machine Learning</span>
          <span className="bg-yellow-500 text-white px-2 py-1 rounded">Web and Mobile</span>
        </div>
        <div className="flex items-center">
          <span className="bg-yellow-500 text-black px-2 py-1 rounded mr-2">BEST THESIS</span>
          <a href="#" className="text-yellow-500 underline">View Grade</a>
        </div>
      </div>
    </div>
  );
};

export default ResearchCard;
