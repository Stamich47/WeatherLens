import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="#">
        Navigation
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" href="#">
              Local Forecast
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Weather Map
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Extended Forecast
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
