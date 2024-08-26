import React from 'react'
import { Route, Routes, Link } from 'react-router-dom';


import Publishing from '../Dashboards/PanelistDashboard/Publishing/Tables'
import ExploreManuscript from '../Dashboards/PanelistDashboard/ExploreManuscript/ArticleList'
import ViewAnalytics from '../Dashboards/PanelistDashboard/ViewAnalytics/Chart'

import Sidebar from '../Dashboards/PanelistDashboard/Sidebar/sidebar'


function AdviserRoutes() {
  return (
    <>
     
      <Sidebar />
              <Routes>
                <Route path="/" element={<ViewAnalytics/>} />
                <Route path="PanelistDashboard/Publishing" element={<Publishing/>} />
                <Route path="PanelistDashboard/ExploreManuscript" element={<ExploreManuscript/>} />
                <Route path="PanelistDashboard/ViewAnalytics" element={<ViewAnalytics/>} />
      
              </Routes>
          
    </>
  )
}

export default AdviserRoutes