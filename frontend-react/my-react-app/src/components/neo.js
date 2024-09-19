import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import '../static/neo.css';
import NeoObject from './NeoObject';
import OrbitPlot from './OrbitPlot';
import NewsFeed from './NewsFeed';
import DateRangePicker from './DateRangePicker';

function Neo({ dateRange }) {
  const [message, setMessage] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formattedData, setFormattedData] = useState('');
  const [selectedObject, setSelectedObject] = useState(null);
  const [selectedDateRange, setSelectedDateRange] = useState({ startDate: null, endDate: null });

  // Fetch data when dateRange changes or initial load
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      let response;
      if (dateRange.startDate && dateRange.endDate) {
        response = await axios.post('http://127.0.0.1:5000/api/neo', {
          start_date: dateRange.startDate.format('YYYY-MM-DD'),
          end_date: dateRange.endDate.format('YYYY-MM-DD')
        });
      } else {
        response = await axios.get('http://127.0.0.1:5000/api/neo');
      }
      setMessage(response.data.message);
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [dateRange]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (data) {
      if (Array.isArray(data) || typeof data === 'object') {
        setFormattedData(JSON.stringify(data, null, 2));
      } else {
        setFormattedData('Data is not an object or array');
      }
    } else {
      setFormattedData('No data available');
    }
  }, [data]);

  const handleClick = (object) => {
    setSelectedObject(object);
  };

  const handleDateRangeChange = (startDate, endDate) => {
    setSelectedDateRange({ startDate, endDate });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (data && Array.isArray(data)) {
    return (
      <div id="data-wrapper">
        <div className="date-range">
          <DateRangePicker onDateRangeChange={handleDateRangeChange} />
        </div>
        <div id="near-earth-objs-wrapper">
          {data.map((object, index) => (
            <div
              id={`near-earth-objs-container-${object.id}`} // Unique ID for each container
              class='objs-container'
              key={object.id}
              style={{
                // border: '1px solid black',
                // marginBottom: '10px',
                // padding: '10px',
                cursor: 'pointer',
                backgroundColor: object.is_hazardous === 'yes' ? 'orange' : 'inherit',
                color: object.is_hazardous === 'yes' ? 'black' : 'inherit',
                
              }}
              onClick={() => handleClick(object)}
            >
              <div className="initial-data">
              <h3 id="near-earth-objs-name">Object {index + 1}: {object.name}</h3>
              <p id="near-earth-objs-data">ID: {object.id}</p>
              <p id="near-earth-objs-data">Magnitude: {object.absolute_magnitude_h}</p>
              <p id="near-earth-objs-data">Potentially Hazardous: {object.is_hazardous ? 'Yes' : 'No'}</p>
              <p id="near-earth-objs-data">Estimated Diameter (km): {object.diameter_min_km} - {object.diameter_max_km}</p>
              <p id="near-earth-objs-data">Close Approach Date: {object.approach_date}</p>
              <p id="near-earth-objs-data">Miss Distance (km): {object.miss_distance_km}</p>
              <p id="near-earth-objs-data">Relative Velocity (km/h): {object.velocity_kmph}</p>
              <a id="near-earth-objs-link" href={object.nasa_jpl_url} target="_blank" rel="noopener noreferrer">More Info</a>
              </div>   
              
              {selectedObject && selectedObject.id === object.id && (
                <div id="neo-object-container">
                  <NeoObject selectedObject={selectedObject} />
                  {/* <p>test</p> */}
                </div>
              )}
              </div>
                
          ))}
        </div>
        {/* <NewsFeed /> */}
      </div>
    );
  } else {
    return <pre>{formattedData || 'No data available'}</pre>;
  }
}

export default Neo;
