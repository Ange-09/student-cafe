import React, { useState } from "react";
import "../styles/customerhistory.css";

const CustomerHistory = () => {
  // Sample data for customer history
  const [customers] = useState([
    {
      id: 1,
      date: "2024-11-28",
      name: "Sarah Johnson",
      time: "09:30 AM",
      amount: 250.0,
      rating: 5,
      status: "Checked Out",
    },
    {
      id: 2,
      date: "2024-11-28",
      name: "Michael Chen",
      time: "10:15 AM",
      amount: 180.5,
      rating: 4,
      status: "Checked Out",
    },
    {
      id: 3,
      date: "2024-11-28",
      name: "Emma Rodriguez",
      time: "11:00 AM",
      amount: 320.75,
      rating: 5,
      status: "Checked In",
    },
    {
      id: 4,
      date: "2024-11-28",
      name: "David Kim",
      time: "02:30 PM",
      amount: 0.0,
      rating: null,
      status: "Reserved",
    },
    {
      id: 5,
      date: "2024-11-27",
      name: "Olivia Martinez",
      time: "08:45 AM",
      amount: 450.0,
      rating: 5,
      status: "Checked Out",
    },
    {
      id: 6,
      date: "2024-11-27",
      name: "James Wilson",
      time: "01:20 PM",
      amount: 295.25,
      rating: 4,
      status: "Checked Out",
    },
    {
      id: 7,
      date: "2024-11-27",
      name: "Sophia Lee",
      time: "03:00 PM",
      amount: 175.0,
      rating: 3,
      status: "Checked Out",
    },
    {
      id: 8,
      date: "2024-11-26",
      name: "Daniel Brown",
      time: "10:30 AM",
      amount: 380.5,
      rating: 5,
      status: "Checked Out",
    },
    {
      id: 9,
      date: "2024-11-26",
      name: "Ava Garcia",
      time: "12:15 PM",
      amount: 220.0,
      rating: 4,
      status: "Checked Out",
    },
    {
      id: 10,
      date: "2024-11-26",
      name: "Ethan Taylor",
      time: "04:45 PM",
      amount: 150.75,
      rating: 4,
      status: "Checked Out",
    },
  ]);

  const getStatusClass = (status) => {
    switch (status) {
      case "Reserved":
        return "ch-status-reserved";
      case "Checked In":
        return "ch-status-checked-in";
      case "Checked Out":
        return "ch-status-checked-out";
      default:
        return "";
    }
  };

  const renderStars = (rating) => {
    if (!rating) return <span className="ch-no-rating">—</span>;

    return (
      <div className="ch-stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= rating ? "ch-star ch-filled" : "ch-star"}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="ch-container">
      <div className="ch-header">
        <h1 className="ch-title">Customer History</h1>
        <p className="ch-subtitle">View all customer reservations and visits</p>
      </div>

      <div className="ch-table-wrapper">
        <table className="ch-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Customer Name</th>
              <th>Time</th>
              <th>Total Amount</th>
              <th>Rating</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td className="ch-id-cell">#{customer.id}</td>
                <td className="ch-date-cell">
                  {new Date(customer.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
                <td className="ch-name-cell">{customer.name}</td>
                <td className="ch-time-cell">{customer.time}</td>
                <td className="ch-amount-cell">
                  {customer.amount > 0 ? `₱${customer.amount.toFixed(2)}` : "—"}
                </td>
                <td className="ch-rating-cell">
                  {renderStars(customer.rating)}
                </td>
                <td className="ch-status-cell">
                  <span
                    className={`ch-status-badge ${getStatusClass(
                      customer.status
                    )}`}
                  >
                    {customer.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="ch-footer">
        <p className="ch-footer-text">Total Records: {customers.length}</p>
      </div>
    </div>
  );
};

export default CustomerHistory;
