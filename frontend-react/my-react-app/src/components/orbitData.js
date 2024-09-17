import React, { useState } from 'react';
import { Chart } from 'chart.js'; // You'll need to install chart.js

const OrbitPlot = ({ orbitData }) => {
  const [chartRef, setChartRef] = useState(null);

  const chartOptions = {
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Semi-Major Axis (AU)'
        },
        ticks: {
          min: 0 // Set minimum based on your data
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Inclination (deg)'
        },
        ticks: {
          min: 0, // Set minimum based on your data
          max: 180 // Set maximum based on your data
        }
      }]
    }
  };

  useState(() => {
    if (orbitData && chartRef) {
      const ctx = chartRef.current.getContext('2d');
      const orbitPlot = new Chart(ctx, {
        type: 'scatter',
        data: {
          datasets: [{
            label: 'Orbit',
            data: orbitData.map(item => ({
              x: item.semi_major_axis,
              y: item.inclination
            })),
            pointRadius: 3,
            pointBackgroundColor: 'blue'
          }]
        },
        options: chartOptions
      });
    }
  }, [orbitData, chartRef]);

  return (
    <div>
      <h2>Orbit</h2>
      <canvas ref={setChartRef} width="400" height="200" />
    </div>
  );
};

export default OrbitPlot;