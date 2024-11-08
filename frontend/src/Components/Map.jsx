import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useRef } from "react";

const Map = () => {
  const mapRef = useRef(null); // Reference to store map instance
  const mapContainerRef = useRef(null); // Reference to store map container (DOM element)

  useEffect(() => {
    // Only initialize the map if it hasn't been initialized already
    if (!mapRef.current) {
      // Initialize the map container
      mapRef.current = L.map(mapContainerRef.current).setView([25.492394,81.864742], 17);

      // Add tile layer
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(mapRef.current);
    }

    return () => {
      // Clean up map instance on component unmount
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null; // Reset the mapRef
      }
    };
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      let marker, circle;

      const success = (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const accuracy = pos.coords.accuracy;

        // Remove previous marker and circle if any
        if (marker) mapRef.current.removeLayer(marker);
        if (circle) mapRef.current.removeLayer(circle);

        // Create and add new marker and circle
        marker = L.marker([lat, lng]).addTo(mapRef.current);
        circle = L.circle([lat, lng], { radius: accuracy }).addTo(mapRef.current);

        // Adjust map to fit bounds of the circle
        mapRef.current.fitBounds(circle.getBounds());
      };

      const error = (err) => {
        if (err.code === 1) {
          alert("Please allow geolocation access");
        } else {
          alert("Can't get current location");
        }
      };

      // Watch position and update map on geolocation change
      const watchId = navigator.geolocation.watchPosition(success, error);

      // Cleanup function for geolocation
      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    }
  }, []);

  return (
    <div>
      <h1 className="relative text-2xl items-center justify-cnenter flex ">Hunt Page</h1>
      <div
        ref={mapContainerRef}
        id="map"
        style={{ height: "1000px" }} // Make sure to specify height for the map
      ></div>
    </div>
  );
};

export default Map;
