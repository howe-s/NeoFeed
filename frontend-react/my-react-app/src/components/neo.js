import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../static/neo.css';
import NeoObject from './NeoObject';
import OrbitPlot from './OrbitPlot'

function Neo({ dateRange }) {
  const [message, setMessage] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formattedData, setFormattedData] = useState('');
  const [selectedObject, setSelectedObject] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true); // New state to handle initial load

  // Fetch data when dateRange changes or initial load
  useEffect(() => {
    fetchData();
  }, [dateRange]);

  const fetchData = async () => {
    setLoading(true);
    try {
      let response;
      if (isInitialLoad) {
        // Initial load with GET request
        response = await axios.get('http://127.0.0.1:5000/api/neo');
        setIsInitialLoad(false); // Set to false after initial load
      } else {
        // Subsequent requests with POST request
        response = await axios.post('http://127.0.0.1:5000/api/neo', {
          start_date: dateRange.startDate.format('YYYY-MM-DD'),
          end_date: dateRange.endDate.format('YYYY-MM-DD')
        });
      }
      setMessage(response.data.message);
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data) {
      if (Array.isArray(data)) {
        setFormattedData(JSON.stringify(data, null, 2));
      } else if (typeof data === 'object') {
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (data && Array.isArray(data)) {
    console.log(data)
    return (
      <div id="data-wrapper">
        <div id="near-earth-objs-wrapper">
          {data.map((object, index) => (
            <div
              id="near-earth-objs-container"
              key={object.id}
              style={{ border: "1px solid black", marginBottom: "10px", padding: "10px", cursor: 'pointer' }}
              onClick={() => handleClick(object)}
            >
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
          ))}
        </div>
        {selectedObject && (
          <NeoObject selectedObject={selectedObject} />
        )}
      </div>
    );
  } else {
    return <pre>{formattedData || 'No data available'}</pre>;
  }
}

export default Neo;
