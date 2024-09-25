import React, { useState, useEffect } from 'react';
import CkEditorDocuments from '../../../CKeditorDocuments'
import './Styles/descriptions.css';

const ResearchCard = () => {
  const [advisorInfo, setAdvisorInfo] = useState(null);
  const [advisorStatus, setAdvisorStatus] = useState(null);
  const [panelists, setPanelists] = useState([]);
  const [channelId, setChannelId] = useState('');
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchAdvisorInfo();
  }, []);
  
  const fetchAdvisorInfo = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/student/student-advisor-info/${user._id}`);
      if (response.ok) {
        const data = await response.json();
        setAdvisorInfo(data.chosenAdvisor);
        setAdvisorStatus(data.advisorStatus);
        setPanelists(data.panelists || []);
        setChannelId(data.channelId || '');
      } else {
        const errorData = await response.json();
        console.error('Error fetching advisor info:', errorData.message);
      }
    } catch (error) {
      console.error('Error fetching advisor info:', error.message);
    }
  };

  // Function to display status message based on advisorStatus
  const getStatusMessage = () => {
    if (advisorStatus === 'pending') {
      return (
        <span style={{ color: 'orange' }}>
          Waiting for advisor to accept your proposal.
        </span>
      );
    } else if (advisorStatus === 'declined') {
      return (
        <span style={{ color: 'red' }}>
          Your advisor declined. Please choose another advisor.
        </span>
      );
    } else if (!advisorInfo) {
      return (
        <span style={{ color: 'red' }}>
          Submit your proposal to select an advisor.
        </span>
      );
    } else {
      return (
        <span style={{ color: 'white' }}>
          {advisorInfo.name}
        </span>
      );
    }
  };
  

  return (
    <div className="headerCard">
      <div className="ml-[320px] border border-[#4B4B4B] bg-[#1E1E1E] p-[40px] pl-[80px] rounded-lg shadow-lg text-white">
        <div className="flex items-center mb-4 ">
          <span className="bg-[#868686] text-white px-2 py-0 mr-2">Research Title</span>
          <span className="bg-[#1E1E] text-white px-2 py-0 mr-2">{user.course}</span>
          <div className="absolute ml-[920px]"></div>
        </div>
        <h1 className="text-2xl font-bold mb-2">
          Exploring the Impact of Artificial Intelligence on Healthcare: A Comprehensive
          <br />
          Analysis of Adoption, Challenges, and Future Directions
        </h1>
        <p className="text-gray-500 font-bold mb-4">
          {user.groupMembers.join(', ')}
        </p>

{/* Advisor */}
        <p className="text-gray-400 mb-2">
          <span className="font-bold text-white">Advisor: {getStatusMessage()}</span>
          <span className="font-bold text-white ml-[81px]">Panelists: </span>
            <span style={{ color: 'white'}}>
              {panelists.map((panelist) => panelist.name).join(', ')}
            </span>
        </p>

{/* Panelist */}
        {advisorInfo && advisorStatus === 'accepted' && panelists.length > 0 && (
          <p className="text-gray-400 mb-2">
         
          </p>
        )}
        
        <div className="text-gray-400 mb-4">
          <span><span className="font-bold text-white">Date of Uploaded:</span> <span className="mr-5">{user._id}</span></span>
          <span><span className="font-bold text-white">Date of Published: </span><span>Pending to Publish</span></span>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="mb-2 mt-4">Type of Research</h1>
            <span className="bg-purple-500 text-white px-2 py-1 mr-2">Machine Learning</span>
            <span className="bg-yellow-500 text-white px-2 py-1">Web and Mobile</span>
          </div>
          
          <div className="flex items-center">
            <a onClick={() => setIsEditorOpen(true)} className="rounded-full text-center text-white mr-4 cursor-pointer w-[120px] h-[37px] border 1px solid #6A6A6A " >
            <span className='absolute bottom-[67px] ml-[-20px]'>Open</span></a>

            {isEditorOpen && (
              <CkEditorDocuments userId={user._id} channelId={user.channelId}/> 
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchCard;
