import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import "../styles/ratingsfilter.css";

const RatingsFilter = () => {
  const { selectedRating, setSelectedRating } = useContext(AppContext);

  const handleSliderChange = (e) => {
    const value = parseFloat(e.target.value);
    setSelectedRating(value === 0 ? null : value);
    console.log("Selected rating:", value);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        // Full star
        stars.push(
          <svg
            key={i}
            className="star-display"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#ffc107"
            stroke="#ffa000"
            strokeWidth="1"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        // Half star
        stars.push(
          <svg
            key={i}
            className="star-display"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <defs>
              <linearGradient id="half-gradient">
                <stop offset="50%" stopColor="#ffc107" />
                <stop offset="50%" stopColor="#e0e0e0" />
              </linearGradient>
            </defs>
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              fill="url(#half-gradient)"
              stroke="#bdbdbd"
              strokeWidth="1"
            />
          </svg>
        );
      } else {
        // Empty star
        stars.push(
          <svg
            key={i}
            className="star-display"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#e0e0e0"
            stroke="#bdbdbd"
            strokeWidth="1"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );
      }
    }

    return stars;
  };

  return (
    <div className="ratings-filter-compact">
      <label className="ratings-label">Rating</label>
      <div className="stars-display">{renderStars(selectedRating || 0)}</div>
      <div className="slider-container">
        <input
          type="range"
          min="0"
          max="5"
          step="0.5"
          value={selectedRating || 0}
          onChange={handleSliderChange}
          className="rating-slider"
        />
        <span className="rating-value">
          {selectedRating && selectedRating > 0
            ? selectedRating.toFixed(1)
            : ""}
        </span>
      </div>
    </div>
  );
};

export default RatingsFilter;
