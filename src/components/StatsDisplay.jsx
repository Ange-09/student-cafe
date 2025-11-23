import React from "react";
import "../styles/statsdisplay.css";

function StatsDisplay({ totalCustomers, totalRevenue, monthName }) {
  // Format currency with peso sign
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-PH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // Format number with commas
  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  // Get current month if not provided
  const currentMonth =
    monthName || new Date().toLocaleString("default", { month: "long" });
  const currentYear = new Date().getFullYear();

  return (
    <div className="stats-container">
      <div className="stats-header">
        <h2 className="stats-title">Monthly Overview</h2>
        <p className="stats-period">
          {currentMonth} {currentYear}
        </p>
      </div>

      <div className="stats-grid">
        <div className="stat-card customers-card">
          <div className="stat-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Customers</p>
            <h3 className="stat-value">1472</h3>
            <p className="stat-description">Customers this month</p>
          </div>
        </div>

        <div className="stat-card revenue-card">
          <div className="stat-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="12" x2="12" y1="2" y2="22"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Revenue</p>
            <h3 className="stat-value">₱323,840</h3>
            <p className="stat-description">Revenue this month</p>
          </div>
        </div>
      </div>

      <div className="stats-summary">
        <div className="summary-item">
          <span className="summary-label">Average per Customer:</span>
          <span className="summary-value">₱220</span>
        </div>
      </div>
    </div>
  );
}

export default StatsDisplay;
