import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import variablePie from 'highcharts/modules/variable-pie';
import "./PieChart.css";

// Initialize the variable pie module
variablePie(Highcharts);

// Define the VariablePieChart component
export const VariablePieChart = () => {
    const options = {
        chart: {
            type: 'variablepie',
            className: 'highcharts-custom-chart',
            backgroundColor: '#1E1E1E', // Set background color directly here
            spacingBottom: 15, // Bottom padding
            spacingTop: 20, // Top padding
            spacingLeft: 10, // Left padding
            spacingRight: 10, // Right padding
            height: 510, // Set height
            width: 420, // Set width
        },
        title: {
            text: 'Total Manuscript',
            className: 'highcharts-custom-title',
            style: {
                color: '#0BF677' // Set title text color to white
            },
        },
        legend: {
            align: 'center',
            verticalAlign: 'bottom',
            layout: 'horizontal',
            itemStyle: {
                color: '#FFFFFF' // Set legend item text color to white
            },
        },
        series: [{
            minPointSize: 10,
            innerSize: '30%',
            zMin: 0,
            showInLegend: true,
            className: 'highcharts-custom-series',
            borderColor: 'none', // Remove border color
            borderWidth: 0, // Remove border width
            dataLabels: {
                className: 'highcharts-custom-data-label',
            },
            data: [{
                name: 'Spain',
                y: 300,
                z: 92.9,
                color: '#FF4444' // Customize color for Spain
            }, {
                name: 'France',
                y: 50   ,
                z: 118.7,
                color: '#0BF677' // Customize color for France
            }, {
                name: 'Poland',
                y: 20,
                z: 124.6,
                color: '#C70039' // Customize color for Poland
            }, {
                name: 'Czech Republic',
                y: 372,
                z: 137.5,
                color: '#272827' // Customize color for Czech Republic
            }, {
                name: 'Italy',
                y: 200,
                z: 201.8,
                color: '#0BF677' // Customize color for Italy
            }]
        }]
    };

    return (
        <div className="highcharts-container">
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>
    );
};

export default VariablePieChart;
