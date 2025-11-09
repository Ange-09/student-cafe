import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import "../styles/pricefilter.css";

const PriceFilter = () => {
  const { selectedPrice, setSelectedPrice } = useContext(AppContext);

  const priceRanges = [
    { value: 1, label: "₱", description: "Budget-friendly" },
    { value: 2, label: "₱₱", description: "Moderate" },
    { value: 3, label: "₱₱₱", description: "Premium" },
  ];

  const handlePriceClick = (price) => {
    if (selectedPrice === price) {
      // Deselect if clicking the same price
      setSelectedPrice(null);
      console.log("Price filter cleared");
    } else {
      setSelectedPrice(price);
      console.log("Selected price range:", price);
    }
  };

  return (
    <div className="price-filter-container">
      <label className="price-label">Price Range</label>
      <div className="price-buttons">
        {priceRanges.map((range) => (
          <button
            key={range.value}
            className={`price-button ${
              selectedPrice === range.value ? "selected" : ""
            }`}
            onClick={() => handlePriceClick(range.value)}
            title={range.description}
          >
            <span className="price-symbol">{range.label}</span>
          </button>
        ))}
      </div>
      {selectedPrice && (
        <button
          className="clear-price-btn"
          onClick={() => setSelectedPrice(null)}
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default PriceFilter;
