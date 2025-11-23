import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "../styles/crs.css";

function CustomerReviewSummary({ currentRating = 4.5 }) {
  // Generate rating data over 12 months
  const ratingData = [
    { month: "Jan", rating: 4.2 },
    { month: "Feb", rating: 4.3 },
    { month: "Mar", rating: 4.1 },
    { month: "Apr", rating: 4.4 },
    { month: "May", rating: 4.3 },
    { month: "Jun", rating: 4.5 },
    { month: "Jul", rating: 4.6 },
    { month: "Aug", rating: 4.5 },
    { month: "Sep", rating: 4.4 },
    { month: "Oct", rating: 4.6 },
    { month: "Nov", rating: 4.5 },
    { month: "Dec", rating: 4.5 },
  ];

  // Render stars for rating display
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <svg
            key={i}
            className="star filled"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
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
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <defs>
              <linearGradient id="half-rating">
                <stop offset="50%" stopColor="#ffc107" />
                <stop offset="50%" stopColor="#e0e0e0" />
              </linearGradient>
            </defs>
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              fill="url(#half-rating)"
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
            width="32"
            height="32"
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

  // Calculate average rating
  const averageRating = (
    ratingData.reduce((sum, data) => sum + data.rating, 0) / ratingData.length
  ).toFixed(1);

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{payload[0].payload.month}</p>
          <p className="tooltip-value">
            <span className="tooltip-star">★</span>{" "}
            {payload[0].value.toFixed(1)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="crs-container">
      <h2 className="crs-title">Customer Reviews Summary</h2>

      <div className="crs-content">
        {/* Current Rating Display */}
        <div className="crs-rating-display">
          <div className="crs-rating-score">
            <span className="crs-score-number">{currentRating.toFixed(1)}</span>
            <span className="crs-score-label">out of 5</span>
          </div>
          <div className="crs-stars">{renderStars(currentRating)}</div>
        </div>

        {/* Rating Trend Chart */}
        <div className="crs-chart-section">
          <h3 className="crs-chart-title">Rating Trends Over Time</h3>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={ratingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5d5c0" />
              <XAxis
                dataKey="month"
                stroke="#8b7355"
                tick={{ fontSize: 12, fill: "#5d4e37" }}
              />
              <YAxis
                domain={[1, 5]}
                ticks={[1, 2, 3, 4, 5]}
                stroke="#8b7355"
                tick={{ fontSize: 12, fill: "#5d4e37" }}
                label={{
                  value: "Rating",
                  angle: -90,
                  position: "insideLeft",
                  style: { fill: "#5d4e37", fontSize: 12 },
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="rating"
                stroke="#8b7355"
                strokeWidth={3}
                dot={{ fill: "#8b7355", r: 4 }}
                activeDot={{ r: 6, fill: "#6b5644" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default CustomerReviewSummary;
