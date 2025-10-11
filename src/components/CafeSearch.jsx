import { useState, useRef, useEffect } from "react";
import "../styles/locationsearch.css";

export default function CafeSearch() {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCafe, setSelectedCafe] = useState("");
  const [popupDirection, setPopupDirection] = useState("down");
  const searchRef = useRef(null);

  const cafes = [
    "Starbucks - Katipunan",
    "The Coffee Bean & Tea Leaf - BGC",
    "Bo's Coffee - Makati",
    "Coffee Project - Ortigas",
    "Tim Hortons - SM Megamall",
    "Seattle's Best - UP Town Center",
    "Café Breton - Tomas Morato",
    "Kape Alley - Eastwood",
    "Study Hub Lounge - Quezon City",
    "The Grind Café - Taguig",
  ];

  const filteredSuggestions = cafes.filter((cafe) =>
    cafe.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(true);
    if (value !== selectedCafe) setSelectedCafe("");
  };

  const handleSelectSuggestion = (cafe) => {
    setQuery(cafe);
    setSelectedCafe(cafe);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (selectedCafe) {
        alert(`Searching for: ${selectedCafe}`);
      } else {
        alert("Please select a café from the suggestions");
      }
    }
  };

  const handleFocus = () => {
    if (searchRef.current) {
      const rect = searchRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Space available above and below the input field
      const spaceAbove = rect.top;
      const spaceBelow = windowHeight - rect.bottom;

      // Choose direction based on where there's more space
      if (spaceAbove > spaceBelow) {
        setPopupDirection("drop-up");
      } else {
        setPopupDirection("drop-down");
      }
    }
    setShowSuggestions(true);
  };

  return (
    <div ref={searchRef} className="search-container">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        placeholder="Search café or lounge..."
        className="search-input"
      />

      {showSuggestions && query && (
        <div className={`suggestions-dropdown ${popupDirection}`}>
          {filteredSuggestions.length > 0 ? (
            filteredSuggestions.map((cafe, idx) => (
              <div
                key={idx}
                onClick={() => handleSelectSuggestion(cafe)}
                className="suggestion-item"
              >
                {cafe}
              </div>
            ))
          ) : (
            <div className="no-results">No cafés found</div>
          )}
        </div>
      )}
    </div>
  );
}
