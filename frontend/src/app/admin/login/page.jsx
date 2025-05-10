"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowRight, Shield, Users, BarChart, CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";

export default function AdminLoginPage() {
  const router = useRouter();
  const { loginUser, isLoading, error } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    
    try {
      const success = await loginUser({
        email: loginForm.email,
        password: loginForm.password,
        role: "admin"
      }, "/admin");
      
      if (!success && error) {
        setErrorMessage(error);
      }
    } catch (err) {
      console.log("err:", err)
      setErrorMessage("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Phần giới thiệu bên trái */}
        <div className="hidden md:flex flex-col p-8">
          <Link href="/" className="mb-6">
            <Image src="/logo.svg" alt="MyJob" width={120} height={120} />
          </Link>
          
          <h1 className="text-3xl font-bold text-blue-800 mb-4">Hệ thống quản trị MyJob</h1>
          <p className="text-gray-600 mb-8">Quản lý và vận hành hệ thống tuyển dụng một cách hiệu quả.</p>
          
          <div className="space-y-6 mb-8">
            <div className="flex items-start">
              <div className="w-[40px] h-[40px] bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Quản lý người dùng</h3>
                <p className="text-gray-600">Theo dõi và quản lý tất cả người dùng trên hệ thống.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <BarChart className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Báo cáo thống kê</h3>
                <p className="text-gray-600">Phân tích dữ liệu và tạo báo cáo chi tiết về hoạt động của hệ thống.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <CalendarClock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Quản lý hệ thống</h3>
                <p className="text-gray-600">Cấu hình và tối ưu hóa các tính năng của hệ thống.</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Phần đăng nhập bên phải */}
        <div className="w-full max-w-md mx-auto">
          <div className="md:hidden text-center mb-8">
            <Link href="/">
              <Image src="/logo.svg" alt="MyJob" width={100} height={100} className="mx-auto" />
            </Link>
          </div>
          
          <Card className="border-0 shadow-lg">
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-center mb-2">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-center">Đăng nhập quản trị</CardTitle>
              <CardDescription className="text-center">
                Đăng nhập vào hệ thống quản trị MyJob
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                {errorMessage && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                    {errorMessage}
                  </div>
                )}
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="admin@example.com"
                    value={loginForm.email}
                    onChange={handleLoginChange}
                    required
                    className="border-gray-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-sm font-medium">
                      Mật khẩu
                    </label>
                    <Link href="/admin/forgot-password" className="text-xs text-blue-600 hover:underline">
                      Quên mật khẩu?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={loginForm.password}
                      onChange={handleLoginChange}
                      required
                      className="border-gray-300"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember-me"
                    name="rememberMe"
                    checked={loginForm.rememberMe}
                    onCheckedChange={(checked) => 
                      setLoginForm(prev => ({ ...prev, rememberMe: checked }))
                    }
                  />
                  <label htmlFor="remember-me" className="text-sm">
                    Ghi nhớ đăng nhập
                  </label>
                </div>
                
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                  {isLoading ? "Đang xử lý..." : "Đăng nhập"}
                </Button>
              </form>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4 border-t pt-4">
              <div className="text-sm text-center text-gray-600">
                Quay lại trang chủ? <Link href="/" className="text-blue-600 hover:underline font-medium">Nhấp vào đây</Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
