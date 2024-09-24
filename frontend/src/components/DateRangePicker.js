import React, { useState } from 'react';
import axios from 'axios';
import '../static/headerBar.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// Initialize date range states
const DateRangePicker = ({ onDateRangeChange }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // handles onChange startDate 
  const handleStartDateChange = (newDate) => {
    setStartDate(newDate);
  };
  // handles onChange endDate 
  const handleEndDateChange = (newDate) => {
    setEndDate(newDate);
  };
  // handles user submit 
  const handleSubmit = () => {
    if (startDate && endDate) {
        console.log('submit')
      // Constucts the selectedDate data for /api/neo  
      const data = {
        start_date: startDate.format('YYYY-MM-DD'),
        end_date: endDate.format('YYYY-MM-DD'),
      };
      // main.py - Posts the selectedDate to API
      axios.post('http://127.0.0.1:5000/api/neo', data)
        .then((response) => {
          console.log('Data posted successfully:', response.data);
          onDateRangeChange(startDate, endDate);
        })
        .catch((error) => {
          console.error('Error posting data:', error);
        });
    } else {
      console.error('Both start and end dates must be selected.');
    }
  };
  // Constructs @mui/x-date-pickers component 
  return (
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
  );
};

export default DateRangePicker;
