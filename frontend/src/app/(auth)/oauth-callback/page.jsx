"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function OAuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState('');
  
  useEffect(() => {
    const token = searchParams.get('token');
    
    if (token) {
      // Lưu token vào localStorage
      localStorage.setItem('token', token);
      
      // Tìm và lưu thông tin user từ token (nếu có)
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(window.atob(base64));
        
        if (payload.account) {
          localStorage.setItem('user', JSON.stringify(payload.account));
        }
      } catch (e) {
        console.error('Failed to parse token', e);
      }
      
      // Chuyển hướng về trang chủ sau khi xác thực
      setTimeout(() => {
        router.push('/');
      }, 1000);
    } else {
      setError('Không tìm thấy token xác thực!');
      
      // Chuyển hướng về trang đăng nhập nếu không có token
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    }
  }, [router, searchParams]);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {error ? (
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-red-600">Xác thực thất bại</h1>
          <p className="mb-4 text-gray-600">{error}</p>
          <p className="text-sm text-gray-500">Đang chuyển hướng về trang đăng nhập...</p>
        </div>
      ) : (
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Đăng nhập thành công</h1>
          <p className="text-gray-600">Đang chuyển hướng...</p>
        </div>
      )}
    </div>
  );
}
