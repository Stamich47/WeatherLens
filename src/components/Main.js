import React, { useState } from "react";
import TemperatureFetch from "./TemperatureFetch";
import LocalWeatherForm from "./LocalWeatherForm";
import { getCoordinatesFromZipcode } from "./GetCoordinates";
import WeatherSymbol from "./WeatherSymbol";

const hour = new Date().getHours();

const mainGreeting = () => {
  if (hour >= 5 && hour < 12) {
    return "Good Morning!";
  } else if (hour >= 12 && hour < 17) {
    return "Good Afternoon!";
  } else if (hour >= 17) {
    return "Good Evening!";
  } else if (hour < 5) {
    return "Hey there early riser!";
  } else {
    return "Good Day!";
  }
};

export default function Main() {
  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null,
    city: null,
  });
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const currentTime = new Date().toLocaleTimeString();

  const handleSearch = async (zipcode) => {
    setLoading(true);
    setError(null);

    try {
      const { latitude, longitude, city } = await getCoordinatesFromZipcode(
        zipcode
      );
      setCoordinates({ latitude, longitude, city });

      const proxyUrl = "https://cors-anywhere.herokuapp.com/";
      const targetUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code&daily=temperature_2m_max&daily=temperature_2m_min&temperature_unit=fahrenheit&current=wind_speed_10m&wind_speed_unit=mph`;

      const response = await fetch(proxyUrl + targetUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="mb-4 text-center">{mainGreeting()}</h2>
          <div className="alert alert-info">
            It is currently <strong>{currentTime}</strong> and{" "}
            <strong>
              <TemperatureFetch />
            </strong>
            {"°F "} in Los Angeles.
          </div>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {weatherData && (
            <div className="card mt-4 alert alert-success">
              <div className="card-body">
                <h5 className="card-title mb-4">
                  Today's Forecast for {coordinates.city}
                </h5>
                <p className="card-text">
                  High Temperature:{" "}
                  <strong>{weatherData.daily.temperature_2m_max[0]}°F</strong>
                </p>
                <p className="card-text">
                  Low Temperature:{" "}
                  <strong>{weatherData.daily.temperature_2m_min[0]}°F</strong>
                </p>
                <p className="card-text">
                  Current Wind Speed:{" "}
                  <strong>{weatherData.current.wind_speed_10m} mph</strong>
                </p>
                <div>
                  <WeatherSymbol
                    latitude={coordinates.latitude}
                    longitude={coordinates.longitude}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <LocalWeatherForm onSearch={handleSearch} />
      </div>
    </main>
  );
}
