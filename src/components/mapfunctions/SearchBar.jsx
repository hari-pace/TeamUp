import React, { useState } from "react";
import { geocodeAddress } from "./BingMaps";

const SearchBar = ({ onAddressSelect, onLocationSelected }) => {
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    try {
      const location = await geocodeAddress(query);
      onAddressSelect(location);
    } catch (error) {
      console.error("Error searching location:", error);
    }
  };

  return (
    <div className="search-bar">
      <label>
        If you know the exact address of where you want to play, you can write
        it below and click 'set location'. Otherwise, you can set your location
        by simply dropping a pin on the map:
      </label>
      <div style={{ margin: "1% 0" }}>
        <input
          style={{ height: "20px", width: "300px" }}
          type="text"
          placeholder="Enter location"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          style={{ height: "26px", width: "100px" }}
        >
          Set location
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
28;