import React from 'react'
import { Route, Routes, Link } from 'react-router-dom';


import MyAdvisee from '../Dashboards/AdviserDashboard/MyAdvisee/Tables'
import Publishing from '../Dashboards/AdviserDashboard/Publishing/Tables'
import ExploreManuscript from '../Dashboards/AdviserDashboard/ExploreManuscript/ArticleList'
import ViewAnalytics from '../Dashboards/AdviserDashboard/ViewAnalytics/Chart'
import UnauthorizedAccess from './UnauthorizedAccess'; // Import the UnauthorizedAccess component

import Sidebar from '../Dashboards/AdviserDashboard/Sidebar/sidebar'


function AdviserRoutes() {

  const user = JSON.parse(localStorage.getItem('user'));

  if (user.role !== 'adviser') {
    // Redirect to a non-authorized page or display an error message
    return <UnauthorizedAccess />;
  }

  return (
    <>
     
      <Sidebar />
              <Routes>
                <Route path="/" element={<ViewAnalytics/>} />
                <Route path="AdviserDashboard/MyAdvisee" element={<MyAdvisee/>} />
                <Route path="AdviserDashboard/Publishing" element={<Publishing/>} />
                <Route path="AdviserDashboard/ExploreManuscript" element={<ExploreManuscript/>} />
                <Route path="AdviserDashboard/ViewAnalytics" element={<ViewAnalytics/>} />


                <Route path="AdviserDashboard/ViewAnalytics" element={<ViewAnalytics/>} />
              </Routes>
          
    </>
  )
}

export default AdviserRoutes