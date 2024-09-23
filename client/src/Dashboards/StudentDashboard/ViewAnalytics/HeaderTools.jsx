import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CkEditorDocuments from '../../../CKeditorDocuments'

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
  const [submittedAt, setSubmittedAt] = useState(null); // Add this state for submittedAt
  const [topAdvisors, setTopAdvisors] = useState([]);
  const [advisorInfo, setAdvisorInfo] = useState(null);
  const [advisorStatus, setAdvisorStatus] = useState(null);
  const [panelists, setPanelists] = useState([]);

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
        setProposal(data.proposalText); // Assuming proposalText is returned
        setSubmittedAt(data.submittedAt); // Assuming submittedAt is returned
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
        setSubmittedAt(data.submittedAt); // Set the submittedAt date from response
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
        fetchAdvisorInfo(); // Refresh advisor info
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
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img src="/src/assets/title-proposals-logo.png" alt="Logo" />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Title Proposals
          </Typography>

          {/* Display existing proposal and submitted date */}
          {submittedAt && (
            <div>
              <p><strong>Submitted At:</strong> {new Date(submittedAt).toLocaleDateString()}</p>
              <p><strong>Proposal Text:</strong> {proposal}</p>
            </div>
          )}

          {(!advisorInfo || advisorStatus === 'declined') && (
            <form onSubmit={(e) => { e.preventDefault(); submitProposal(); }}>
              <textarea
                value={proposal}
                onChange={(e) => setProposal(e.target.value)}
                placeholder="Write your proposal here..."
                required
              />
              <br />
              <button type="submit">Submit Proposal</button>
            </form>
          )}

          <br />

          {advisorInfo && (
            <div className="mt-4 grid grid-cols-5 gap-4">
              <h2>Chosen Advisor</h2>
              <img
                src={`http://localhost:5000/public/uploads/${advisorInfo.profileImage}`}
                className="w-16 h-16 rounded-full"
                alt={advisorInfo.name}
              />
              <p className="mt-2 text-center text-gray-700">{advisorInfo.name}</p>
              <p className="mt-2 text-center text-gray-700">{advisorStatus}</p>
            </div>
          )}

          <br />
          <h2>Top Advisors</h2>
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
          <br />

          {advisorInfo && advisorStatus === 'accepted' && panelists.length > 0 && (
            <div>
              <h2>Panelists</h2>
              <ul>
                {panelists.map((panelist) => (
                  <li key={panelist._id}>{panelist.name}</li>
                ))}
              </ul>
            </div>
          )}
          <br />

          <button onClick={() => setIsEditorOpen(true)}>Upload Manuscript</button>
          {isEditorOpen && (
            <CkEditorDocuments userId={user._id} channelId={user.channelId} />
          )}
        </Box>
      </Modal>
    </div>
  );
}
