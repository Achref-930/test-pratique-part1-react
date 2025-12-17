import PropTypes from 'prop-types';

function WeatherData({ weatherData, loading, error }) {
  // Show loading message while fetching
  if (loading) {
    return (
      <div id="weather-container">
        <p>Loading weather data...</p>
      </div>
    );
  }

  // Show error message if API failed
  if (error) {
    return (
      <div id="weather-container">
        <p style={{ color: 'red' }}>Error: {error}</p>
      </div>
    );
  }

  // Show placeholder before first search
  if (!weatherData) {
    return (
      <div id="weather-container">
        <p>Search for a city to see weather</p>
      </div>
    );
  }

  // Convert Fahrenheit to Celsius
  const tempInCelsius = Math.round((weatherData.main.temp - 32) * 5/9);
  
  // Show actual weather data
  return (
    <div id="weather-container">
      <img 
        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
        alt={weatherData.weather[0].description} 
      />
      <div id="weather-details">
        <h1>{weatherData.name}</h1>
        <h2>{tempInCelsius} °C</h2>
        <h3 className="description">{weatherData.weather[0].description}</h3>
      </div>
    </div>
  );
}

WeatherData.propTypes = {
  weatherData: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};



export default WeatherData;
