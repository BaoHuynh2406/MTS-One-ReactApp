import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import env from './env';
import { store } from '@/store';
import { logoutAsync } from '@/store/authSlice';
import { Alert } from 'react-native';

// Create axios instance without auth
export const publicApi = axios.create({
  baseURL: env.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create axios instance with auth
export const privateApi = axios.create({
  baseURL: env.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Biến kiểm soát việc refresh token
let isRefreshing = false;
let refreshQueue = [];

// Add request interceptor for private api
privateApi.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for private api
privateApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshQueue.push((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(privateApi(originalRequest));
          });
        });
      }

      isRefreshing = true;
      originalRequest._retry = true;

      try {
        const refreshToken = await AsyncStorage.getItem('refresh_token');
        const response = await publicApi.post('/api/v1/auth/refresh-token', {}, { 
          headers: {
            'Authorization': `Bearer ${refreshToken}`
          }
        });
        
        const { access_token, refresh_token } = response.data.data;

        await AsyncStorage.setItem('access_token', access_token);
        await AsyncStorage.setItem('refresh_token', refresh_token);

        refreshQueue.forEach((callback) => callback(access_token));
        refreshQueue = [];
        isRefreshing = false;

        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return privateApi(originalRequest);
      } catch (err) {
        isRefreshing = false;
        refreshQueue = [];
        
        // Logout user if refresh token fails
        Alert('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại');
        await store.dispatch(logoutAsync());
        
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default {
  public: publicApi,
  private: privateApi
};
