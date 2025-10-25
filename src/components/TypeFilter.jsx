import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import "../styles/typefilter.css";

const TypeFilter = () => {
  const { selectedType, setSelectedType } = useContext(AppContext);

  const types = [
    {
      value: "Cafe",
      icon: (
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
          <path d="M17 8h1a4 4 0 1 1 0 8h-1"></path>
          <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"></path>
          <line x1="6" y1="2" x2="6" y2="4"></line>
          <line x1="10" y1="2" x2="10" y2="4"></line>
          <line x1="14" y1="2" x2="14" y2="4"></line>
        </svg>
      ),
    },
    {
      value: "Lounge",
      icon: (
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
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
        </svg>
      ),
    },
    {
      value: "Co-Working",
      icon: (
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
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
      ),
    },
  ];

  const handleTypeClick = (type) => {
    if (selectedType === type) {
      // Deselect if clicking the same type
      setSelectedType(null);
      console.log("Type filter cleared");
    } else {
      setSelectedType(type);
      console.log("Selected type:", type);
    }
  };

  const handleClear = () => {
    setSelectedType(null);
    console.log("Type filter cleared");
  };

  return (
    <div className="type-filter-container">
      <label className="type-label">Type</label>
      <div className="type-buttons-grid">
        {types.map((type) => (
          <button
            key={type.value}
            className={`type-button ${
              selectedType === type.value ? "selected" : ""
            }`}
            onClick={() => handleTypeClick(type.value)}
          >
            <span className="type-icon">{type.icon}</span>
            <span className="type-text">{type.value}</span>
          </button>
        ))}
      </div>
      {selectedType && (
        <button className="clear-type-btn" onClick={handleClear}>
          Clear
        </button>
      )}
    </div>
  );
};

export default TypeFilter;
