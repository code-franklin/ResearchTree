import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { CheckCircleOutlined, CloseCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import { Input } from 'antd';

const { TextArea } = Input;

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
      const response = await fetch(`http://localhost:5000/api/student/student-advisor-info/${user._id}`);
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
      <img onClick={handleOpen} className="tooltip3 cursor-pointer inline-block mr-2 mt-[2px]" src="/src/assets/title-proposals-icon.png" />

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
              marginLeft: "246px",
              top: "111px",
              fontWeight: "bold"
            }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            {advisorStatus === 'declined' && 'Not Acceptable Title'}
            {advisorStatus === 'pending' && 'Waiting for Approval'}
            {advisorStatus === 'accepted' && 'Your Adviser'}
          </Typography>

          {/* Display existing proposal and submitted date */}
          {submittedAt && (
            <div>
              <p><strong>Submitted At:</strong> {new Date(submittedAt).toLocaleDateString()}</p>
              <p><strong>Proposal Text:</strong> {proposal}</p>
            </div>
          )}

          {/* Render based on advisor status */}
          {(!advisorInfo || advisorStatus === 'declined') && (
            <div>
              <Tag icon={<CloseCircleOutlined />} color="red">
                Declined
              </Tag>
              <form onSubmit={(e) => { e.preventDefault(); submitProposal(); }}>
                <TextArea
                  showCount
                  maxLength={100}
                  value={proposal}
                  onChange={(e) => setProposal(e.target.value)}
                  placeholder="Write your proposal here..."
                  required
                  style={{
                    height: 120,
                    resize: 'none',
                    
                  }}
                />
                <br />
                <button type="submit">Submit Proposal</button>
              </form>
            </div>
          )}

          {advisorInfo && advisorStatus === 'pending' && (
            <div>
              <Tag icon={<ClockCircleOutlined />} color="orange">
                Pending
              </Tag>
              <p>Your proposal is under review.</p>
            </div>
          )}

          {advisorInfo && advisorStatus === 'accepted' && (
            <div>
              <div style={{ position: "absolute", borderLeft: '2px solid #373737', height: '240px', top: "210px", left: "350px" }}></div>
              <Tag icon={<CheckCircleOutlined />} color="#87d068">
                Accepted
              </Tag>
              <img
                src={`http://localhost:5000/public/uploads/${advisorInfo.profileImage}`}
                className="mt-[80px] ml-[60px] w-[197px] h-[197px] rounded-full border-[5px] border-green-500"
                alt={advisorInfo.name}
              />
              <p className="text-[20px] font-bold ml-[200px]">{advisorInfo.name}</p>
              
              <h2 className='font-bold ml-[266px] text-[19px] mt-[25px]'>Your Panelists</h2>
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
