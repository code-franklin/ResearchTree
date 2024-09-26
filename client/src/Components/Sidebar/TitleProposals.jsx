import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { Tag , Flex } from 'antd';


import Textarea from '@mui/joy/Textarea';




const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 720,
  height: 720,
  color: "white",
  bgcolor: '#1E1E1E',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [proposal, setProposal] = useState('');
  const [submittedAt, setSubmittedAt] = useState(null);
  const [topAdvisors, setTopAdvisors] = useState([]);
  const [advisorInfo, setAdvisorInfo] = useState(null);
  const [advisorStatus, setAdvisorStatus] = useState(null);
  const [panelists, setPanelists] = useState([]);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchAdvisorInfo();
  }, []);

  const fetchAdvisorInfo = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/student/advisor-info-StudProposal/${user._id}`);
      if (response.ok) {
        const data = await response.json();
        setAdvisorInfo(data.chosenAdvisor);
        setAdvisorStatus(data.advisorStatus);
        setPanelists(data.panelists || []);
        setProposal(data.proposalText);
        setSubmittedAt(data.submittedAt);
      } else {
        const errorData = await response.json();
        console.error('Error fetching advisor info:', errorData.message);
      }
    } catch (error) {
      console.error('Error fetching advisor info:', error.message);
    }
  };

  const submitProposal = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/student/submit-proposal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user._id, proposalText: proposal }),
      });

      if (response.ok) {
        const data = await response.json();
        setTopAdvisors(data.topAdvisors);
        setSubmittedAt(data.submittedAt);
        console.log('Proposal submitted successfully!');
      } else {
        const errorData = await response.json();
        console.error('Error submitting proposal:', errorData.message);
      }
    } catch (error) {
      console.error('Error submitting proposal:', error.message);
    }
  };

  const chooseAdvisor = async (advisorId) => {
    try {
      const response = await fetch('http://localhost:5000/api/student/choose-advisor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user._id, advisorId }),
      });
      if (response.ok) {
        console.log('Advisor chosen successfully!');
        fetchAdvisorInfo();
      } else {
        const errorData = await response.json();
        console.error('Error choosing advisor:', errorData.message);
      }
    } catch (error) {
      console.error('Error choosing advisor:', error.message);
    }
  };

  return (
    <div>
      <button onClick={handleOpen} className="bg-black w-[230px] h-[50px]  mt-[20px] ml-[36px] text-[20px]"> </button>
      <Modal
        sx={{border: "none"}}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img className="mt-2 ml-[277px]" src="/src/assets/title-proposals-logo.png" alt="Logo" />

          {/* Dynamic Title based on advisorStatus */}
          <Typography
            sx={{
              position: "absolute",
              marginLeft: "243px",
              top: "111px",
              fontWeight: "bold"
            }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            {advisorStatus === 'declined' && 'Title Proposals'}
          </Typography>
          <Typography
            sx={{
              position: "absolute",
              marginLeft: "243px",
              top: "111px",
              fontWeight: "bold"
            }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            {advisorStatus === 'pending' && 'Title Proposals'} 
          </Typography>
          <Typography
            sx={{
              position: "absolute",
              marginLeft: "253px",
              top: "111px",
              fontWeight: "bold"
            }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            {advisorStatus === 'accepted' && 'Your Adviser'}
          </Typography>
<<<<<<< HEAD
          {/* Display existing proposal and submitted date */}
          {submittedAt && (
            <div>
              <p><strong>Submitted At:</strong> {new Date(submittedAt).toLocaleDateString()}</p>
              <p><strong>Proposal Text:</strong> {proposal}</p>
            </div>
          )}
=======
>>>>>>> 4b40bebdef7c2f0088d5a294f413a01b67d8a21f

          {/* Render based on advisor status */}
          {(!advisorInfo || advisorStatus === 'declined') && (
            <div>
              <Tag 
              style={{position: 'absolute', marginLeft: '100px', marginTop: '-280px'}}
              icon={<CloseCircleOutlined />} 
              color="#cd201f">
               Your Title Proposals is Declined 
              </Tag>
              <form onSubmit={(e) => { e.preventDefault(); submitProposal(); }}>
  <Textarea
    sx={{
      color: 'white',
      position: 'absolute',
      top: '200px',
      left: '117px',
      borderRadius: '20px',
      backgroundColor: '#1E1E1E', 
      borderColor: '#585050',
      width: '495px',
      height: '92px',
      paddingLeft: '20px',
      paddingTop:'10px',
    }}
    color='success'
    minRows={2}
    placeholder="Write your research title..."
    size="sm"
    variant="outlined"
  />
  
  <Textarea
    sx={{
      color: 'white',
      position: 'absolute',
      top: '310px',
      left: '117px',
      borderRadius: '20px',
      backgroundColor: '#1E1E1E', 
      borderColor: '#585050',
      width: '495px',
      height: '92px',
      paddingLeft: '20px',
      paddingTop:'10px',
    }}
    color='success'
    minRows={2}
    placeholder="Write your research proposal..."
    size="sm"
    variant="outlined"
  />
  
  {/* Add a submit button or trigger elsewhere */}
  <button type="submit" style={{ display: 'block' }}>Submit Proposal</button>
</form>

            </div>
          )}

          {advisorInfo && advisorStatus === 'pending' && (
            <div>
              <Tag 
              icon={<SyncOutlined spin />} 
              color="processing"
              style={{position: 'absolute', marginLeft: '100px', marginTop: '-280px'}}
              >
                Waiting for Approval of Adviser
              </Tag>
              <Textarea
             sx={{
              
              color: 'white',
              position: 'absolute',
              top: '187px',
              left: '117px',
              borderRadius: '20px',
              backgroundColor: '#1E1E1E', 
              borderColor: '#585050',
              width: '495px',
              height: '92px',
              paddingLeft: '20px',
              paddingTop:'10px',
    
            
             }}
             color='success'
             minRows={2}
             placeholder="Write your research title..."
             size="sm"
             variant="outlined"
           />

            <Textarea
             sx={{
              
              color: 'white',
              position: 'absolute',
              top: '290px',
              left: '117px',
              borderRadius: '20px',
              backgroundColor: '#1E1E1E', 
              borderColor: '#585050',
              width: '495px',
              height: '151px',
              paddingLeft: '20px',
              paddingTop:'10px',
    
            
             }}
             color='success'
             minRows={2}
             placeholder="Write your research title..."
             size="sm"
             variant="outlined"
           />
                <img
                src={`http://localhost:5000/public/uploads/${advisorInfo.profileImage}`}
                className="mt-[358px] ml-[260px] w-[130px] h-[130px] rounded-full "
                alt={advisorInfo.name}
              />
              <p className="text-[20px] font-bold ml-[230px] mt-[13px]">{advisorInfo.name}</p>
              <Flex style={{marginLeft: '132px', marginTop: '5px'}} gap="4px 0" wrap>
                    <Tag color="#4E4E4E">Machine Learning</Tag>
                    <Tag color="#4E4E4E">Mobile App</Tag>
                    <Tag color="#4E4E4E">Arduino</Tag>
                    <Tag color="#4E4E4E">Cybersecurity</Tag>
                  </Flex>

            </div>
          )}

          {advisorInfo && advisorStatus === 'accepted' && (
            <div>
              <div style={{ position: "absolute", borderLeft: '2px solid #373737', height: '240px', top: "210px", left: "350px" }}></div>
              <Tag 
              style={{position: 'absolute', marginLeft: '350px', marginTop: '-20px'}}
              
              icon={<CheckCircleOutlined />} color="#87d068">
                Accepted
              </Tag>
              <img
                src={`http://localhost:5000/public/uploads/${advisorInfo.profileImage}`}
                className=" mt-[120px] ml-[60px] w-[197px] h-[197px] rounded-full border-[5px] border-green-500"
                alt={advisorInfo.name}
              />
              <p className="absolute text-[20px] font-bold ml-[350px] mt-[-193px]">{advisorInfo.name}</p>
              
              <h2 className='font-bold ml-[266px] text-[19px] mt-[66px]'>Your Panelists</h2>
              <ul className='flex ml-[150px] mt-[27px]'>
                {panelists.map((panelist) => (
                  <li key={panelist._id} className="">
                    <img
                      src={`http://localhost:5000/public/uploads/${panelist.profileImage}`} 
                      alt={panelist.name}
                      className=" w-[80px] h-[80px] rounded-full mr-[53px] "
                    />
                    <p className="text-sm ml-[-6px] mt-[6px]">{panelist.name}</p> 
                  </li>
                ))}
              </ul>
            </div>
          )}

          <br />
          <ul>
            {topAdvisors.map((advisor) => (
              <li className="mt-2 text-center text-gray-700" key={advisor._id}>
                {advisor.name}
                {(!advisorInfo || advisorStatus === 'declined') && (
                  <button onClick={() => chooseAdvisor(advisor._id)}>Choose Advisor</button>
                )}
              </li>
            ))}
          </ul>
        </Box>
      </Modal>
    </div>
  );
}
