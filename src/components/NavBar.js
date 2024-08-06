import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function NavBar(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand mx-2" href="./Main">
        <img src={props.icon} width={40} alt="weatherLens logo"></img>
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        s
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="true"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" href="./Main.js">
              Local Forecast
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="./Main.js">
              Weather Map
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="./Main.js">
              Extended Forecast
            </a>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Enter your zipcode..."
            aria-label="Search"
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Search Local Weather
          </button>
        </form>
      </div>
    </nav>
  );
}
