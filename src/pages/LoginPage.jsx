import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/loginpage.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (username === "example_username" && password === "example_password") {
      setError("");
      // Navigate to home page on successful login
      navigate("/Home");
    } else {
      setError("Invalid username or password");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">Student Lounge Finder</h1>
          <p className="login-subtitle">Sign in to continue</p>
        </div>

        <div className="login-form">
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your username"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your password"
              className="form-input"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button onClick={handleSubmit} className="login-button">
            Login
          </button>
        </div>

        <div className="demo-credentials">
          <p className="demo-title">Demo Credentials:</p>
          <p className="demo-text">
            Username: <span className="demo-value">example_username</span>
          </p>
          <p className="demo-text">
            Password: <span className="demo-value">example_password</span>
          </p>
        </div>
      </div>
    </div>
  );
}
