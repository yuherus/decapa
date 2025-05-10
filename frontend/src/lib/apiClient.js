import axios from "axios";
import Cookies from 'js-cookie';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm interceptors để tự động thêm token vào header và đồng bộ giữa localStorage và cookie
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    
    if (token) {
      // Thêm token vào header
      config.headers['Authorization'] = `Bearer ${token}`;
      
      // Đồng bộ token vào cookie với thời hạn 7 ngày
      // Đảm bảo cookie có sẵn cho middleware của Next.js
      Cookies.set('token', token, { expires: 7, path: '/' });
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Xử lý lỗi 401 (Unauthorized)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Nếu là lỗi token hết hạn hoặc không hợp lệ
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      Cookies.remove('token'); // Xóa token khỏi cookie
      
      // Chuyển hướng đến trang đăng nhập nếu không phải ở trang đăng nhập
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
