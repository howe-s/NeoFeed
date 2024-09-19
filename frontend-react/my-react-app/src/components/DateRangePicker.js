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
        console.log('submit')
      const data = {
        start_date: startDate.format('YYYY-MM-DD'),
        end_date: endDate.format('YYYY-MM-DD'),
      };

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
