export default function ChosenCityWeatherBox(props) {
  return (
    <div className="weather-info">
      <img
        src={`http://openweathermap.org/img/wn/${props.userCityWeatherData.weather[0].icon}@2x.png`}
        alt="Weather icon"
      />
      <p className="city">Location: {props.userCityWeatherData.name}</p>
      <p className="temperature">
        Temperature: {Math.round(props.userCityWeatherData.main.temp)}°
      </p>
      <p className="feels-like">
        Feels like: {Math.round(props.userCityWeatherData.main.feels_like)}°
      </p>
    </div>
  );
}
