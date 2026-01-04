import React, { useState } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

function DashboardNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="nav-container">

        <div className="nav-logo">
          X<span>Quizzes</span>
        </div>

        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="#tests">My Tests</a></li>
          <li><a href="#progress">Progress</a></li>

          <li>
            <button className="nav-btn" onClick={logout}>
              Logout
            </button>
          </li>
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

export default DashboardNavbar;
