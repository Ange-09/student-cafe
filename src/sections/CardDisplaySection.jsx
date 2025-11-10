import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 🔥 NEW
import StudentCafeCard from "../components/StudentCafeCard";
import { dataBase } from "../context/DataBase";
import { AppContext } from "../context/AppContext";
import "../styles/carddisplaysection.css";

function CardDisplaySection() {
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate(); // 🔥 NEW

  const {
    selectedLocation,
    selectedRating,
    selectedPrice,
    selectedAmenities,
    selectedType,
    selectedCafeName,
    setSelectedCafe, // 🔥 NEW
    filterCafes,
    hasActiveFilters,
    clearAllFilters,
    setSelectedLocation,
    setSelectedRating,
    setSelectedPrice,
    setSelectedAmenities,
    setSelectedType,
    setSelectedCafeName,
  } = useContext(AppContext);

  const cardsPerPage = 9;

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(0);
  }, [
    selectedLocation,
    selectedRating,
    selectedPrice,
    selectedAmenities,
    selectedType,
    selectedCafeName,
  ]);

  // Add safety check AFTER all hooks
  if (!dataBase || dataBase.length === 0) {
    return <div className="no-cafes">No cafes available</div>;
  }

  // Use the filterCafes function from context
  const filteredCafes = filterCafes(dataBase);

  // Calculate pagination with filtered data
  const totalPages = Math.ceil(filteredCafes.length / cardsPerPage);
  const startIndex = currentPage * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentCafes = filteredCafes.slice(startIndex, endIndex);

  // 🔥 NEW: Handle card click and navigate to cafe page
  const handleCardClick = (cafe) => {
    setSelectedCafe(cafe);
    navigate(`/cafe/${cafe.id}`);
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

  // Clear price filter only
  const handleClearPriceFilter = () => {
    setSelectedPrice(null);
    setCurrentPage(0);
  };

  // Clear amenities filter only
  const handleClearAmenitiesFilter = () => {
    setSelectedAmenities([]);
    setCurrentPage(0);
  };

  // Clear type filter only
  const handleClearTypeFilter = () => {
    setSelectedType(null);
    setCurrentPage(0);
  };

  // Clear cafe name filter only
  const handleClearCafeNameFilter = () => {
    setSelectedCafeName("");
    setCurrentPage(0);
  };

  // Clear all filters function
  const handleClearAllFilters = () => {
    clearAllFilters();
    setCurrentPage(0);
  };

  // Get price label for display
  const getPriceLabel = (priceLevel) => {
    switch (priceLevel) {
      case 1:
        return "₱ (≤150)";
      case 2:
        return "₱₱ (151-250)";
      case 3:
        return "₱₱₱ (≥251)";
      default:
        return "";
    }
  };

  // Show message if no cafes found with current filters
  if (filteredCafes.length === 0) {
    return (
      <div className="no-cafes">
        <p>No cafes found with the current filters.</p>
        {selectedCafeName && (
          <p>
            Cafe Name: <strong>{selectedCafeName}</strong>
          </p>
        )}
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
        {selectedPrice && (
          <p>
            Price Range: <strong>{getPriceLabel(selectedPrice)}</strong>
          </p>
        )}
        {selectedType && (
          <p>
            Type: <strong>{selectedType}</strong>
          </p>
        )}
        {selectedAmenities.length > 0 && (
          <p>
            Amenities: <strong>{selectedAmenities.join(", ")}</strong>
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
            {selectedCafeName && (
              <div className="filter-badge cafename-badge">
                <span>🔍 {selectedCafeName}</span>
                <button
                  className="clear-badge-btn"
                  onClick={handleClearCafeNameFilter}
                  title="Clear cafe name filter"
                >
                  ✕
                </button>
              </div>
            )}
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
            {selectedPrice && (
              <div className="filter-badge price-badge">
                <span>💰 {getPriceLabel(selectedPrice)}</span>
                <button
                  className="clear-badge-btn"
                  onClick={handleClearPriceFilter}
                  title="Clear price filter"
                >
                  ✕
                </button>
              </div>
            )}
            {selectedType && (
              <div className="filter-badge type-badge">
                <span>🏢 {selectedType}</span>
                <button
                  className="clear-badge-btn"
                  onClick={handleClearTypeFilter}
                  title="Clear type filter"
                >
                  ✕
                </button>
              </div>
            )}
            {selectedAmenities.length > 0 && (
              <div className="filter-badge amenities-badge">
                <span>✨ {selectedAmenities.length} amenities</span>
                <button
                  className="clear-badge-btn"
                  onClick={handleClearAmenitiesFilter}
                  title="Clear amenities filter"
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
            onCardClick={handleCardClick}
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
