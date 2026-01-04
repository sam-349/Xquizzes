import React, { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const sec = document.getElementById(id);
    sec?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false); // close mobile menu
  };

  return (
    <nav className="navbar">
      <div className="nav-container">

        {/* Logo */}
        <div className="nav-logo">
          X<span>Quizzes</span>
        </div>

        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li><a onClick={() => scrollToSection("hero-section")}>Home</a></li>
          <li><a onClick={() => scrollToSection("about-section")}>About</a></li>
          <li><a onClick={() => scrollToSection("how-section")}>Features</a></li>
          <li><a className="nav-btn" href="/login">Login</a></li>
        </ul>

        <div
          className={`nav-toggle ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
          
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
