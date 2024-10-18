import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light nav-wide">
      <div className="collapse navbar-collapse mx-2" id="navbarNav">
        <ul className="navbar-nav">
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
