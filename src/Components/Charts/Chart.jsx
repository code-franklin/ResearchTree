import React from 'react'
import { BarChart } from './BarCharts'
import { VariablePieChart } from './Piechart'


import "./ViewAnalytics.css";

const Chart = () => {
  return (
   <>


   <div className="chart-1">
   <div className="bar-charts">
            <BarChart />
      </div>

      <div className="piechart-container">
            <VariablePieChart/>
      </div> 
      
      
   
   </div>

   
   
   <div className='chart-2'>
   
   </div>




   </>
  )
}

export default Chart