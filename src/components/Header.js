import React from "react";

export default function Header(props) {
  return (
    <header className="bg-primary bg-gradient text-center py-3">
      <img src={props.logo} width={200} alt="WeatherLens logo"></img>
    </header>
  );
}
