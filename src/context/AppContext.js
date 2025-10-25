import React, { createContext, useState, useMemo } from "react";

// 1️⃣ Create the Context
export const AppContext = createContext();

// 2️⃣ Create the Provider component
export const AppProvider = ({ children }) => {
  // Global States
  const [selectedLocation, setSelectedLocation] = useState(""); //Location of Cafe
  const [selectedAmenities, setSelectedAmenities] = useState([]); //Cafe Amenities
  const [selectedCafeName, setSelectedCafeName] = useState(""); //Name of Cafe
  const [selectedRating, setSelectedRating] = useState(null); // Cafe Rating
  const [selectedType, setSelectedType] = useState(null);

  // 🔥 Filter Function
  const filterCafes = (cafes) => {
    return cafes.filter((cafe) => {
      // Filter by location
      const matchesLocation =
        !selectedLocation ||
        cafe.location.toLowerCase().includes(selectedLocation.toLowerCase());

      // Filter by name
      const matchesName =
        !selectedCafeName ||
        cafe.name.toLowerCase().includes(selectedCafeName.toLowerCase());

      // Filter by rating (minimum rating)
      const matchesRating = !selectedRating || cafe.star >= selectedRating;

      // Filter by type
      const matchesType = !selectedType || cafe.locType === selectedType;

      // Filter by amenities (cafe must have ALL selected amenities)
      const matchesAmenities =
        selectedAmenities.length === 0 ||
        selectedAmenities.every((amenity) => cafe.amenities.includes(amenity));

      // Return true only if ALL filters match
      return (
        matchesLocation &&
        matchesName &&
        matchesRating &&
        matchesType &&
        matchesAmenities
      );
    });
  };

  // 🔥 Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return !!(
      selectedLocation ||
      selectedCafeName ||
      selectedRating ||
      selectedType ||
      selectedAmenities.length > 0
    );
  }, [
    selectedLocation,
    selectedCafeName,
    selectedRating,
    selectedType,
    selectedAmenities,
  ]);

  // 🔥 Clear all filters
  const clearAllFilters = () => {
    setSelectedLocation("");
    setSelectedCafeName("");
    setSelectedRating(null);
    setSelectedType(null);
    setSelectedAmenities([]);
    console.log("All filters cleared");
  };

  // 3️⃣ Return Provider that shares the states and functions
  return (
    <AppContext.Provider
      value={{
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
        filterCafes, // 🔥 Add filter function
        hasActiveFilters, // 🔥 Add active filters check
        clearAllFilters, // 🔥 Add clear all function
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
