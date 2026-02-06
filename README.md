# Login & Register Application

Complete login/register system with Node.js backend and vanilla JavaScript frontend.

## Features

- ✅ User Registration (Mock Database)
- ✅ User Login
- ✅ User Dashboard
- ✅ Form Validation
- ✅ Responsive Design
- ✅ Local Storage for Session Management
- ✅ Beautiful UI with Gradient Background

## Project Structure

```
CongCu_8/
├── backend/
│   └── server.js           # Express.js server with API endpoints
├── frontend/
│   ├── index.html          # HTML structure
│   ├── style.css           # Styling
│   └── app.js              # Frontend logic
├── package.json            # Node.js dependencies
└── README.md               # This file
```

## Getting Started

### Prerequisites

- Node.js installed on your system
- npm (comes with Node.js)

### Installation

1. **Navigate to project directory:**
   ```bash
   cd d:\Hutech\NamTu\HK2\C6\CongCu_8
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

### Running the Application

1. **Start the backend server:**
   ```bash
   npm start
   ```
   
   The server will run on `http://localhost:3000`

2. **Open in browser:**
   ```
   http://localhost:3000
   ```

## API Endpoints

### Login
- **POST** `/api/login`
- Body: `{ username, password }`
- Response: `{ success, message, user }`

### Register
- **POST** `/api/register`
- Body: `{ username, email, password, confirmPassword }`
- Response: `{ success, message, user }`

### Get All Users (Demo)
- **GET** `/api/users`
- Response: Array of users

## Default Test Accounts

You can login with these existing user accounts:

**Account 1:**
- Username: `admin`
- Password: `admin123`
- Email: `admin@example.com`

**Account 2:**
- Username: `user1`
- Password: `pass123`
- Email: `user1@example.com`

Or register a new account!

## Features Explained

### Frontend (app.js)
- Form switching between Login and Register
- API calls to backend using Fetch API
- User session management with localStorage
- Message display (success/error)
- Dashboard display after login
- Logout functionality

### Backend (server.js)
- Express.js server with CORS enabled
- In-memory mock database (users array)
- Login validation
- Registration with validation:
  - Username uniqueness
  - Email uniqueness
  - Password confirmation
  - Minimum password length (6 chars)
- Static file serving for frontend

## Validation Rules

### Login
- Username and password are required

### Register
- All fields are required
- Username must be unique
- Email must be unique
- Password must be at least 6 characters
- Password and confirm password must match

## Technologies Used

- **Frontend:**
  - HTML5
  - CSS3 (Flexbox, Gradients, Animations)
  - Vanilla JavaScript (Fetch API)
  - LocalStorage API

- **Backend:**
  - Node.js
  - Express.js
  - CORS middleware

## Notes

- This is a **mock/demo application** - data is stored in memory and will be lost when the server restarts
- No database is used (could be upgraded to MongoDB, MySQL, etc.)
- Passwords are stored in plain text (for demo purposes only - never do this in production!)
- For production use, implement:
  - Password hashing (bcrypt)
  - JWT authentication
  - Real database
  - HTTPS
  - Rate limiting
  - Input sanitization

## Future Enhancements

- [ ] Database integration (MongoDB/MySQL)
- [ ] Password hashing with bcrypt
- [ ] JWT token authentication
- [ ] Email verification
- [ ] Password reset functionality
- [ ] User profile editing
- [ ] Admin panel
