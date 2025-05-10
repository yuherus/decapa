"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/hooks/useAuth";

import styles from "./styles.module.css";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get('returnUrl') || '/';
  
  const { loginUser, isLoading, error, isAuthenticated } = useAuth();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Nếu đã đăng nhập, chuyển hướng đến returnUrl
  useEffect(() => {
    if (isAuthenticated) {
      router.push(returnUrl);
    }
  }, [isAuthenticated, router, returnUrl]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: type === "checkbox" ? checked : value 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    
    try {
      // Gọi API đăng nhập
      const success = await loginUser({
        email: formData.email,
        password: formData.password,
        role: "user"
      }, returnUrl);
      
      if (!success && error) {
        setErrorMessage(error);
      }
    } catch (error) {
      setErrorMessage('Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left section - Login form */}
      <div className="w-full md:w-1/2 p-8 flex flex-col items-center">
        <div className="flex pt-4">
          <span className="text-4xl font-bold">DeCaPa</span>
        </div>
        
        <div className="max-w-md grow flex flex-col justify-center mt-[-32px]">
          <h1 className="text-2xl font-bold mb-2">Sign in</h1>
          <p className="text-gray-600 mb-6">
            Don't have account? <Link href="/signup" className="text-blue-600 hover:underline">Create Account</Link>
          </p>
          
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md flex items-start gap-2">
              <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <p>{errorMessage}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-[6px] border-gray-300 placeholder:text-gray-400 focus:border-blue-600"
              />
            </div>
            
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full rounded-[6px] border-gray-300 placeholder:text-gray-400 focus:border-blue-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <Eye className="h-4 w-4 text-gray-500" />
              </button>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="rememberMe" 
                  name="rememberMe" 
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, rememberMe: checked }))
                  }
                  className="rounded"
                />
                <label htmlFor="rememberMe" className="text-sm text-gray-600">
                  Remember Me
                </label>
              </div>
              <Link href="/forgot-password" className="text-blue-600 text-sm hover:text-blue-800">
                Forget password
              </Link>
            </div>
            
            <button
              type="submit"
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded flex items-center justify-center ${styles["login-btn"]}`}
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ml-2 ${styles["login-btn-icon"]}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            
            <div className="text-center text-gray-500 my-4">or</div>
            
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-[4px] hover:bg-gray-100"
                onClick={() => window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/facebook`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Sign in with Facebook
              </button>
              <button
                type="button"
                className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-[4px] hover:bg-gray-100"
                onClick={() => window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/google_oauth2`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign in with Google
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Right section - Checkered background and stats */}
      <div className={`hidden md:block md:w-1/2 relative ${styles["login-right-cover"]}`}>        
        <div className="absolute inset-0 flex flex-col justify-end p-16 text-white">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-2">Over 1,75,324 candidates</h2>
            <p className="text-2xl">waiting for good employees.</p>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-slate-800 p-6 rounded-lg">
              <div className="flex justify-center mb-2">
                <div className="text-white h-8 w-8">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 6H16V4C16 2.9 15.1 2 14 2H10C8.9 2 8 2.9 8 4V6H4C2.9 6 2 6.9 2 8V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V8C22 6.9 21.1 6 20 6ZM10 4H14V6H10V4Z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold">1,75,324</h3>
              <p className="text-sm text-gray-300">Live Job</p>
            </div>
            <div className="bg-slate-900 p-6 rounded-lg">
              <div className="flex justify-center mb-2">
                <div className="text-white h-8 w-8">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold">97,354</h3>
              <p className="text-sm text-gray-300">Companies</p>
            </div>
            <div className="bg-slate-800 p-6 rounded-lg">
              <div className="flex justify-center mb-2">
                <div className="text-white h-8 w-8">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 6H16V4C16 2.9 15.1 2 14 2H10C8.9 2 8 2.9 8 4V6H4C2.9 6 2 6.9 2 8V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V8C22 6.9 21.1 6 20 6ZM10 4H14V6H10V4Z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold">7,532</h3>
              <p className="text-sm text-gray-300">New Jobs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
