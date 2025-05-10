import { create } from 'zustand';
import { authService } from '@/services/auth';
import Cookies from 'js-cookie';

// Khởi tạo state từ localStorage (nếu có)
const getInitialState = () => {
  if (typeof window === 'undefined') {
    return { user: null, isAuthenticated: false };
  }
  
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    
    return { 
      user: user || null, 
      isAuthenticated: !!token
    };
  } catch (error) {
    console.error('Error parsing user from localStorage', error);
    return { user: null, isAuthenticated: false };
  }
};

// Tạo auth store với zustand
export const useAuthStore = create((set, get) => ({
  // State
  user: getInitialState().user,
  isAuthenticated: getInitialState().isAuthenticated,
  isLoading: false,
  error: null,
  
  // Actions
  login: async (credentials) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await authService.login(credentials);
      const { account, token } = response.data;
      
      // Lưu thông tin vào localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(account));
      
      Cookies.set('token', token, { expires: 7, path: '/' })

      set({ 
        user: account, 
        isAuthenticated: true, 
        isLoading: false 
      });
      
      return { success: true, data: response };
    } catch (error) {
      const errorMessage = error.response?.data?.error || 
                          error.response?.data?.status?.message || 
                          'Đăng nhập thất bại';
                          
      set({ 
        error: errorMessage, 
        isLoading: false 
      });
      
      return { success: false, error: errorMessage };
    }
  },
  
  register: async (userData) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await authService.register(userData);
      const { account, token } = response.data;
      
      // Lưu thông tin vào localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(account));
      
      Cookies.set('token', token, { expires: 7, path: '/' })

      set({ 
        user: account, 
        isAuthenticated: true, 
        isLoading: false 
      });
      
      return { success: true, data: response };
    } catch (error) {
      const errorMessage = error.response?.data?.errors || 
                          error.response?.data?.status?.message || 
                          'Đăng ký thất bại';
                          
      set({ 
        error: errorMessage, 
        isLoading: false 
      });
      
      return { success: false, error: errorMessage };
    }
  },
  
  logout: async () => {
    set({ isLoading: true });
    
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error', error);
    } finally {
      // Xóa thông tin từ localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      Cookies.remove('token');
      
      set({ 
        user: null, 
        isAuthenticated: false, 
        isLoading: false 
      });
    }
  },
  
  checkAuth: async () => {
    // Nếu không có token, không cần kiểm tra
    if (!localStorage.getItem('token')) {
      set({ isAuthenticated: false, user: null });
      return false;
    }
    
    set({ isLoading: true });
    
    try {
      const response = await authService.verifyToken();
      const { account } = response.data;
      
      // Cập nhật thông tin user nếu có thay đổi
      localStorage.setItem('user', JSON.stringify(account));

      const token = localStorage.getItem('token');
      if (token) {
        Cookies.set('token', token, { expires: 7, path: '/' })
      }
      
      set({ 
        user: account, 
        isAuthenticated: true, 
        isLoading: false 
      });
      
      return true;
    } catch (error) {
      // Xóa thông tin từ localStorage nếu token không hợp lệ
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      set({ 
        user: null, 
        isAuthenticated: false, 
        isLoading: false 
      });
      
      return false;
    }
  },
  
  updateUser: (userData) => {
    const updatedUser = { ...get().user, ...userData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    set({ user: updatedUser });
  }
}));
