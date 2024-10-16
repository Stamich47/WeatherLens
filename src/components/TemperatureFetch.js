import React, { useEffect, useState } from "react";

const WeatherComponent = () => {
  const [temperature, setTemperature] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTemperature = () => {
      // const currentDate = new Date();
      // const timeString = currentDate.toISOString();

      const username = process.env.REACT_APP_USER;
      const password = process.env.REACT_APP_PW;
      const endpoint = `/api/v1/forecast?latitude=34.0522&longitude=-118.2437&current=temperature_2m&temperature_unit=fahrenheit&timezone=America%2FLos_Angeles&forecast_days=1`; // Los Angeles coordinates

      fetch(endpoint, {
        mode: "cors",
        headers: {
          Authorization: "Basic " + btoa(`${username}:${password}`),
        },
      })
        .then((response) => {
          if (!response.ok && response.status !== 403) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          } else if (response.status === 403) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          const tempValue = data.current.temperature_2m;
          setTemperature(tempValue);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    };

    fetchTemperature();
  }, []);

  if (loading)
    return (
      <>
        <p>Loading...</p>
      </>
    );

  if (error)
    return (
      <>
        <p>There was an error: {error.message}</p>
      </>
    );

  return <>{temperature}</>;
};

export default WeatherComponent;
