import React from 'react';
import DateRangePicker from './DateRangePicker';

const Header = ({ onComponentChange, onDateRangeChange }) => {
  return (
    <header className="header-bar-container">
      <h1>NASA</h1>
      <button onClick={() => onComponentChange('Neo')}>Neo</button>
      <button onClick={() => onComponentChange('Mars')}>Mars</button>
      {/* <DateRangePicker onDateRangeChange={onDateRangeChange} /> */}
    </header>
  );
};

export default Header;
