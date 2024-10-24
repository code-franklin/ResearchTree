import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Styles/article.css';
import { ConfigProvider } from 'antd';

import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip'
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { articles } from '../../../constant/ArticleList/ArticleList';
import SearchBar from './Search'
import CategoryComponent from './Categories'


const ArticleDate = [{
  title: 'Any time'
},
{
  title: 'Since 2024'
},
{
  title: 'Since 2023'
},
{
  title: 'Since 2022'
},
]


const ArticleList = () => {
  
  const [open, setOpen] = React.useState(false); // Start with the alert closed

  // Function to handle the button click
  const handleClick = () => {
      setOpen(true); // Open the alert when the button is clicked

      // Automatically close the alert after 3 seconds
      setTimeout(() => {
          setOpen(false);
      }, 3000); // 3000 milliseconds = 3 seconds
  };

  return (
   <div>


    <div className="min-h-screen text-white p-6 ml-[300px]">
    

  
      <header className="header justify-between items-center fixed">
       
        <div className="items-center space-x-2 mr-[100px] mt-[25px] ">
        
      
      <div className="ml-[200px]">
      <h1 className="text-[38px] font-bold mt-[20px] ml-2 ">Manuscript</h1>
     <br></br>
      <CategoryComponent />
    
     <div>
     <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#222222', 
              colorBgBase: '#222222',
              colorTextBase: 'white',
              zIndex: 1,
            }}}>
        <SearchBar />
     </ConfigProvider> 
     </div>
     
      </div>
      
        </div>
      </header>
      <div className="flex justify-between items-center mb-[120px]">
        <div className="relative flex items-center w-3/4">
         
         
        </div>
      </div>
      <div className="articlesScroll flex">
        <div className="w-3/4">
          {articles.map((article, index) => (
            <div
              key={index}
              className={`p-4 mb-4 cursor-pointer rounded-lg hover:bg-[#2F2F2F]  transition duration-300 ease-in-out`}
            >
              <h2 className=" text-xl font-bold mb-2">{article.title}</h2>
              <p className="text-[#7C7C7C] text-sm mb-2">{article.authors}</p>
              <p className="text-[#7C7C7C] text-sm">
                <span className="font-bold">Date Uploaded:</span> {article.dateUploaded} &nbsp;&nbsp;
                <span className="font-bold">Published:</span> {article.datePublished}
              </p>
            </div>
          ))}
        </div>
        <div className="w-1/4 fixed text-right p-4 ml-[800px] mb-[50px]">
        {ArticleDate.map((item, index) => (
          <p key={index} className="text-red-500 mr-[12.3px] mb-2 cursor-pointer hover:text-green-500">{item.title}</p>
        ))}
        </div>
      </div>
    </div>
    
    </div>
  );
};

export default ArticleList;
