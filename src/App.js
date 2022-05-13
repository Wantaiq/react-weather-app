import { useEffect, useState } from 'react';

function App() {
  const [cityInput, setCityInput] = useState('');
  const [chosenCity, setChosenCity] = useState('');
  const [userLocationWeatherData, setUserLocationWeatherData] = useState('');
  const [userCityWeatherData, setUserCityWeatherData] = useState('');

  useEffect(() => {
    async function fetchData(longitude, latitude) {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHER_KEY}&units=metric`,
        );
        if (!response.ok) {
          throw new Error('Weather data not available');
        }
        const data = await response.json();
        setUserLocationWeatherData(data);
      } catch (err) {
        console.log(err);
      }
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchData(position.coords.longitude, position.coords.latitude).catch(
          '',
        );
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          console.log('Location access permission denied');
        }
      },
    );
  }, []);

  useEffect(() => {
    async function fetchUserCityWeather() {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${chosenCity}&appid=${process.env.REACT_APP_WEATHER_KEY}&units=metric`,
        );
        if (!response.ok) {
          throw new Error('Weather data not available');
        }
        const cityData = await response.json();
        setUserCityWeatherData(cityData);
      } catch (err) {
        console.log(err);
      }
    }
    if (chosenCity) {
      fetchUserCityWeather().catch('');
    }
  }, [chosenCity]);

  return (
    <>
      <input onChange={(e) => setCityInput(e.currentTarget.value)} />
      <button onClick={() => setChosenCity(cityInput)} />
    </>
  );
}

export default App;
