import React, { useState } from "react";
import StudentCafeCard from "../components/StudentCafeCard";
import { dataBase } from "../context/DataBase";
import "../styles/carddisplaysection.css";

function CardDisplaySection() {
  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 9;

  // Add safety check
  if (!dataBase || dataBase.length === 0) {
    return <div className="no-cafes">No cafes available</div>;
  }

  // Calculate pagination
  const totalPages = Math.ceil(dataBase.length / cardsPerPage);
  const startIndex = currentPage * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentCafes = dataBase.slice(startIndex, endIndex);

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
