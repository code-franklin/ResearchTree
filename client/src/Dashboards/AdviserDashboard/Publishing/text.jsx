import React, { useEffect, useState } from 'react';
import { style } from '@mui/system';

import { List, Typography, Button, Space, message, Input, ConfigProvider } from 'antd';
import { EditOutlined, DeleteOutlined, CheckOutlined, UndoOutlined, SearchOutlined } from '@ant-design/icons';
import RestoreIcon from '@mui/icons-material/Restore';
import TabsButton from './Tabs'
import TextHeader from './TextHeader'

import CkEditorDocuments from '../../../CKeditorDocuments'

const { Text } = Typography;


const initialData = [
  {
    title: 'Exploring the Impact of Artificial Intelligence on Healthcare: A Comprehensive Analysis of Adoption, Challenges, and Future Directions',
    authors: 'Franklin Mayad, Daniel De Torres, Lada Milera',
    dateUploaded: 'October 23 2023',
    datePublished: 'October 23 2023',
  }
];

const App = () => {
  const [data, setData] = useState(initialData);
  const [searchResults, setSearchResults] = useState(data);
  const [searchText, setSearchText] = useState('');
  const [deletedItems, setDeletedItems] = useState([]);
  const [showDeletedItems, setShowDeletedItems] = useState(false);

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [selectedChannelId, setSelectedChannelId] = useState(null); // Store channelId
  
  const [panelistStudents, setPanelistStudents] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchPanelistStudents();
  }, []);

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

  const handleViewManuscript = (studentId, channelId) => {
    setSelectedStudentId(studentId);
    setSelectedChannelId(channelId); // Set the correct channelId for the student's manuscript
    setIsEditorOpen(true);
  };

  const handleSearch = (value) => {
    setSearchText(value);
    const filteredData = data.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase()) ||
      item.authors.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResults(filteredData);
  };

  const highlightText = (text, search) => {
    if (!search) return text;

    const parts = text.split(new RegExp(`(${search})`, 'gi'));
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === search.toLowerCase() ? (
            <span key={index} style={{ backgroundColor: 'green' }}>{part}</span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <div style={{ position: 'absolute', left: '440px', top: '200px', maxWidth: '1150px', height: '641px', borderRadius: '8px', display: 'flex', flexDirection: 'column' }}>
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
        <TabsButton />

        <Input
            placeholder="Search articles..."
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            style={{  position: 'fixed',top: '173px', width: '40%', height: '45px', borderRadius: '13px', paddingLeft: '60px' }}
          />

          <SearchOutlined style={{ position: 'absolute', marginTop: '-20px', marginLeft: '25px', color: 'grey', fontSize: '28px' }} />
        </div>
          
        </ConfigProvider>
      </div>
        <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'flex-end' }}>
      </div>

      <div style={{ flex: '1', overflowX: 'hidden' }}>

      {panelistStudents.map((student) => (
        <List 
          grid={{ gutter: 16, column: 1 }}
          dataSource={searchResults}
          renderItem={(item, index) => (

              <List.Item>
                <div 
                  style={{
                    height: '117px',
                    padding: '20px',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                  }}
                  className="bg-[#222222] hover:bg-[#2F2F2F] w-[1170px]"
                >

                  <div style={{ flex: 1 }}>

                    {/* Render highlighted title */}
                    <div style={{ color: '#ffffff', marginBottom: '8px', fontSize: '16px', fontWeight: 'bold' }}>
                      {highlightText(student.proposalTitle)}
                    </div>

                    {/* Render highlighted authors */}
                    <Text style={{ color: '#ffffff' }}>
                        <span className="font-bold">Authors: </span>
                        {highlightText(student.groupMembers
                          .map(member => member.replace(/([a-z])([A-Z])/g, '$1 $2')) // Insert space between lowercase and uppercase letters
                          .join(', '))}
                    </Text>

                    <br />

                    {/* Render panelists */}
                    <Text style={{ color: '#ffffff' }}>
                      <span className="font-bold">Panelists: </span>
                      {highlightText(student.panelists.join(', '), searchText)} {/* This now contains the names */}
                    </Text>

                    <div style={{ display: 'flex' }}>
                        <Text style={{ color: '#ffffff', marginRight: '10px' }}>
                          {student.submittedAt && (
                            <p>
                              <span className="font-bold">Date Uploaded:</span> {new Date(student.submittedAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </p>
                          )}
                        </Text>

                      <Text style={{ color: '#ffffff' }}>
                        <span className="font-bold">Date Published:</span> {item.datePublished}
                        {/* 
                        <br />ChannelID: {student.channelId} */}
                      </Text>

                    </div>
                  </div>

                  <div style={{ background: '#222222', boxShadow: '-6px 0px 6.9px 0px rgba(0, 0, 0, 0.25)', height: '117px', width: '205px', alignItems: 'center', paddingLeft: '44px', display: 'flex', gap: '10px' }}>
                    <Button 
                      icon={<CheckOutlined />} 
                      shape="circle" 
                    />

                    <Button 
                      icon={<EditOutlined />} 
                      shape="circle" 
                      onClick={() => handleViewManuscript(student._id, student.channelId)}
                    />

                  </div>
                </div>

              </List.Item>
          )}
        />
      ))}
      </div>

      <ConfigProvider
        theme={{
        components: {
        Modal: {
          colorPrimary: '#1E1E1E', 
          colorBgBase: '#1E1E1E',
          colorTextBase: 'white',
          colorBorder: '#1E1E1E',

          algorithm: true,
            },  
          },
        }}
      >

        {isEditorOpen && selectedStudentId && (
          <CkEditorDocuments userId={user._id} channelId={selectedChannelId} onClose={() => setIsEditorOpen(false)} />
        )}

      </ConfigProvider>
     
    </div>
  );
};

export default App;