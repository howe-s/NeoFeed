import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import sanitizeHtml from 'sanitize-html';
import '../static/neoObject.css';
import PlotlyChart from './PlotlyChart';

const NeoObject = ({ selectedObject }) => {
    const [approachData, setApproachData] = useState(null);
    const [futureApproachData, setFutureApproachData] = useState(null);
    const [pastApproachData, setPastApproachData] = useState(null);
    const [orbitData, setOrbitData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [identifier, setIdentifier] = useState(null);
    const [orbitImage, setOrbitImage] = useState(null);
    const [objectID, setObjectID] = useState(null);

    // States for unit selection
    const [distanceUnit, setDistanceUnit] = useState('kilometers');
    const [velocityUnit, setVelocityUnit] = useState('kilometers_per_hour');

    const nowRef = useRef(null); // Ref for the <p>Now</p> element

    useEffect(() => {
        const fetchData = async () => {
            if (selectedObject) {
                setLoading(true);
                setApproachData(null);
                setOrbitData(null);
                setIdentifier(null);
                try {
                    const response = await axios.post('http://127.0.0.1:5000/api/neoObject', selectedObject);
                    const dataArray = JSON.parse(response.data.data);
                    setApproachData(dataArray.sorted_approaches);
                    setFutureApproachData(dataArray.future_approaches);
                    setPastApproachData(dataArray.past_approaches);
                    setOrbitImage(dataArray.orbital_image); // Sanitize HTML
                    setOrbitData(dataArray.orbital_data);
                    setIdentifier(JSON.stringify(dataArray.object_id));
                } catch (error) {
                    setMessage('Error occurred');
                }
                setLoading(false);
            }
        };
        fetchData();
    }, [selectedObject]); // Fetch data whenever selectedObject changes

    // Scroll to the <p>Now</p> element when component mounts
    useEffect(() => {
        if (nowRef.current) {
            nowRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [approachData]); // Trigger scroll when approachData changes

    // Function to get the display value based on selected units
    const getDisplayValue = (value, unit, type) => {
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

        return value[units[type][unit]]; // Directly use the value from the object
    };

    if (approachData && Array.isArray(approachData)) {
        return (
            <div id="user-obj-data-wrapper">
                {loading && <p>Loading...</p>}
                
                <div className="orbit-chart">
                    <PlotlyChart chartData={orbitImage} className="large-chart" />
                </div>                
                               
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
                        {pastApproachData.map((item, index) => (
                            <div key={index} className="past-approach-data">
                                <p><strong>Close Approach Date:</strong> {item.close_approach_date}</p>
                                <p><strong>Full Date:</strong> {item.close_approach_date_full}</p>
                                <p><strong>Miss Distance:</strong> {getDisplayValue(item.miss_distance, distanceUnit, 'distance')}</p>
                                <p><strong>Orbiting Body:</strong> {item.orbiting_body}</p>
                                <p><strong>Relative Velocity:</strong> {getDisplayValue(item.relative_velocity, velocityUnit, 'velocity')}</p>
                            </div>
                        ))}
                    </div>
                    <div><p ref={nowRef}>now</p></div>
                    <div className="future-approach-container">
                        {futureApproachData.map((item, index) => (
                            <div key={index} className="future-approach-data">
                                <p><strong>Close Approach Date:</strong> {item.close_approach_date}</p>
                                <p><strong>Full Date:</strong> {item.close_approach_date_full}</p>
                                <p><strong>Miss Distance:</strong> {getDisplayValue(item.miss_distance, distanceUnit, 'distance')}</p>
                                <p><strong>Orbiting Body:</strong> {item.orbiting_body}</p>
                                <p><strong>Relative Velocity:</strong> {getDisplayValue(item.relative_velocity, velocityUnit, 'velocity')}</p>
                            </div>
                        ))}
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
