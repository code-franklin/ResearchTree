import React, { useEffect, useState } from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import Typography from '@mui/joy/Typography';
import { Space, Table, Tag, Avatar } from 'antd';

const { Column, ColumnGroup } = Table;

export default function TabsPricingExample() {
  const [acceptedStudents, setAcceptedStudents] = useState([]);
  const [declinedStudents, setDeclinedStudents] = useState([]);
  const [studentsToManage, setStudentsToManage] = useState([]);
  
  
  const [panelistStudents, setPanelistStudents] = useState([]);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/advicer/advisor-students/${user._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setAcceptedStudents(data.acceptedStudents);
          setDeclinedStudents(data.declinedStudents);
          setStudentsToManage(data.studentsToManage);
        } else {
          const errorData = await response.json();
          console.error('Error fetching students:', errorData.message);
        }
      } catch (error) {
        console.error('Error fetching students:', error.message);
      }
    };

    fetchStudents();
    fetchPanelistStudents();
  }, [user._id]);

  const handleStudentResponse = async (studentId, status) => {
    try {
      const response = await fetch('http://localhost:5000/api/advicer/respond-student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ studentId, advisorId: user._id, status }),
      });
  
      if (response.ok) {
        const responseData = await response.json();
  
        if (status === 'accepted') {
          alert(responseData.message);
          // Refresh the tab to update the UI
          window.location.reload();
        } else {
          // Optionally clear the panelist students list if necessary
          alert(responseData.message || 'An error occurred. Please try again later.');
          window.location.reload();
        }
  
      } else {
        const errorData = await response.json();
        console.error('Error responding to student:', errorData.message);
        alert(errorData.message || 'An error occurred. Please try again later.');
      }
    } catch (error) {
      console.error('Error responding to student:', error.message);
      alert('An error occurred. Please try again later.');
    }
  };

  const fetchPanelistStudents = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/advicer/panelist-students/${user._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setPanelistStudents(data.panelistStudents);
      } else {
        console.error('Error fetching panelist students');
      }
    } catch (error) {
      console.error('Error fetching panelist students:', error.message);
    }
  };

  return (
    <Tabs
      aria-label="Pricing plan"
      defaultValue={0}
      sx={{ backgroundColor: '#222222', position: 'absolute', left: '500px', top: '100px', width: 1243, height: '800px', borderRadius: 'lg', boxShadow: 'sm', overflow: 'auto' }}
    >
      <TabList
        disableUnderline
        tabFlex={1}
        sx={{
          [`& .${tabClasses.root}`]: {
            fontSize: 'sm',
            fontWeight: 'lg',
            backgroundColor: '#333333', // Customize the tab background color
            color: '#ffffff', // Text color for unselected tabs
            '&:hover': {
              backgroundColor: '#444444', // Background color on hover
            },
            [`&[aria-selected="true"]`]: {
              color: 'green', // Text color for selected tab
              bgcolor: 'black', // Background color for selected tab
            },
            [`&.${tabClasses.focusVisible}`]: {
              outlineOffset: '-4px',
            },
          },
        }}
      >
        <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
          Accepted
        </Tab>
        <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
          Declined
        </Tab>
        <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
          Pending
        </Tab>
        <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
          Student Panelist
        </Tab>
      </TabList>

      {/* Accepted Students List */}
      <TabPanel value={0}>
        <Table
          dataSource={acceptedStudents}
          rowKey="_id"
          style={{ position: 'absolute', top: '100px', width: '70%', marginLeft: '120px' }}
        >
          <Column
            title="Name of Students"
            key="name"
            render={(text, student) => (
              <Space size="middle">
              <Avatar src={`http://localhost:5000/public/uploads/${student.profileImage || 'default-avatar.png'}`} >
                {student.name.charAt(0)}
              </Avatar>
              <span>{student.name}</span>
            </Space>
            )}
          />
          <Column
            title="Action"
            key="action"
            render={(_, record) => (
              <Space size="middle">
                <a>View Proposal</a>
              </Space>
            )}
          />
        </Table>
      </TabPanel>

      {/* Declined Students List */}
      <TabPanel value={1}>
        <Table
          dataSource={declinedStudents}
          rowKey="_id"
          style={{ position: 'absolute', top: '100px', width: '70%', marginLeft: '120px' }}
        >
          <Column
            title="Name of Students"
            key="name"
            render={(text, student) => (
              <Space size="middle">
              <Avatar src={`http://localhost:5000/public/uploads/${student.profileImage || 'default-avatar.png'}`} >
                {student.name.charAt(0)}
              </Avatar>
              <span>{student.name}</span>
            </Space>
            )}
          />
          <Column
            title="Action"
            key="action"
            render={(_, record) => (
              <Space size="middle">
                <a>Review Title</a>
              </Space>
            )}
          />
        </Table>
      </TabPanel>


      {/* Pending Students List */}
      <TabPanel value={2}>
        <Table
          dataSource={studentsToManage}
          rowKey="_id"
          style={{ position: 'absolute', top: '100px', width: '70%', marginLeft: '120px' }}
        >
          <Column
            title="Name of Students"
            key="name"
            render={(text, student) => (
              <Space size="middle">
              <Avatar src={`http://localhost:5000/public/uploads/${student.profileImage || 'default-avatar.png'}`} >
                {student.name.charAt(0)}
              </Avatar>
              <span>{student.name}</span>
            </Space>
            )}
          />
          <Column
            title="Action"
            key="action"
            render={(_, student) => (
              <Space size="middle">
                <a>View Title</a>
                <a onClick={() => handleStudentResponse(student._id, 'accepted')} >Accept</a>
                <a onClick={() => handleStudentResponse(student._id, 'declined')} >Decline</a>
              </Space>
            )}
          />
        </Table>
      </TabPanel>

      {/* List Panelist */}
      <TabPanel value={3}>
        <Table
          dataSource={panelistStudents}
          rowKey="_id"
          style={{ position: 'absolute', top: '100px', width: '70%', marginLeft: '120px' }}
        >
          <Column
            title="Name of Students"
            key="name"
            render={(text, student) => (
              <Space size="middle">
                <Avatar src={`http://localhost:5000/public/uploads/${student.profileImage || 'default-avatar.png'}`} >
                  {student.name.charAt(0)}
                </Avatar>
                <span>{student.name}</span>
              </Space>
            )}
          />
          <Column
            title="Advisor"
            key="advisor"
            render={(text, student) => (
              <Space size="middle">
                {student.chosenAdvisor ? (
                  <>
                    <Avatar src={`http://localhost:5000/public/uploads/${student.chosenAdvisor.profileImage || 'default-avatar.png'}`} />
                    <span>{student.chosenAdvisor.name}</span>
                  </>
                ) : (
                  <span>No advisor chosen</span>
                )}
              </Space>
            )}
          />
        </Table>
      </TabPanel>


{/*        Pending Students 
      <TabPanel value={2}>
        <Typography variant="h6" color="#ffffff">
          Pending students to be managed.
        </Typography>
      </TabPanel> */}
    </Tabs>
  );
}
