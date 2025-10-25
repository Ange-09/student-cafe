import React, { createContext, useState } from "react";

// 1️⃣ Create the Context
export const AppContext = createContext();

// 2️⃣ Create the Provider component
export const AppProvider = ({ children }) => {
  // Global States
  const [selectedLocation, setSelectedLocation] = useState(""); //Location of Cafe
  const [selectedAmenities, setSelectedAmenities] = useState([]); //Cafe Amenities
  const [selectedCafeName, setSelectedCafeName] = useState(""); //Name of Cafe
  const [selectedRating, setSelectedRating] = useState(null); // Cafe Rating

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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
