import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="header">
      <p className="header-title">
        <span className="header-left-text">SC</span>
        <span className="header-full-text">
          <span className="header-line"> | </span>Student Cafe
        </span>
      </p>

      {/* Hamburger Icon */}
      <div
        className={`menu ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Nav Menu */}
      <nav className={`header-nav ${menuOpen ? "show" : ""}`}>
        <NavLink to="/" className="navlink" onClick={() => setMenuOpen(false)}>
          Home
        </NavLink>
        <NavLink
          to="/Journey"
          className="navlink"
          onClick={() => setMenuOpen(false)}
        >
          Journey
        </NavLink>
        <NavLink
          to="/Projects"
          className="navlink"
          onClick={() => setMenuOpen(false)}
        >
          Projects
        </NavLink>
        <NavLink
          to="/Contact"
          className="navlink"
          onClick={() => setMenuOpen(false)}
        >
          Contact
        </NavLink>
      </nav>
    </div>
  );
}

export default Header;
