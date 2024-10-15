import React, { useEffect, useState } from 'react';
import { style } from '@mui/system';

import { List, Typography, Button, Input, ConfigProvider, Progress } from 'antd';
import { EditOutlined, CheckOutlined, SearchOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TextHeader from './TextHeader'


import CkEditorDocuments from './CkEditorDocuments';

import ListManuscriptStudent from './ListManuscript'
import OngoingReviseAdviser from './ReviseAdviser';
import OnPanelist from './OnPanelist'






const ListManuscript = () => {

  const [value, setValue] = useState(0); // Set to 0 (index of the first tab)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }
  
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <div style={{ position: 'absolute', left: '440px', top: '200px', maxWidth: '1370px', height: '641px', borderRadius: '8px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '16px' }}>
        <ConfigProvider
          theme={{
            components: {
              Input: {
                colorPrimary: '#222222',
                colorBgBase: '#222222',
                colorTextBase: 'white',
                colorBorder: '#1E1E1E',
                colorPrimaryHover: '#1E1E1E',
                colorPrimaryActive: '#222222',
                controlOutline: '#1E1E1E',
                algorithm: true,
              },
              Button: {
                colorPrimary: '#222222',
                colorBgBase: '#222222',
                colorPrimaryHover: 'none',
                colorPrimaryActive: 'none',
                colorBorder: 'white',
                controlOutline: 'none',
              }
            },
          }}
        >

          <div>
            <TextHeader/>

            <Input
                placeholder="Search articles..."
                /* value={searchText}
                onChange={(e) => handleSearch(e.target.value)} */
                style={{  position: 'fixed',top: '200px', right: '140px', width: '35%', height: '45px', borderRadius: '13px', paddingLeft: '60px'  }}
            />
            <SearchOutlined style={{ position: 'absolute', marginTop: '10px', marginLeft: '685px', color: 'grey', fontSize: '28px' }} />
          </div>

        </ConfigProvider>
      </div>
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'flex-end' }}>
    </div>

    <Box sx={{ width: '100%',  }}>
    <Box sx={{ width: '100%' }}>
    <Box sx={{ width: '100%' }}>
  <Box
    sx={{
      position: 'fixed',
      borderBottom: 1,
      borderColor: 'divider',
      marginLeft: '25px',
      width: '47%',
      marginTop: '-36px',
    }}
  >
    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
      <Tab
        sx={{
          color: 'green', // Default color
          '&:hover': {
            color: 'orange', // Customize hover text color
            backgroundColor: 'lightgray', // Customize hover background color
          },
          '&.Mui-selected': {
            color: 'red', // Customize active text color
            backgroundColor: 'lightblue', // Customize active background color
          },
        }}
        label="List Manuscript"
        {...a11yProps(0)}
      />
      <Tab
        sx={{
          color: 'green',
          '&:hover': {
            color: 'orange',
            backgroundColor: 'lightgray',
          },
          '&.Mui-selected': {
            color: 'red',
            backgroundColor: 'lightblue',
          },
        }}
        label="Ongoing Revision on Advicer"
        {...a11yProps(1)}
      />
      <Tab
        sx={{
          color: 'green',
          '&:hover': {
            color: 'orange',
            backgroundColor: 'lightgray',
          },
          '&.Mui-selected': {
            color: 'red',
            backgroundColor: 'lightblue',
          },
        }}
        label="Ready for Defense"
        {...a11yProps(2)}
      />
    </Tabs>
  </Box>
</Box>

</Box>


      <CustomTabPanel value={value} index={0}>
        <ListManuscriptStudent/>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        <OngoingReviseAdviser/>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={2}>
        <OnPanelist/>
      </CustomTabPanel>

    </Box>

      <ConfigProvider

      theme={{ components: { Modal: { colorPrimary: '#1E1E1E', colorBgBase: '#1E1E1E', colorTextBase: 'white', colorBorder: '#1E1E1E', algorithm: true, },
     },
  }}
      >


      </ConfigProvider>
     
    </div>
  );
};

export default ListManuscript;
