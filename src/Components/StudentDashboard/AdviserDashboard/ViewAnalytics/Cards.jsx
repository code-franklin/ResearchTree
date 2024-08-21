import React from 'react';
import './Cards.css';


import Box from '@mui/material/Box';

import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import Dropdown from './YearDropdown';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

export const Cards = () => {
    const [open, setOpen] = React.useState(false); // Start with the alert closed

    // Function to handle the button click
    const handleClick = () => {
        setOpen(true); // Open the alert when the button is clicked

        // Automatically close the alert after 3 seconds
        setTimeout(() => {
            setOpen(false);
        }, 3000); // 3000 milliseconds = 3 seconds
    };

    return (
        <div>
            <div className="cards-container">
                <div className="ADyear-container"> 
                    <Dropdown />
                    <span className="absolute left-[-1174px] mt-[30px] text-[40px] font-bold">View Analytics</span>
                   <div className="Tooltop">
                     <div className="mt-[12px]">
                            <Tooltip title="Notification" arrow>
                           <img className="tooltip cursor-pointer w-[auto] inline-block mr-2" src="./src/assets/notification.png" />
                            </Tooltip>
                        </div>
                       
                        <div className="mt-[12px]"  onClick={handleClick}>
                       
                            <Tooltip title="Download Thesis Format" arrow>
                                <img className="tooltip2 cursor-pointer inline-block mr-2" src="./src/assets/docxtemplate.png" />
                            </Tooltip>
                        

                        </div>
                       
                        <div className="mt-[12px]">
                            <Tooltip title="Title Proposals" arrow>
                                <img className="tooltip3 cursor-pointer inline-block mr-2 mt-[2px]" src="./src/assets/title-proposals-icon.png" />
                            </Tooltip>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-icon-1">
                        <img className="" src="./src/assets/student-handle.png" />
                    </div>
                    <div className="card-content">
                        <p className="card-title">Student Handle</p>
                        <p className="card-value-1 ml-[80px]">7 Groups</p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-icon-2">
                        <img className="" src="" />
                    </div>
                    <div className="card-content">
                        <p className="card-title">New Uploads</p>
                        <p className="card-value-2">2,504</p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-icon-3">
                        <img className="" src="" />
                    </div>
                    <div className="card-content">
                        <p className="card-title">Ongoing Revision</p>
                        <p className="card-value-3">300</p>
                    </div>
                
                </div>
                <div className="card">
                    <div className="card-icon-4">
                        <img className="" src="" />
                    </div>
                    <div className="card-content">
                        <p className="card-title">Done</p>
                        <p className="card-value-3">300</p>
                    </div>
                
                </div>
            </div>
            
            <Box sx={{ position: 'fixed', top: 45, left: 1200, width: '16%', zIndex: 9999 }}>
                <Collapse in={open}>
                    <Alert
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => setOpen(false)} // Close the alert when the close button is clicked
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 2, color: 'white', backgroundColor: 'green' }}
                    >
                        Download Complete
                    </Alert>
                </Collapse>
            </Box>
        </div>
    );
};

export default Cards;