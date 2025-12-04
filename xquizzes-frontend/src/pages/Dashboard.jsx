import React from "react";
import "./Dashboard.css";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.name || "User";

  return (
    <div className="dashboard-container">

      {/* Row 1 - Welcome */}
      <section className="dash-row welcome-row">
        <h2>Welcome, {username} 👋</h2>
        <p>Your journey to smart learning starts today! Track your tests, progress, and improvements here.</p>
      </section>

      {/* Row 2 - Progress + Stats */}
      <section className="dash-row stats-row">
        <div className="stat-card">
          <h3>Tests Attempted</h3>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "70%" }}></div>
          </div>
          <p>14 tests completed</p>
        </div>

        <div className="stat-card">
          <h3>Improved Areas</h3>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "50%" }}></div>
          </div>
          <p>Logical Reasoning & Quant</p>
        </div>

        <div className="stat-card">
          <h3>Areas of Interest</h3>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "80%" }}></div>
          </div>
          <p>Data Interpretation</p>
        </div>
      </section>

      {/* Row 3 - Test Cards */}
      <section className="dash-row cards-row">
        <div className="test-card">
          <h3>Aptitude Test</h3>
          <p>20 questions • 30 min</p>
          <button>Start</button>
        </div>

        <div className="test-card">
          <h3>Logical Reasoning</h3>
          <p>25 questions • 40 min</p>
          <button>Start</button>
        </div>

        <div className="test-card">
          <h3>Verbal Ability</h3>
          <p>30 questions • 35 min</p>
          <button>Start</button>
        </div>
      </section>

    </div>
  );
}

export default Dashboard;
