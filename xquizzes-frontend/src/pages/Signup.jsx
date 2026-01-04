import React, { useState } from "react";
import "./Signup.css";
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.msg || 'Signup failed');
        return;
      }

      // Save token + user
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // SHOW POPUP AFTER SUCCESS
      alert("User registered successfully! Please login now.");

      // Redirect to login page
      navigate('/login');

    } catch (err) {
      console.error(err);
      alert('Server error');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h2>Create Account ✨</h2>
        <p className="auth-subtitle">Start your AI-powered learning journey</p>

        <form onSubmit={handleSubmit}>

          <label>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Create a password"
            onChange={handleChange}
            required
          />

          <button type="submit" className="auth-btn">Sign Up</button>
        </form>

        <p className="auth-footer">
          Already have an account? <a href="/login">Login</a>
        </p>

      </div>
    </div>
  );
}

export default Signup;
