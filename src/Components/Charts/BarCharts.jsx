import React from "react";
import {
  G2,
  Chart,
  Tooltip,
  Interval,
  StackedColumnChart,
  Axis
} from "bizcharts";

const data = [
  {
    year: '1991',
    value: 3,
    type: 'Lon',
  },
  {
    year: '1992',
    value: 4,
    type: 'Lon',
  },
  {
    year: '1993',
    value: 7,
    type: 'Lon',
  },
  {
    year: '1994',
    value: 0.5,
    type: 'Lon',
  },
  {
    year: '1995',
    value: 4.9,
    type: 'Lon',
  },
  {
    year: '1996',
    value: 6,
    type: 'Lon',
  },
  {
    year: '1997',
    value: 7,
    type: 'Lon',
  },
  {
    year: '1998',
    value: 9,
    type: 'Lon',
  },
  {
    year: '1999',
    value: 0.5,
    type: 'Lon',
  },
  {
    year: '1991',
    value: 0.3,
    type: 'Bor',
  },
  {
    year: '1992',
    value: 4,
    type: 'Bor',
  },
  {
    year: '1993',
    value: 0.5,
    type: 'Bor',
  },
  {
    year: '1994',
    value: 5,
    type: 'Bor',
  },
  {
    year: '1995',
    value: 4.9,
    type: 'Bor',
  },
  {
    year: '1996',
    value: 6,
    type: 'Bor',
  },
  {
    year: '1997',
    value: 0.5,
    type: 'Bor',
  },
  {
    year: '1998',
    value: 9,
    type: 'Bor',
  },
  {
    year: '1999',
    value: 13,
    type: 'Bor',
  },
  {
    year: '1991',
    value: 1,
    type: 'Wiz',
  },
  {
    year: '1992',
    value: 2,
    type: 'Wiz',
  },
  {
    year: '1993',
    value: 5,
    type: 'Wiz',
  },
  {
    year: '1994',
    value: 4,
    type: 'Wiz',
  },
  {
    year: '1995',
    value: 15,
    type: 'Wiz',
  },
  {
    year: '1996',
    value: 2,
    type: 'Wiz',
  },
  {
    year: '1997',
    value: 10,
    type: 'Wiz',
  },
  {
    year: '1998',
    value: 12,
    type: 'Wiz',
  },
  {
    year: '1999',
    value: 3,
    type: 'Wiz',
  },
];

const gradientColors = {
  Lon: 'l(90) 0:#8F00FF 1:#0066FF',
  Bor: 'l(90) 0:#0066FF 1:#8F00FF',
  Wiz: 'l(90) 0:#8F00FF 1:#0066FF',
};

const opt = {
  autoFit: true,
  data,
  xField: 'year',
  yField: 'value',
  yAxis: {
    min: 0,
  },
  xAxis: {
    formatter: (item, index, record) => {
      console.log('item', item, index, record);
      return item !== '1993' ? item : '特殊';
    }
  },
  stackField: 'type',
  color: ({ type }) => gradientColors[type],
  label: {
    visible: true,
    position: 'middle'
  },
  title: {
    visible: true,
    text: 'Progress Activity',
    style: { fill: '#FFFFFF' }, // Change title color to white
    className: 'custom-title'
  },
  description: {
    visible: true,
    text: 'Monitor every year',
    style: { fill: '#FFFFFF' }, // Change description color to white

  }
};

export const BarCharts = () => {
  return (
    <div className="charts">
      <StackedColumnChart {...opt}>
      </StackedColumnChart>
      
    </div>
  );
}
