import React from 'react';
import { Select, Typography, Row, Col } from 'antd';
import { UserOutlined } from '@ant-design/icons';


const { Option } = Select;

const CategoryComponent = () => {
  // Initial data with multiple occurrences of the categories
  const data = [
    { value: 'machine_learning', label: 'Machine Learning', count: 10000, category: 'Libraries' },
    { value: 'cybersecurity', label: 'Cybersecurity', count: 10600, category: 'Libraries' },
    { value: 'mobile_app', label: 'Mobile App', count: 60100, category: 'Solutions' },
    { value: 'blockchain', label: 'Blockchain', count: 30010, category: 'Solutions' },
    { value: 'iot', label: 'IoT', count: 50000, category: 'Articles' },
    { value: 'artificial_intelligence', label: 'Artificial Intelligence', count: 70000, category: 'Articles' },
  ];

  // Grouping data by category
  const groupedData = data.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  const handleChange = (value) => {
    console.log(value); // Logs the selected value, key, and label
  };

  return (
    <Select
    
      labelInValue
      defaultValue={{
        value: 'machine_learning',
        label: 'Machine Learning',
      }}
      style={{
        width: 400, 
      }}
      onChange={handleChange}
      dropdownRender={menu => (
        <>
          {Object.keys(groupedData).map((category) => (
            <div key={category}>
              <Row justify="space-between" align="middle" style={{ padding: '8px 16px', fontWeight: 'bold', background: '#f0f0f0' }}>
                <Col>{category}</Col>
                <Col>
                  <Typography.Link href="#" style={{ fontSize: '12px' }}>more</Typography.Link>
                </Col>
              </Row>
              {groupedData[category].map(item => (
                <Option key={item.value} value={item.value} label={item.label}>
                  <Row justify="space-between" align="middle">
                    <Col>
                      <Typography.Text>{item.label}</Typography.Text>
                    </Col>
                    <Col>
                      <UserOutlined style={{ marginRight: 8 }} />
                      {item.count}
                    </Col>
                  </Row>
                </Option>
              ))}
            </div>
          ))}
        </>
      )}
    />
  );
};

export default CategoryComponent;
