import React, { useState } from 'react';
import { style } from '@mui/system';

import { List, Typography, Button, Space, message, Input, ConfigProvider, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, CheckOutlined, UndoOutlined, SearchOutlined } from '@ant-design/icons';
import RestoreIcon from '@mui/icons-material/Restore';
import TabsButton from './Tabs'
import TextHeader from './TextHeader'


const { Text } = Typography;


const initialData = [
  {
    title: 'Exploring the Impact of Artificial Intelligence on Healthcare: A Comprehensive Analysis of Adoption, Challenges, and Future Directions',
    authors: 'Franklin Mayad, Daniel De Torres, Lada Milera',
    dateUploaded: 'October 23 2023',
    datePublished: 'October 23 2023',
  },
  {
    title: 'Understanding the Role of Blockchain Technology in Supply Chain Management: Opportunities, Challenges, and Implementation Strategies',
    authors: 'Franklin Mayad, Daniel De Torres, Lada Milera',
    dateUploaded: 'October 23 2023',
    datePublished: 'October 23 2023',
  }

];

const ListManuscript = () => {
  const [data, setData] = useState(initialData);
  const [searchResults, setSearchResults] = useState(data);
  const [searchText, setSearchText] = useState('');
  const [deletedItems, setDeletedItems] = useState([]);
  const [showDeletedItems, setShowDeletedItems] = useState(false);

  const handleDelete = (index) => {
    const itemToDelete = data[index];
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
    setSearchResults(newData);
    setDeletedItems([...deletedItems, itemToDelete]);
    message.success('Item deleted successfully');
  };

  const handleSearch = (value) => {
    setSearchText(value);
    const filteredData = data.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase()) ||
      item.authors.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResults(filteredData);
  };

  const handleRestore = (index) => {
    const itemToRestore = deletedItems[index];
    setData([...data, itemToRestore]);
    setSearchResults([...data, itemToRestore]);
    const newDeletedItems = [...deletedItems];
    newDeletedItems.splice(index, 1);
    setDeletedItems(newDeletedItems);
    message.success('Item restored successfully');
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

            <Button 
              type="primary" 
              onClick={() => setShowDeletedItems(true)}
              style={{position: 'absolute', top: '-20px', left: '1095px'}}
              >
              <RestoreIcon />
            </Button>

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

{/* Loop List Manuscript */}
      <div style={{ flex: '1', overflowX: 'hidden' }}>
        <List grid={{ gutter: 16, column: 1 }} dataSource={searchResults} renderItem={(item, index) => (
            <List.Item>
              <div style={{  height: '117px', padding: '20px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.3s ease', cursor: 'pointer',}} className="bg-[#222222] hover:bg-[#2F2F2F] w-[1170px]">
                <div style={{ flex: 1 }}>

                    {/* Render highlighted title */}
                    <div style={{ color: '#ffffff', marginBottom: '8px', fontSize: '16px', fontWeight: 'bold' }}>
                      {highlightText(item.title, searchText)}
                    </div>

                    {/* Render highlighted authors */}
                    <Text style={{ color: '#ffffff' }}>
                      <span className="font-bold">Authors: </span>
                      {highlightText(item.authors, searchText)}
                    </Text>

                    <div style={{ display: 'flex' }}>
                      <Text style={{ color: '#ffffff', marginRight: '10px' }}>
                        <span className="font-bold">Date Uploaded:</span> {item.dateUploaded}
                      </Text>

                      <Text style={{ color: '#ffffff' }}>
                        <span className="font-bold">Date Published:</span> {item.datePublished}
                      </Text>
                    </div>
                </div>

                <div style={{ background: '#222222', boxShadow: '-6px 0px 6.9px 0px rgba(0, 0, 0, 0.25)', height: '117px', width: '205px', alignItems: 'center', paddingLeft: '44px', display: 'flex', gap: '10px' }}>
                  <Button icon={<CheckOutlined />} shape="circle" />
                  <Button icon={<EditOutlined />} shape="circle" />
                  <Button icon={<DeleteOutlined />} shape="circle" danger onClick={() => handleDelete(index)} />
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>

      <ConfigProvider

      theme={{ components: { Modal: { colorPrimary: '#1E1E1E', colorBgBase: '#1E1E1E', colorTextBase: 'white', colorBorder: '#1E1E1E', algorithm: true, },
     },
  }}
      >

  {/* MODAL FOR RESTORING the DELETED Manuscript */}

      <Modal style={{ position: 'absolute', left: '460px', top: '20px' }} title="Deleted Items" visible={showDeletedItems} onCancel={() => setShowDeletedItems(false)} footer={null} width={1000}>
        <div style={{ maxHeight: '730px', overflowX: 'hidden', paddingTop: '20px' }}>
          <List grid={{ gutter: 16, column: 1 }} dataSource={deletedItems} renderItem={(item, index) => (
              <List.Item>
                <div style={{ height: '130px', width: '950px', padding: '30px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.3s ease', cursor: 'pointer', background: '#222222', color: '#ffffff'}}>
                  <div>

                    <div style={{ marginBottom: '8px', fontSize: '16px', fontWeight: 'bold' }}>
                      {item.title}
                    </div>

                    <Text style={{ marginRight: '10px', color: 'white' }}>
                      <span className="font-bold">Authors: </span>{item.authors}
                    </Text>

                    <div>
                      <Text style={{ marginRight: '10px', color: 'white' }}>
                        <span className="font-bold">Date Uploaded:</span> {item.dateUploaded}
                      </Text>

                      <Text style={{ marginRight: '10px', color: 'white' }}>
                        <span className="font-bold">Date Published:</span> {item.datePublished}
                      </Text>
                      
                    </div>
                  </div>
                  <Button
                    icon={<UndoOutlined />}
                    type="primary"
                    onClick={() => handleRestore(index)}
                  >
                    Restore
                  </Button>
                </div>
              </List.Item>
            )}
          />
        </div>
      </Modal>

      </ConfigProvider>
     
    </div>
  );
};

export default ListManuscript;
