import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import LoginAuth from './Components/Authenticate/LoginFunction'
import Sidebar from './Components/Sidebar/sidebar';
import MyManuscript from "./Components/MyManuscript/ManuscriptPDF";
import ExploreManuscript from './Components/SearchingManuscript/ArticleList';
import ViewAnalytics from './Components/Charts/Chart';


function App() {
  return (
    <div className="App">
     <Router>
<div className="Container">
<Sidebar/>
</div>
        <Routes>
          <Route path="/" element={<Sidebar/>} />
          <Route path="/MyManuscript" element={<MyManuscript/>} />
          <Route path="/ExploreManuscript" element={<ExploreManuscript/>} />
          <Route path="/ViewAnalytics" element={<ViewAnalytics/>} />
          <Route path="/LoginAuth" element={<LoginAuth/>} />
        </Routes>

    </Router>
    
    </div>
  );
}


export default App;