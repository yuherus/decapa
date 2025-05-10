import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';

/**
 * Hook để quản lý xác thực người dùng
 */
export const useAuth = () => {
  const router = useRouter();
  const pathname = usePathname();
  
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    checkAuth,
    updateUser
  } = useAuthStore();

  // Kiểm tra xác thực khi mount component
  useEffect(() => {
    if (typeof window !== 'undefined') {
      checkAuth();
    }
  }, [checkAuth]);

  /**
   * Đăng nhập người dùng và chuyển hướng nếu thành công
   */
  const loginUser = async (credentials, redirectUrl = '/') => {
    const result = await login(credentials);

    if (result.success) {
      // Lưu token vào cookie
      document.cookie = `token=${result.data.data.token}; path=/; max-age=86400`; // 1 ngày
      
      if (result.data.data.account.role === 'admin') {
        router.push('/admin');
      } else if (result.data.data.account.role === 'enterprise') {
        router.push('/enterprise/overview');
      } else {
        router.push(redirectUrl);
      }
      return true;
    }
    
    return false;
  };

  /**
   * Đăng ký người dùng mới và chuyển hướng nếu thành công
   */
  const registerUser = async (userData, redirectUrl = '/') => {
    const result = await register(userData);
    
    if (result.success) {
      router.push(redirectUrl);
      return true;
    }
    
    return false;
  };

  /**
   * Đăng xuất người dùng và chuyển hướng đến trang chủ
   */
  const logoutUser = async () => {
    await logout();
    // Xóa token
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    router.push('/');
  };

  /**
   * Đăng xuất admin và chuyển hướng đến trang đăng nhập
   */
  const logoutAdmin = async () => {
    await logout();
    // Xóa token
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    router.push('/admin/login');
  };

  /**
   * Đăng xuất employer và chuyển hướng đến trang đăng nhập
   */
  const logoutEmployer = async () => {
    await logout();
    // Xóa token
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    router.push('/enterprise/login');
  };

  /**
   * Bảo vệ route yêu cầu đăng nhập
   */
  const requireAuth = (callback = () => {}) => {
    useEffect(() => {
      if (!isLoading && !isAuthenticated && typeof window !== 'undefined') {
        const returnUrl = encodeURIComponent(pathname);
        router.push(`/login?returnUrl=${returnUrl}`);
      } else if (isAuthenticated) {
        callback();
      }
    }, [isLoading, isAuthenticated, router, pathname, callback]);

    return { isLoading, isAuthenticated };
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    loginUser,
    registerUser,
    logoutUser,
    logoutAdmin,
    logoutEmployer,
    requireAuth,
    updateUser
  };
}; 
