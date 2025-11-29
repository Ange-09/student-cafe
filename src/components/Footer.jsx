// Footer.jsx
import React from "react";
import {
  Coffee,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import "../styles/footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-section">
          <div className="footer-logo">
            <Coffee size={32} className="footer-logo-icon" />
            <h3 className="footer-logo-text">Study Spot</h3>
          </div>
          <p className="footer-description">
            Your ultimate guide to finding the perfect cafe for work, study, or
            relaxation. Discover cozy spaces with great coffee and ambiance.
          </p>
          <div className="footer-social">
            <a href="#" className="social-link" aria-label="Facebook">
              <Facebook size={20} />
            </a>
            <a href="#" className="social-link" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href="#" className="social-link" aria-label="Twitter">
              <Twitter size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li>
              <a href="/home">Home</a>
            </li>
            <li>
              <a href="/cafes">Browse Cafes</a>
            </li>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div className="footer-section">
          <h4 className="footer-heading">Categories</h4>
          <ul className="footer-links">
            <li>
              <a href="#study">Study Cafes</a>
            </li>
            <li>
              <a href="#coworking">Co-working Spaces</a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h4 className="footer-heading">Contact Us</h4>
          <ul className="footer-contact">
            <li>
              <MapPin size={18} />
              <span>Paranaque City, Metro Manila, PH</span>
            </li>
            <li>
              <Phone size={18} />
              <span>+63 912 345 6789</span>
            </li>
            <li>
              <Mail size={18} />
              <span>hello@studyspot.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p className="footer-copyright">
          © {currentYear} Study Spot. All rights reserved.
        </p>
        <div className="footer-legal">
          <a href="/privacy">Privacy Policy</a>
          <span className="footer-divider">|</span>
          <a href="/terms">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
