import { AppContext } from "../context/AppContext";
import React, { useContext } from "react";
import "../styles/cafessection.css";

import LocationSearchFilter from "../components/LocationSearchFilter";
import AmenitiesFilter from "../components/AmenitiesFilter";
import SearchButton from "../components/SearchButton";

function CafesSection() {
  const { selectedLocation, setSelectedLocation } = useContext(AppContext);

  return (
    <div className="cafessection">
      <div className="cafe-header">
        <h1>Student Cafes/Lounges at {selectedLocation}</h1>
      </div>
      <div className="filters">
        <h3 className="filters-title">Filters</h3>
        <SearchButton />
        <p>Location</p>
        <br />
        <LocationSearchFilter />
        <AmenitiesFilter />
      </div>
      <div className="main">
        <h3>Main Content</h3>
      </div>
    </div>
  );
}

export default CafesSection;
