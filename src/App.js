import logo from "./assets/weatherLens_trnsp.png";
import icon from "./assets/logo_icon.png";
import "./App.css";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Main from "./components/Main";
import HourlyForecast from "./components/HourlyForecast";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Header logo={logo} />
      <NavBar icon={icon} />

      <Routes>
        <Route index element={<Main />} />
        <Route path="hourly-forecast" element={<HourlyForecast />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
