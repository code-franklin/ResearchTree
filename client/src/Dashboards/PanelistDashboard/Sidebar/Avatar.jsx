import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

import './Sidebar.css';

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  // Define handleLogout function
  const handleLogout = () => {
    // Logic for handling logout can go here
    console.log('Logging out...');
    // Redirect to login page, clear tokens, etc.
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton 
            onClick={handleClick}
            size="small"
            sx={{ ml: 5 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar src="/src/assets/cris.png" sx={{ width: 79, height: 79 }}> </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            ml: 4,
            bgcolor: "#1E1E1E",
            color: "white", // Set text color to white
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '& .MuiMenuItem-root': {
              color: 'white', // Ensure all MenuItem text is white
            },
            '& .MuiListItemIcon-root': {
              color: 'white', // Ensure all icons are white
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar sx={{ bgcolor: '#444' }} /> Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar sx={{ bgcolor: '#444' }} /> My account
        </MenuItem>
        <Divider sx={{ bgcolor: 'white' }} />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}> {/* Use handleLogout for onClick */}
          <ListItemIcon>
            <Logout fontSize="small" sx={{ color: 'red' }} /> {/* Set icon color to red */}
          </ListItemIcon>
          <span style={{ color: 'red' }}>Logout</span> {/* Set text color to red */}
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
