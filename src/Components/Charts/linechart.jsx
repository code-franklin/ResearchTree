import React from "react";
import { Chart, Line, Point, Tooltip } from "bizcharts";


// 数据源
const data = [
	{
		year: "1991",
		value: 3,
	},
	{
		year: "1992",
		value: 4,
	},
	{
		year: "1993",
		value: 3.5,
	},
	{
		year: "1994",
		value: 5,
	},
	{
		year: "1995",
		value: 4.9,
	},
	{
		year: "1996",
		value: 6,
	},
	{
		year: "1997",
		value: 7,
	},
	{
		year: "1998",
		value: 9,
	},
	{
		year: "1999",
		value: 13,
	},
];



export const LineChart = () => {

	return (
		
			<Chart
				appendPadding={[10, 0, 0, 10]}
				autoFit
				height={300}
				data={data}
				onLineClick={console.log}
				scale={{ value: { min: 0, alias: 'Test', type: 'linear-strict' }, year: { range: [0, 1] } }}
			>

				<Line position="year*value" />
				<Point position="year*value" />
				<Tooltip showCrosshairs follow={false} />
			</Chart>

	);
}

