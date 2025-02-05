import React, { useState } from 'react';
import Neo from './components/neo/Neo';
import OrbitPlot from './components/OrbitPlot';
import './styles/components/neo-App.css'; 
import DateRangePicker from './components/common/DateRangePicker'; 
import NewsFeed from './components/news/NewsFeed';
import Header from './components/common/Header'
import Mars from './components/planets/Mars'
import Earth from './components/planets/Earth'

const App = () => {
  const [selectedComponent, setSelectedComponent] = useState('Neo');
  const [selectedDateRange, setSelectedDateRange] = useState({ startDate: null, endDate: null });

  const handleDateRangeChange = (startDate, endDate) => {
    setSelectedDateRange({ startDate, endDate });  // Update date range when user submits
    console.log("New date range:", { startDate, endDate });
  };

  const handleComponentChange = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div className="neo-App">
      <Header onComponentChange={handleComponentChange}/>
      <div className="app-Body">
        <div className="date-range">
            <DateRangePicker onDateRangeChange={handleDateRangeChange} />
          </div>
        {selectedComponent === 'Neo' && <Neo dateRange={selectedDateRange} />}
        {selectedComponent === 'Earth' && <Earth dateRange={selectedDateRange} />}
        {selectedComponent === 'Mars' && <Mars dateRange={selectedDateRange} />}
        
      </div>
    </div>
  );
};

export default App;