import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.name || "User";

  const handleStart = (subject) => {
    navigate(`/test/${subject}`);
  };

  const subjects = [
    { id: "cn", title: "Computer Networks", time: "30 mins", questions: "25" },
    { id: "os", title: "Operating Systems", time: "40 mins", questions: "30" },
    { id: "dbms", title: "DBMS", time: "35 mins", questions: "28" },
    { id: "algo", title: "Algorithms", time: "45 mins", questions: "35" },
    { id: "dm", title: "Discrete Mathematics", time: "30 mins", questions: "20" }
  ];

  return (
    <div className="dashboard-container">

      {/* 1️⃣ Row – Welcome section */}
      <section className="dash-row welcome-row">
        <h2>Welcome, {username} 👋</h2>
        <p>Your personalized analytics dashboard for tracking learning progress, strengths, and test performance.</p>
      </section>

      {/* 2️⃣ Row – Stats / Progress */}
      <section className="dash-row stats-row">

        <div className="stat-card">
          <h3>Tests Attempted</h3>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "70%" }}></div>
          </div>
          <p>14 Completed</p>
        </div>

        <div className="stat-card">
          <h3>Accuracy</h3>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "65%" }}></div>
          </div>
          <p>65% Overall Accuracy</p>
        </div>

        <div className="stat-card">
          <h3>Consistency</h3>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "80%" }}></div>
          </div>
          <p>Great Improvement</p>
        </div>

      </section>

      {/* 3️⃣ Row – Subjects / Test Cards */}
      <section className="dash-row subjects-row">
        <h2 className="sub-heading">Start Your GATE CSE Practice Tests</h2>

        <div className="subjects-grid">
          {subjects.map((s, index) => (
            <div key={index} className="subject-card">
              <h3>{s.title}</h3>
              <p>{s.questions} Questions • {s.time}</p>
              <button onClick={() => handleStart(s.id)}>Start Exam</button>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

export default Dashboard;
