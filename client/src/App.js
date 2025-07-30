import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// Track user clicks (Clickstream)
const trackClick = (action) => {
  axios.post('/api/track', { action, timestamp: new Date() });
};

// Login Page
const Login = ({ setLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    trackClick('login_attempt');
    try {
      const res = await axios.post('/api/login', { email, password });
      if (res.data.success) setLoggedIn(true);
    } catch (err) {
      alert("Login failed!");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
};

// Register Page
const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    trackClick('register_attempt');
    try {
      await axios.post('/api/register', { email, password });
      alert("Registration successful!");
    } catch (err) {
      alert("Registration failed!");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Register</button>
    </form>
  );
};

// Article Page (After Login)
const Article = () => {
  return (
    <div onClick={() => trackClick('article_click')}>
      <h1>Welcome to the Article</h1>
      <p>This is sample content. Your clicks are being tracked.</p>
    </div>
  );
};

// Main App
function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={loggedIn ? <Article /> : <Login setLoggedIn={setLoggedIn} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;