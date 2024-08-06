import React, { useEffect, useState } from "react";

const WeatherIcon = () => {
  const [iconCode, setIconCode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const apiKey = process.env.REACT_APP_WEATHERBIT_API_KEY;
      const endpoint = `https://api.weatherbit.io/v2.0/current?city=Los%20Angeles&key=${apiKey}`;

      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data);

        // Extract the weather icon code from the data
        const iconCode = data.data[0].weather.icon;
        setIconCode(iconCode);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  const getWeatherIconUrl = (iconCode) => {
    return `https://www.weatherbit.io/static/img/icons/${iconCode}.png`; // Construct the URL to fetch the weather icon
  };

  return (
    <div>
      {loading ? (
        <p>Loading weather icon...</p>
      ) : error ? (
        <p>Error fetching weather icon: {error.message}</p>
      ) : (
        iconCode && (
          <img
            src={getWeatherIconUrl(iconCode)}
            alt={`Weather icon ${iconCode}`}
            style={{ width: "50px", height: "50px" }}
          />
        )
      )}
    </div>
  );
};

export default WeatherIcon;
