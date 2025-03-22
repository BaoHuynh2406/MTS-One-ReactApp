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
    this.dateOfBirth = data.dateOfBirth || new Date();
    this.createdAt = data.createdAt || new Date();
    this.lastLoginAt = data.lastLoginAt || new Date();
    this.roles = data.roles || [];
    this.active = data.active ?? true;
  }

  // Helper method to convert API response to User model
  static fromJSON(json) {
    return new UserModel({
      ...json,
      dateOfBirth: new Date(json.dateOfBirth),
      createdAt: new Date(json.createdAt),
      lastLoginAt: new Date(json.lastLoginAt),
    });
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
}