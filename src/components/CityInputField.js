export default function CityInput(props) {
  return (
    <div className="input-container">
      <input
        onChange={(e) => props.handleCityInput(e)}
        className="city-input"
        value={props.cityInput}
      />
      <button onClick={props.handleCitySubmit} className="search-btn">
        Search
      </button>
    </div>
  );
}
