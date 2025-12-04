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

  // seconds for test (example: 10 minutes = 600s). You can adjust per subject.
  const DEFAULT_TIME = 10 * 60; // 10 minutes
  const [timeLeft, setTimeLeft] = useState(DEFAULT_TIME);
  const timerRef = useRef(null);

  const [selected, setSelected] = useState(() => Array(total).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    // reset when subject or questions change
    setSelected(Array(total).fill(null));
    setSubmitted(false);
    setScore(0);
    setCorrectCount(0);
    setTimeLeft(DEFAULT_TIME);

    // start timer
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((s) => s - 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [subject, total]);

  // auto-submit when timeLeft reaches 0
  useEffect(() => {
    if (timeLeft <= 0 && !submitted) {
      handleSubmit(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  const handleSelect = (qIndex, optionIndex) => {
    if (submitted) return;
    setSelected((prev) => {
      const copy = [...prev];
      copy[qIndex] = optionIndex;
      return copy;
    });
  };

  const calculateScore = () => {
    let sc = 0;
    let correct = 0;
    questions.forEach((q, idx) => {
      if (selected[idx] === q.answer) {
        sc += 1;
        correct += 1;
      }
    });
    setScore(sc);
    setCorrectCount(correct);
  };

  const handleSubmit = (isAuto = false) => {
    if (submitted) return;
    if (timerRef.current) clearInterval(timerRef.current);
    calculateScore();
    setSubmitted(true);
    if (isAuto) {
      // optional: show a subtle message
      // alert("Time's up. Your test has been submitted.");
    }
  };

  const handleRetry = () => {
    setSelected(Array(total).fill(null));
    setSubmitted(false);
    setScore(0);
    setCorrectCount(0);
    setTimeLeft(DEFAULT_TIME);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((s) => s - 1);
    }, 1000);
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = Math.floor(secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="testpage-root">
      <div className="testpage-header">
        <div className="subject-title">
          <h2>{subject.toUpperCase()} Test</h2>
          <div className="meta">
            <span>Total: {total}</span>
            <span>Time Left: <strong>{formatTime(Math.max(0, timeLeft))}</strong></span>
          </div>
        </div>

        <div className="test-actions">
          {!submitted ? (
            <>
              <button className="btn btn-submit" onClick={() => handleSubmit(false)}>Submit</button>
              <button className="btn btn-back" onClick={handleBack}>Back</button>
            </>
          ) : (
            <>
              <div className="result-summary">Score: {score} / {total}</div>
              <button className="btn btn-retry" onClick={handleRetry}>Retry</button>
              <button className="btn btn-back" onClick={handleBack}>Back to Dashboard</button>
            </>
          )}
        </div>
      </div>

      <div className="questions-wrap">
        {questions.length === 0 && (
          <div className="no-questions">No questions available for this subject.</div>
        )}

        {questions.map((q, qi) => (
          <div key={qi} className={`question-card ${submitted ? "submitted" : ""}`}>
            <div className="q-top">
              <div className="q-index">Q{qi + 1}.</div>
              <div className="q-text">{q.question}</div>
            </div>

            <div className="options">
              {q.options.map((opt, oi) => {
                const checked = selected[qi] === oi;
                return (
                  <label
                    key={oi}
                    className={`option ${checked ? "checked" : ""} ${submitted ? (q.answer === oi ? "correct" : (checked ? "wrong" : "")) : ""}`}
                  >
                    <input
                      type="radio"
                      name={`q-${qi}`}
                      value={oi}
                      checked={checked || false}
                      onChange={() => handleSelect(qi, oi)}
                      disabled={submitted}
                    />
                    <span className="option-text">{opt}</span>
                  </label>
                );
              })}
            </div>

            {submitted && (
              <div className="answer-row">
                <span>Correct answer: <strong>{q.options[q.answer]}</strong></span>
                {selected[qi] == null ? <span className="missed"> — Not answered</span> : null}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
