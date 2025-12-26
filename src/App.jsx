
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch('/api/current?access_key=82804af8fc510d67f3d81c6556b63ebf&query=New%20Delhi&air_quality=yes');
        const data = await response.json();

        if (data.error) {
          throw new Error(data.error.info);
        }

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        setWeather(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="App">
      <div className="weather-card">
        <h1>Weather in New Delhi</h1>
        {loading && <p>Loading...</p>}
        {/*error && <p>Error: {error.message}</p>*/} 
        {weather && weather.current && (
          <div className="weather-info">
            <img src={weather.current.weather_icons[0]} alt="Weather icon" />
            <p className="temperature">{weather.current.temperature}°C</p>
            <p className="description">{weather.current.weather_descriptions[0]}</p>
            {weather.current.air_quality && <p className="air-quality">Air Quality (PM2.5): {weather.current.air_quality.pm2_5}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
