import React, { useState, useRef, useEffect } from "react";
import "../styles/locationsearch.css";

const LocationSearch = () => {
  const [searchText, setSearchText] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Predefined locations
  const locations = [
    "Makati City",
    "Taguig City",
    "Pasay City",
    "Quezon City",
    "Manila",
    "Mandaluyong City",
    "Pasig City",
    "San Juan City",
    "BGC (Bonifacio Global City)",
    "Ortigas Center",
    "Eastwood City",
    "Alabang",
  ];

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
  };

  // Handle search button click
  const handleSearch = () => {
    if (locations.includes(searchText)) {
      setSelectedLocation(searchText);
      console.log("Searching for cafes in:", searchText);

      // 👇 Scroll down by one full screen height
      window.scrollBy({
        top: window.innerHeight,
        behavior: "smooth",
      });
    } else {
      alert("Please select a valid location from the dropdown");
      setSearchText("");
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
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
          onKeyPress={handleKeyPress}
        />
        <button className="search-button" onClick={handleSearch}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </button>
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
