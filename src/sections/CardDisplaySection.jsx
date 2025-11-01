import React, { useState, useContext, useEffect } from "react";
import StudentCafeCard from "../components/StudentCafeCard";
import { dataBase } from "../context/DataBase";
import { AppContext } from "../context/AppContext";
import "../styles/carddisplaysection.css";

function CardDisplaySection() {
  const [currentPage, setCurrentPage] = useState(0);
  const {
    selectedLocation,
    setSelectedLocation,
    selectedRating,
    setSelectedRating,
  } = useContext(AppContext);
  const cardsPerPage = 9;

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(0);
  }, [selectedLocation, selectedRating]);

  // Add safety check AFTER all hooks
  if (!dataBase || dataBase.length === 0) {
    return <div className="no-cafes">No cafes available</div>;
  }

  // Filter cafes based on selected location AND rating
  let filteredCafes = dataBase;

  // Apply location filter
  if (selectedLocation) {
    filteredCafes = filteredCafes.filter((cafe) =>
      cafe.location.toLowerCase().includes(selectedLocation.toLowerCase())
    );
  }

  // Apply rating filter (using 'star' property from database)
  if (selectedRating && selectedRating > 0) {
    filteredCafes = filteredCafes.filter((cafe) => {
      // Handle both 'star' and 'rating' property names for compatibility
      const cafeRating = cafe.star || cafe.rating || 0;
      return cafeRating >= selectedRating;
    });
  }

  // Calculate pagination with filtered data
  const totalPages = Math.ceil(filteredCafes.length / cardsPerPage);
  const startIndex = currentPage * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentCafes = filteredCafes.slice(startIndex, endIndex);

  // Clear all filters function
  const handleClearAllFilters = () => {
    setSelectedLocation("");
    setSelectedRating(null);
    setCurrentPage(0);
  };

  // Clear location filter only
  const handleClearLocationFilter = () => {
    setSelectedLocation("");
    setCurrentPage(0);
  };

  // Clear rating filter only
  const handleClearRatingFilter = () => {
    setSelectedRating(null);
    setCurrentPage(0);
  };

  // Check if any filters are active
  const hasActiveFilters =
    selectedLocation || (selectedRating && selectedRating > 0);

  // Show message if no cafes found with current filters
  if (filteredCafes.length === 0) {
    return (
      <div className="no-cafes">
        <p>No cafes found with the current filters.</p>
        {selectedLocation && (
          <p>
            Location: <strong>{selectedLocation}</strong>
          </p>
        )}
        {selectedRating > 0 && (
          <p>
            Minimum Rating: <strong>{selectedRating.toFixed(1)} stars</strong>
          </p>
        )}
        <button
          onClick={handleClearAllFilters}
          style={{
            marginTop: "10px",
            padding: "8px 16px",
            cursor: "pointer",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "14px",
          }}
        >
          Clear All Filters
        </button>
      </div>
    );
  }

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="card-display-wrapper">
      {hasActiveFilters && (
        <div className="active-filters">
          <div className="filter-badges">
            {selectedLocation && (
              <div className="filter-badge location-badge">
                <span>📍 {selectedLocation}</span>
                <button
                  className="clear-badge-btn"
                  onClick={handleClearLocationFilter}
                  title="Clear location filter"
                >
                  ✕
                </button>
              </div>
            )}
            {selectedRating > 0 && (
              <div className="filter-badge rating-badge">
                <span>⭐ {selectedRating.toFixed(1)}+ stars</span>
                <button
                  className="clear-badge-btn"
                  onClick={handleClearRatingFilter}
                  title="Clear rating filter"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
          <button
            className="clear-all-filters-btn"
            onClick={handleClearAllFilters}
          >
            Clear All Filters
          </button>
        </div>
      )}

      <div className="cards-container">
        {currentCafes.map((cafe) => (
          <StudentCafeCard
            key={cafe.id}
            cafe={cafe}
            onCardClick={(selectedCafe) => {
              console.log("Clicked:", selectedCafe.name);
            }}
            onLocationClick={(location, name) => {
              console.log("Location clicked:", location, name);
            }}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination-controls">
          <button
            className="pagination-btn prev-btn"
            onClick={goToPrevPage}
            disabled={currentPage === 0}
          >
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
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            Previous
          </button>

          <div className="page-indicator">
            <span className="current-page">{currentPage + 1}</span>
            <span className="page-separator">/</span>
            <span className="total-pages">{totalPages}</span>
          </div>

          <button
            className="pagination-btn next-btn"
            onClick={goToNextPage}
            disabled={currentPage === totalPages - 1}
          >
            Next
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
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default CardDisplaySection;
