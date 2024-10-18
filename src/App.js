import logo from "./assets/weatherLens_trnsp.png";
import icon from "./assets/logo_icon.png";
import "./App.css";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
// import Main from "./components/Main";
// import HourlyForecast from "./components/HourlyForecast";
import Test from "./components/Test";
// import WeatherMap from "./components/WeatherMap";
// import ExtendedForecast from "./components/ExtendedForecast";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Header logo={logo} />
      <NavBar icon={icon} />
      <Routes>
        <Route index element={<Test />} />
        <Route path="main" element={<Test />} />
        {/* <Route path="hourly-forecast" element={<HourlyForecast />} />
        <Route path="weather-map" element={<WeatherMap />} />
        <Route path="extended-forecast" element={<ExtendedForecast />} />  */}
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
