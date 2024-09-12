import React, { useState } from 'react';
import { Input } from 'antd';
const { TextArea } = Input;
const App = () => {
  const [value, setValue] = useState('');
  return (
    <>
     
      <TextArea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Controlled autosize"
        autoSize={{
          minRows: 3,
          maxRows: 5,
        }}
      />
    </>
  );
};
export default App;