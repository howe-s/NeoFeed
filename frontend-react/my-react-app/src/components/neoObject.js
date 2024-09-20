import axios from 'axios';
import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import '../static/neoObject.css';
import Chart from './ChartHandler'; // Import the new Chart component

const NeoObject = ({ selectedObject }) => {
    const [approachData, setApproachData] = useState(null);
    const [futureApproachData, setFutureApproachData] = useState(null);
    const [pastApproachData, setPastApproachData] = useState(null);
    const [orbitImage, setOrbitImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [distanceUnit, setDistanceUnit] = useState('kilometers');
    const [velocityUnit, setVelocityUnit] = useState('kilometers_per_hour');
    const [closeApproachDate, setCloseApproachDate] = useState(null);
    const nowRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            if (selectedObject) {
                setLoading(true);
                try {
                    const response = await axios.post('http://127.0.0.1:5000/api/neoObject', selectedObject);
                    const dataArray = JSON.parse(response.data.data);
                    setApproachData(dataArray.sorted_approaches);
                    setFutureApproachData(dataArray.future_approaches);
                    setPastApproachData(dataArray.past_approaches);
                    setOrbitImage(dataArray.orbital_image);
                } catch (error) {
                    console.error('Error occurred:', error);
                }
                setLoading(false);
            }
        };
        fetchData();
    }, [selectedObject]);

    useEffect(() => {
        if (nowRef.current) {
            nowRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [approachData]);

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

    const captureCloseApproachDate = (approachType, index) => {
        const item = approachType === 'past' ? pastApproachData[index] : futureApproachData[index];
        if (item) {
            const date = item.close_approach_date_full;
            setCloseApproachDate(date);
            console.log(`Close Approach Date set to: ${date}`);
        
            if (date) {
                axios.post('/api/updatedChart', JSON.stringify({ date: date }), {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    console.log('Data posted successfully:', response.data);
                })
                .catch(error => {
                    console.error('Error posting data:', error);
                });
            } else {
                console.warn('Close Approach Date is not set, not posting.');
            }
        }        
        
    };

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

    if (approachData && Array.isArray(approachData)) {
        return (
            <div id="user-obj-data-wrapper">
                {loading && <p>Loading...</p>}
                <Chart chartData={orbitImage} /> {/* Use the Chart component here */}

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
