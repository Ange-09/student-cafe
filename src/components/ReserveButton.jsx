import React, { useState } from "react";
import { X } from "lucide-react";
import "../styles/reservebutton.css";

const MENU_ITEMS = [
  { id: 1, name: "Espresso", price: 70 },
  { id: 2, name: "Cappucino", price: 160 },
  { id: 3, name: "Cafe Latte", price: 140 },
  { id: 4, name: "Iced Americano", price: 130 },
  { id: 5, name: "Iced Caramel Macchiato", price: 200 },
];

const PAYMENT_METHODS = ["Gcash", "QR PH", "Debit Card", "Credit Card"];
const HOURLY_RATE = 100;

export default function ReserveButton() {
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(0);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [seats, setSeats] = useState(1);
  const [time, setTime] = useState("");
  const [hours, setHours] = useState(1);
  const [menuItems, setMenuItems] = useState(
    MENU_ITEMS.reduce((acc, item) => ({ ...acc, [item.id]: 0 }), {})
  );
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [receiptNumber, setReceiptNumber] = useState("");

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute of [0, 30]) {
        const h = hour.toString().padStart(2, "0");
        const m = minute.toString().padStart(2, "0");
        const timeValue = `${h}:${m}`;

        const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
        const period = hour < 12 ? "AM" : "PM";
        const displayTime = `${displayHour}:${m} ${period}`;

        slots.push({ value: timeValue, display: displayTime });
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const getDisplayTime = (timeValue) => {
    const slot = timeSlots.find((s) => s.value === timeValue);
    return slot ? slot.display : timeValue;
  };

  const handleReserveClick = () => {
    setShowModal(true);
    setStep(0);
  };

  const handleNext = () => {
    if (step === 1 && (!seats || !time)) {
      alert("Please fill in all fields");
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleTermsAccept = () => {
    if (!termsAccepted) {
      alert("Please accept the terms and conditions to continue");
      return;
    }
    setStep(1);
  };

  const updateMenuQuantity = (itemId, quantity) => {
    setMenuItems({ ...menuItems, [itemId]: Math.max(0, quantity) });
  };

  const calculateMenuSubtotal = () => {
    return MENU_ITEMS.reduce((total, item) => {
      return total + item.price * menuItems[item.id];
    }, 0);
  };

  const calculateHoursSubtotal = () => {
    return hours * HOURLY_RATE;
  };

  const calculateTotal = () => {
    return calculateHoursSubtotal() + calculateMenuSubtotal();
  };

  const handlePayment = () => {
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }
    setStep(5);
  };

  const generateReceiptNumber = () => {
    return (
      "RCP" +
      Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, "0")
    );
  };

  const handleFinish = () => {
    const newReceiptNumber = generateReceiptNumber();
    setReceiptNumber(newReceiptNumber);
    setShowModal(false);
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
      setStep(0);
      setTermsAccepted(false);
      setSeats(1);
      setTime("");
      setHours(1);
      setMenuItems(
        MENU_ITEMS.reduce((acc, item) => ({ ...acc, [item.id]: 0 }), {})
      );
      setPaymentMethod("");
    }, 5000);
  };

  const closeModal = () => {
    setShowModal(false);
    setStep(0);
    setTermsAccepted(false);
    setSeats(1);
    setTime("");
    setHours(1);
    setMenuItems(
      MENU_ITEMS.reduce((acc, item) => ({ ...acc, [item.id]: 0 }), {})
    );
    setPaymentMethod("");
  };

  return (
    <div className="reserve-container">
      <button onClick={handleReserveClick} className="reserve-btn">
        Reserve Now
      </button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Reservation</h2>
              <button onClick={closeModal} className="close-btn">
                <X size={24} />
              </button>
            </div>

            <div className="modal-body">
              {/* Step 0: Terms & Conditions */}
              {step === 0 && (
                <div className="form-section">
                  <h3 className="section-title">Terms & Conditions</h3>
                  <div className="terms-content">
                    <h4>Study Café Reservation Agreement</h4>
                    <p>
                      By reserving a seat at our study café, you agree to the
                      following terms and conditions:
                    </p>
                    <ul>
                      <li>
                        <strong>Reservation Validity:</strong> Reservations are
                        valid for the selected date and time. Please arrive
                        within 20 minutes of your reservation time.
                      </li>
                      <li>
                        <strong>Cancellation:</strong> Cancellations must be
                        made at least 2 hours before your reservation time for a
                        full refund.
                      </li>
                      <li>
                        <strong>Conduct:</strong> Guests must maintain a quiet
                        environment and respect other patrons. Disruptive
                        behavior may result in removal without refund.
                      </li>
                      <li>
                        <strong>Food & Beverages:</strong> All food and
                        beverages must be purchased from our café. Outside food
                        and drinks are not permitted.
                      </li>
                      <li>
                        <strong>Payment:</strong> Payment must be completed at
                        the time of reservation. No refunds will be issued for
                        unused hours.
                      </li>
                      <li>
                        <strong>Liability:</strong> We are not responsible for
                        lost, stolen, or damaged personal belongings. Please
                        keep your valuables secure.
                      </li>
                      <li>
                        <strong>Right to Refuse Service:</strong> Management
                        reserves the right to refuse service to anyone violating
                        these terms.
                      </li>
                    </ul>
                  </div>
                  <div className="terms-checkbox">
                    <input
                      type="checkbox"
                      id="terms-check"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="checkbox-input"
                    />
                    <label htmlFor="terms-check" className="checkbox-label">
                      I have read and agree to the Terms & Conditions
                    </label>
                  </div>
                  <button
                    onClick={handleTermsAccept}
                    className={`btn ${
                      termsAccepted ? "btn-primary" : "btn-disabled"
                    }`}
                    disabled={!termsAccepted}
                  >
                    Accept & Continue
                  </button>
                </div>
              )}

              {/* Step 1: Seats and Time */}
              {step === 1 && (
                <div className="form-section">
                  <h3 className="section-title">Select Seats and Time</h3>
                  <div className="form-group">
                    <label className="form-label">Number of Seats</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={seats}
                      onChange={(e) => setSeats(parseInt(e.target.value) || 1)}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Reservation Time</label>
                    <select
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
                </div>
              )}

              {/* Step 2: Hours Selection */}
              {step === 2 && (
                <div className="form-section">
                  <h3 className="section-title">Select Reservation Hours</h3>
                  <p className="hourly-rate">Price per hour: ₱{HOURLY_RATE}</p>
                  <div className="form-group">
                    <label className="form-label">Number of Hours</label>
                    <input
                      type="number"
                      min="1"
                      max="24"
                      value={hours}
                      onChange={(e) => setHours(parseInt(e.target.value) || 1)}
                      className="form-input"
                    />
                  </div>
                  <div className="subtotal-box">
                    <p className="subtotal-text">
                      Subtotal: ₱{calculateHoursSubtotal()}
                    </p>
                  </div>
                </div>
              )}

              {/* Step 3: Menu Selection */}
              {step === 3 && (
                <div className="form-section">
                  <h3 className="section-title">Select Menu Items</h3>
                  <div className="menu-items-list">
                    {MENU_ITEMS.map((item) => (
                      <div key={item.id} className="menu-item">
                        <div className="menu-item-info">
                          <p className="menu-item-name">{item.name}</p>
                          <p className="menu-item-price">₱{item.price}</p>
                        </div>
                        <div className="quantity-controls">
                          <button
                            onClick={() =>
                              updateMenuQuantity(
                                item.id,
                                menuItems[item.id] - 1
                              )
                            }
                            className="qty-btn"
                          >
                            −
                          </button>
                          <span className="qty-display">
                            {menuItems[item.id]}
                          </span>
                          <button
                            onClick={() =>
                              updateMenuQuantity(
                                item.id,
                                menuItems[item.id] + 1
                              )
                            }
                            className="qty-btn"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="subtotal-box">
                    <p className="subtotal-text">
                      Subtotal: ₱{calculateMenuSubtotal()}
                    </p>
                  </div>
                </div>
              )}

              {/* Step 4: Summary and Payment Method */}
              {step === 4 && (
                <div className="form-section">
                  <h3 className="section-title">Summary</h3>

                  <div className="summary-box">
                    <h4 className="summary-title">Reservation Details</h4>
                    <p className="summary-text">
                      <strong>Seats:</strong> {seats}
                    </p>
                    <p className="summary-text">
                      <strong>Time:</strong> {getDisplayTime(time)}
                    </p>
                    <p className="summary-text">
                      <strong>Hours:</strong> {hours}
                    </p>
                    <p className="summary-subtotal">
                      Hours Subtotal: ₱{calculateHoursSubtotal()}
                    </p>
                  </div>

                  {calculateMenuSubtotal() > 0 && (
                    <div className="summary-box">
                      <h4 className="summary-title">Menu Items</h4>
                      {MENU_ITEMS.map((item) => {
                        if (menuItems[item.id] > 0) {
                          return (
                            <p key={item.id} className="summary-text">
                              {item.name} x{menuItems[item.id]}: ₱
                              {item.price * menuItems[item.id]}
                            </p>
                          );
                        }
                        return null;
                      })}
                      <p className="summary-subtotal">
                        Menu Subtotal: ₱{calculateMenuSubtotal()}
                      </p>
                    </div>
                  )}

                  <div className="total-section">
                    <p className="total-text">Total: ₱{calculateTotal()}</p>
                  </div>

                  <div className="payment-section">
                    <label className="payment-label">
                      Select Payment Method
                    </label>
                    <div className="payment-methods-grid">
                      {PAYMENT_METHODS.map((method) => (
                        <button
                          key={method}
                          onClick={() => setPaymentMethod(method)}
                          className={`payment-method-btn ${
                            paymentMethod === method ? "active" : ""
                          }`}
                        >
                          {method}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: QR Code and Summary */}
              {step === 5 && (
                <div className="form-section text-center">
                  <h3 className="section-title">Payment QR Code</h3>
                  <p className="qr-info">Scan to complete payment</p>

                  <div className="qr-code-container">
                    <svg viewBox="0 0 200 200" className="qr-code">
                      <rect x="0" y="0" width="200" height="200" fill="white" />
                      <rect x="20" y="20" width="50" height="50" fill="black" />
                      <rect x="30" y="30" width="30" height="30" fill="white" />
                      <rect
                        x="130"
                        y="20"
                        width="50"
                        height="50"
                        fill="black"
                      />
                      <rect
                        x="140"
                        y="30"
                        width="30"
                        height="30"
                        fill="white"
                      />
                      <rect
                        x="20"
                        y="130"
                        width="50"
                        height="50"
                        fill="black"
                      />
                      <rect
                        x="30"
                        y="140"
                        width="30"
                        height="30"
                        fill="white"
                      />
                      <rect x="80" y="80" width="40" height="40" fill="black" />
                      <rect x="90" y="30" width="20" height="20" fill="black" />
                      <rect
                        x="90"
                        y="150"
                        width="20"
                        height="20"
                        fill="black"
                      />
                      <rect
                        x="130"
                        y="90"
                        width="20"
                        height="20"
                        fill="black"
                      />
                      <rect
                        x="150"
                        y="130"
                        width="30"
                        height="30"
                        fill="black"
                      />
                    </svg>
                  </div>

                  <div className="summary-box">
                    <h4 className="summary-title">Reservation Summary</h4>
                    <p className="summary-text">
                      <strong>Seats:</strong> {seats}
                    </p>
                    <p className="summary-text">
                      <strong>Time:</strong> {getDisplayTime(time)}
                    </p>
                    <p className="summary-text">
                      <strong>Hours:</strong> {hours}
                    </p>
                    <p className="summary-text">
                      <strong>Payment Method:</strong> {paymentMethod}
                    </p>
                    <p className="summary-total">
                      Total Amount: ₱{calculateTotal()}
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="button-group">
                {step > 1 && (
                  <button onClick={handleBack} className="btn btn-secondary">
                    Back
                  </button>
                )}
                {step >= 1 && step < 4 && (
                  <button onClick={handleNext} className="btn btn-primary">
                    Next
                  </button>
                )}
                {step === 4 && (
                  <button onClick={handlePayment} className="btn btn-primary">
                    Proceed to Payment
                  </button>
                )}
                {step === 5 && (
                  <button onClick={handleFinish} className="btn btn-success">
                    Finish
                  </button>
                )}
              </div>
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
                className="checkmark-icon"
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

            {/* Payment Receipt */}
            <div className="payment-receipt">
              <h3 className="receipt-title">Payment Receipt</h3>
              <div className="receipt-number">
                <p>
                  <strong>Receipt #:</strong> {receiptNumber}
                </p>
              </div>

              <div className="receipt-section">
                <h4>Reservation Details</h4>
                <div className="receipt-item">
                  <span>Seats</span>
                  <span>{seats}</span>
                </div>
                <div className="receipt-item">
                  <span>Time</span>
                  <span>{getDisplayTime(time)}</span>
                </div>
                <div className="receipt-item">
                  <span>Hours Reserved</span>
                  <span>{hours} hrs</span>
                </div>
                <div className="receipt-item receipt-item-total">
                  <span>Reservation Fee</span>
                  <span>₱{calculateHoursSubtotal()}</span>
                </div>
              </div>

              {calculateMenuSubtotal() > 0 && (
                <div className="receipt-section">
                  <h4>Menu Items</h4>
                  {MENU_ITEMS.map((item) => {
                    if (menuItems[item.id] > 0) {
                      return (
                        <div key={item.id} className="receipt-item">
                          <span>
                            {item.name} x{menuItems[item.id]}
                          </span>
                          <span>₱{item.price * menuItems[item.id]}</span>
                        </div>
                      );
                    }
                    return null;
                  })}
                  <div className="receipt-item receipt-item-total">
                    <span>Menu Subtotal</span>
                    <span>₱{calculateMenuSubtotal()}</span>
                  </div>
                </div>
              )}

              <div className="receipt-section receipt-total-section">
                <div className="receipt-item receipt-item-grand-total">
                  <span>Total Amount</span>
                  <span>₱{calculateTotal()}</span>
                </div>
                <div className="receipt-item">
                  <span>Payment Method</span>
                  <span>{paymentMethod}</span>
                </div>
              </div>

              <div className="receipt-footer">
                <p>Thank you for your reservation!</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
