const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Mock Database - In-memory user storage
let users = [
  { id: 1, username: 'admin', email: 'admin@example.com', password: 'admin123' },
  { id: 2, username: 'user1', email: 'user1@example.com', password: 'pass123' }
];

let nextUserId = 3;

// Login Endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Validation
  if (!username || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Username and password are required' 
    });
  }

  // Find user
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ 
      success: false, 
      message: 'Invalid username or password' 
    });
  }

  // Successful login
  res.json({ 
    success: true, 
    message: 'Login successful',
    user: {
      id: user.id,
      username: user.username,
      email: user.email
    }
  });
});

// Register Endpoint
app.post('/api/register', (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  // Validation
  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({ 
      success: false, 
      message: 'All fields are required' 
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ 
      success: false, 
      message: 'Passwords do not match' 
    });
  }

  if (password.length < 6) {
    return res.status(400).json({ 
      success: false, 
      message: 'Password must be at least 6 characters' 
    });
  }

  // Check if user already exists
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ 
      success: false, 
      message: 'Username already exists' 
    });
  }

  if (users.find(u => u.email === email)) {
    return res.status(400).json({ 
      success: false, 
      message: 'Email already exists' 
    });
  }

  // Create new user
  const newUser = {
    id: nextUserId++,
    username,
    email,
    password
  };

  users.push(newUser);

  res.status(201).json({ 
    success: true, 
    message: 'Registration successful',
    user: {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email
    }
  });
});

// Get all users (for demo purposes)
app.get('/api/users', (req, res) => {
  res.json(users.map(u => ({ 
    id: u.id, 
    username: u.username, 
    email: u.email 
  })));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log('Backend is ready!');
});
