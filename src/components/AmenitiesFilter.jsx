import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import "../styles/amenitiesfilter.css";

const AmenitiesFilter = () => {
  const { selectedAmenities = [], setSelectedAmenities } =
    useContext(AppContext);

  // Available amenities list
  const availableAmenities = [
    "Free Wifi",
    "Free Coffee",
    "Food Options Available",
    "Quiet Zones",
    "Conference Rooms",
    "Parking Space",
    "Printing Services",
    "Open 24/7",
  ];

  // Amenity icons mapping
  const amenityIcons = {
    "Free Wifi": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
        <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
        <circle cx="12" cy="20" r="1"></circle>
      </svg>
    ),
    "Free Coffee": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 8h1a4 4 0 1 1 0 8h-1"></path>
        <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"></path>
        <line x1="6" y1="2" x2="6" y2="4"></line>
        <line x1="10" y1="2" x2="10" y2="4"></line>
        <line x1="14" y1="2" x2="14" y2="4"></line>
      </svg>
    ),
    "Food Options Available": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path>
        <path d="M7 2v20"></path>
        <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path>
      </svg>
    ),
    "Quiet Zones": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 10v3"></path>
        <path d="M6 6v11"></path>
        <path d="M10 3v18"></path>
        <path d="M14 8v7"></path>
        <path d="M18 5v13"></path>
        <path d="M22 10v3"></path>
      </svg>
    ),
    "Conference Rooms": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
      </svg>
    ),
    "Parking Space": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4" y="4" width="16" height="16" rx="2"></rect>
        <path d="M9 17V7h4a3 3 0 0 1 0 6h-4"></path>
      </svg>
    ),
    "Printing Services": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="6 9 6 2 18 2 18 9"></polyline>
        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
        <rect x="6" y="14" width="12" height="8"></rect>
      </svg>
    ),
    "Open 24/7": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
    ),
  };

  const handleCheckboxChange = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const handleClearAll = () => {
    setSelectedAmenities([]);
  };

  return (
    <div className="amenities-filter">
      <div className="filter-header">
        <h3>Amenities</h3>
        {selectedAmenities.length > 0 && (
          <button className="clear-all-btn" onClick={handleClearAll}>
            Clear All
          </button>
        )}
      </div>

      <div className="amenities-list">
        {availableAmenities.map((amenity) => {
          const isSelected = selectedAmenities.includes(amenity);
          return (
            <label
              key={amenity}
              className={`amenity-checkbox ${isSelected ? "selected" : ""}`}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => handleCheckboxChange(amenity)}
              />
              <span className="checkbox-custom">
                {isSelected && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                )}
              </span>
              <span className="amenity-icon">
                {amenityIcons[amenity] || (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                )}
              </span>
              <span className="amenity-label">{amenity}</span>
            </label>
          );
        })}
      </div>

      {selectedAmenities.length > 0 && (
        <div className="selected-count">
          {selectedAmenities.length}{" "}
          {selectedAmenities.length === 1 ? "amenity" : "amenities"} selected
        </div>
      )}
    </div>
  );
};

export default AmenitiesFilter;
