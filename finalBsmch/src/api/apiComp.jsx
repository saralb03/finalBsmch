import React, { useEffect } from 'react';
import axios from 'axios';

export default function ApiComp() {
  useEffect(() => {
    const doApi = async () => {
      const apiKey = '3t0KseAfOUcvOa6SBBXtWVNmvqbzbrKdeUnHN28U';

      try {
        const response = await axios.get('https://api.api-ninjas.com/v1/dadjokes?limit=10', {
          headers: {
            'X-Api-Key': apiKey,
          },
        });

        console.log(response.data[0]);
      } catch (error) {
        if (error.response) {
          // The request was made, but the server responded with a status code other than 2xx
          console.error('Error:', error.response.status, error.response.data);
        } else if (error.request) {
          // The request was made, but no response was received
          console.error('No response received:', error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error setting up request:', error.message);
        }
      }
    };

    // Call the API method when the component mounts
    doApi();
  }, []); // The empty dependency array ensures that this effect runs once when the component mounts

  return (
    <div>
      {/* You can include additional JSX for your component */}
      <p>This is the ApiComp component</p>
    </div>
  );
}
