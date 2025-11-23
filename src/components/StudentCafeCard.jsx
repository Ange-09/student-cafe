import React, { useState, useRef, useEffect } from "react";
import "../styles/studentcafecard.css";

const StudentCafeCard = ({ cafe, onCardClick, onLocationClick }) => {
  // Ensure amenities is always an array
  const amenities = cafe?.amenities || [];

  const [visibleAmenities, setVisibleAmenities] = useState([]);
  const [hiddenCount, setHiddenCount] = useState(0);
  const amenitiesRef = useRef(null);

  // Amenity icons mapping
  const amenityIcons = {
    // ... (keep all your existing amenity icons)
  };

  // Function to convert price to peso signs
  const getPriceDisplay = (price) => {
    if (!price) return "";

    if (price <= 150) {
      return "₱";
    } else if (price <= 300) {
      return "₱₱";
    } else {
      return "₱₱₱";
    }
  };

  // Calculate visible amenities based on container width and height
  useEffect(() => {
    const calculateVisibleAmenities = () => {
      if (!amenitiesRef.current || !amenities.length) return;

      const containerWidth = amenitiesRef.current.offsetWidth;
      const containerHeight =
        amenitiesRef.current.parentElement.offsetHeight - 30;
      const amenityWidth = 95;
      const amenityHeight = 28;
      const spacing = 6;

      const amenitiesPerRow = Math.floor(
        (containerWidth + spacing) / (amenityWidth + spacing)
      );
      const maxRows = Math.floor(
        (containerHeight + spacing) / (amenityHeight + spacing)
      );
      let maxAmenities = amenitiesPerRow * maxRows;

      if (amenities.length > maxAmenities) {
        maxAmenities = maxAmenities - 1;
        setVisibleAmenities(amenities.slice(0, maxAmenities));
        setHiddenCount(amenities.length - maxAmenities);
      } else {
        setVisibleAmenities(amenities);
        setHiddenCount(0);
      }
    };

    calculateVisibleAmenities();
    window.addEventListener("resize", calculateVisibleAmenities);
    setTimeout(calculateVisibleAmenities, 100);

    return () =>
      window.removeEventListener("resize", calculateVisibleAmenities);
  }, [amenities]);

  // Handle card click
  const handleCardClick = (e) => {
    if (e.target.closest(".cafe-location")) {
      return;
    }
    if (onCardClick) {
      onCardClick(cafe);
    }
  };

  // Handle location click
  const handleLocationClick = (e) => {
    e.stopPropagation();
    if (onLocationClick) {
      onLocationClick(cafe.location, cafe.name);
    }
  };

  const getSeatClass = () => {
    const seats = cafe.availableSeats || 0;
    if (seats >= 9) return "seats-green";
    if (seats >= 4) return "seats-yellow";
    return "seats-red";
  };

  // Render stars
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <svg
            key={i}
            className="rating-star filled"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="#ffc107"
            stroke="#ffa000"
            strokeWidth="1"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <svg
            key={i}
            className="rating-star half"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
          >
            <defs>
              <linearGradient id={`half-${cafe.id}`}>
                <stop offset="50%" stopColor="#ffc107" />
                <stop offset="50%" stopColor="#e0e0e0" />
              </linearGradient>
            </defs>
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              fill={`url(#half-${cafe.id})`}
              stroke="#bdbdbd"
              strokeWidth="1"
            />
          </svg>
        );
      } else {
        stars.push(
          <svg
            key={i}
            className="rating-star empty"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
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
    <div className="student-cafe-card" onClick={handleCardClick}>
      <div className="cafe-image-container">
        <img
          src={`${process.env.PUBLIC_URL}/images/${cafe.id}a.jpg`}
          alt={cafe.name}
          className="cafe-image"
        />
        <div className={`seats-badge ${getSeatClass()}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"></path>
            <path d="M3 11a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9Z"></path>
            <path d="M5 11V9"></path>
            <path d="M19 11V9"></path>
          </svg>
          <span>{cafe.availableSeats || 0} seats</span>
        </div>
        <div className="type-badge">{cafe.locType}</div>
      </div>

      <div className="cafe-content">
        <h3 className="cafe-name">{cafe.name}</h3>

        <div className="cafe-location" onClick={handleLocationClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span>{cafe.location}</span>
        </div>

        <div className="info-row">
          <div className="rating-display">
            {renderStars(cafe.star)}
            <span className="rating-value">{cafe.star.toFixed(1)}</span>
          </div>

          {cafe.price && (
            <div className="price-display">
              <span className="price-value">{getPriceDisplay(cafe.price)}</span>
            </div>
          )}
        </div>

        <div className="amenities-section">
          <h4 className="amenities-title">Available Amenities</h4>
          <div className="amenities-container" ref={amenitiesRef}>
            {visibleAmenities.map((amenity, index) => (
              <div key={index} className="amenity-box">
                <span className="amenity-icon">
                  {amenityIcons[amenity] || (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </span>
                <span className="amenity-text">{amenity}</span>
              </div>
            ))}
            {hiddenCount > 0 && (
              <div className="amenity-box more-amenities">
                <span className="more-text">+{hiddenCount}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCafeCard;
