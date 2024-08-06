import React from "react";
import TemperatureFetch from "./TemperatureFetch";
import WeatherSymbol from "./WeatherSymbol";

const time = new Date().toLocaleTimeString();
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
  const currentTime = new Date().toLocaleTimeString();

  return (
    <main className="container mt-4">
      <div className="row">
        <div className="col-md-8">
          <h2>{mainGreeting()}</h2>
          <p>
            It is currently <strong>{currentTime}</strong> and{" "}
            <strong>
              <TemperatureFetch />
            </strong>
            {"°F "}
            in Los Angeles.
          </p>
        </div>
      </div>
    </main>
  );
}
