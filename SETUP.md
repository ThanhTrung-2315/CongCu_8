# SETUP & QUICK START GUIDE

## Project Overview

This is a complete **Login/Register** application with:
- **Backend:** Node.js + Express + Mock Database
- **Frontend:** HTML + CSS + Vanilla JavaScript
- **Features:** Register, Login, Dashboard, Logout

## Files Created

```
CongCu_8/
├── backend/
│   └── server.js              (Express API server)
├── frontend/
│   ├── index.html             (Login/Register/Dashboard UI)
│   ├── style.css              (Beautiful styling)
│   └── app.js                 (Frontend logic & API calls)
├── package.json               (Dependencies)
├── README.md                  (Full documentation)
└── SETUP.md                   (This file)
```

## Step-by-Step Setup

### 1️⃣ Install Dependencies
Open PowerShell in the project folder and run:
```powershell
npm install
```

### 2️⃣ Start the Server
```powershell
npm start
```

You should see:
```
Server running at http://localhost:3000
Backend is ready!
```

### 3️⃣ Open in Browser
Navigate to: `http://localhost:3000`

## Test the Application

### Option A: Test with Demo Accounts
**Login Tab:**
- Username: `admin`
- Password: `admin123`

Or:
- Username: `user1`
- Password: `pass123`

### Option B: Register a New Account
1. Click "Register here" link
2. Fill in: Username, Email, Password, Confirm Password
3. Click Register
4. Now login with your new account!

## How It Works

### Frontend (app.js)
```javascript
// User fills form → JavaScript captures input
// JavaScript sends POST request to backend API
// Backend validates and responds
// JavaScript displays result or creates session
// LocalStorage stores user data
// Dashboard shows after successful login
```

### Backend (server.js)
```javascript
// Express server listens on port 3000
// Two main endpoints:
// - POST /api/login (validates username/password)
// - POST /api/register (creates new user)
// Mock database stores users in memory
// Returns JSON responses
```

## API Endpoints

### Login
```
POST http://localhost:3000/api/login
Body: { "username": "admin", "password": "admin123" }
Response: { "success": true, "user": {...} }
```

### Register
```
POST http://localhost:3000/api/register
Body: { 
  "username": "newuser",
  "email": "user@example.com",
  "password": "pass123",
  "confirmPassword": "pass123"
}
```

### View All Users (Demo)
```
GET http://localhost:3000/api/users
```

## Validation Rules

**Register Page:**
❌ Username already exists
❌ Email already exists
❌ Password < 6 characters
❌ Passwords don't match
✅ Only when all fields valid

**Login Page:**
❌ Wrong username or password
✅ Correct credentials

## Troubleshooting

### "Cannot find module 'express'"
Solution: Run `npm install`

### "Port 3000 already in use"
Solution: Change PORT in backend/server.js (e.g., to 3001)

### Local changes not loading
Solution: Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)

### CORS errors
Solution: Already handled with cors middleware

## Features Implemented

✅ Registration with validation
✅ Login with authentication
✅ User dashboard
✅ Logout functionality
✅ Form switching (Login ↔ Register)
✅ Error/success messages
✅ Responsive design
✅ Beautiful UI (gradient, animations)
✅ LocalStorage session persistence
✅ Mock database

## Next Steps (Optional Enhancements)

### To make it production-ready:
1. Replace mock database with real database (MongoDB/MySQL)
2. Add password hashing (bcrypt)
3. Implement JWT tokens
4. Add email verification
5. Add HTTPS
6. Add rate limiting
7. Add input sanitization
8. Add admin panel

## Key Files Explanation

### [package.json](package.json)
- Defines dependencies (express, cors)
- Sets start script

### [backend/server.js](backend/server.js)
- Express server setup
- API endpoints: /api/login, /api/register
- Mock user database

### [frontend/index.html](frontend/index.html)
- Login form
- Register form
- Dashboard/profile area

### [frontend/style.css](frontend/style.css)
- Beautiful gradient design
- Responsive layout
- Smooth animations

### [frontend/app.js](frontend/app.js)
- Form handling
- API calls
- Session management
- Message display

## Quick Reference

| Action | File |
|--------|------|
| Start server | `npm start` |
| API Logic | backend/server.js |
| UI Structure | frontend/index.html |
| Styling | frontend/style.css |
| Frontend Logic | frontend/app.js |
| Dependencies | package.json |

---

**Ready to test? Open your terminal and run:** `npm start`
