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
      // main.py - Handle cached userSelected dateRange by posting date range 
      if (dateRange.startDate && dateRange.endDate) {
        response = await axios.post('http://127.0.0.1:5000/api/neo', {
          start_date: dateRange.startDate.format('YYYY-MM-DD'),
          end_date: dateRange.endDate.format('YYYY-MM-DD')
        });
      } else {
        // main.py - Default get  
        response = await axios.get('http://127.0.0.1:5000/api/neo');
      }
      // Set response data to State 
      setMessage(response.data.message);
      setData(response.data.data);
    // Catch errors in /api/neo response
    } catch (error) {
      console.error('Error fetching data:', error);
    // Unmount component 
    } finally {
      setLoading(false);
    }
    // Dependency array ensures effect runs when dateRange changes
  }, [dateRange]);

  // useEffect to trigger data fetch on component mount and when fetchData changes
  useEffect(() => {
    fetchData(); // Recall the fetchData function to retrieve data from the API
  }, [fetchData]); // Dependency array 
  
  // useEffect to trigger when data state changes
  useEffect(() => {
    // If data state is not null
    if (data) {
      // If the data returned is structured as an array object
      if (Array.isArray(data) || typeof data === 'object') {
        // Update formattedData state with data 
        setFormattedData(JSON.stringify(data, null, 2));
      } else {
        setFormattedData('Data is not an object or array');
      }
    } else {
      setFormattedData('No data available');
    }
     // Dependency array
  }, [data]);

  // Handle onClick
  const handleClick = (object) => {
    setSelectedObject(object);
  };
  // Unused for now
  const handleDateRangeChange = (startDate, endDate) => {
    setSelectedDateRange({ startDate, endDate });
    console.log(selectedDateRange)
  };
  // If component is still loading data  
  if (loading) {
    return <div>Loading...</div>;
  }
  // If data is loaded and is an Array
  if (data && Array.isArray(data)) {
    // Construct NEO component 
    return (
      <div id="data-wrapper">

        <div id="near-earth-objs-wrapper">
          {data.map((object, index) => (
            <div
              id={`near-earth-objs-container-${object.id}`} // Unique ID for each container
              className='objs-container'
              key={object.id}
              style={{
                // border: '1px solid black',
                // marginBottom: '10px',
                // padding: '10px',
                cursor: 'pointer',
                // If the NEO object is Hazardous, update CSS 
                backgroundColor: object.is_hazardous ? '#FFFFE0' : 'inherit',
                color: object.is_hazardous === 'Yes' ? 'black' : 'inherit',
                
              }}
              onClick={() => handleClick(object)}
            >
              <div 
                className={`initial-data ${object.is_hazardous === "Yes" ? "hazardous" : ""}`}
              >
              <h3 id="near-earth-objs-name">Object {index + 1}: {object.name}</h3>
              <p className="near-earth-objs-data">ID: {object.id}</p>
              <p className="near-earth-objs-data">Magnitude: {object.absolute_magnitude_h}</p>
              <p id="hazard" className="near-earth-objs-data">Potentially Hazardous: {object.is_hazardous ? 'Yes' : 'No'}</p>
              <p className="near-earth-objs-data">Estimated Diameter (km): {object.diameter_min_km} - {object.diameter_max_km}</p>
              <p className="near-earth-objs-data">Close Approach Date: {object.approach_date}</p>
              <p className="near-earth-objs-data">Miss Distance (km): {object.miss_distance_km}</p>
              <p className="near-earth-objs-data">Relative Velocity (km/h): {object.velocity_kmph}</p>
              <a id="near-earth-objs-link" href={object.nasa_jpl_url} target="_blank" rel="noopener noreferrer">More Info</a>
              </div>   
              
              {selectedObject && selectedObject.id === object.id && (
                <div id="neo-object-container">
                  <NeoObject selectedObject={selectedObject} />                 
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