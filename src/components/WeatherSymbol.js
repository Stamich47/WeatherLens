import React, { useState, useEffect } from "react";

// Function to get the text weather symbol based on the weather code
const getWeatherSymbol = (weatherCode) => {
  switch (weatherCode) {
    case 0:
      return { icon: "☀️", iconNight: "🌕", text: "Clear Sky" }; // Clear sky
    case 1:
    case 2:
    case 3:
      return { icon: "⛅", iconNight: "⛅", text: "Partly Cloudy" }; // Mainly clear, partly cloudy, and overcast
    case 45:
    case 48:
      return { icon: "🌫️", iconNight: "🌫️", text: "Foggy" }; // Fog and depositing rime fog
    case 51:
    case 53:
    case 55:
      return { icon: "🌧️", iconNight: "🌧️", text: "Light Rain" }; // Drizzle: Light, moderate, and dense intensity
    case 56:
    case 57:
      return { icon: "🌨️", iconNight: "🌨️", text: "Freezing Drizzle" }; // Freezing Drizzle: Light and dense intensity
    case 61:
    case 63:
    case 65:
      return { icon: "🌧️", iconNight: "🌧️", text: "Rain" }; // Rain: Slight, moderate and heavy intensity
    case 66:
    case 67:
      return { icon: "🌨️", iconNight: "🌨️", text: "Freezing Rain" }; // Freezing Rain: Light and heavy intensity
    case 71:
    case 73:
    case 75:
      return { icon: "❄️", iconNight: "❄️", text: "Snow" }; // Snow: Slight, moderate and heavy intensity
    case 77:
      return { icon: "❄️", iconNight: "❄️", text: "Snow Grains" }; // Snow grains
    case 80:
      return { icon: "🌦️", iconNight: "🌦️", text: "Rain Showers" }; // Rain showers: Slight
    case 81:
      return { icon: "🌧️", iconNight: "🌧️", text: "Heavy Rain" }; // Rain showers: Moderate or heavy
    case 82:
      return { icon: "🌧️", iconNight: "🌧️", text: "Violent Rain" }; // Rain showers: Violent
    case 85:
    case 86:
      return { icon: "❄️", iconNight: "❄️", text: "Snow Showers" }; // Snow showers slight and heavy
    case 95:
      return { icon: "⛈️", iconNight: "⛈️", text: "Thunderstorm" }; // Thunderstorm: Slight or moderate
    case 96:
    case 99:
      return { icon: "⛈️", iconNight: "⛈️", text: "Thunderstorm with Hail" }; // Thunderstorm with slight and heavy hail
    default:
      return { icon: "❓", iconNight: "❓", text: "Unknown" }; // Unknown weather code
  }
};

const WeatherSymbol = ({ latitude, longitude }) => {
  const [weatherCode, setWeatherCode] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (latitude && longitude) {
        try {
          const targetUrl = `/api/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

          const username = process.env.REACT_APP_USER;
          const password = process.env.REACT_APP_PW;

          const response = await fetch(targetUrl, {
            mode: "cors",
            headers: {
              Authorization: "Basic " + btoa(`${username}:${password}`),
            },
          });
          if (!response.ok) {
            throw new Error(`Error! Status: ${response.status}`);
          }

          const data = await response.json();
          setWeatherCode(data.current_weather.weathercode);
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
