import React, { useState, useEffect } from "react";

// Function to get the text weather symbol based on the weather code
const getWeatherSymbol = (weatherCode) => {
  switch (weatherCode) {
    case 0:
      return `☀️ Clear`; // Clear sky
    case 1:
    case 2:
    case 3:
      return "🌤️ Partly Cloudy"; // Mainly clear, partly cloudy, and overcast
    case 45:
    case 48:
      return "🌫️  Foggy"; // Fog and depositing rime fog
    case 51:
    case 53:
    case 55:
      return "🌧️ Light Rain"; // Drizzle: Light, moderate, and dense intensity
    case 56:
    case 57:
      return "🌨️ Freezing Drizzle"; // Freezing Drizzle: Light and dense intensity
    case 61:
    case 63:
    case 65:
      return "🌧️ Rain"; // Rain: Slight, moderate and heavy intensity
    case 66:
    case 67:
      return "🌨️ Freezing Rain"; // Freezing Rain: Light and heavy intensity
    case 71:
    case 73:
    case 75:
      return "❄️ Snowing"; // Snow fall: Slight, moderate, and heavy intensity
    case 77:
      return "❄️ Light Snow"; // Snow grains
    case 80:
    case 81:
    case 82:
      return "🌧️ Rain Showers"; // Rain showers: Slight, moderate, and violent
    case 85:
    case 86:
      return "❄️ Snow Showers"; // Snow showers slight and heavy
    case 95:
      return "⛈️ Thunderstorm"; // Thunderstorm: Slight or moderate
    case 96:
    case 99:
      return "🌩️ T-Storm w/ Hail"; // Thunderstorm with slight and heavy hail
    default:
      return "❓"; // Default symbol
  }
};

const WeatherSymbol = ({ latitude, longitude }) => {
  const [weatherCode, setWeatherCode] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (latitude && longitude) {
        try {
          const proxyUrl = "https://cors-anywhere.herokuapp.com/";
          const targetUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

          const response = await fetch(proxyUrl + targetUrl);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          setWeatherCode(data.current_weather.weathercode); // Adjust this based on your API response structure
        } catch (error) {
          console.error("Error fetching weather data:", error);
          setError(error.message);
        }
      }
    };

    fetchWeatherData();
  }, [latitude, longitude]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {weatherCode !== null ? (
        <>
          <span className="display-6">{getWeatherSymbol(weatherCode)}</span>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default WeatherSymbol;

export { getWeatherSymbol };
