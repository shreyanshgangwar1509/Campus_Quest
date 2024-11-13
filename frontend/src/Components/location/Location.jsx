import React, { useState } from 'react';

const LocationComponent = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  // Function to get the user's current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      console.log("Attempting to access geolocation...");
      navigator.geolocation.getCurrentPosition(onSuccess, onError, {
        enableHighAccuracy: true,
        timeout: 50000,
        maximumAge: 0,
      });
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  };

  // Success callback function
  const onSuccess = (position) => {
    const { latitude, longitude, accuracy } = position.coords;
    console.log("Geolocation success:", position);
    setLocation({ latitude, longitude, accuracy });
    setError(null);
  };

  // Error callback function
  const onError = (error) => {
    console.error("Geolocation error:", error);
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setError('Permission denied. Please allow location access.');
        break;
      case error.POSITION_UNAVAILABLE:
        setError('Location information is unavailable. Please enable Wi-Fi or GPS.');
        break;
      case error.TIMEOUT:
        setError('The request to get your location timed out. Please try again.');
        break;
      default:
        setError('An unknown error occurred.');
        break;
    }
    setLocation(null);
  };

  return (
    <div className="location-container">
      <h1>Find My Current Location</h1>
      <button onClick={getCurrentLocation} className="location-button">
        Get My Location
      </button>

      {location && (
        <div className="location-info">
          <p><strong>Latitude:</strong> {location.latitude}</p>
          <p><strong>Longitude:</strong> {location.longitude}</p>
          <p><strong>Accuracy:</strong> {location.accuracy} meters</p>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default LocationComponent;
