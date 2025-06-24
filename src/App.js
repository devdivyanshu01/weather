import React, { useState } from 'react';
import './App.css';
import axios from "axios";

const API_KEY = "21d0511bb2ef62704fb3062678f79964";

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [airData, setAirData] = useState(null);

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city name.");
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (data.cod === 200) {
        setWeather(data);
        setError('');
        fetchAirQuality(data.coord.lat, data.coord.lon);
      } else {
        setError(data.message);
        setWeather(null);
        setAirData(null);
      }
    } catch (err) {
      setError("Failed to fetch weather.");
      setWeather(null);
      setAirData(null);
    }
  };

  const fetchAirQuality = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      setAirData(response.data);
    } catch (error) {
      console.error("Error fetching air pollution data:", error);
      setAirData(null);
    }
  };

  return (
    <div className="app">
      <div className="upper">
        <h1>🌤️ Weather App</h1>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <div className="loc">
            <h2>{weather.name}, {weather.sys.country}</h2>
            <p className="des">{weather.weather[0].description}</p>
          </div>
          <div className="info">
            <p>📅 Date: {new Date(weather.dt * 1000).toLocaleDateString()}</p>
            <p>🕑 Time: {new Date(weather.dt * 1000).toLocaleTimeString()}</p>
            <p>🌡️ Temp: {weather.main.temp} °C</p>
            <p>💧 Humidity: {weather.main.humidity}%</p>
            <p>🌬️ Wind: {weather.wind.speed} m/s</p>

            <div className="air">
              <h3>Air Quality</h3>
              {airData ? (
                <div className="qual">
                  <p><strong>PM2.5:</strong> {airData.list[0].components.pm2_5}</p>
                  <p><strong>PM10:</strong> {airData.list[0].components.pm10}</p>
                  <p><strong>CO:</strong> {airData.list[0].components.co}</p>
                  <p><strong>NO2:</strong> {airData.list[0].components.no2}</p>
                  <p><strong>O3:</strong> {airData.list[0].components.o3}</p>
                  <p><strong>AQI:</strong> {airData.list[0].main.aqi}</p>
                </div>
              ) : (
                <p>Loading air quality data...</p>
              )}
            </div>
          </div>
        </div>
      )}

      <footer>
        <div className="footer">
          <p>&copy; 2025. Created By Divyanshu.</p>
          <p>Weather App.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
