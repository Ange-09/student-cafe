import React, { useState } from "react";
import "../styles/commentshistory.css";

const CommentsHistory = () => {
  // Sample data for comments history
  const [comments] = useState([
    {
      id: 1,
      customerName: "Sarah Johnson",
      date: "2025-11-28",
      time: "09:45 AM",
      rating: 5,
      comment:
        "Absolutely love this place! Great atmosphere for studying and the coffee is amazing. Will definitely come back!",
    },
    {
      id: 2,
      customerName: "Michael Chen",
      date: "2025-11-28",
      time: "10:30 AM",
      rating: 4,
      comment:
        "Nice quiet spot for meetings. WiFi is fast and the seats are comfortable.",
    },
    {
      id: 3,
      customerName: "Emma Rodriguez",
      date: "2025-11-28",
      time: "11:15 AM",
      rating: 5,
      comment:
        "Perfect study lounge! Plenty of outlets and the staff is very friendly.",
    },
    {
      id: 4,
      customerName: "David Kim",
      date: "2025-11-27",
      time: "02:45 PM",
      rating: 3,
      comment: "Good location but can get a bit noisy during peak hours.",
    },
    {
      id: 5,
      customerName: "Olivia Martinez",
      date: "2025-11-27",
      time: "09:00 AM",
      rating: 5,
      comment:
        "Best cafe in the area! The ambiance is cozy and it's perfect for group study sessions.",
    },
    {
      id: 6,
      customerName: "James Wilson",
      date: "2025-11-27",
      time: "01:35 PM",
      rating: 4,
      comment:
        "Great place for remote work. Good selection of drinks and snacks.",
    },
    {
      id: 7,
      customerName: "Sophia Lee",
      date: "2025-11-26",
      time: "03:15 PM",
      rating: 4,
      comment:
        "Comfortable seating and good lighting. Would recommend for studying!",
    },
    {
      id: 8,
      customerName: "Daniel Brown",
      date: "2025-11-26",
      time: "10:45 AM",
      rating: 5,
      comment:
        "Excellent service and very clean. The conference room was perfect for our team meeting.",
    },
  ]);

  const renderStars = (rating) => {
    return (
      <div className="cmh-stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= rating ? "cmh-star cmh-filled" : "cmh-star"}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="cmh-container">
      <div className="cmh-header">
        <h2 className="cmh-title">Customer Comments</h2>
        <p className="cmh-subtitle">Recent feedback from customers</p>
      </div>

      <div className="cmh-comments-wrapper">
        {comments.map((comment) => (
          <div key={comment.id} className="cmh-comment-card">
            <div className="cmh-card-header">
              <div className="cmh-customer-info">
                <div className="cmh-avatar">
                  {comment.customerName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="cmh-customer-details">
                  <h3 className="cmh-customer-name">{comment.customerName}</h3>
                  <p className="cmh-date-time">
                    {formatDate(comment.date)} • {comment.time}
                  </p>
                </div>
              </div>
              {renderStars(comment.rating)}
            </div>
            <p className="cmh-comment-text">{comment.comment}</p>
          </div>
        ))}
      </div>

      <div className="cmh-footer">
        <p className="cmh-footer-text">Total Comments: {comments.length}</p>
      </div>
    </div>
  );
};

export default CommentsHistory;
