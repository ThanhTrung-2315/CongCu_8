const API_URL = 'http://localhost:3000/api';
let currentUser = null;

// DOM Elements
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const dashboard = document.getElementById('dashboard');
const loginFormElement = document.getElementById('loginFormElement');
const registerFormElement = document.getElementById('registerFormElement');
const loginMessage = document.getElementById('loginMessage');
const registerMessage = document.getElementById('registerMessage');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loginFormElement.addEventListener('submit', handleLogin);
  registerFormElement.addEventListener('submit', handleRegister);
  
  // Check if user is already logged in (from localStorage)
  const savedUser = localStorage.getItem('currentUser');
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
    showDashboard();
  }
});

// Toggle between login and register forms
function toggleForm(event) {
  event.preventDefault();
  
  loginForm.classList.toggle('hidden');
  registerForm.classList.toggle('hidden');
  
  // Clear messages
  clearMessages();
  
  // Clear form inputs
  loginFormElement.reset();
  registerFormElement.reset();
}

// Handle Login
async function handleLogin(e) {
  e.preventDefault();
  
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;
  
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password })
    });
    
    const data = await response.json();
    
    if (data.success) {
      currentUser = data.user;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      showMessage(loginMessage, data.message, 'success');
      
      setTimeout(() => {
        showDashboard();
      }, 500);
    } else {
      showMessage(loginMessage, data.message, 'error');
    }
  } catch (error) {
    console.error('Error:', error);
    showMessage(loginMessage, 'Connection error. Please try again.', 'error');
  }
}

// Handle Register
async function handleRegister(e) {
  e.preventDefault();
  
  const username = document.getElementById('register-username').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  const confirmPassword = document.getElementById('register-confirm').value;
  
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password, confirmPassword })
    });
    
    const data = await response.json();
    
    if (data.success) {
      showMessage(registerMessage, data.message + ' You can now login!', 'success');
      registerFormElement.reset();
      
      setTimeout(() => {
        toggleForm(new Event('click'));
      }, 1500);
    } else {
      showMessage(registerMessage, data.message, 'error');
    }
  } catch (error) {
    console.error('Error:', error);
    showMessage(registerMessage, 'Connection error. Please try again.', 'error');
  }
}

// Show Dashboard
function showDashboard() {
  loginForm.classList.add('hidden');
  registerForm.classList.add('hidden');
  dashboard.classList.remove('hidden');
  
  document.getElementById('welcomeMessage').textContent = `Welcome, ${currentUser.username}!`;
  document.getElementById('userId').textContent = currentUser.id;
  document.getElementById('dashboardUsername').textContent = currentUser.username;
  document.getElementById('dashboardEmail').textContent = currentUser.email;
}

// Logout
function logout() {
  currentUser = null;
  localStorage.removeItem('currentUser');
  
  loginForm.classList.remove('hidden');
  registerForm.classList.add('hidden');
  dashboard.classList.add('hidden');
  
  loginFormElement.reset();
  clearMessages();
}

// Show Message
function showMessage(element, message, type) {
  element.textContent = message;
  element.className = `message show ${type}`;
  
  if (type === 'success') {
    setTimeout(() => {
      element.classList.remove('show');
    }, 3000);
  }
}

// Clear Messages
function clearMessages() {
  loginMessage.classList.remove('show');
  registerMessage.classList.remove('show');
}
