import React, { useState } from 'react';
import axios from 'axios';

function MyComponent() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [responseText, setResponseText] = useState('');
  const [loading, setLoading] = useState(false); // Initialize loading state

  const sendRequest = () => {
    setLoading(true); // Set loading to true when the request starts

    axios.get('/csrf/').then((response) => {
      const csrfToken = response.data.csrfToken;

      axios
        .post(
          '/ajax/',
          {
            latitude: latitude,
            longitude: longitude,
          },
          {
            headers: {
              'X-CSRFToken': csrfToken,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          setResponseText(response.data);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false); // Set loading to false when the request is completed (whether it's successful or not)
        });
    });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Latitude"
        onChange={(e) => setLatitude(e.target.value)}
      />
      <input
        type="text"
        placeholder="Longitude"
        onChange={(e) => setLongitude(e.target.value)}
      />
      <button onClick={sendRequest}>Send Request</button>

      {/* Display loading spinner while loading */}
      {loading && <div>Loading...</div>}

      {/* Display the response text */}
      {!loading && responseText && (
        <div>
          <h2>Response:</h2>
          <p>{responseText}</p>
        </div>
      )}
    </div>
  );
}

export default MyComponent;
