import React, { useState } from 'react';
import { Chart } from 'chart.js'; // install chart.js

const OrbitPlot = ({ orbital_data }) => {
  const [chartRef, setChartRef] = useState(null);

  const chartOptions = {
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Semi-Major Axis (AU)'
        },
        ticks: {
          min: 0 // Set minimum 
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Inclination (deg)'
        },
        ticks: {
          min: 0, // Set minimum 
          max: 180 // Set maximum 
        }
      }]
    }
  };

  useState(() => {
    if (orbital_data && chartRef) {
      const ctx = chartRef.current.getContext('2d');
      const orbitPlot = new Chart(ctx, {
        type: 'scatter',
        data: {
          datasets: [{
            label: 'Orbit',
            data: orbital_data.map(item => ({
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
  }, [orbital_data, chartRef]);

  return (
    <div className="orbit-data-image">
      <h2>Orbit</h2>
      <canvas ref={setChartRef} width="400" height="200" />
    </div>
  );
};

export default OrbitPlot;