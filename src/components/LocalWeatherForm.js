import React, { useState } from "react";

const LocalWeatherForm = ({ onSearch }) => {
  const [zipcode, setZipcode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(zipcode);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 my-3">
      <input
        type="text"
        value={zipcode}
        onChange={(e) => setZipcode(e.target.value)}
        placeholder="Enter Zip Code or City Name..."
        className="form-control mb-2"
      />
      <button type="submit" className="btn btn-primary">
        Get Weather
      </button>
    </form>
  );
};

export default LocalWeatherForm;
