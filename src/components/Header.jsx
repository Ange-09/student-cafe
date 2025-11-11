import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Home, CircleUser } from "lucide-react";
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

      {/* Nav Menu with Icons */}
      <nav className={`header-nav ${menuOpen ? "show" : ""}`}>
        <NavLink
          to="/Home"
          className="navlink"
          onClick={() => setMenuOpen(false)}
          title="Home"
        >
          <Home size={22} />
        </NavLink>

        <NavLink
          to="/OwnerPage"
          className="navlink"
          onClick={() => setMenuOpen(false)}
          title="OwnerPage"
        >
          <CircleUser size={22} />
        </NavLink>
      </nav>
    </div>
  );
}

export default Header;
