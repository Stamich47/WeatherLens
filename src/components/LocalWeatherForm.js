import React, { useState } from "react";

const LocalWeatherForm = ({ onSearch }) => {
  const [zipcode, setZipcode] = useState("");

  const handleInputChange = (e) => {
    setZipcode(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSearch(zipcode);
  };

  return (
    <form className="form-inline my-2 my-lg-0" onSubmit={handleFormSubmit}>
      <input
        className="form-control mr-sm-2"
        type="search"
        placeholder="Enter your zipcode..."
        aria-label="Search"
        value={zipcode}
        onChange={handleInputChange}
      />
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
        Search Local Weather
      </button>
    </form>
  );
};

export default LocalWeatherForm;
