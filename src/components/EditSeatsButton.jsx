// EditSeatsButton.jsx
import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Edit3, Plus, Minus, Check, X, Upload, Camera } from "lucide-react";
import "../styles/editseatsbutton.css";

const EditSeatsButton = () => {
  const { cafes, updateSeats } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1); // 1: edit, 2: confirm, 3: picture, 4: success
  const [newSeats, setNewSeats] = useState(0);
  const [evidenceImage, setEvidenceImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Get the cafe with id 1
  const targetCafe = cafes.find((cafe) => cafe.id === 1);

  const getCurrentDateTime = () => {
    const now = new Date();
    const date = now.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const time = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return { date, time };
  };

  const handleOpen = () => {
    if (targetCafe) {
      setNewSeats(targetCafe.availableSeats);
    }
    setIsOpen(true);
    setStep(1);
  };

  const handleClose = () => {
    setIsOpen(false);
    setStep(1);
    setNewSeats(0);
    setEvidenceImage(null);
    setImagePreview(null);
  };

  const handleIncrement = () => {
    setNewSeats((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setNewSeats((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setStep(2);
  };

  const handleConfirm = () => {
    setStep(3);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEvidenceImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setEvidenceImage(null);
    setImagePreview(null);
  };

  const handleSubmit = () => {
    if (targetCafe && evidenceImage) {
      updateSeats(1, newSeats);
      // Here you could also save the evidence image if needed
      setStep(4);
    }
  };

  const handleBack = () => {
    if (step === 3) {
      setStep(2);
    } else {
      setStep(1);
    }
  };

  const handleSuccess = () => {
    handleClose();
  };

  const { date, time } = getCurrentDateTime();

  if (!targetCafe) {
    return null; // Don't render if cafe with id 1 doesn't exist
  }

  if (!isOpen) {
    return (
      <button
        onClick={handleOpen}
        className="edit-seats-button"
        title="Edit Available Seats"
      >
        <Edit3 size={24} />
      </button>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div className="modal-backdrop" onClick={handleClose} />

      {/* Modal */}
      <div className="modal-container">
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          {/* Step 1: Edit */}
          {step === 1 && (
            <div className="modal-body">
              <div className="modal-header">
                <h2 className="modal-title">Edit Available Seats</h2>
                <button onClick={handleClose} className="close-button">
                  <X size={24} />
                </button>
              </div>

              {/* Cafe Name */}
              <div className="cafe-name-display">
                <div className="label">Cafe</div>
                <div className="cafe-name">{targetCafe.name}</div>
              </div>

              {/* Date and Time */}
              <div className="datetime-display">
                <div className="date">{date}</div>
                <div className="time">{time}</div>
              </div>

              {/* Current Seats */}
              <div className="seats-section">
                <div className="label">Current Available Seats</div>
                <div className="seats-display current">
                  {targetCafe.availableSeats}
                </div>
              </div>

              {/* New Seats Counter */}
              <div className="seats-section">
                <div className="label">New Available Seats</div>
                <div className="seats-counter">
                  <button
                    onClick={handleDecrement}
                    className="counter-button decrement"
                  >
                    <Minus size={24} />
                  </button>
                  <div className="seats-display new">{newSeats}</div>
                  <button
                    onClick={handleIncrement}
                    className="counter-button increment"
                  >
                    <Plus size={24} />
                  </button>
                </div>
              </div>

              {/* Next Button */}
              <button onClick={handleNext} className="primary-button">
                Next
              </button>
            </div>
          )}

          {/* Step 2: Confirmation */}
          {step === 2 && (
            <div className="modal-body">
              <div className="modal-header">
                <h2 className="modal-title">Confirm Changes</h2>
                <button onClick={handleClose} className="close-button">
                  <X size={24} />
                </button>
              </div>

              <div className="confirmation-box">
                <div className="label">Cafe</div>
                <div className="cafe-name-confirm">{targetCafe.name}</div>

                <div className="seats-comparison">
                  <div className="seats-column">
                    <div className="label">Current Seats</div>
                    <div className="seats-value old">
                      {targetCafe.availableSeats}
                    </div>
                  </div>
                  <div className="arrow">→</div>
                  <div className="seats-column">
                    <div className="label">New Seats</div>
                    <div className="seats-value new">{newSeats}</div>
                  </div>
                </div>

                <div className="datetime-small">
                  {date} • {time}
                </div>
              </div>

              <div className="button-group">
                <button onClick={handleBack} className="secondary-button">
                  Back
                </button>
                <button onClick={handleConfirm} className="confirm-button">
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Add Picture */}
          {step === 3 && (
            <div className="modal-body">
              <div className="modal-header">
                <h2 className="modal-title">Add Evidence Photo</h2>
                <button onClick={handleClose} className="close-button">
                  <X size={24} />
                </button>
              </div>

              <p className="evidence-instruction">
                Please upload a photo as evidence of the seat availability
                changes.
              </p>

              <div className="upload-section">
                {!imagePreview ? (
                  <label htmlFor="file-upload" className="upload-area">
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="file-input"
                    />
                    <div className="upload-icon">
                      <Camera size={48} />
                    </div>
                    <div className="upload-text">
                      <span className="upload-title">
                        Click to upload photo
                      </span>
                      <span className="upload-subtitle">or drag and drop</span>
                    </div>
                    <div className="upload-formats">
                      PNG, JPG, JPEG up to 10MB
                    </div>
                  </label>
                ) : (
                  <div className="image-preview-container">
                    <img
                      src={imagePreview}
                      alt="Evidence"
                      className="image-preview"
                    />
                    <button
                      onClick={handleRemoveImage}
                      className="remove-image-button"
                    >
                      <X size={20} />
                    </button>
                  </div>
                )}
              </div>

              <div className="button-group">
                <button onClick={handleBack} className="secondary-button">
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  className="confirm-button"
                  disabled={!evidenceImage}
                >
                  Submit
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <div className="modal-body success-body">
              <div className="success-icon">
                <Check size={48} />
              </div>
              <h2 className="modal-title">Success!</h2>
              <p className="success-message">
                Available seats for{" "}
                <span className="highlight">{targetCafe.name}</span> have been
                updated to <span className="highlight-seats">{newSeats}</span>.
              </p>
              <p className="success-message-sub">
                Evidence photo has been uploaded successfully.
              </p>

              <button onClick={handleSuccess} className="primary-button">
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EditSeatsButton;
