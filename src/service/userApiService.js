import api from '../config/axiosConfig';
import { UserModel } from '../model/User';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const userApiService = {
  /**
   * Login with email and password
   * @param {string} username 
   * @param {string} password 
   * @returns {Promise<{access_token: string, refresh_token: string, user: UserModel}>}
   */
  async login(username, password) {
    try {
      const response = await api.public.post('/api/v1/auth/login', {
        username,
        password
      });

      if (!response.data.success) {
        throw new Error(response.data.message || 'Login failed');
      }
      const { access_token, refresh_token, user } = response.data.data;

      // Save tokens to AsyncStorage
      await AsyncStorage.multiSet([
        ['access_token', access_token],
        ['refresh_token', refresh_token]
      ]);

      return {
        access_token,
        refresh_token,
        user: UserModel.fromJSON(user)
      };
    } catch (error) {
      throw error?.response?.data || error;
    }
  },

  /**
   * Logout current user
   * @returns {Promise<void>}
   */
  async logout() {
    try {
      await api.private.post('/api/v1/auth/logout');
      // Clean up stored tokens
      await AsyncStorage.multiRemove(['access_token', 'refresh_token']);
    } catch (error) {
      // Still remove tokens even if API call fails
      await AsyncStorage.multiRemove(['access_token', 'refresh_token']);
    }

    // cuối cùng chuyển sang màn hình login
  },

  /**
   * Get current user profile
   * @returns {Promise<UserModel>}
   */
  async getCurrentUser() {
    try {
      const response = await api.private.get('/api/v1/users/my-info');
      return UserModel.fromJSON(response.data);
    } catch (error) {
      throw error?.response?.data || error;
    }
  },

  /**
   * Update user profile
   * @param {Partial<UserModel>} userData 
   * @returns {Promise<UserModel>}
   */
  async updateProfile(userData) {
    try {
      const response = await api.private.patch('/user/profile', userData);
      return UserModel.fromJSON(response.data);
    } catch (error) {
      throw error?.response?.data || error;
    }
  }
};

export default userApiService;