import React from 'react';
import { Select } from 'antd';
const handleChange = (value) => {
  console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
};
const Course = () => (
  

  <Select
    
    labelInValue
    defaultValue={{
      value: 'Course',
      label: 'Course',
    }}
    style={{
      width: 120,
      height: 52,
      
    }}
    onChange={handleChange}
    options={[
      {
        value: 'BSIT',
        label: 'BSIT',
      },
      {
        value: 'BSCS',
        label: 'BSCS',
      },
    ]}
  />

          

);
export default Course;