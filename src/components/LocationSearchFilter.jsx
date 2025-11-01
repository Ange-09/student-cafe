import React, { useState, useRef, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import "../styles/locationsearch.css";
import { locations } from "../context/staticData";

const LocationSearch = () => {
  const [searchText, setSearchText] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const { selectedLocation, setSelectedLocation } = useContext(AppContext);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Filter locations based on search text
  const filteredLocations = locations.filter((location) =>
    location.toLowerCase().includes(searchText.toLowerCase())
  );

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    setShowDropdown(true);
  };

  // Handle location selection
  const handleLocationSelect = (location) => {
    setSearchText(location);
    setSelectedLocation(location);
    setShowDropdown(false);
    console.log("Selected location:", location);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Clears the text when filter is cleared
  useEffect(() => {
    if (!selectedLocation) {
      setSearchText("");
    }
  }, [selectedLocation]);

  return (
    <div className="location-search-container">
      <div className="search-wrapper">
        <input
          ref={inputRef}
          type="text"
          className="search-input"
          placeholder="Enter Your Location"
          value={searchText}
          onChange={handleInputChange}
          onFocus={() => setShowDropdown(true)}
        />
      </div>

      {showDropdown && filteredLocations.length > 0 && (
        <ul ref={dropdownRef} className="dropdown-menu">
          {filteredLocations.map((location, index) => (
            <li
              key={index}
              className="dropdown-item"
              onClick={() => handleLocationSelect(location)}
            >
              {location}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationSearch;
