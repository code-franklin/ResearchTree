import React from 'react'
import { BarChart } from './BarCharts'
import { PieChart } from './Piechart'
import { Cards } from './Statistics'
import "./Styles/viewAnalytics.css";

import YearDropdown from './YearDropdown'
const Chart = () => {
  return (
       <div className="h-[800px]]">
     <div className="chart-1">
      <div className="absolute text-white text-[40px] font-bold mt-[50px] ml-[16px]">
      <YearDropdown/>
      </div>
    
      <div className="absolute right-[57px] top-[27px]">
      {/* <BasicModal/> */}
      </div>
    
   <div className="bar-charts">
  
        <BarChart />
        <Cards/>
        
   </div>
  
  <div className="chart-2">
      
        <PieChart/>

  </div> 
     </div>
       </div>
  )
}

export default Chart;