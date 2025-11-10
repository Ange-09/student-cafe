import React from "react";
import "../styles/cafepagesection.css";

function CafePageSection({ cafe }) {
  // If no cafe data is provided, show a message
  if (!cafe) {
    return (
      <div className="page-cafe">
        <div className="cafe-details">
          <div className="title-box">
            <h1>No cafe selected</h1>
          </div>
        </div>
      </div>
    );
  }

  // Amenity icons mapping (same as in StudentCafeCard)
  const amenityIcons = {
    "Free Wifi": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
        <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
        <path d="M12 20h.01"></path>
      </svg>
    ),
    "Quiet Zones": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
        <line x1="12" x2="12" y1="19" y2="22"></line>
      </svg>
    ),
    "Food Options Available": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path>
        <path d="M7 2v20"></path>
        <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path>
      </svg>
    ),
    "Printing Services": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polyline points="6 9 6 2 18 2 18 9"></polyline>
        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
        <rect width="12" height="8" x="6" y="14"></rect>
      </svg>
    ),
    "Parking Space": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect width="18" height="18" x="3" y="3" rx="2"></rect>
        <path d="M7 7h6a3 3 0 0 1 3 3v0a3 3 0 0 1-3 3H9v4"></path>
        <line x1="9" x2="9" y1="7" y2="17"></line>
      </svg>
    ),
  };

  // Render stars for rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <svg
            key={i}
            className="star filled"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
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
            className="star half"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <defs>
              <linearGradient id={`half-rating-${cafe.id}`}>
                <stop offset="50%" stopColor="#ffc107" />
                <stop offset="50%" stopColor="#e0e0e0" />
              </linearGradient>
            </defs>
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              fill={`url(#half-rating-${cafe.id})`}
              stroke="#bdbdbd"
              strokeWidth="1"
            />
          </svg>
        );
      } else {
        stars.push(
          <svg
            key={i}
            className="star empty"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
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
    <div className="page-cafe">
      <div className="picture-section">
        <div className="pic-left">
          <img src={cafe.image} alt={cafe.name} className="cafe-main-image" />
        </div>
        <div className="pic-top">
          <img
            src={cafe.image}
            alt={`${cafe.name} view 1`}
            className="cafe-side-image"
          />
        </div>
        <div className="pic-bottom">
          <img
            src={cafe.image}
            alt={`${cafe.name} view 2`}
            className="cafe-side-image"
          />
        </div>
      </div>

      <div className="cafe-details">
        <div className="title-box">
          <h1 className="cafe-title">{cafe.name}</h1>
          <div className="title-meta">
            <span className="cafe-type-badge">{cafe.locType}</span>
            <div className="title-rating">
              {renderStars(cafe.star)}
              <span className="rating-number">{cafe.star.toFixed(1)}</span>
            </div>
            {cafe.price && (
              <div className="price-tag">
                <span>Starting from </span>
                <span className="price-amount">₱{cafe.price}</span>
              </div>
            )}
          </div>
        </div>

        <div className="left-box">
          <div className="amenities">
            <h2 className="section-title">Available Amenities</h2>
            <div className="amenities-grid">
              {cafe.amenities &&
                cafe.amenities.map((amenity, index) => (
                  <div key={index} className="amenity-item">
                    <span className="amenity-icon-page">
                      {amenityIcons[amenity] || (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      )}
                    </span>
                    <span className="amenity-label">{amenity}</span>
                  </div>
                ))}
            </div>
          </div>

          <div className="about-us">
            <h2 className="section-title">Operating Hours</h2>
            <div className="hours-info">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>{cafe.operatingHours || "Contact for hours"}</span>
            </div>
            {cafe.peakTime && (
              <div className="peak-info">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <line x1="19" x2="19" y1="8" y2="14"></line>
                  <line x1="22" x2="16" y1="11" y2="11"></line>
                </svg>
                <span>Peak Time: {cafe.peakTime}</span>
              </div>
            )}
          </div>

          <div className="maps-section">
            <div className="maps-address">
              <h3 className="location-title">Location</h3>
              <a
                href={cafe.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="location-link"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>{cafe.location}</span>
              </a>
              <div className="seats-info">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"></path>
                  <path d="M3 11a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9Z"></path>
                  <path d="M5 11V9"></path>
                  <path d="M19 11V9"></path>
                </svg>
                <span>{cafe.availableSeats || 0} seats available</span>
              </div>
            </div>
            <div className="maps-iframe">
              <iframe
                className="iframe"
                src={cafe.mapsIframe}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map of ${cafe.name}`}
              />
            </div>
          </div>
        </div>

        <div className="right-box">
          <div className="reviews">
            <h2 className="section-title">Reviews</h2>
            <div className="review-summary">
              <div className="review-score">
                <span className="score-number">{cafe.star.toFixed(1)}</span>
                <div className="score-stars">{renderStars(cafe.star)}</div>
              </div>
            </div>
          </div>

          <div className="comments">
            <h3 className="comments-title">Comments</h3>
            <div className="comments-list">
              <div className="comment-item">
                <div className="comment-header">
                  <span className="commenter-name">Anonymous Student</span>
                  <div className="comment-rating">{renderStars(4.5)}</div>
                </div>
                <p className="comment-text">
                  Great place to study! Very quiet and comfortable seats.
                </p>
              </div>
              <div className="comment-item">
                <div className="comment-header">
                  <span className="commenter-name">Anonymous Student</span>
                  <div className="comment-rating">{renderStars(4)}</div>
                </div>
                <p className="comment-text">
                  Good amenities and reliable wifi. Gets crowded during peak
                  hours though.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CafePageSection;
