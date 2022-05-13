export default function ChosenCityWeatherBox(props) {
  return (
    <>
      <p>Location: {props.userCityWeatherData.name}</p>
      <p>Temperature:{Math.round(props.userCityWeatherData.main.temp)}</p>
      <p>Feels like: {Math.round(props.userCityWeatherData.main.feels_like)}</p>
      <img
        src={`http://openweathermap.org/img/wn/${props.userCityWeatherData.weather[0].icon}@2x.png`}
        alt="Weather icon"
      />
    </>
  );
}
