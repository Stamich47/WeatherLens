import React, { useState } from "react";
import { getWeatherSymbol } from "./WeatherSymbol";
import LocalWeatherForm from "./LocalWeatherForm";
import { getCoordinatesFromZipcode } from "./GetCoordinates";

export default function HourlyForecast() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null,
    city: null,
    timezone: null,
  });

  const handleSearch = async (zipcode) => {
    setLoading(true);
    setError(null);

    try {
      const { latitude, longitude, city, timezone } =
        await getCoordinatesFromZipcode(zipcode);

      setCoordinates({ latitude, longitude, city, timezone });

      const proxyUrl = "https://cors-anywhere.herokuapp.com/";
      const targetUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,precipitation,weather_code,wind_speed_10m,is_day&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=${timezone}&forecast_days=1`;

      const response = await fetch(proxyUrl + targetUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setForecastData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const currentTime = new Date();

  const filteredTimes =
    forecastData?.hourly?.time
      ?.map((time, index) => ({ time, index }))
      ?.filter(({ time }) => new Date(time) > currentTime) || [];

  return (
    <div className="extended-forecast ">
      <h3 className=" mt-3 text-center">
        {coordinates.city
          ? `${coordinates.city} Hourly Forecast`
          : "Hourly Forecast"}{" "}
      </h3>
      <h4 className="text-center">
        {coordinates.city ? `${new Date().toDateString()}` : ""}
      </h4>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {filteredTimes.map(({ time, index }) => {
        const weather = getWeatherSymbol(
          forecastData.hourly.weather_code[index]
        );

        const isDay = forecastData.hourly.is_day[index] === 1;
        return (
          <div key={index} className="hourly-forecast container mt-4">
            <div className="mb-2 alert alert-info">
              <h4 className="text-center">
                {new Date(time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </h4>

              <div className="card mt-4 shadow-sm rounded-lg alert alert-info">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex flex-column align-items-center weather-info">
                    <div className="d-flex flex-column justify-content-center align-items-center">
                      <div className="display-4">
                        {isDay ? weather.icon : weather.iconNight}{" "}
                      </div>
                      <h4 className="mt-2 weather-text text-center">
                        {weather.text}
                      </h4>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="mb-1">
                      <strong>Temperature:</strong>{" "}
                      {forecastData.hourly.temperature_2m[index]}°F
                    </p>
                    <p className="mb-1">
                      <strong>Humidity:</strong>{" "}
                      {forecastData.hourly.relative_humidity_2m[index]}%
                    </p>
                    <p className="mb-1">
                      <strong>Precip Probability:</strong>{" "}
                      {forecastData.hourly.precipitation_probability[index]}%
                    </p>
                    <p className="mb-1">
                      <strong>Precipitation:</strong>{" "}
                      {forecastData.hourly.precipitation[index].toLocaleString(
                        undefined,
                        {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 2,
                        }
                      )}
                      "
                    </p>
                    <p className="mb-1">
                      <strong>Wind Speed:</strong>{" "}
                      {forecastData.hourly.wind_speed_10m[index]} mph
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div className="m-3">
        <LocalWeatherForm onSearch={handleSearch} />
      </div>
    </div>
  );
}
