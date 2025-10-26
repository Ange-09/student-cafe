import { AppContext } from "../context/AppContext";
import React, { useContext } from "react";
import "../styles/cafessection.css";

import LocationSearchFilter from "../components/LocationSearchFilter";
import AmenitiesFilter from "../components/AmenitiesFilter";
import SearchButton from "../components/SearchButton";
import NameSearch from "../components/NameSearch";
import RatingsFilter from "../components/RatingsFilter";
import TypeFilter from "../components/TypeFilter";

import CardDisplaySection from "./CardDisplaySection";

function CafesSection() {
  const { selectedLocation, setSelectedLocation } = useContext(AppContext);

  return (
    <div className="cafessection">
      <div className="cafe-header">
        <h1>Student Cafes/Lounges at {selectedLocation}</h1>
      </div>
      <div className="filters">
        <SearchButton />
        <br />
        <h3 className="filters-sub-title">Cafe/Lounge Name</h3>
        <br />
        <NameSearch />
        <h3 className="filters-sub-title">Location</h3>
        <br />
        <LocationSearchFilter />
        <TypeFilter />
        <br />
        <RatingsFilter />
        <br />
        <AmenitiesFilter />
      </div>
      <div className="main">
        <CardDisplaySection />
      </div>
    </div>
  );
}

export default CafesSection;
