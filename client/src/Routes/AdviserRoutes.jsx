import React from 'react'
import { Route, Routes, Link } from 'react-router-dom';


import MyAdvisee from '../Dashboards/AdviserDashboard/MyAdvisee/Tables'
import ExploreManuscript from '../Dashboards/AdviserDashboard/ExploreManuscript/ArticleList'
import ViewAnalytics from '../Dashboards/AdviserDashboard/ViewAnalytics/Chart'

import Sidebar from '../Dashboards/AdviserDashboard/Sidebar/sidebar'


function AdviserRoutes() {
  return (
    <>
     
      <Sidebar />
              <Routes>
                <Route path="/" element={<ViewAnalytics/>} />
                <Route path="AdviserDashboard/MyAdvisee" element={<MyAdvisee/>} />
                <Route path="AdviserDashboard/ExploreManuscript" element={<ExploreManuscript/>} />
                <Route path="AdviserDashboard/ViewAnalytics" element={<ViewAnalytics/>} />


                <Route path="AdviserDashboard/ViewAnalytics" element={<ViewAnalytics/>} />
              </Routes>
          
    </>
  )
}

export default AdviserRoutes