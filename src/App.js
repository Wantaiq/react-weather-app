import { useEffect, useState } from 'react';

function App() {
  const [location, setLocation] = useState('');

  useEffect(() => {
    if (!location) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
          });
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            setLocation('');
          }
        },
      );
    }
  });

  return <h1>Weather App</h1>;
}

export default App;
