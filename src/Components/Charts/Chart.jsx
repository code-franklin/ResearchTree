import React from 'react'
import { BarCharts } from './BarCharts'
import { Pie } from './dataPychart'
import { LineChart } from './linechart'

import '../../App.css'
const Chart = () => {
  return (
   <>
   <div className="chart ">
    
   <BarCharts />
   <div className='piecharts'>
   <Pie/></div> 
   
   </div>

   <div className='linecharts'>
   <LineChart/>
   </div>
   
   </>
   
    
  )
}

export default Chart