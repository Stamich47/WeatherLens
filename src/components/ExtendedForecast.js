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
      const targetUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&temperature_unit=fahrenheit&current=wind_speed_10m&wind_speed_unit=mph`;

      const response = await fetch(proxyUrl + targetUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setForecastData(data);
      console.log(data);
      console.log(targetUrl);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="extended-forecast m-3">
      <h3 className="mb-4 text-center">
        {coordinates.city
          ? `${coordinates.city} Extended Forecast`
          : "Extended Forecast"}{" "}
      </h3>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {forecastData && (
        <div>
          {forecastData.daily.time.map((date, index) => {
            const weather = getWeatherSymbol(
              forecastData.daily.weather_code[index]
            );

            return (
              <div className="container mt-4">
                <div
                  className="card mt-4 alert alert-success d-flex justify-content-between align-items-center flex-row"
                  key={index}
                >
                  <div>
                    <p>
                      <strong>
                        {new Date(date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                          timeZone: "UTC",
                        })}
                      </strong>
                    </p>
                    <p>
                      High Temp:{" "}
                      <strong>
                        {forecastData.daily.temperature_2m_max[index]}°F
                      </strong>
                    </p>
                    <p>
                      Low Temp:{" "}
                      <strong>
                        {forecastData.daily.temperature_2m_min[index]}°F
                      </strong>
                    </p>
                    <p>
                      Precip Chance:{" "}
                      <strong>
                        {
                          forecastData.daily.precipitation_probability_max[
                            index
                          ]
                        }
                        %
                      </strong>
                    </p>
                  </div>
                  <div className=" d-inline-flex justify-content-center align-items-center flex-column flex-grow-1 ">
                    <div className="display-4">{weather.icon}</div>
                    <h4>{weather.text}</h4>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <LocalWeatherForm onSearch={handleSearch} />
    </div>
  );
}
