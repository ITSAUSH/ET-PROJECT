const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas (Free Tier)
mongoose.connect(process.env.MONGODB_URI);

// User Schema
const User = mongoose.model('User', {
  email: { type: String, unique: true },
  password: String,
});

// Register Endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: "Email already exists" });
  }
});

// Login Endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (user) res.json({ success: true });
  else res.status(401).json({ success: false });
});

// Clickstream Tracking
app.post('/api/track', (req, res) => {
  console.log("Clickstream:", req.body); // Store in DB later
  res.json({ success: true });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));