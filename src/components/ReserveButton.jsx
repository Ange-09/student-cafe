import React, { useState } from "react";
import { X } from "lucide-react";
import "../styles/reservebutton.css";

export default function ReserveButton() {
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [seats, setSeats] = useState(1);
  const [time, setTime] = useState("");

  // Generate time slots in 30-minute intervals
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute of [0, 30]) {
        const h = hour.toString().padStart(2, "0");
        const m = minute.toString().padStart(2, "0");
        const timeValue = `${h}:${m}`;

        // Format for display (12-hour format)
        const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
        const period = hour < 12 ? "AM" : "PM";
        const displayTime = `${displayHour}:${m} ${period}`;

        slots.push({ value: timeValue, display: displayTime });
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handleReserveClick = () => {
    setShowReservationModal(true);
  };

  const handleReservationSubmit = () => {
    if (seats > 0 && time) {
      setShowReservationModal(false);
      setShowQRModal(true);
    }
  };

  const handleQRNext = () => {
    setShowQRModal(false);
    setShowConfirmation(true);
    // Auto-hide confirmation after 3 seconds
    setTimeout(() => {
      setShowConfirmation(false);
      setSeats(1);
      setTime("");
    }, 3000);
  };

  const closeModals = () => {
    setShowReservationModal(false);
    setShowQRModal(false);
    setShowConfirmation(false);
  };

  const getDisplayTime = (timeValue) => {
    const slot = timeSlots.find((s) => s.value === timeValue);
    return slot ? slot.display : timeValue;
  };

  return (
    <div className="reserve-container">
      {/* Reserve Now Button */}
      <button onClick={handleReserveClick} className="reserve-btn">
        Reserve Now
      </button>

      {/* Reservation Form Modal */}
      {showReservationModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Make a Reservation</h2>
              <button onClick={closeModals} className="close-btn">
                <X size={24} />
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="seats" className="form-label">
                  Number of Seats
                </label>
                <input
                  type="number"
                  id="seats"
                  min="1"
                  max="10"
                  value={seats}
                  onChange={(e) => setSeats(parseInt(e.target.value) || 1)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="time" className="form-label">
                  Reservation Time
                </label>
                <select
                  id="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="form-input"
                >
                  <option value="">Select a time</option>
                  {timeSlots.map((slot) => (
                    <option key={slot.value} value={slot.value}>
                      {slot.display}
                    </option>
                  ))}
                </select>
              </div>

              <button onClick={handleReservationSubmit} className="submit-btn">
                Confirm Reservation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {showQRModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Your Reservation QR Code</h2>
              <button onClick={closeModals} className="close-btn">
                <X size={24} />
              </button>
            </div>

            <div className="modal-body text-center">
              <p className="qr-info">
                Scan this QR code at the café to confirm your reservation
              </p>

              <div className="qr-code">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <rect x="0" y="0" width="200" height="200" fill="white" />
                  {/* QR Code Pattern - Simplified representation */}
                  <rect x="20" y="20" width="50" height="50" fill="black" />
                  <rect x="30" y="30" width="30" height="30" fill="white" />
                  <rect x="130" y="20" width="50" height="50" fill="black" />
                  <rect x="140" y="30" width="30" height="30" fill="white" />
                  <rect x="20" y="130" width="50" height="50" fill="black" />
                  <rect x="30" y="140" width="30" height="30" fill="white" />
                  <rect x="80" y="80" width="40" height="40" fill="black" />
                  <rect x="90" y="30" width="20" height="20" fill="black" />
                  <rect x="90" y="150" width="20" height="20" fill="black" />
                  <rect x="130" y="90" width="20" height="20" fill="black" />
                  <rect x="150" y="130" width="30" height="30" fill="black" />
                </svg>
              </div>

              <div className="reservation-details">
                <p>
                  <strong>Seats:</strong> {seats}
                </p>
                <p>
                  <strong>Time:</strong> {getDisplayTime(time)}
                </p>
              </div>

              <button onClick={handleQRNext} className="next-btn-rsv">
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Message */}
      {showConfirmation && (
        <div className="modal-overlay">
          <div className="confirmation-modal">
            <div className="confirmation-icon">
              <svg
                className="w-16 h-16 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <h2 className="confirmation-title">Reservation Processed!</h2>
            <p className="confirmation-text">
              Your reservation has been successfully processed. You will receive
              a confirmation shortly.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
