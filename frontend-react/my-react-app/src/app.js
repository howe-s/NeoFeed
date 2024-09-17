// App.js
import React, { useState } from 'react';
import Neo from './components/Neo';
import './static/App.css'; // Your styles here
import DateRangePicker from './components/DateRangePicker'; // Ensure correct import

const App = () => {
  const [selectedDateRange, setSelectedDateRange] = useState(null);

  // Callback function to update state from DateRangePicker
  const handleDateRangeChange = (startDate, endDate) => {
    setSelectedDateRange({ startDate, endDate });
  };

  return (
    <div className="App">
      <div className="calendar-wrapper">
        <DateRangePicker onDateRangeChange={handleDateRangeChange} />
      </div>      
        <Neo dateRange={selectedDateRange} />      
    </div>
  );
};

export default App;
