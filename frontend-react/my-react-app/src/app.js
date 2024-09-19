import React, { useState } from 'react';
import Neo from './components/Neo';
import OrbitPlot from './components/OrbitPlot';
import './static/neo-App.css'; // Your styles here
import DateRangePicker from './components/DateRangePicker'; // Ensure correct import
import NewsFeed from './components/NewsFeed';
import Header from './components/Header'
import Mars from './components/Mars'

const App = () => {
  const [selectedComponent, setSelectedComponent] = useState('Neo');
  const [selectedDateRange, setSelectedDateRange] = useState({ startDate: null, endDate: null });



  const handleComponentChange = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div className="neo-App">
      <Header onComponentChange={handleComponentChange}/>
      {selectedComponent === 'Neo' && <Neo dateRange={selectedDateRange} />}
      {selectedComponent === 'Mars' && <Mars dateRange={selectedDateRange} />}
    </div>
  );
};

export default App;