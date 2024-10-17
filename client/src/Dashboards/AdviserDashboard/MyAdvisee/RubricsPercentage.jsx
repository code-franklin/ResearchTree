import React, { useState } from 'react';
import { Modal, Button, TextField } from '@mui/material';

export default function GradingTable() {
  const [modalOpen, setModalOpen] = useState(false);
  const [percentages, setPercentages] = useState({
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  });

  // Function to handle modal open/close
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  // Function to handle percentage changes
  const handlePercentageChange = (score, value) => {
    setPercentages((prev) => ({ ...prev, [score]: value }));
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
       
        
        {/* Button to open the percentage modal */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenModal}
        >
          Set Rubrics Score
        </Button>
      </div>

      {/* Modal for setting percentages */}
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <div className="flex flex-col p-4 bg-white rounded shadow-lg mx-auto my-auto" style={{ width: '300px', height: 'auto' }}>
          <h2 className="text-lg font-bold mb-4">Set Percentages</h2>
          {['4', '3', '2', '1'].map((score) => (
            <div key={score} className="mb-2">
              <label className="block text-gray-700">Score {score}</label>
              <TextField
                type="number"
                variant="outlined"
                value={percentages[score]}
                onChange={(e) => handlePercentageChange(score, e.target.value)}
                fullWidth
                inputProps={{ min: 0 }}
              />
            </div>
          ))}
          <div className="flex justify-between mt-4">
            <Button variant="contained" onClick={handleCloseModal} color="primary">
              Save
            </Button>
            <Button variant="outlined" onClick={handleCloseModal}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
