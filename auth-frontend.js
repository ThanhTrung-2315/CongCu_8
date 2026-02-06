// AUTH FRONTEND UI
class AuthUI {
  constructor() {
    this.authService = new AuthService();
    this.currentMode = 'login'; // 'login' or 'register'
  }

  // Initialize UI on page load
  init() {
    this.render();
    this.attachEventListeners();
  }

  // Render HTML
  render() {
    const container = document.getElementById('auth-container') || this.createContainer();
    
    container.innerHTML = `
      <div class="auth-wrapper">
        <div class="auth-card">
          <h1 class="auth-title">${this.currentMode === 'login' ? 'Đăng Nhập' : 'Đăng Ký'}</h1>
          
          <form id="auth-form" class="auth-form">
            ${this.currentMode === 'login' ? this.getLoginForm() : this.getRegisterForm()}
          </form>

          <div class="auth-footer">
            ${this.currentMode === 'login' 
              ? `<p>Chưa có tài khoản? <a href="#" onclick="authUI.switchToRegister(event)">Đăng ký</a></p>`
              : `<p>Đã có tài khoản? <a href="#" onclick="authUI.switchToLogin(event)">Đăng nhập</a></p>`
            }
          </div>

          <div id="message" class="message"></div>
        </div>

        ${this.authService.isLoggedIn() ? this.getUserDashboard() : ''}
      </div>

      <style>
        .auth-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .auth-card {
          background: white;
          border-radius: 10px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          padding: 40px;
          width: 100%;
          max-width: 400px;
        }

        .auth-title {
          text-align: center;
          color: #333;
          margin-bottom: 30px;
          font-size: 24px;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          color: #555;
          font-weight: 500;
          font-size: 14px;
        }

        .form-group input {
          width: 100%;
          padding: 12px;
          border: 2px solid #e0e0e0;
          border-radius: 5px;
          font-size: 14px;
          transition: border-color 0.3s;
          box-sizing: border-box;
        }

        .form-group input:focus {
          outline: none;
          border-color: #667eea;
        }

        .form-group input::placeholder {
          color: #aaa;
        }

        .btn-submit {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 12px;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .btn-submit:hover {
          transform: translateY(-2px);
        }

        .btn-submit:active {
          transform: translateY(0);
        }

        .auth-footer {
          text-align: center;
          margin-top: 20px;
        }

        .auth-footer a {
          color: #667eea;
          text-decoration: none;
          font-weight: bold;
          cursor: pointer;
        }

        .auth-footer a:hover {
          text-decoration: underline;
        }

        .message {
          margin-top: 15px;
          padding: 10px;
          border-radius: 5px;
          text-align: center;
          font-weight: 500;
          display: none;
        }

        .message.success {
          background: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
          display: block;
        }

        .message.error {
          background: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
          display: block;
        }

        .dashboard {
          background: white;
          border-radius: 10px;
          padding: 30px;
          margin-left: 20px;
          width: 350px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .user-info {
          background: #f0f0f0;
          padding: 15px;
          border-radius: 5px;
          margin-bottom: 15px;
        }

        .user-info p {
          margin: 8px 0;
          color: #555;
        }

        .user-info strong {
          color: #667eea;
        }

        .btn-logout {
          width: 100%;
          background: #dc3545;
          color: white;
          padding: 10px;
          border: none;
          border-radius: 5px;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.3s;
        }

        .btn-logout:hover {
          background: #c82333;
        }
      </style>
    `;
  }

  getLoginForm() {
    return `
      <div class="form-group">
        <label for="login-username">Username</label>
        <input type="text" id="login-username" placeholder="Nhập username" value="admin">
      </div>
      <div class="form-group">
        <label for="login-password">Mật khẩu</label>
        <input type="password" id="login-password" placeholder="Nhập mật khẩu" value="123456">
      </div>
      <button type="submit" class="btn-submit">Đăng Nhập</button>
    `;
  }

  getRegisterForm() {
    return `
      <div class="form-group">
        <label for="register-username">Username</label>
        <input type="text" id="register-username" placeholder="Nhập username">
      </div>
      <div class="form-group">
        <label for="register-email">Email</label>
        <input type="email" id="register-email" placeholder="Nhập email">
      </div>
      <div class="form-group">
        <label for="register-password">Mật khẩu</label>
        <input type="password" id="register-password" placeholder="Nhập mật khẩu">
      </div>
      <div class="form-group">
        <label for="register-confirm">Xác nhận mật khẩu</label>
        <input type="password" id="register-confirm" placeholder="Xác nhận mật khẩu">
      </div>
      <button type="submit" class="btn-submit">Đăng Ký</button>
    `;
  }

  getUserDashboard() {
    const session = this.authService.getCurrentSession();
    return `
      <div class="dashboard">
        <h2>Welcome</h2>
        <div class="user-info">
          <p><strong>ID:</strong> ${session.userId}</p>
          <p><strong>Username:</strong> ${session.username}</p>
          <p><strong>Email:</strong> ${session.email}</p>
          <p><strong>Login Time:</strong> ${session.loginTime.toLocaleString('vi-VN')}</p>
        </div>
        <button class="btn-logout" onclick="authUI.handleLogout()">Đăng Xuất</button>
      </div>
    `;
  }

  createContainer() {
    const container = document.createElement('div');
    container.id = 'auth-container';
    document.body.appendChild(container);
    return container;
  }

  attachEventListeners() {
    const form = document.getElementById('auth-form');
    if (form) {
      form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const messageEl = document.getElementById('message');

    if (this.currentMode === 'login') {
      const username = document.getElementById('login-username').value;
      const password = document.getElementById('login-password').value;
      
      const result = this.authService.login(username, password);
      this.showMessage(result, messageEl);

      if (result.success) {
        setTimeout(() => this.render(), 1500);
      }
    } else {
      const username = document.getElementById('register-username').value;
      const email = document.getElementById('register-email').value;
      const password = document.getElementById('register-password').value;
      const confirmPassword = document.getElementById('register-confirm').value;

      const result = this.authService.register(username, email, password, confirmPassword);
      this.showMessage(result, messageEl);

      if (result.success) {
        setTimeout(() => this.switchToLogin(new Event('click')), 1500);
      }
    }
  }

  showMessage(result, messageEl) {
    messageEl.className = `message ${result.success ? 'success' : 'error'}`;
    messageEl.textContent = result.message;
  }

  switchToLogin(e) {
    e.preventDefault();
    this.currentMode = 'login';
    this.render();
    this.attachEventListeners();
  }

  switchToRegister(e) {
    e.preventDefault();
    this.currentMode = 'register';
    this.render();
    this.attachEventListeners();
  }

  handleLogout() {
    this.authService.logout();
    this.render();
    this.attachEventListeners();
  }
}

// Initialize on page load
let authUI;
document.addEventListener('DOMContentLoaded', () => {
  authUI = new AuthUI();
  authUI.init();
});
