// DateRangePicker.js
import React, { useState } from 'react';
import axios from 'axios';
import '../static/headerBar.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const DateRangePicker = ({ onDateRangeChange }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (newDate) => {
    setStartDate(newDate);
  };

  const handleEndDateChange = (newDate) => {
    setEndDate(newDate);
  };

  const handleSubmit = () => {
    if (startDate && endDate) {
      const data = {
        start_date: startDate.format('YYYY-MM-DD'),
        end_date: endDate.format('YYYY-MM-DD'),
      };
      
      axios.post('http://127.0.0.1:5000/api/neo', data)
        .then((response) => {
          console.log('Data posted successfully:', response.data);
          // Notify parent component about the selected date range
          onDateRangeChange(startDate, endDate);
        })
        .catch((error) => {
          console.error('Error posting data:', error);
        });
    } else {
      console.error('Both start and end dates must be selected.');
    }
  };

  return (
    <header className="header-bar">
      <h1>My Application</h1>
      <div className="date-range-selector">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={handleStartDateChange}
            renderInput={(params) => <input {...params} />}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={handleEndDateChange}
            renderInput={(params) => <input {...params} />}
          />
        </LocalizationProvider>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </header>
  );
};

export default DateRangePicker;
