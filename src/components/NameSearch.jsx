import React, { useState, useRef, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import "../styles/locationsearch.css";
import { CafeName } from "../context/staticData";

const NameSearch = () => {
  const [searchText, setSearchText] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const { selectedCafeName, setSelectedCafeName } = useContext(AppContext);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Filter Cafe Name based on search text
  const filteredCafeNames = CafeName.filter((name) =>
    name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    setShowDropdown(true);
  };

  // Handle Cafe Name selection
  const handleCafeNameSelect = (name) => {
    setSearchText(name);
    setSelectedCafeName(name);
    setShowDropdown(false);
    console.log("Selected Cafe/Lounge:", name);
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
          placeholder="Enter Cafe/Lounge Name"
          value={searchText}
          onChange={handleInputChange}
          onFocus={() => setShowDropdown(true)}
        />
      </div>

      {showDropdown && filteredCafeNames.length > 0 && (
        <ul ref={dropdownRef} className="dropdown-menu">
          {filteredCafeNames.map((name, index) => (
            <li
              key={index}
              className="dropdown-item"
              onClick={() => handleCafeNameSelect(name)}
            >
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NameSearch;
