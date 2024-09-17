import React from 'react';
import Plot from 'react-plotly.js';

const PlotlyChart = ({ chartData }) => {
  // Ensure chartData is defined and has the correct structure
  const { data = [], layout = {} } = chartData || {};

  return (
    <Plot
      data={data}
      layout={layout}
      config={{ responsive: true }} // Optional: makes the plot responsive
    />
  );
};

export default PlotlyChart;
