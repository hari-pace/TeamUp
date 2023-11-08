import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import L from "leaflet";

const MapComponent = ({ selectedLocation, onLocationSelected }) => {
  const [address, setAddress] = useState("");
  // const [selectedLocation, setSelectedLocation] = useState(null);
  const mapInstance = useRef(null);

  const ClickHandler = () => {
    const map = useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        onLocationSelected({ lat, lng });
      },
    });
  };

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    onLocationSelected({ lat, lng });
  };

  const handleSendLocation = () => {
    if (selectedLocation) {
      onLocationSelected(selectedLocation);
    }
  };

  // const handleAddressSearch = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://nominatim.openstreetmap.org/search?format=json&q=${address}`
  //     );
  //     if (response.data && response.data.length > 0) {
  //       const { lat, lon } = response.data[0];
  //       setSelectedLocation({ lat: parseFloat(lat), lon: parseFloat(lon) });

  //       // Update map view to the new coordinates
  //       if (mapInstance.current) {
  //         mapInstance.current.setView([parseFloat(lat), parseFloat(lon)], 13);
  //       }
  //     } else {
  //       // Handle case when no results are found
  //       console.error("No results found for the entered address.");
  //       setSelectedLocation(null);
  //     }
  //   } catch (error) {
  //     console.error("Error searching address:", error);
  //     setSelectedLocation(null);
  //   }
  // };

  // useEffect(() => {
  //   console.log("Selected Location:", selectedLocation); // Log selectedLocation changes
  // }, [selectedLocation]);

  const customMarkerIcon = L.icon({
    iconUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Map_pin_icon.svg/800px-Map_pin_icon.svg.png",
    iconSize: [32, 40],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  return (
    <div className="map-container" style={{ height: "400px", width: "100%" }}>
      <MapContainer
        center={[52.52, 13.405]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        onClick={handleMapClick}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <ClickHandler />
        {selectedLocation && (
          <Marker
            position={[selectedLocation.lat, selectedLocation.lng]}
            icon={customMarkerIcon}
          >
            <Popup>
              Selected Location: <br />
              Latitude: {selectedLocation.lat} <br />
              Longitude: {selectedLocation.lng} <br />
              {/* <button onClick={handleSendLocation}>Send Location</button> */}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
