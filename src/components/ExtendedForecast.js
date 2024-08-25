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
    timezone: null,
  });

  const handleSearch = async (zipcode) => {
    setLoading(true);
    setError(null);

    try {
      const { latitude, longitude, city, timezone } =
        await getCoordinatesFromZipcode(zipcode);

      setCoordinates({ latitude, longitude, city, timezone });

      const targetUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&temperature_unit=fahrenheit&current=wind_speed_10m&wind_speed_unit=mph`;

      const response = await fetch(targetUrl);
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

  return (
    <div className="extended-forecast m-3">
      <h3 className="text-center">
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

            function convertDateFormat(dateString) {
              const [year, month, day] = dateString.split("-");
              return `${month}/${day}/${year}`;
            }

            const formattedDate = convertDateFormat(date);

            return (
              <div key={index} className="container mt-4 alert alert-info">
                <h4 className="text-center">
                  <strong>
                    {new Date(formattedDate).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </strong>
                </h4>
                <div className="card mt-4 alert alert-info d-flex justify-content-between align-items-center flex-row shadow-sm rounded-lg">
                  <div>
                    <p>
                      <strong>High Temp: </strong>
                      {forecastData.daily.temperature_2m_max[index]}°F
                    </p>
                    <p>
                      <strong>Low Temp: </strong>
                      {forecastData.daily.temperature_2m_min[index]}°F
                    </p>
                    <p>
                      <strong>Precip Chance: </strong>
                      {forecastData.daily.precipitation_probability_max[index]}%
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
