// src/context/AppContext.jsx
import React, { createContext, useState, useMemo, useEffect } from "react";
import { dataBase } from "../context/DataBase";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // --- existing filter states ---
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedCafeName, setSelectedCafeName] = useState("");
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedCafe, setSelectedCafe] = useState(null);

  // --- NEW: cafes state (load from localStorage first if present) ---
  const [cafes, setCafes] = useState(() => {
    try {
      const raw = localStorage.getItem("cafes_v1");
      return raw ? JSON.parse(raw) : dataBase;
    } catch {
      return dataBase;
    }
  });

  // Persist cafes on change
  useEffect(() => {
    try {
      localStorage.setItem("cafes_v1", JSON.stringify(cafes));
    } catch {}
  }, [cafes]);

  // --- NEW: update available seats (and any other field if needed) ---
  const updateSeats = (id, newSeats) => {
    setCafes((prev) =>
      prev.map((cafe) =>
        cafe.id === id ? { ...cafe, availableSeats: newSeats } : cafe
      )
    );
  };

  // --- your existing filter function (unchanged) ---
  const filterCafes = (cafesList) => {
    return cafesList.filter((cafe) => {
      const matchesLocation =
        !selectedLocation ||
        cafe.location.toLowerCase().includes(selectedLocation.toLowerCase());
      const matchesName =
        !selectedCafeName ||
        cafe.name.toLowerCase().includes(selectedCafeName.toLowerCase());
      const matchesRating = !selectedRating || cafe.star >= selectedRating;
      const matchesType = !selectedType || cafe.locType === selectedType;
      const matchesAmenities =
        selectedAmenities.length === 0 ||
        selectedAmenities.every((amenity) => cafe.amenities.includes(amenity));
      const matchesPrice =
        !selectedPrice ||
        (() => {
          const price = cafe.price || 0;
          switch (selectedPrice) {
            case 1:
              return price <= 150;
            case 2:
              return price >= 151 && price <= 250;
            case 3:
              return price >= 251;
            default:
              return true;
          }
        })();
      return (
        matchesLocation &&
        matchesName &&
        matchesRating &&
        matchesType &&
        matchesAmenities &&
        matchesPrice
      );
    });
  };

  const hasActiveFilters = useMemo(() => {
    return !!(
      selectedLocation ||
      selectedCafeName ||
      selectedRating ||
      selectedType ||
      selectedAmenities.length > 0 ||
      selectedPrice
    );
  }, [
    selectedLocation,
    selectedCafeName,
    selectedRating,
    selectedType,
    selectedAmenities,
    selectedPrice,
  ]);

  const clearAllFilters = () => {
    setSelectedLocation("");
    setSelectedCafeName("");
    setSelectedRating(null);
    setSelectedType(null);
    setSelectedAmenities([]);
    setSelectedPrice(null);
  };

  return (
    <AppContext.Provider
      value={{
        // filter states + setters
        selectedLocation,
        setSelectedLocation,
        selectedAmenities,
        setSelectedAmenities,
        selectedCafeName,
        setSelectedCafeName,
        selectedRating,
        setSelectedRating,
        selectedType,
        setSelectedType,
        selectedPrice,
        setSelectedPrice,
        selectedCafe,
        setSelectedCafe,
        filterCafes,
        hasActiveFilters,
        clearAllFilters,

        // NEW: cafes + updater
        cafes,
        setCafes,
        updateSeats,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
