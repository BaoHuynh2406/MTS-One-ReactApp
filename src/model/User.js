export class UserModel {
  id;
  username;
  fullName;
  email;
  phone;
  gender;
  dateOfBirth;
  createdAt;
  lastLoginAt;
  roles;
  active;

  constructor(data = {}) {
    this.id = data.id || '';
    this.username = data.username || '';
    this.fullName = data.fullName || '';
    this.email = data.email || '';
    this.phone = data.phone || '';
    this.gender = data.gender || 'other';
    // Giữ nguyên dạng string cho các trường datetime
    this.dateOfBirth = data.dateOfBirth || '';
    this.createdAt = data.createdAt || '';
    this.lastLoginAt = data.lastLoginAt || '';
    this.roles = data.roles || [];
    this.active = data.active ?? true;
  }

  // Helper method to convert API response to User model
  static fromJSON(json) {
    // Trả về plain object thay vì instance của class
    return {
      ...json,
      // Đảm bảo các trường datetime là string
      dateOfBirth: json.dateOfBirth || '',
      createdAt: json.createdAt || '',
      lastLoginAt: json.lastLoginAt || ''
    };
  }

  // Helper method to convert User model to plain object
  toJSON() {
    return {
      id: this.id,
      username: this.username,
      fullName: this.fullName,
      email: this.email,
      phone: this.phone,
      gender: this.gender,
      dateOfBirth: this.dateOfBirth,
      createdAt: this.createdAt,
      lastLoginAt: this.lastLoginAt,
      roles: this.roles,
      active: this.active,
    };
  }

  // Thêm phương thức để format date khi cần hiển thị
  static formatDate(dateString) {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('vi-VN');
  }
}