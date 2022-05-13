export default function UserLocation(props) {
  return (
    <div className="weather-info">
      <img
        src={`http://openweathermap.org/img/wn/${props.userLocationWeatherData.weather[0].icon}@2x.png`}
        alt="Weather icon"
      />
      <p className="city">Location: {props.userLocationWeatherData.name}</p>
      <p className="temperature">
        Temperature: {Math.round(props.userLocationWeatherData.main.temp)}°
      </p>
      <p className="feels-like">
        Feels like: {Math.round(props.userLocationWeatherData.main.feels_like)}°
      </p>
    </div>
  );
}
