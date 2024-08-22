import React from 'react';
import './App.css';

import { ThemeProvider, createTheme } from "@mui/material/styles"
import { Container, CssBaseline } from "@mui/material";


import Sidebar from './Components/Sidebar/sidebar'



import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import StudentRoutes from './Routes/StudentRoutes';




function MyManuscriptComponent() {

  
  return (
    <div className="App">
        <Router>
             <Sidebar/>
      <Routes>
        
        <Route path="/" element={<StudentRoutes/>} />
       
      </Routes>
    </Router>
    </div>
  );
}


export default MyManuscriptComponent;