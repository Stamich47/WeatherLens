import React, { useContext } from "react";
import TemperatureFetch from "../components/TemperatureFetch";
import LocalWeatherForm from "../components/LocalWeatherForm";
import WeatherSymbol from "../components/WeatherSymbol";
import { WeatherContext } from "../context/WeatherContext";

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
  const { getCoordinatesFromZipcode, weatherData, city } =
    useContext(WeatherContext);

  const handleSearch = async (zipcode) => {
    await getCoordinatesFromZipcode(zipcode);
  };

  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

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

          {weatherData && (
            <div className="card mt-4 alert alert-success">
              <div className="card-body">
                <h5 className="card-title mb-4">Today's Forecast for {city}</h5>
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
                    weatherCode={weatherData.daily.weather_code[0]}
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
