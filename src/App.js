import logo from "./assets/weatherLens_trnsp.png";
import icon from "./assets/logo_icon.png";
import "./App.css";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import { Nav } from "react-bootstrap";
import Main from "./components/Main";
import Footer from "./components/Footer";
import TemperatureFetch from "./components/TemperatureFetch";

function App() {
  return (
    <div>
      <Header logo={logo} />
      <NavBar icon={icon} />
      <Main />
      <Footer />
      <TemperatureFetch />
    </div>
  );
}

export default App;
