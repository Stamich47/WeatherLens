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
        placeholder="Enter Zipcode..."
        className="form-control mb-2"
      />
      <button type="submit" className="btn btn-primary">
        Get Weather
      </button>
    </form>
  );
};

export default LocalWeatherForm;

// const LocalWeatherForm = ({ onSearch }) => {
//   const [zipcode, setZipcode] = useState("");

//   const handleInputChange = (e) => {
//     setZipcode(e.target.value);
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     onSearch(zipcode);
//   };

//   return (
//     <form className="form-inline my-3 my-lg-0" onSubmit={handleFormSubmit}>
//       <input
//         className="form-control mr-sm-2 my-1 w-50"
//         type="search"
//         placeholder="Enter your zipcode..."
//         aria-label="Search"
//         value={zipcode}
//         onChange={handleInputChange}
//       />
//       <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
//         Get Weather
//       </button>
//     </form>
//   );
// };

// export default LocalWeatherForm;
