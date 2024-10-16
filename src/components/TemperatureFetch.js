import React, { useEffect, useState } from "react";

const WeatherComponent = () => {
  const [temperature, setTemperature] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTemperature = () => {
      const currentDate = new Date();
      const timeString = currentDate.toISOString();

      const username = process.env.REACT_APP_USER;
      const password = process.env.REACT_APP_PW;
      const endpoint = `/forecast/${timeString}/t_2m:F/34.0536909,-118.242766/json`; // Los Angeles coordinates

      fetch(encodeURIComponent(endpoint), {
        mode: "cors",
        headers: {
          Authorization: "Basic " + btoa(`${username}:${password}`),
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status} `);
          }
          return response.json();
        })
        .then((data) => {
          const tempValue = data.data[0].coordinates[0].dates[0].value;
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
