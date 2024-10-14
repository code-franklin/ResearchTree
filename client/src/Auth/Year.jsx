import React from 'react';
import { Select } from 'antd';
const handleChange = (value) => {
  console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
};
const Year = () => (
  

  <Select
    
    labelInValue
    defaultValue={{
      value: 'Year',
      label: 'Year',
    }}
    style={{
      width: 120,
      height: 32,
      marginTop: '20px',
      marginLeft: '10px',
    }}
    onChange={handleChange}
    options={[
      {
        value: '2024',
        label: '2024',
      },
      {
        value: '2025',
        label: '2025',
      },
      {
        value: '2026',
        label: '2026',
      },
      {
        value: '2027',
        label: '2027',
      },
      {
        value: '2028',
        label: '2028',
      },
      {
        value: '2029',
        label: '2029',
      },
      {
        value: '2030',
        label: '2030',
      },

      
    ]}
  />

          

);
export default Year;