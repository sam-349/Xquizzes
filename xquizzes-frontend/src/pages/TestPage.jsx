// src/pages/TestPage.jsx
import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import questionsData from "../data/questions";
import "./TestPage.css";

export default function TestPage() {
  const { subject } = useParams();
  const navigate = useNavigate();

  const questions = questionsData[subject] || [];
  const total = questions.length;

  const DEFAULT_TIME = total * 60;

  const [timeLeft, setTimeLeft] = useState(DEFAULT_TIME);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(Array(total).fill(null));
  const [flagged, setFlagged] = useState(Array(total).fill(false));

  const [submitted, setSubmitted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const timerRef = useRef(null);

  // Start timer
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (timeLeft <= 0 && !submitted) handleSubmit();
  }, [timeLeft]);

  const handleSelect = (oi) => {
    const copy = [...selected];
    copy[currentQ] = oi;
    setSelected(copy);
  };

  const toggleFlag = () => {
    const copy = [...flagged];
    copy[currentQ] = !copy[currentQ];
    setFlagged(copy);
  };

  const handleSubmit = () => {
    clearInterval(timerRef.current);
    setSubmitted(true);
    setShowPopup(true);

    // Save the report
    const score = selected.reduce((acc, ans, i) => {
      return ans === questions[i].answer ? acc + 1 : acc;
    }, 0);

    const wrong = total - score;

    const reportData = {
      subject,
      total,
      selected,
      flagged,
      score,
      wrong,
      percentage: ((score / total) * 100).toFixed(2),
      questions,
    };

    localStorage.setItem("testReport", JSON.stringify(reportData));
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = Math.floor(secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="test-wrapper">

      <div className="top-header">
        <h2>{subject.toUpperCase()} Test</h2>
        <div className="timer-box">{formatTime(timeLeft)}</div>
      </div>

      <div className="test-container">

        <div className="test-left">
          {!submitted ? (
            <div className="question-card">
              <h3>
                Q{currentQ + 1}. {questions[currentQ].question}
              </h3>

              <div className="options-list">
                {questions[currentQ].options.map((opt, oi) => (
                  <label
                    key={oi}
                    className={`option-item ${selected[currentQ] === oi ? "selected-option" : ""}`}
                  >
                    <input
                      type="radio"
                      checked={selected[currentQ] === oi}
                      onChange={() => handleSelect(oi)}
                    />
                    {opt}
                  </label>
                ))}
              </div>

              <button className="flag-btn" onClick={toggleFlag}>
                {flagged[currentQ] ? "Unflag Question" : "Flag Question"}
              </button>
            </div>
          ) : (
            <h2 className="submitted-text">Test Submitted Successfully!</h2>
          )}
        </div>

        {/* Right Navigation Panel */}
        <div className="question-nav">
          <h3>Questions</h3>

          <div className="q-grid">
            {questions.map((_, idx) => (
              <button
                key={idx}
                className={`q-number 
                  ${idx === currentQ ? "current" : ""} 
                  ${selected[idx] !== null ? "answered" : ""} 
                  ${flagged[idx] ? "flagged" : ""}`}
                onClick={() => setCurrentQ(idx)}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {!submitted && (
        <div className="bottom-nav">
          <button
            disabled={currentQ === 0}
            onClick={() => setCurrentQ((prev) => prev - 1)}
          >
            Previous
          </button>

          <button
            className={currentQ === total - 1 ? "submit-btn" : ""}
            onClick={() =>
              currentQ === total - 1 ? handleSubmit() : setCurrentQ((prev) => prev + 1)
            }
          >
            {currentQ === total - 1 ? "Submit Test" : "Next"}
          </button>
        </div>
      )}

      {/* POPUP */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h2>🎉 Test Submitted!</h2>
            <p>Your test is successfully completed.</p>
           <button onClick={() => navigate(`/report/${subject}`)} className="view-report-btn">
              View Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
   