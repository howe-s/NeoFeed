import axios from 'axios';
import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import Chart from '../charts/ChartHandler'; // Import the new Chart component

// Child component to Neo.js
const NeoObject = ({ selectedObject }) => {
    // Set initial states
    const [approachData, setApproachData] = useState(null);
    const [futureApproachData, setFutureApproachData] = useState(null);
    const [pastApproachData, setPastApproachData] = useState(null);
    const [orbitImage, setOrbitImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [distanceUnit, setDistanceUnit] = useState('kilometers');
    const [velocityUnit, setVelocityUnit] = useState('kilometers_per_hour');
    const [closeApproachDate, setCloseApproachDate] = useState(null);
    const nowRef = useRef(null);
    
    // useEffect to update component when a selectedObject is posted to /api/neoObject
    useEffect(() => {
        // Asyncronous function  
        const fetchData = async () => { 
            // Passed from parent Neo.js          
            if (selectedObject) {
                setLoading(true); 
                try {
                    // main.py - Post the selectedObject data to /api/neoObject
                    const response = await axios.post('http://127.0.0.1:5000/api/neoObject', selectedObject);                   
                    const dataArray = JSON.parse(response.data.data);
                   
                    setApproachData(dataArray.sorted_approaches);
                    setFutureApproachData(dataArray.future_approaches);
                    setPastApproachData(dataArray.past_approaches);
                    setOrbitImage(dataArray.orbital_image);

                // Catch API resonse errors
                } catch (error) {
                    console.error('Error occurred:', error);
                }
                setLoading(false); 
            }
        };
        // Trigger fetchData when selectedObject is updated
        fetchData();
        // Dependency array 
    }, [selectedObject], setOrbitImage);

    // unused useEffect that centers the scroll in approach dates on the current date 
    useEffect(() => {
        if (nowRef.current) {
            nowRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [approachData]);

    // Callback function to obtain the display value for unit conversion
    const getDisplayValue = useCallback((value, unit, type) => {
        const units = {
            distance: {
                astronomical: 'astronomical',
                kilometers: 'kilometers',
                lunar: 'lunar',
                miles: 'miles'
            },
            velocity: {
                kilometers_per_hour: 'kilometers_per_hour',
                kilometers_per_second: 'kilometers_per_second',
                miles_per_hour: 'miles_per_hour'
            }
        };
        return value[units[type][unit]];
    }, []);

    // Obtains user selected NEO object date and posts to /api/updatedChart 
    const captureCloseApproachDate = (approachType, index) => {
        // Handles the two possible lists of approach data 
        const item = approachType === 'past' ? pastApproachData[index] : futureApproachData[index];
        if (item) {
            
            const date = item.close_approach_date_full;
            // setCloseApproachDate(date);
            // console.log(`Close Approach Date set to: ${date}`);

            
            if (date) {
                // Post 
                axios.post('/api/updatedChart', JSON.stringify({ date: date }), {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                // Update orbitImage state with new chart data
                .then(response => {
                    console.log('Data posted successfully:', response.data.data);
                    console.log('orbit image', orbitImage)
                    setOrbitImage(response.data.data)
                })
                // Handle errors from the API
                .catch(error => {
                    console.error('Error posting data:', error);
                });
            } else {
                console.warn('Close Approach Date is not set, not posting.'); // Error handle for extraction 
            }
        }        
        
    };
    // Sort
    const renderedPastApproaches = useMemo(() => {
        return pastApproachData?.map((item, index) => (
            <div key={index} className="past-approach-data" onClick={() => captureCloseApproachDate('past', index)}>
                <p><strong>Close Approach Date:</strong> {item.close_approach_date}</p>
                <p><strong>Full Date:</strong> {item.close_approach_date_full}</p>
                <p><strong>Miss Distance:</strong> {getDisplayValue(item.miss_distance, distanceUnit, 'distance')}</p>
                <p><strong>Orbiting Body:</strong> {item.orbiting_body}</p>
                <p><strong>Relative Velocity:</strong> {getDisplayValue(item.relative_velocity, velocityUnit, 'velocity')}</p>
            </div>
        ));
    }, [pastApproachData, distanceUnit, velocityUnit, getDisplayValue]);

    // Sort
    const renderedFutureApproaches = useMemo(() => {
        return futureApproachData?.map((item, index) => (
            <div key={index} className="future-approach-data" onClick={() => captureCloseApproachDate('future', index)}>
                <p><strong>Close Approach Date:</strong> {item.close_approach_date}</p>
                <p><strong>Full Date:</strong> {item.close_approach_date_full}</p>
                <p><strong>Miss Distance:</strong> {getDisplayValue(item.miss_distance, distanceUnit, 'distance')}</p>
                <p><strong>Orbiting Body:</strong> {item.orbiting_body}</p>
                <p><strong>Relative Velocity:</strong> {getDisplayValue(item.relative_velocity, velocityUnit, 'velocity')}</p>
            </div>
        ));
    }, [futureApproachData, distanceUnit, velocityUnit, getDisplayValue]);

    // If the approachData state exists and is an Array
    if (approachData && Array.isArray(approachData)) {
        return (
            <div className="user-obj-data-wrapper">
                {loading && <p>Loading...</p>}

                {/* Render the Chart */}
                <Chart chartData={orbitImage} /> 

                {/* Render the Unit Selectors */}
                <div className="unit-selectors">
                    <label>
                        <select value={distanceUnit} onChange={(e) => setDistanceUnit(e.target.value)}>
                            <option value="astronomical">Astronomical</option>
                            <option value="kilometers">Kilometers</option>
                            <option value="lunar">Lunar</option>
                            <option value="miles">Miles</option>
                        </select>
                    </label>
                    <label>
                        <select value={velocityUnit} onChange={(e) => setVelocityUnit(e.target.value)}>
                            <option value="kilometers_per_hour">km/h</option>
                            <option value="kilometers_per_second">km/s</option>
                            <option value="miles_per_hour">miles/h</option>
                        </select>
                    </label>
                </div>

                {/* Render the approachData */}
                <div className="user-approach-container">
                    <div className="approach">
                        <div className="past-approach-container">
                            {renderedPastApproaches}
                        </div>
                        <div className="future-approach-container">
                            {renderedFutureApproaches}
                        </div>
                    </div>
                </div> 

            </div>
        );
    } else {
        return null;
    }
};

export default NeoObject;
