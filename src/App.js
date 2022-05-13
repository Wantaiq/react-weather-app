import { useEffect, useState } from 'react';
import ChosenCityWeatherBox from './components/ChosenCityWeatherBox';
import CityInputField from './components/CityInputField';
import UserLocationWeatherBox from './components/UserLocationWeatherBox';

function App() {
  const [cityInput, setCityInput] = useState('');
  const [chosenCity, setChosenCity] = useState('');
  const [userLocationWeatherData, setUserLocationWeatherData] = useState('');
  const [userCityWeatherData, setUserCityWeatherData] = useState('');
  const [locationErrorMessage, setLocationErrorMessage] = useState('');
  const [cityDataErrorMessage, setCityDataErrorMessage] = useState('');

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
        console.log('hi');
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
          setLocationErrorMessage('Location access permission denied');
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
        console.log('City fetch');
        const cityData = await response.json();
        setUserCityWeatherData(cityData);
      } catch (err) {
        console.log(err);
        setCityDataErrorMessage('Weather data not available');
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
    setCityInput('');
  }

  return (
    <div className="container">
      <div className="flex">
        <div className="location">
          {locationErrorMessage && (
            <p className="location-err-message">{locationErrorMessage}</p>
          )}
          {userLocationWeatherData && (
            <UserLocationWeatherBox
              userLocationWeatherData={userLocationWeatherData}
            />
          )}
        </div>
        <div className="city">
          {cityDataErrorMessage && (
            <p className="city-data-err-message">{cityDataErrorMessage}</p>
          )}
          {userCityWeatherData && (
            <ChosenCityWeatherBox
              userCityWeatherData={userCityWeatherData}
              errorMessage={cityDataErrorMessage}
            />
          )}
        </div>
      </div>
      <CityInputField
        handleCityInput={handleCityInput}
        handleCitySubmit={handleCitySubmit}
        cityInput={cityInput}
      />
      {/* {userLocationWeatherData && (
        <UserLocationWeatherBox
        userLocationWeatherData={userLocationWeatherData}
        />
        )}
        <CityInputField
        handleCityInput={handleCityInput}
        handleCitySubmit={handleCitySubmit}
        cityInput={cityInput}
        />
        {userCityWeatherData && (
          <ChosenCityWeatherBox
          userCityWeatherData={userCityWeatherData}
          errorMessage={cityDataErrorMessage}
          />
        )} */}
    </div>
  );
}

export default App;
