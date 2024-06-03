import React from "react";
import ReactDOM from "react-dom";
import { DonutChart } from "bizcharts";

// 数据源
const data = [
  {
    type: "To-Do",
    value: 27,
  },
  {
    type: "Ongoing",
    value: 25,
  },
  {
    type: "Done",
    value: 18,
    
  },
 
];

export const Pie = () => {
  return (
    <DonutChart
      data={data || []}
      title={{
        visible: true,
        text: "Progress Report",
      
      }}
      autoFit
      description={{
        visible: true,
        text: "Monitor Every Year",
      }}
      width={400}
	  height={400}
      
      radius={0.8}
      padding="auto"
      angleField="value"
      colorField="type"
      color={['#ff4d4f', '#5B8FF9', '#61DDAA']} // Manually set colors
      pieStyle={{  stroke: "WHITE", lineWidth: 1 }}
    />
  );
}
