import React, { createContext, useState } from "react";

// 1️⃣ Create the Context
export const AppContext = createContext();

// 2️⃣ Create the Provider component
export const AppProvider = ({ children }) => {
  // Global States
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedCafeName, setSelectedCafeName] = useState("");

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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
