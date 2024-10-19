import React, { createContext, useState } from "react";

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const getCoordinatesFromZipcode = async (zipcode) => {
    const API = process.env.REACT_APP_OPENCAGE_API_KEY;
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${zipcode}&countrycode=ca,us&key=${API}`
    );
    const data = await response.json();

    if (data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry;
      const city = data.results[0].components._normalized_city;
      const timezone = data.results[0].annotations.timezone.name;
      const locationData = {
        latitude: lat,
        longitude: lng,
        city: city,
        timezone: timezone,
      };

      setCity(city);

      await getWeatherData(locationData);
    } else {
      alert("Invalid Zipcode");
    }
  };

  const getWeatherData = async (locationData) => {
    const { latitude, longitude, timezone } = locationData;
    const targetUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=precipitation_probability_max,weather_code&daily=temperature_2m_max&daily=temperature_2m_min&temperature_unit=fahrenheit&current=wind_speed_10m&wind_speed_unit=mph&&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,precipitation,weather_code,wind_speed_10m,is_day&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=${timezone}&forecast_days=7`;
    const username = process.env.REACT_APP_USER;
    const password = process.env.REACT_APP_PW;

    const response = await fetch(targetUrl, {
      headers: {
        Authorization: "Basic " + btoa(`${username}:${password}`),
      },
    });
    const data = await response.json();

    setWeatherData(data);
  };

  return (
    <WeatherContext.Provider
      value={{ getCoordinatesFromZipcode, weatherData, city }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
