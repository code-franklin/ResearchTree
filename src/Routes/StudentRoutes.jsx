import React from 'react'
import { Route, Routes, Link } from 'react-router-dom';


import MyManuscript from '../Dashboards/StudentDashboard/MyManuscript/MyManuscriptComponent'
import ExploreManuscript from '../Dashboards/StudentDashboard/ExploreManuscript/Articles'
import ViewAnalytics from '../Dashboards/StudentDashboard/ViewAnalytics/ViewAnalyticsComponent'


function StudentRoutes() {
  return (
    <>
     
      
              <Routes>
                <Route path="/" element={<ViewAnalytics/>} />
                <Route path="/MyManuscript" element={<MyManuscript/>} />
                <Route path="/ExploreManuscript" element={<ExploreManuscript/>} />
                <Route path="/ViewAnalytics" element={<ViewAnalytics/>} />
      
              </Routes>
          
    </>
  )
}

export default StudentRoutes