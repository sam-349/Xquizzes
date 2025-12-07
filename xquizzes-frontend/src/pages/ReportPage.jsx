// src/pages/ReportPage.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ReportPage.css";

export default function ReportPage() {
  const { subject } = useParams();
  const navigate = useNavigate();

  const report = JSON.parse(localStorage.getItem("testReport"));

  if (!report) {
    return (
      <div className="report-error">
        <h2>No report found!</h2>
        <button onClick={() => navigate("/dashboard")}>Go to Dashboard</button>
      </div>
    );
  }

  const { total, score, wrong, percentage, questions, selected } = report;

  // Weak Areas = Questions answered wrong
  const weakAreas = questions
    .map((q, i) => (selected[i] !== q.answer ? q.question : null))
    .filter(Boolean);

  return (
    <div className="report-container">
      
      {/* Header */}
      <div className="report-header">
        <h1>{subject.toUpperCase()} — Test Report</h1>
        <p className="percentage">{percentage}%</p>
      </div>

      {/* Summary Cards */}
      <div className="summary-grid">
        <div className="summary-card">
          <h3>Total Questions</h3>
          <p>{total}</p>
        </div>

        <div className="summary-card correct">
          <h3>Correct</h3>
          <p>{score}</p>
        </div>

        <div className="summary-card wrong">
          <h3>Wrong</h3>
          <p>{wrong}</p>
        </div>

        <div className="summary-card percentage-card">
          <h3>Percentage</h3>
          <p>{percentage}%</p>
        </div>
      </div>

      {/* Weak Areas */}
      <div className="weak-section">
        <h2>Areas to Improve</h2>

        {weakAreas.length === 0 ? (
          <p className="perfect">🔥 Excellent! No weak areas.</p>
        ) : (
          <ul>
            {weakAreas.map((w, i) => (
              <li key={i}>❌ {w}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Review Section */}
      <div className="review-section">
        <h2>Test Review</h2>

        {questions.map((q, i) => (
          <div key={i} className="review-card">
            <h3>
              Q{i + 1}. {q.question}
            </h3>

            <p>
              <strong>Your Answer:</strong>{" "}
              <span
                className={
                  selected[i] === q.answer ? "correct-text" : "wrong-text"
                }
              >
                {selected[i] !== null
                  ? q.options[selected[i]]
                  : "Not Answered"}
              </span>
            </p>

            <p>
              <strong>Correct Answer:</strong>{" "}
              <span className="correct-text">{q.options[q.answer]}</span>
            </p>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="report-buttons">
        <button onClick={() => navigate("/dashboard")} className="back-btn">
          Back to Dashboard
        </button>
        <button
          onClick={() => navigate(`/test/${subject}`)}
          className="retry-btn"
        >
          Retry Test
        </button>
      </div>
    </div>
  );
}
