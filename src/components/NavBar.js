import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function NavBar({ icon }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="link" to="main">
        <img
          src={icon}
          width={40}
          alt="weatherLens logo"
          className="mx-2"
        ></img>
      </Link>
      <button
        className="navbar-toggler mx-2"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="true"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse mx-2" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" href="https://cors-anywhere.herokuapp.com/">
              403 Error - Get Access
            </a>
          </li>

          <Link className="link" to="main">
            <li className="nav-item nav-link">Home</li>
          </Link>

          <Link className="link" to="hourly-forecast">
            <li className="nav-item nav-link">Hourly Forecast</li>
          </Link>

          <Link className="link" to="weather-map">
            <li className="nav-link nav-item">Weather Map</li>
          </Link>
          <Link className="link" to="extended-forecast">
            <li className="nav-item nav-link">Extended Forecast</li>
          </Link>
        </ul>
      </div>
    </nav>
  );
}
