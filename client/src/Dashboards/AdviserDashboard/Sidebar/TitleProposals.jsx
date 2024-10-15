import * as React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import Typography from '@mui/joy/Typography';

import { Space, Table, Tag, Avatar } from 'antd';
const { Column, ColumnGroup } = Table;

const data = [
  {
    key: '1',
    firstName: 'John',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    firstName: 'Jim',
    tags: ['loser'],
  },
  {
    key: '3',
    firstName: 'Joe',
    tags: ['cool', 'teacher'],
  },
];


export default function TabsPricingExample() {
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
          Pending
        </Tab>
        <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
          Accept
        </Tab>
        <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
          Declined
        </Tab>
      </TabList>







      <TabPanel value={0}>
      
        <Table
    dataSource={data}
    style={{ position: 'absolute', top: '100px', width: '70%', marginLeft: '120px' }}
  >
    <ColumnGroup>
      <Column
        title="Name of Students"
        key="name"
        render={(text, record) => (
          <Space size="middle">
            <Avatar>{record.firstName.charAt(0)}</Avatar>
            <span>{record.firstName}</span>
          </Space>
        )}
      />
    </ColumnGroup>

    <Column
      title="Status"
      dataIndex="tags"
      key="tags"
      render={(tags) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      )}
    />

    <Column
      title="Action"
      key="action"
      render={(_, record) => (
        <Space size="middle">
          <a>Accept</a>
          <a>Review Title</a>
          <a>Decline</a>
        </Space>
      )}
    />
  </Table>
      
      
      </TabPanel>





      <TabPanel value={1}>
      <Table
    dataSource={data}
    style={{ position: 'absolute', top: '100px', width: '70%', marginLeft: '120px' }}
  >
    <ColumnGroup>
      <Column
        title="Name of Students"
        key="name"
        render={(text, record) => (
          <Space size="middle">
            <Avatar>{record.firstName.charAt(0)}</Avatar>
            <span>{record.firstName}</span>
          </Space>
        )}
      />
    </ColumnGroup>

    <Column
      title="Status"
      dataIndex="tags"
      key="tags"
      render={(tags) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      )}
    />

    <Column
      title="Action"
      key="action"
      render={(_, record) => (
        <Space size="middle">
          <a>Accept</a>
          <a>Review Title</a>
          <a>Decline</a>
        </Space>
      )}
    />
  </Table>



      
      </TabPanel>


      {/* Kaw na bahala dito. eto yung tabs ng declined walang laman*/}


      <TabPanel value={2}>
       
      </TabPanel>
    </Tabs>
  );
}
