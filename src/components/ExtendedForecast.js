import LocalWeatherForm from "./LocalWeatherForm";
import { WeatherContext } from "../context/WeatherContext";
import { getWeatherSymbol } from "./WeatherSymbol";
import { useState, useContext } from "react";

export default function ExtendedForecast() {
  const { getCoordinatesFromZipcode, weatherData, city } =
    useContext(WeatherContext);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (zipcode) => {
    setLoading(true);
    await getCoordinatesFromZipcode(zipcode);
    setLoading(false);
  };

  return (
    <div className="extended-forecast m-3">
      <h3 className="text-center">
        {city ? `${city} Extended Forecast` : "Extended Forecast"}{" "}
      </h3>
      {loading && <div>Loading...</div>}
      {weatherData && (
        <div>
          {weatherData.daily.time.map((date, index) => {
            const weather = getWeatherSymbol(
              weatherData.daily.weather_code[index]
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
                      {weatherData.daily.temperature_2m_max[index]}°F
                    </p>
                    <p>
                      <strong>Low Temp: </strong>
                      {weatherData.daily.temperature_2m_min[index]}°F
                    </p>
                    <p>
                      <strong>Precip Chance: </strong>
                      {weatherData.daily.precipitation_probability_max[index]}%
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
