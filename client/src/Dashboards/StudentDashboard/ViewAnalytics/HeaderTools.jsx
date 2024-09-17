import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { height } from '@mui/system';
import Avatar from './avatars'

import TextArea from './TitleProposals/TextArea'
import GenerateButton from './TitleProposals/Generate'


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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        <img src="/src/assets/title-proposals-logo.png"></img>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Title Proposals
          </Typography>
          
          <TextArea/>
         <GenerateButton/>
         <Avatar />
        </Box>
      </Modal>
    </div>
  );
}
