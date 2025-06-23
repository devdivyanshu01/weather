import React, { useState } from 'react';
import './App.css';

const API_KEY = "21d0511bb2ef62704fb3062678f79964"; // Replace with your OpenWeatherMap API key

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

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
      } else {
        setError(data.message);
        setWeather(null);
      }
    } catch (err) {
      setError("Failed to fetch weather.");
    }
  };

  return (
    <div className="container">
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
          <p>{weather.weather[0].description}</p>
          </div>
          <div className="info">
          <p>📅 Date: {new Date(weather.dt*1000).toLocaleDateString()}</p>
          <p>🕑 Time: {new Date(weather.dt*1000).toLocaleTimeString()}</p>
          <p>🌡️ Temp: {weather.main.temp} °C</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>🌬️ Wind: {weather.wind.speed} m/s</p>
          
          <p> Precipitation: {}</p>
          </div>
        </div>
      )}
      <footer className="foooter">
        <p>Created By Divyanshu.</p>
        <p>&copy; Weather App</p>
      </footer>
    </div>
    </div>
  );
}

export default App;
