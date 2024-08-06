import React, { useState } from "react";
import TemperatureFetch from "./TemperatureFetch";
import LocalWeatherForm from "./LocalWeatherForm";
import { getCoordinatesFromZipcode } from "./GetCoordinates";

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
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const currentTime = new Date().toLocaleTimeString();

  const handleSearch = async (zipcode) => {
    setLoading(true);
    setError(null);

    try {
      const { latitude, longitude } = await getCoordinatesFromZipcode(zipcode);
      console.log(latitude, longitude);

      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max&daily=temperature_2m_min&temperature_unit=fahrenheit&current=wind_speed_10m&wind_speed_unit=mph`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setWeatherData(data);
      console.log(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mt-4">
      <div className="row">
        <div className="col-md-8">
          <h2>{mainGreeting()}</h2>
          <div>
            It is currently <strong>{currentTime}</strong> and{" "}
            <strong>
              <TemperatureFetch />
            </strong>
            {"°F "} in Los Angeles.
          </div>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {weatherData && (
            <div>
              <h3>Daily Forecast</h3>
              <div>
                High Temperature: {weatherData.daily.temperature_2m_max[0]}°F
                <br></br>
                Low Temperature: {weatherData.daily.temperature_2m_min[0]}°F
                <br></br>
                Current Wind: {weatherData.current.wind_speed_10m} mph
              </div>
            </div>
          )}
        </div>
        <LocalWeatherForm onSearch={handleSearch} />
      </div>
    </main>
  );
}
