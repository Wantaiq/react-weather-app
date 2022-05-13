import { useEffect, useState } from 'react';
import ChosenCityWeatherBox from './components/ChosenCityWeatherBox';
import CityInputField from './components/CityInputField';
import UserLocationWeatherBox from './components/UserLocationWeatherBox';

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
        console.log('I am first fetch');
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
        console.log('hi');
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

  function handleCityInput(e) {
    setCityInput(e.currentTarget.value);
  }

  function handleCitySubmit() {
    setChosenCity(cityInput);
  }

  return (
    <>
      {userLocationWeatherData && (
        <UserLocationWeatherBox
          userLocationWeatherData={userLocationWeatherData}
        />
      )}
      <CityInputField
        handleCityInput={handleCityInput}
        handleCitySubmit={handleCitySubmit}
      />
      {userCityWeatherData && (
        <ChosenCityWeatherBox userCityWeatherData={userCityWeatherData} />
      )}
    </>
  );
}

export default App;
