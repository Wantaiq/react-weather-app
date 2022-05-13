export default function UserLocation(props) {
  return (
    <>
      <p>Location: {props.userLocationWeatherData.name}</p>
      <p>Temperature:{Math.round(props.userLocationWeatherData.main.temp)}</p>
      <p>
        Feels like: {Math.round(props.userLocationWeatherData.main.feels_like)}
      </p>
      <img
        src={`http://openweathermap.org/img/wn/${props.userLocationWeatherData.weather[0].icon}@2x.png`}
        alt="Weather icon"
      />
    </>
  );
}
