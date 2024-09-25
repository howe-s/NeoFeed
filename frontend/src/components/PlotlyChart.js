import React from 'react';
import Plot from 'react-plotly.js';

const PlotlyChart = ({ chartData }) => {
  // Ensure chartData is defined and has the correct structure
  const { data = [], layout = {} } = chartData || {};

    // Set the desired height for the chart
    const newLayout = {
      ...layout,
      // height: 1000,
      // width: 1000 
    };

  return (
    <Plot
      data={data}
      layout={layout}      
       // Optional: makes the plot responsive
    />
  );
};

export default PlotlyChart;
