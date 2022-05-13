export default function CityInput(props) {
  return (
    <>
      <input onChange={(e) => props.handleCityInput(e)} />
      <button onClick={props.handleCitySubmit} />
    </>
  );
}
