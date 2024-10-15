import { createContext, useState } from "react";


function WeatherContextProvider({ children }) {
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    try {
      const response = await fetch