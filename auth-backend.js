// AUTH BACKEND SERVICE
// Mock database for users
class AuthService {
  constructor() {
    // Mock user database
    this.users = [
      { id: 1, username: 'admin', email: 'admin@example.com', password: '123456' },
      { id: 2, username: 'user1', email: 'user1@example.com', password: 'pass123' }
    ];
    this.currentSession = null;
  }

  // REGISTER: Đăng ký tài khoản mới
  register(username, email, password, confirmPassword) {
    // Validate input
    if (!username || !email || !password || !confirmPassword) {
      return { success: false, message: 'Vui lòng điền đầy đủ thông tin' };
    }

    if (password !== confirmPassword) {
      return { success: false, message: 'Mật khẩu không khớp' };
    }

    if (password.length < 6) {
      return { success: false, message: 'Mật khẩu phải từ 6 ký tự trở lên' };
    }

    // Check if username already exists
    if (this.users.find(u => u.username === username)) {
      return { success: false, message: 'Username đã tồn tại' };
    }

    if (this.users.find(u => u.email === email)) {
      return { success: false, message: 'Email đã tồn tại' };
    }

    // Create new user
    const newUser = {
      id: this.users.length + 1,
      username,
      email,
      password
    };

    this.users.push(newUser);
    return { success: true, message: 'Đăng ký thành công!', user: { id: newUser.id, username, email } };
  }

  // LOGIN: Đăng nhập
  login(username, password) {
    if (!username || !password) {
      return { success: false, message: 'Vui lòng điền đầy đủ thông tin' };
    }

    const user = this.users.find(u => u.username === username);
    
    if (!user) {
      return { success: false, message: 'Username không tồn tại' };
    }

    if (user.password !== password) {
      return { success: false, message: 'Mật khẩu không chính xác' };
    }

    // Create session
    this.currentSession = {
      userId: user.id,
      username: user.username,
      email: user.email,
      loginTime: new Date()
    };

    return { 
      success: true, 
      message: 'Đăng nhập thành công!', 
      user: { id: user.id, username: user.username, email: user.email }
    };
  }

  // LOGOUT: Đăng xuất
  logout() {
    if (this.currentSession) {
      this.currentSession = null;
      return { success: true, message: 'Đã đăng xuất' };
    }
    return { success: false, message: 'Không có phiên đăng nhập' };
  }

  // GET CURRENT SESSION
  getCurrentSession() {
    return this.currentSession;
  }

  // CHECK IF LOGGED IN
  isLoggedIn() {
    return this.currentSession !== null;
  }

  // GET ALL USERS (for admin purposes)
  getAllUsers() {
    return this.users.map(u => ({ id: u.id, username: u.username, email: u.email }));
  }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AuthService;
}
