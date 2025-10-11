import { useState, useRef, useEffect } from "react";
import "../styles/amenitiesfilter.css";

export default function AmenitiesFilter() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [dropDirection, setDropDirection] = useState("down");
  const dropdownRef = useRef(null);

  const amenities = [
    { id: "free-coffee", label: "Free Coffee" },
    { id: "snacks", label: "Snacks Available" },
    { id: "charging", label: "Charging Stations" },
    { id: "conference", label: "Conference Rooms" },
    { id: "wifi", label: "High-Speed WiFi" },
    { id: "quiet", label: "Quiet Zone" },
    { id: "parking", label: "Parking Available" },
    { id: "aircon", label: "Air Conditioned" },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (showDropdown && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const distanceToBottom = viewportHeight - rect.bottom;
      setDropDirection(distanceToBottom < 200 ? "up" : "down");
    }
  }, [showDropdown]);

  const handleToggleAmenity = (amenityId) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenityId)
        ? prev.filter((id) => id !== amenityId)
        : [...prev, amenityId]
    );
  };

  const getDisplayText = () => {
    if (selectedAmenities.length === 0) return "Select amenities...";
    if (selectedAmenities.length === 1) {
      const amenity = amenities.find((a) => a.id === selectedAmenities[0]);
      return amenity?.label || "";
    }
    return `${selectedAmenities.length} amenities selected`;
  };

  return (
    <div ref={dropdownRef} className="search-container">
      <div
        onClick={() => setShowDropdown(!showDropdown)}
        className="search-input"
      >
        {getDisplayText()}
      </div>

      {showDropdown && (
        <div
          className={`suggestions-dropdown ${
            dropDirection === "up" ? "drop-up" : "drop-down"
          }`}
        >
          {amenities.map((amenity) => (
            <div
              key={amenity.id}
              onClick={() => handleToggleAmenity(amenity.id)}
              className={`suggestion-item ${
                selectedAmenities.includes(amenity.id) ? "selected" : ""
              }`}
            >
              {amenity.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
