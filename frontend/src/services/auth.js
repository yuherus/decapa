import apiClient from '@/lib/apiClient';

// API service cho authentication
export const authService = {
  // Đăng nhập
  login: async (credentials) => {
    const response = await apiClient.post('/api/v1/auth/login', { account: credentials });
    return response.data;
  },

  // Đăng ký
  register: async (userData) => {
    const response = await apiClient.post('/api/v1/auth/register', { account: userData });
    return response.data;
  },

  // Đăng xuất
  logout: async () => {
    const response = await apiClient.post('/api/v1/auth/logout');
    return response.data;
  },

  // Kiểm tra token
  verifyToken: async () => {
    const response = await apiClient.get('/api/v1/auth/verify');
    return response.data;
  },

  // Đăng nhập với OAuth
  oauthCallback: async (provider, code) => {
    const response = await apiClient.post(`/api/v1/auth/${provider}/callback`, { code });
    return response.data;
  }
}; 
