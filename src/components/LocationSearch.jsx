import { useState, useRef, useEffect } from "react";
import "../styles/locationsearch.css";

export default function LocationSearch() {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [dropDirection, setDropDirection] = useState("down"); // 👈 new
  const searchRef = useRef(null);

  const locations = [
    "Quezon City",
    "Makati",
    "Taguig",
    "Pasig",
    "Manila",
    "Mandaluyong",
    "BGC (Bonifacio Global City)",
    "Ortigas Center",
    "Eastwood City",
    "UP Diliman Area",
  ];

  const filteredSuggestions = locations.filter((loc) =>
    loc.toLowerCase().includes(query.toLowerCase())
  );

  // Detect click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 👇 Detect screen position when showing suggestions
  useEffect(() => {
    if (showSuggestions && searchRef.current) {
      const rect = searchRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      // If not enough space below, drop up
      if (spaceBelow < 200 && spaceAbove > spaceBelow) {
        setDropDirection("up");
      } else {
        setDropDirection("down");
      }
    }
  }, [showSuggestions]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setShowSuggestions(true);
  };

  const handleSelect = (loc) => {
    setQuery(loc);
    setShowSuggestions(false);
  };

  return (
    <div ref={searchRef} className="search-container">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onFocus={() => setShowSuggestions(true)}
        placeholder="Search location..."
        className="search-input"
      />

      {showSuggestions && query && (
        <div
          className={`suggestions-dropdown ${
            dropDirection === "up" ? "drop-up" : "drop-down"
          }`}
        >
          {filteredSuggestions.length > 0 ? (
            filteredSuggestions.map((loc, i) => (
              <div
                key={i}
                onClick={() => handleSelect(loc)}
                className="suggestion-item"
              >
                {loc}
              </div>
            ))
          ) : (
            <div className="no-results">No locations found</div>
          )}
        </div>
      )}
    </div>
  );
}
