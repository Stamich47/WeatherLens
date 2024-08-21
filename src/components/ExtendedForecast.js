import LocalWeatherForm from "./LocalWeatherForm";
import { getCoordinatesFromZipcode } from "./GetCoordinates";

import { getWeatherSymbol } from "./WeatherSymbol";
import { useState } from "react";

export default function ExtendedForecast() {
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null,
    city: null,
  });

  const handleSearch = async (zipcode) => {
    setLoading(true);
    setError(null);

    try {
      const { latitude, longitude, city } = await getCoordinatesFromZipcode(
        zipcode
      );

      setCoordinates({ latitude, longitude, city });

      const proxyUrl = "https://cors-anywhere.herokuapp.com/";
      const targetUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&current=wind_speed_10m&wind_speed_unit=mph`;

      const response = await fetch(proxyUrl + targetUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setForecastData(data);
      console.log(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="extended-forecast m-3">
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {forecastData && (
        <div>
          <h2 className="mb-4 text-center">
            7-Day Forecast for {coordinates.city}
          </h2>

          {forecastData.daily.time.map((date, index) => (
            <div className="container mt-4">
              <div
                className="card mt-4 alert alert-success d-flex justify-content-between align-items-center flex-row"
                key={index}
              >
                <div>
                  <p>
                    Date:{" "}
                    {new Date(date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <p>
                    Max Temp: {forecastData.daily.temperature_2m_max[index]}°F
                  </p>
                  <p>
                    Min Temp: {forecastData.daily.temperature_2m_min[index]}°F
                  </p>
                </div>
                <div className="ml-auto display-6">
                  {getWeatherSymbol(forecastData.daily.weather_code[index])}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <LocalWeatherForm onSearch={handleSearch} />
    </div>
  );
}
