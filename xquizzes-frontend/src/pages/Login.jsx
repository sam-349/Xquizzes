import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({
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
      const res = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.msg || 'Login failed');
        return;
      }

      // Save token + user in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // ✅ Redirect to dashboard after successful login
      navigate('/dashboard');

    } catch (err) {
      console.error(err);
      alert('Server error');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h2>Welcome Back 👋</h2>
        <p className="auth-subtitle">Login to continue your learning journey</p>

        <form onSubmit={handleSubmit}>

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
            placeholder="Enter password"
            onChange={handleChange}
            required
          />

          <button type="submit" className="auth-btn">Login</button>

        </form>

        <p className="auth-footer">
          Don’t have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
