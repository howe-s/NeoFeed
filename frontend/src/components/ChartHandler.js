import React from 'react';
import PlotlyChart from './PlotlyChart';

// Handles updated chart data being passed to Plotly component from /api/updatedChart
const Chart = React.memo(({ chartData }) => {
    return (
        <div className="orbit-chart">
            <PlotlyChart chartData={chartData} className="large-chart" />
        </div>
    );
});

export default Chart;
