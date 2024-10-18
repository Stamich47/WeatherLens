import React, { useEffect, useRef, useContext } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import LocalWeatherForm from "../components/LocalWeatherForm";
import { WeatherContext } from "../context/WeatherContext";

const WeatherMap = () => {
  const { getCoordinatesFromZipcode, weatherData } = useContext(WeatherContext);
  const mapRef = useRef(null);
  const radarLayerRef = useRef(null);

  const fetchLatestTimestamp = async () => {
    try {
      const response = await fetch(
        "https://api.rainviewer.com/public/weather-maps.json"
      );
      const data = await response.json();
      const latestTimestamp = data.radar.past[data.radar.past.length - 1].time;
      return latestTimestamp;
    } catch (error) {
      console.error("Error fetching latest timestamp:", error);
      return null;
    }
  };

  useEffect(() => {
    const initializeMap = async () => {
      const latestTimestamp = await fetchLatestTimestamp();
      if (!latestTimestamp) {
        console.error("Failed to fetch latest timestamp.");
        return;
      }

      // Check if map is already initialized
      if (mapRef.current) {
        return;
      }

      const map = L.map("map").setView([39.8283, -98.5795], 4); // Initialize map variable
      mapRef.current = map; // Store the map instance in the ref

      // Add OpenStreetMap base layer
      const baseLayer = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }
      );

      baseLayer.addTo(map);

      // Add RainViewer radar overlay layer
      const radarLayerUrl = `https://tilecache.rainviewer.com/v2/radar/${latestTimestamp}/512/{z}/{x}/{y}/4/1_1.png`;

      const radarLayer = L.tileLayer(radarLayerUrl, {
        attribution:
          '&copy; <a href="https://www.rainviewer.com/">RainViewer</a>',
        maxZoom: 18,
        minZoom: 1,
        opacity: "",
      });

      radarLayer.addTo(map);
      radarLayerRef.current = radarLayer; // Store the radar layer instance in the ref

      map.on("zoomend", () => {
        const zoomLevel = map.getZoom();
        if (zoomLevel >= 8 && zoomLevel < 12) {
          radarLayer.setOpacity(0.8);
        } else if (zoomLevel >= 12) {
          radarLayer.setOpacity(0.4);
        } else {
          radarLayer.setOpacity("");
        }
      });
    };

    initializeMap();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (weatherData && mapRef.current) {
      mapRef.current.setView([weatherData.latitude, weatherData.longitude], 9);
    }
  }, [weatherData]);

  const handleSearch = async (zipCode) => {
    try {
      await getCoordinatesFromZipcode(zipCode);
    } catch (error) {
      console.error("Error geocoding zip code:", error);
    }
  };

  return (
    <div className="m-2">
      <h3 className="mt-3 text-center">Weather Map</h3>
      <LocalWeatherForm onSearch={handleSearch} />{" "}
      <div
        id="map"
        className="border rounded-3"
        style={{ height: "500px" }}
      ></div>
    </div>
  );
};

export default WeatherMap;
