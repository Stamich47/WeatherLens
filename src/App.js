import logo from "./assets/weatherLens_trnsp.png";

import "./App.css";
import Header from "./components/Header";

import Main from "./pages/Main";
import HourlyForecast from "./pages/HourlyForecast";
import WeatherMap from "./pages/WeatherMap";
import ExtendedForecast from "./pages/ExtendedForecast";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Header logo={logo} />
      {/* <NavBar /> */}
      <Routes>
        <Route index element={<Main />} />
        <Route path="main" element={<Main />} />
        <Route path="hourly-forecast" element={<HourlyForecast />} />
        <Route path="weather-map" element={<WeatherMap />} />
        <Route path="extended-forecast" element={<ExtendedForecast />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
