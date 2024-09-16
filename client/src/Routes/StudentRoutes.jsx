import React from 'react'
import { Route, Routes, Link } from 'react-router-dom';


import MyManuscript from '../Dashboards/StudentDashboard/MyManuscript/MyManuscriptComponent'
import ExploreManuscript from '../Dashboards/StudentDashboard/ExploreManuscript/Articles'
import ViewAnalytics from '../Dashboards/StudentDashboard/ViewAnalytics/ViewAnalyticsComponent'

import Sidebar from '../Components/Sidebar/sidebar'
function StudentRoutes() {
  return (
    <>
       <Sidebar/>
      
              <Routes>
                <Route path="/" element={<ViewAnalytics/>} />
                <Route path="StudentDashboard/MyManuscript" element={<MyManuscript/>} />
                <Route path="StudentDashboard/ExploreManuscript" element={<ExploreManuscript/>} />
                <Route path="StudentDashboard/ViewAnalytics" element={<ViewAnalytics/>} />
      
              </Routes>
          
    </>
  )
}

export default StudentRoutes