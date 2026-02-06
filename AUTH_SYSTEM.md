# Login/Register Auth System

## Cấu trúc File

### 1. `auth-backend.js` - Backend Service
Chứa logic xử lý đăng nhập/đăng ký
- **AuthService class** với các method:
  - `register()` - Đăng ký tài khoản mới
  - `login()` - Đăng nhập
  - `logout()` - Đăng xuất
  - `isLoggedIn()` - Kiểm tra trạng thái đăng nhập
  - `getCurrentSession()` - Lấy thông tin phiên đăng nhập

### 2. `auth-frontend.js` - Frontend UI
Giao diện người dùng
- **AuthUI class** với các method:
  - `init()` - Khởi tạo giao diện
  - `render()` - Hiển thị form đăng nhập/đăng ký
  - `handleSubmit()` - Xử lý submit form
  - `switchToLogin()` - Chuyển sang chế độ đăng nhập
  - `switchToRegister()` - Chuyển sang chế độ đăng ký
  - `handleLogout()` - Xử lý đăng xuất

### 3. `index.html` - HTML chính
Kết nối backend và frontend

## Tài khoản Test (Mock Data)

```
Username: admin
Password: 123456
Email: admin@example.com
```

hoặc

```
Username: user1
Password: pass123
Email: user1@example.com
```

## Các Tính Năng

✅ Đăng nhập / Đăng ký  
✅ Validation dữ liệu (username, email, password)  
✅ Phiên đăng nhập (Session)  
✅ Hiển thị thông tin người dùng khi đã đăng nhập  
✅ Đăng xuất  
✅ UI đẹp & responsive  
✅ Message thành công/lỗi  

## Cách Sử Dụng

1. Mở file `index.html` trong trình duyệt
2. Đăng nhập bằng tài khoản test hoặc đăng ký tài khoản mới
3. Sau khi đăng nhập, sẽ hiển thị thông tin và nút đăng xuất

## Note

- Mock database: Dữ liệu chỉ lưu trong memory
- Validation được thực hiện ở backend (auth-backend.js)
- UI tự động cập nhật theo trạng thái
