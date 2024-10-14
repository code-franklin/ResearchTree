import React from 'react';
import { Select } from 'antd';
const handleChange = (value) => {
  console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
};
const Section = () => (
  

  <Select
    
    labelInValue
    defaultValue={{
      value: 'Section',
      label: 'Section',
    }}
    style={{
      width: 120,
      height: 52,
      
    }}
    onChange={handleChange}
    options={[
      {
        value: '1A',
        label: '1A',
      },
      {
        value: '2B',
        label: '2B',
      },
    ]}
  />

          

);
export default Section;