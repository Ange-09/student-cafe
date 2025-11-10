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
  const [selectedType, setSelectedType] = useState(null); // Type of Cafe
  const [selectedPrice, setSelectedPrice] = useState(null); // Price Range (1, 2, or 3)

  // 🔥 NEW: Selected cafe for detail page
  const [selectedCafe, setSelectedCafe] = useState(null);

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

      // Filter by price range
      const matchesPrice =
        !selectedPrice ||
        (() => {
          const price = cafe.price || 0;
          switch (selectedPrice) {
            case 1: // ₱ - Budget (≤150)
              return price <= 150;
            case 2: // ₱₱ - Moderate (151-250)
              return price >= 151 && price <= 250;
            case 3: // ₱₱₱ - Premium (≥251)
              return price >= 251;
            default:
              return true;
          }
        })();

      // Return true only if ALL filters match
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

  // 🔥 Check if any filters are active
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

  // 🔥 Clear all filters
  const clearAllFilters = () => {
    setSelectedLocation("");
    setSelectedCafeName("");
    setSelectedRating(null);
    setSelectedType(null);
    setSelectedAmenities([]);
    setSelectedPrice(null);
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
        selectedPrice,
        setSelectedPrice,
        selectedCafe, // 🔥 NEW
        setSelectedCafe, // 🔥 NEW
        filterCafes,
        hasActiveFilters,
        clearAllFilters,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
