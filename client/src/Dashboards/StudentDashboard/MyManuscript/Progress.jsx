import React from "react";
import ReactDOM from "react-dom";
import { DonutChart } from "bizcharts";

// Data source
const data = [
  {
    type: "Progress",
    value: 27,
  },
  {
    type: "Revision",
    value: 73,
  },
];

function Demo() {
  return (
    <DonutChart
      data={data || []}
      
      autoFit
      legend={false}  // Set legend to false to remove it
      width={200}
      height={600}  // Increase height to make the chart larger
      radius={0.9}    // Set outer radius to 90% of the container
      innerRadius={0.7} // Adjust inner radius to control the thickness of the donut
      padding="auto"
      angleField="value"
      colorField="type"
      color={["#0BF677", "#353535"]} // Set "Progress" color to green and "Revision" color to black
      pieStyle={{
        stroke: "", 
        lineWidth: 1, 
        lineCap: "round", // Set the ends of the segments to be rounded
        shadowBlur: 10, // Set the level of blur for the shadow
        shadowColor: "rgba(0, 0, 0, 0.6)", // Set the color and opacity of the shadow
        shadowOffsetX: 3, // Horizontal offset of the shadow
        shadowOffsetY: 3, // Vertical offset of the shadow
      }}
      statistic={{
        title: {
          content: "Progress", // Change text to "Progress"
          style: { color: "white", fontSize: 15 }, // Set text color to white and font size
        },
        content: {
          style: { color: "#0BF677", fontSize: 20 }, // Set value color to green and increase font size
          formatter: () => '27%', // Display the content value
        },
      }}
    />
  );
}

export default Demo;
