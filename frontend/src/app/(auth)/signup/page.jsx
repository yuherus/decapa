"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, CheckCircle, ArrowRight, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/hooks/useAuth";

import styles from "./styles.module.css";

export default function SignupPage() {
  const router = useRouter();
  const { registerUser, isLoading, error, isAuthenticated } = useAuth();
  
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    password_confirmation: "",
    agreeTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formErrors, setFormErrors] = useState({});

  // Chuyển hướng nếu đã đăng nhập
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    
    // Xóa lỗi khi người dùng thay đổi giá trị
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.fullname.trim()) {
      errors.fullname = "Họ tên không được để trống";
    }
    
    if (!formData.email) {
      errors.email = "Email không được để trống";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email không hợp lệ";
    }
    
    if (!formData.password) {
      errors.password = "Mật khẩu không được để trống";
    } else if (formData.password.length < 6) {
      errors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }
    
    if (formData.password !== formData.password_confirmation) {
      errors.password_confirmation = "Mật khẩu xác nhận không khớp";
    }
    
    if (!formData.agreeTerms) {
      errors.agreeTerms = "Bạn phải đồng ý với điều khoản và điều kiện";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Kiểm tra lỗi trước khi gửi form
    if (!validateForm()) {
      return;
    }
    
    setErrorMessage("");
    
    try {
      // Gọi API đăng ký
      const success = await registerUser({
        fullname: formData.fullname,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password_confirmation
      });
      
      if (!success && error) {
        if (Array.isArray(error)) {
          // Nếu là mảng lỗi từ API
          setErrorMessage(error.join(", "));
        } else {
          setErrorMessage(error);
        }
      }
    } catch (err) {
      setErrorMessage("Có lỗi xảy ra khi đăng ký. Vui lòng thử lại.");
      console.error("Register error:", err);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left section - Signup form */}
      <div className="w-full md:w-1/2 p-8 flex flex-col items-center">
        <div className="flex pt-4">
          <span className="text-4xl font-bold">DeCaPa</span>
        </div>
        
        <div className="max-w-md grow flex flex-col justify-center mt-[-32px]">
          <h1 className="text-2xl font-bold mb-2">Create Account</h1>
          <p className="text-gray-600 mb-6">
            Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Sign In</Link>
          </p>
          
          {errorMessage && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
              {errorMessage}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                id="fullname"
                name="fullname"
                type="text"
                placeholder="Full Name"
                value={formData.fullname}
                onChange={handleChange}
                required
                className="w-full rounded-[6px] border-gray-300 placeholder:text-gray-400 focus:border-blue-600"
              />
            </div>
            
            <div>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email Address"
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
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500 -mt-2">Password must be at least 6 characters</p>
            
            <div className="relative">
              <Input
                id="password_confirmation"
                name="password_confirmation"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={formData.password_confirmation}
                onChange={handleChange}
                required
                className="w-full rounded-[6px] border-gray-300 placeholder:text-gray-400 focus:border-blue-600"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="agreeTerms" 
                name="agreeTerms"
                checked={formData.agreeTerms}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, agreeTerms: checked }))
                }
                className="rounded"
                required
              />
              <label htmlFor="agreeTerms" className="text-sm text-gray-600">
                I agree to the <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
              </label>
            </div>
            
            <button
              type="submit"
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded flex items-center justify-center ${styles["signup-btn"]}`}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Create Account"}
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ml-2 ${styles["signup-btn-icon"]}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            
            <div className="text-center text-gray-500 my-4">or</div>
            
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-[4px] hover:bg-gray-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Sign up with Facebook
              </button>
              <button
                type="button"
                className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-[4px] hover:bg-gray-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign up with Google
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Right section - Checkered background and stats */}
      <div className={`hidden md:block md:w-1/2 relative ${styles["signup-right-cover"]}`}>        
        <div className="absolute inset-0 flex flex-col justify-end p-16 text-white">          
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-2">Start your career journey today</h2>
            <p className="text-2xl">Join 1,75,324 job seekers finding their dream jobs</p>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-slate-800 p-6 rounded-lg">
              <div className="flex justify-center mb-2">
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="text-xl font-bold">Easy Profile Setup</h3>
              <p className="text-sm text-gray-300">Create your profile in minutes</p>
            </div>
            <div className="bg-slate-900 p-6 rounded-lg">
              <div className="flex justify-center mb-2">
                <div className="text-white h-8 w-8">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold">Job Matching</h3>
              <p className="text-sm text-gray-300">Find jobs that match your skills</p>
            </div>
            <div className="bg-slate-800 p-6 rounded-lg">
              <div className="flex justify-center mb-2">
                <div className="text-white h-8 w-8">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold">Career Growth</h3>
              <p className="text-sm text-gray-300">Resources to advance your career</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
