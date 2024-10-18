import React, { useState, useContext } from "react";
import { getWeatherSymbol } from "../components/WeatherSymbol";
import LocalWeatherForm from "../components/LocalWeatherForm";
import { WeatherContext } from "../context/WeatherContext";

export default function HourlyForecast() {
  const { getCoordinatesFromZipcode, weatherData, city } =
    useContext(WeatherContext);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (zipcode) => {
    setLoading(true);
    await getCoordinatesFromZipcode(zipcode);
    setLoading(false);
  };

  const currentTime = new Date();

  const filteredTimes =
    weatherData?.hourly?.time
      ?.map((time, index) => ({ time, index }))
      ?.filter(({ time, index }) => {
        return (
          new Date(time) > currentTime && index < currentTime.getHours() + 13
        );
      }) || [];

  console.log("Filtered Times:", filteredTimes);

  return (
    <div className="extended-forecast ">
      <h3 className=" mt-3 text-center">
        {city ? `${city} Hourly Forecast` : "Hourly Forecast"}{" "}
      </h3>
      <h4 className="text-center">
        {city ? `${new Date().toDateString()}` : ""}
      </h4>
      {loading && <p>Loading...</p>}

      {filteredTimes.map(({ time, index }) => {
        const weather = getWeatherSymbol(
          weatherData.hourly.weather_code[index]
        );

        const isDay = weatherData.hourly.is_day[index] === 1;
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
                      {weatherData.hourly.temperature_2m[index]}°F
                    </p>
                    <p className="mb-1">
                      <strong>Humidity:</strong>{" "}
                      {weatherData.hourly.relative_humidity_2m[index]}%
                    </p>
                    <p className="mb-1">
                      <strong>Precip Probability:</strong>{" "}
                      {weatherData.hourly.precipitation_probability[index]}%
                    </p>
                    <p className="mb-1">
                      <strong>Precipitation:</strong>{" "}
                      {weatherData.hourly.precipitation[index].toLocaleString(
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
                      {weatherData.hourly.wind_speed_10m[index]} mph
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
