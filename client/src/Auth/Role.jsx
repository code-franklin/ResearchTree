import React from 'react';
import { Select } from 'antd';
const handleChange = (value) => {
  console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
};
const Section = () => (
  

  <Select
    
    labelInValue
    defaultValue={{
      value: 'Role',
      label: 'Role',
    }}
    style={{
      width: 120,
      height: 32,
      
    }}
    onChange={handleChange}
    options={[
      {
        value: 'Student',
        label: 'Student',
      },
      {
        value: 'Adviser',
        label: 'Adviser',
      },
    ]}
  />

          

);
export default Section;