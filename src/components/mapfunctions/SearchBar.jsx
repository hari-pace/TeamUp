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
      <div style={{ margin: "1% 0" }}>
        <input
          style={{
            height: "25px",
            width: "81%",
            marginTop: "10px",
            marginBottom: "5px",
            border: "none",
            paddingLeft: "2%",
          }}
          type="text"
          placeholder="Enter location"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          style={{
            height: "29px",
            width: "100px",
            marginBottom: "5px",
            paddingTop: "2px",
          }}
        >
          Set location
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
28;
