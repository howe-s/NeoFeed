import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

function Mars() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      let response = await axios.get('/api/mars');
      if (response) {        
        setData(response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array to ensure fetchData is memoized and doesn't recreate on every render.

  useEffect(() => {
    fetchData(); // Call the fetchData function on component mount.
  }, [fetchData]); // Dependency on fetchData to prevent re-creating.

  if (loading) {
    return <div>Loading...</div>;
  }

  if (data) {
    return (
      <div id="testwrapper">
        <p>{JSON.stringify(data.message)}</p> {/* Render the data properly */}
        <p>Hello, World</p>
      </div>
    );
  }

  return <div>No data available</div>;
}

export default Mars;
