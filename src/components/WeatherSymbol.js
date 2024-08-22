import React, { useState, useEffect } from "react";

// Function to get the text weather symbol based on the weather code
const getWeatherSymbol = (weatherCode) => {
  switch (weatherCode) {
    case 0:
      return { icon: "☀️", text: "Clear" }; // Clear sky
    case 1:
      return { icon: "🌤️", text: "Mainly Clear" }; // Mainly clear
    case 2:
      return { icon: "⛅", text: "Partly Cloudy" }; // Partly cloudy
    case 3:
      return { icon: "☁️", text: "Cloudy" }; // Overcast
    case 45:
    case 48:
      return { icon: "🌫️", text: "Foggy" }; // Fog and depositing rime fog
    case 51:
    case 53:
    case 55:
      return { icon: "🌧️", text: "Light Rain" }; // Drizzle: Light, moderate, and dense intensity
    case 56:
    case 57:
      return { icon: "🌨️", text: "Freezing Drizzle" }; // Freezing Drizzle: Light and dense intensity
    case 61:
    case 63:
    case 65:
      return { icon: "🌧️", text: "Rain" }; // Rain: Slight, moderate and heavy intensity
    case 66:
    case 67:
      return { icon: "🌨️", text: "Freezing Rain" }; // Freezing Rain: Light and heavy intensity
    case 71:
    case 73:
    case 75:
      return { icon: "❄️", text: "Snowing" }; // Snow fall: Slight, moderate, and heavy intensity
    case 77:
      return { icon: "❄️", text: "Snow Grains" }; // Snow grains
    case 80:
    case 81:
    case 82:
      return { icon: "🌧️", text: "Rain Showers" }; // Rain showers: Slight, moderate, and violent
    case 85:
    case 86:
      return { icon: "❄️", text: "Snow Showers" }; // Snow showers: Slight and heavy
    case 95:
      return { icon: "⛈️", text: "Thunderstorm" }; // Thunderstorm: Slight or moderate
    case 96:
    case 99:
      return { icon: "⛈️", text: "Thunderstorm with Hail" }; // Thunderstorm with slight and heavy hail
    default:
      return { icon: "❓", text: "Unknown" }; // Unknown weather code
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

  const weather = getWeatherSymbol(weatherCode);

  return (
    <div>
      {weatherCode !== null ? (
        <>
          <span className="display-6">
            {weather.icon} {weather.text}
          </span>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default WeatherSymbol;

export { getWeatherSymbol };
