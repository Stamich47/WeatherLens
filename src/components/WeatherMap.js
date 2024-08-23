import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { getCoordinatesFromZipcode } from "./GetCoordinates"; // Import getCoordinatesFromZipcode
import LocalWeatherForm from "./LocalWeatherForm"; // Import LocalWeatherForm

const WeatherMap = () => {
  const mapRef = useRef(null); // Use a ref to store the map instance
  const radarLayerRef = useRef(null); // Use a ref to store the radar layer instance
  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null,
  });

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
    if (coordinates.latitude && coordinates.longitude && mapRef.current) {
      mapRef.current.setView([coordinates.latitude, coordinates.longitude], 9); // Update map view to the coordinates with a zoom level of 14 (street map level)
    }
  }, [coordinates]);

  const handleSearch = async (zipCode) => {
    try {
      const { latitude, longitude } = await getCoordinatesFromZipcode(zipCode);
      setCoordinates({ latitude, longitude });
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
