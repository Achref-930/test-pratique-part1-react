import NavBar from "./components/NavBar";
import "./App.css";
import Search from "./components/Search";
import WeatherData from "./components/WeatherData";
import { useState } from "react";

function App() {

  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchweather = async (city) => {
  setLoading(true);
  setError(null);
  
  try {
    const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;
    const apiHost = import.meta.env.VITE_RAPIDAPI_HOST;
    
    const response = await fetch(
      `https://open-weather13.p.rapidapi.com/city?city=${encodeURIComponent(city)}&lang=EN`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key': apiKey,
          'x-rapidapi-host': apiHost
        }
      }
    );
    
    if (!response.ok) {
      throw new Error('City not found or API error');
    }
    
    const data = await response.json();
    console.log('API Response:', data); // Debug: see what API returns
    setWeatherData(data);
    
  } catch (error) {
    console.error("Error fetching weather data:", error);
    setError(error.message);
    alert("Failed to fetch weather data. Please try again later.");   
  } finally {
    setLoading(false);
  }
};


  return (
    <div id="App">
      <NavBar />
      <div id="app-content">
        <WeatherData weatherData={weatherData} loading={loading} error={error} />
        <Search onSearch={fetchweather} />
      </div>
    </div>
  );
}

export default App;
