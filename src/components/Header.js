import React from "react";
import { Link } from "react-router-dom";

export default function Header({ logo, icon }) {
  return (
    <div
      className="bg-gradient text-center py-3"
      style={{ backgroundColor: "#e3f2fd" }}
    >
      <header className="d-flex flex-row justify-content-between align-items-center">
        <div className="ghost" style={{ visibility: "hidden" }}>
          -------------
        </div>
        <img
          src={logo}
          width={200}
          alt="WeatherLens logo"
          className="logo"
        ></img>
        <nav className="navbar  navbar-light">
          <button
            className="navbar-toggler mx-3"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="true"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </nav>
      </header>

      <div className=" collapse navbar-collapse mx-2 my-2" id="navbarNav">
        <ul className="navbar-nav mx-auto">
          <li className="nav-item">
            <Link className="nav-link" to="main">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="hourly-forecast">
              Hourly Forecast
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="weather-map">
              Weather Map
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="extended-forecast">
              Extended Forecast
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
