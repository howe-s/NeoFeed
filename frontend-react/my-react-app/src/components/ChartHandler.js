import React from 'react';
import PlotlyChart from './PlotlyChart';

const Chart = React.memo(({ chartData }) => {
    return (
        <div className="orbit-chart">
            <PlotlyChart chartData={chartData} className="large-chart" />
        </div>
    );
});

export default Chart;
