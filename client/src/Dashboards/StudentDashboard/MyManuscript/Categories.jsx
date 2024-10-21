import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Input, Tag, Button, theme } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';

const App = () => {
  const { token } = theme.useToken();
  
  // Store tags as objects with both the tag name and a color
  const [tags, setTags] = useState([{ name: 'Tag 1', color: '#f50' }, { name: 'Tag 2', color: '#2db7f5' }, { name: 'Tag 3', color: '#87d068' }]);
  
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [showTag, setShowTag] = useState(false); // State to control visibility of the "New Tag"
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  // Function to generate a random color
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag.name !== removedTag.name);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && tags.findIndex(tag => tag.name === inputValue) === -1) {
      const newTag = { name: inputValue, color: getRandomColor() }; // Add new tag with random color
      setTags([...tags, newTag]);
    }
    setInputVisible(false);
    setInputValue('');
    setShowTag(false); // Hide the "New Tag" after confirming the input
  };

  const forMap = (tag) => (
    <span
      key={tag.name}
      style={{
        display: 'inline-block',
      }}
    >
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault();
          handleClose(tag);
        }}
        style={{ border: 'none',backgroundColor: tag.color, color: 'white', width: 'auto', }} // Apply the random color to the tag
      >
        {tag.name}
      </Tag>
    </span>
  );

  const tagChild = tags.map(forMap);
  const tagPlusStyle = {
    background: token.colorBgContainer,
    borderStyle: 'dashed',
  };

  return (
    <>
      {/* Icon Button and Categories Text */}
      <div className="flex items-center mb-4">
      <h2>Categories</h2> {/* Categories text */}
        {/* Icon Button for adding new tags */}
     
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setShowTag(true)}
          style={{marginLeft: '5px' }} // Add margin between the button and "Categories" text
        />
        
      </div>

      <div
        style={{
          marginBottom: 16,
        }}
      >
        <TweenOneGroup
          appear={false}
          enter={{
            scale: 0.8,
            opacity: 0,
            type: 'from',
            duration: 100,
          }}
          leave={{
            opacity: 0,
            width: 0,
            scale: 0,
            duration: 200,
          }}
          onEnd={(e) => {
            if (e.type === 'appear' || e.type === 'enter') {
              e.target.style = 'display: inline-block';
            }
          }}
        >
          {tagChild}
        </TweenOneGroup>
      </div>

      {/* Show the "New Tag" input if showTag is true */}
      {showTag && (
        <>
          {inputVisible ? (
            <Input
              ref={inputRef}
              type="text"
              size="small"
              style={{
                width: 78,
              }}
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputConfirm}
              onPressEnter={handleInputConfirm}
            />
          ) : (
            <Tag onClick={showInput} style={tagPlusStyle}>
              <PlusOutlined /> New Tag
            </Tag>
          )}
        </>
      )}
    </>
  );
};

export default App;
