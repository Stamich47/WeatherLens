import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import { Nav } from "react-bootstrap";
import Main from "./components/Main";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Header />
      <NavBar />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
