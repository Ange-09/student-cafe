import React, { useState, useRef, useEffect } from "react";
import "../styles/cafecard.css";

const CafeCard = ({ cafe, onCardClick, onLocationClick }) => {
  const [visibleAmenities, setVisibleAmenities] = useState([]);
  const [hiddenCount, setHiddenCount] = useState(0);
  const amenitiesRef = useRef(null);

  // Default cafe data if none provided
  const defaultCafe = {
    id: 1,
    name: "Study Haven Cafe",
    location: "Makati City",
    image:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=400&fit=crop",
    availableSeats: 12,
    amenities: [
      "Free WiFi",
      "Charging Stations",
      "Free Coffee",
      "Snacks",
      "Conference Room",
      "Quiet Area",
    ],
  };

  const cafeData = cafe || defaultCafe;

  // Amenity icons mapping
  const amenityIcons = {
    "Free WiFi": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
        <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
        <circle cx="12" cy="20" r="1"></circle>
      </svg>
    ),
    "Charging Stations": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
      </svg>
    ),
    "Free Coffee": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 8h1a4 4 0 1 1 0 8h-1"></path>
        <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"></path>
        <line x1="6" y1="2" x2="6" y2="4"></line>
        <line x1="10" y1="2" x2="10" y2="4"></line>
        <line x1="14" y1="2" x2="14" y2="4"></line>
      </svg>
    ),
    Snacks: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 22a5 5 0 0 1-2-4"></path>
        <path d="M7 16.93c.96.43 1.96.74 2.99.91"></path>
        <path d="M3.34 14A6.8 6.8 0 0 1 2 10c0-4.42 4.48-8 10-8s10 3.58 10 8a7.19 7.19 0 0 1-.33 2"></path>
        <path d="M5 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
        <path d="M14.33 22h-.09a.35.35 0 0 1-.24-.32v-10a.34.34 0 0 1 .33-.34c.08 0 .15.03.21.08l7.34 6a.33.33 0 0 1-.21.59h-4.49l-2.57 3.85a.35.35 0 0 1-.28.14z"></path>
      </svg>
    ),
    "Conference Room": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
      </svg>
    ),
    "Quiet Area": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 10v3"></path>
        <path d="M6 6v11"></path>
        <path d="M10 3v18"></path>
        <path d="M14 8v7"></path>
        <path d="M18 5v13"></path>
        <path d="M22 10v3"></path>
      </svg>
    ),
    "Air Conditioning": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 2h8"></path>
        <path d="M9 2v7.5"></path>
        <path d="M15 2v7.5"></path>
        <path d="M12 9v13"></path>
        <path d="m17 22-5-5-5 5"></path>
      </svg>
    ),
    Parking: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4" y="4" width="16" height="16" rx="2"></rect>
        <path d="M9 17V7h4a3 3 0 0 1 0 6h-4"></path>
      </svg>
    ),
  };

  // Calculate visible amenities based on container width and height
  useEffect(() => {
    const calculateVisibleAmenities = () => {
      if (!amenitiesRef.current) return;

      const containerWidth = amenitiesRef.current.offsetWidth;
      const containerHeight =
        amenitiesRef.current.parentElement.offsetHeight - 30; // Subtract title height
      const amenityWidth = 95;
      const amenityHeight = 28; // Approximate height of each amenity box
      const spacing = 6;
      const moreBoxWidth = 55;

      // Calculate how many amenities can fit per row
      const amenitiesPerRow = Math.floor(
        (containerWidth + spacing) / (amenityWidth + spacing)
      );

      // Calculate how many rows can fit
      const maxRows = Math.floor(
        (containerHeight + spacing) / (amenityHeight + spacing)
      );

      // Total amenities that can fit
      let maxAmenities = amenitiesPerRow * maxRows;

      if (cafeData.amenities.length > maxAmenities) {
        // Reserve space for the "+X" box in the last position
        maxAmenities = maxAmenities - 1;
        setVisibleAmenities(cafeData.amenities.slice(0, maxAmenities));
        setHiddenCount(cafeData.amenities.length - maxAmenities);
      } else {
        setVisibleAmenities(cafeData.amenities);
        setHiddenCount(0);
      }
    };

    calculateVisibleAmenities();
    window.addEventListener("resize", calculateVisibleAmenities);

    // Small delay to ensure DOM is ready
    setTimeout(calculateVisibleAmenities, 100);

    return () =>
      window.removeEventListener("resize", calculateVisibleAmenities);
  }, [cafeData.amenities]);

  // Handle card click
  const handleCardClick = (e) => {
    // Don't trigger if clicking on location
    if (e.target.closest(".cafe-location")) {
      return;
    }
    if (onCardClick) {
      onCardClick(cafeData);
    }
  };

  // Handle location click
  const handleLocationClick = (e) => {
    e.stopPropagation(); // Prevent card click from firing
    if (onLocationClick) {
      onLocationClick(cafeData.location, cafeData.name);
    }
  };

  return (
    <div className="cafe-card" onClick={handleCardClick}>
      <div className="cafe-image-container">
        <img src={cafeData.image} alt={cafeData.name} className="cafe-image" />
        <div className="seats-badge">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 5v2"></path>
            <path d="M15 11v2"></path>
            <path d="M15 17v2"></path>
            <path d="M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"></path>
            <path d="M5 17h14a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2z"></path>
          </svg>
          <span>{cafeData.availableSeats} seats</span>
        </div>
      </div>

      <div className="cafe-content">
        <h3 className="cafe-name">{cafeData.name}</h3>

        <div className="cafe-location" onClick={handleLocationClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
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
          <span>{cafeData.location}</span>
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

export default CafeCard;
