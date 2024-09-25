import React from 'react';
import PlotlyChart from './PlotlyChart';
import '../static/neo.css';

// Handles updated chart data being passed to Plotly component from /api/updatedChart
const Chart = React.memo(({ chartData }) => {
    return (
        <div className="orbit-chart-container">
            <PlotlyChart chartData={chartData} className="large-chart" />
        </div>
    );
});

export default Chart;
