import "../styles/cafessection.css";
import CafeCard from "../components/CafeCard";
import cafeData from "../components/CafeData";
import { useState } from "react";

function CafesSection() {
  const [selectedCafe, setSelectedCafe] = useState(null);
  const [showMapModal, setShowMapModal] = useState(false);
  const [mapData, setMapData] = useState(null);

  // Handle card click to show full details
  const handleCardClick = (cafe) => {
    setSelectedCafe(cafe);
    console.log("Cafe details:", cafe);
    // You'll implement the full details modal here later
  };

  // Handle location click to show map
  const handleLocationClick = (location, cafeName) => {
    const cafe = cafeData.find((c) => c.name === cafeName);
    if (cafe && cafe.mapIframe) {
      setMapData({ location, cafeName, mapIframe: cafe.mapIframe });
      setShowMapModal(true);
    }
  };

  // Close modals
  const closeModals = () => {
    setSelectedCafe(null);
    setShowMapModal(false);
    setMapData(null);
  };

  return (
    <div className="cafessection">
      <div className="cafe-header">
        <h1>Student Cafes/Lounges Near</h1>
      </div>
      <div className="filters">
        <h3>Filters</h3>
      </div>
      <div className="main">
        <h3>Main Content</h3>
        <div className="card">
          {cafeData.map((cafe) => (
            <CafeCard
              key={cafe.id}
              cafe={cafe}
              onCardClick={handleCardClick}
              onLocationClick={handleLocationClick}
            />
          ))}
        </div>
      </div>

      {/* Map Modal */}
      {showMapModal && mapData && (
        <div className="modal-overlay" onClick={closeModals}>
          <div
            className="modal-content map-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={closeModals}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <h2>{mapData.cafeName}</h2>
            <p className="map-location">
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
              {mapData.location}
            </p>
            <div className="map-container">
              <iframe
                src={mapData.mapIframe}
                width="100%"
                height="450"
                style={{ border: 0, borderRadius: "12px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      )}

      {/* Placeholder for Full Details Modal */}
      {selectedCafe && !showMapModal && (
        <div className="modal-overlay" onClick={closeModals}>
          <div
            className="modal-content details-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={closeModals}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <h2>{selectedCafe.name}</h2>
            <p>Full details modal will be implemented here...</p>
            <p>
              <strong>Location:</strong> {selectedCafe.location}
            </p>
            <p>
              <strong>Available Seats:</strong> {selectedCafe.availableSeats}
            </p>
            <p>
              <strong>Hours:</strong> {selectedCafe.hours}
            </p>
            <p>
              <strong>Contact:</strong> {selectedCafe.contact}
            </p>
            <p>
              <strong>Description:</strong> {selectedCafe.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CafesSection;
