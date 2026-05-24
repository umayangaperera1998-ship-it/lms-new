import apiClient from './client';
import Cookies from 'js-cookie';
import { LoginDto, SignupDto, AuthResponse } from '@lms/types';

export const authApi = {
  async login(data: LoginDto): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', data);

    // Store tokens
    Cookies.set('accessToken', response.data.tokens.accessToken, { expires: 1 / 96 }); // 15 min
    Cookies.set('refreshToken', response.data.tokens.refreshToken, { expires: 7 }); // 7 days
    Cookies.set('user', JSON.stringify(response.data.user), { expires: 7 });

    if (response.data.user.instituteId) {
      Cookies.set('instituteId', response.data.user.instituteId, { expires: 7 });
    }

    return response.data;
  },

  async signup(data: SignupDto) {
    const response = await apiClient.post('/auth/signup', data);
    return response.data;
  },

  async logout() {
    const refreshToken = Cookies.get('refreshToken');

    try {
      await apiClient.post('/auth/logout', { refreshToken });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear all auth data
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      Cookies.remove('user');
      Cookies.remove('instituteId');
    }
  },

  async logoutAll() {
    try {
      await apiClient.post('/auth/logout-all');
    } catch (error) {
      console.error('Logout all error:', error);
    } finally {
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      Cookies.remove('user');
      Cookies.remove('instituteId');
    }
  },

  async getProfile() {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },

  async verifyEmail(token: string) {
    const response = await apiClient.get(`/auth/verify-email/${token}`);
    return response.data;
  },

  async forgotPassword(data: { email: string }) {
    const response = await apiClient.post('/auth/forgot-password', data);
    return response.data;
  },

  async resetPassword(data: { token: string; password: string }) {
    const response = await apiClient.post('/auth/reset-password', data);
    return response.data;
  },

  getCurrentUser() {
    const userStr = Cookies.get('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated() {
    return !!Cookies.get('accessToken');
  },
};
