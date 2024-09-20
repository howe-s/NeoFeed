// HeaderBar.js
import React, { useState } from 'react';
import DatePicker from 'react-date-picker';
import axios from 'axios'; // Import axios for the POST request
import '../static/headerBar.css'; // Assuming you have a CSS file for styling

const HeaderBar = ({ onDateRangeChange }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleStartDateChange = (date) => {
    setStartDate(date);
    onDateRangeChange(date, endDate);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    onDateRangeChange(startDate, date);
  };

  const handleSubmit = () => {
    const data = {
      start_date: startDate.toISOString().split('T')[0], // Format date as YYYY-MM-DD
      end_date: endDate.toISOString().split('T')[0],
    };

    axios.post('http://127.0.0.1:5000/api/neo', data)
      .then((response) => {
        console.log('Data posted successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error posting data:', error);
      });
  };

  return (
    <header className="header-bar">
      <h1>My Application</h1>
      <div className="date-range-selector">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
          />
        </LocalizationProvider>
        <button onClick={handleSubmit}>Submit</button> {/* Add submit button */}
      </div>
    </header>
  );
};

export default HeaderBar;
