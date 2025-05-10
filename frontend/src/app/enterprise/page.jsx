"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  Search, 
  BarChart, 
  Clock, 
  Mail, 
  Building, 
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import Footer from "@/components/shared/Footer";

export default function ForEmployersPage() {
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    companyName: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleContactFormChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Xử lý gửi form liên hệ ở đây
    alert("Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi trong thời gian sớm nhất!");
    setShowContactDialog(false);
    setContactForm({
      name: "",
      companyName: "",
      email: "",
      phone: "",
      message: ""
    });
  };

  const handleScroll = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Tìm kiếm nhân tài cho doanh nghiệp của bạn</h1>
              <p className="text-xl mb-8">Tiếp cận hàng ngàn ứng viên tiềm năng và tối ưu hóa quy trình tuyển dụng của bạn với nền tảng tuyển dụng hàng đầu của chúng tôi.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
                  <Link href="/enterprise/#contact" className="flex items-center font-bold" scroll={false} onClick={() => handleScroll("contact")}>
                    Liên hệ với chúng tôi
                  </Link>
                </Button>
              </div>
              <div className="mt-4 text-sm">
                Đã có tài khoản Khách hàng?
                <Link href="enterprise/login" className="text-gray-100 font-bold hover:underline"> Đăng nhập ngay</Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <Image 
                src="/images/recruitment-hero.svg" 
                alt="Tuyển dụng hiệu quả" 
                width={600} 
                height={400}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>
              <p className="text-gray-600">Ứng viên chất lượng cao</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <p className="text-gray-600">Doanh nghiệp đã tin tưởng</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">85%</div>
              <p className="text-gray-600">Tỷ lệ tuyển dụng thành công</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Tại sao chọn chúng tôi?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Tiếp cận ứng viên chất lượng</h3>
                  <p className="text-gray-600">Kết nối với hàng ngàn ứng viên tiềm năng phù hợp với nhu cầu của doanh nghiệp.</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Search className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Tìm kiếm thông minh</h3>
                  <p className="text-gray-600">Công nghệ AI giúp bạn tìm kiếm và lọc ứng viên phù hợp một cách nhanh chóng.</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <BarChart className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Phân tích dữ liệu</h3>
                  <p className="text-gray-600">Báo cáo chi tiết và phân tích dữ liệu giúp tối ưu hóa chiến lược tuyển dụng.</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Tiết kiệm thời gian</h3>
                  <p className="text-gray-600">Tự động hóa quy trình tuyển dụng giúp bạn tiết kiệm thời gian và nguồn lực.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">Gói dịch vụ</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Chúng tôi cung cấp nhiều gói dịch vụ khác nhau để đáp ứng nhu cầu của mọi doanh nghiệp, từ startup đến tập đoàn lớn.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <Card className="border-2 border-gray-200 hover:border-blue-500 transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2">Cơ bản</h3>
                  <div className="text-4xl font-bold mb-2">1.500.000 đ<span className="text-base font-normal text-gray-600">/tháng</span></div>
                  <p className="text-gray-600">Dành cho doanh nghiệp nhỏ</p>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    <span>Đăng 10 tin tuyển dụng</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    <span>Tiếp cận 100 hồ sơ ứng viên</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    <span>Hỗ trợ email</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    <span>Báo cáo cơ bản</span>
                  </div>
                </div>
                
                <Button className="w-full">Đăng ký ngay</Button>
              </CardContent>
            </Card>
            
            {/* Pro Plan */}
            <Card className="border-2 border-blue-500 shadow-lg relative">
              <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 text-sm font-semibold rounded-bl-lg">
                Phổ biến nhất
              </div>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2">Chuyên nghiệp</h3>
                  <div className="text-4xl font-bold mb-2">3.500.000 đ<span className="text-base font-normal text-gray-600">/tháng</span></div>
                  <p className="text-gray-600">Dành cho doanh nghiệp vừa</p>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    <span>Đăng 30 tin tuyển dụng</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    <span>Tiếp cận không giới hạn hồ sơ</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    <span>Hỗ trợ ưu tiên 24/7</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    <span>Báo cáo chi tiết</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    <span>Đề xuất ứng viên phù hợp</span>
                  </div>
                </div>
                
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Đăng ký ngay</Button>
              </CardContent>
            </Card>
            
            {/* Enterprise Plan */}
            <Card className="border-2 border-gray-200 hover:border-blue-500 transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2">Doanh nghiệp</h3>
                  <div className="text-4xl font-bold mb-2">Liên hệ<span className="text-base font-normal text-gray-600"></span></div>
                  <p className="text-gray-600">Dành cho tập đoàn lớn</p>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    <span>Đăng không giới hạn tin tuyển dụng</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    <span>Tiếp cận không giới hạn hồ sơ</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    <span>Quản lý tài khoản chuyên biệt</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    <span>Tích hợp API</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    <span>Giải pháp tùy chỉnh</span>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full" onClick={() => setShowContactDialog(true)}>
                  Liên hệ với chúng tôi
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Khách hàng nói gì về chúng tôi</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 flex-grow">
                    "Nền tảng tuyển dụng này đã giúp chúng tôi tìm được những nhân tài xuất sắc trong thời gian ngắn. Giao diện dễ sử dụng và công cụ lọc ứng viên rất hiệu quả."
                  </p>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                    <div>
                      <h4 className="font-semibold">Nguyễn Văn A</h4>
                      <p className="text-sm text-gray-600">Giám đốc nhân sự, Công ty ABC</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 flex-grow">
                    "Chúng tôi đã tiết kiệm được rất nhiều thời gian và chi phí trong quá trình tuyển dụng nhờ nền tảng này. Đặc biệt ấn tượng với chất lượng ứng viên và sự hỗ trợ từ đội ngũ chăm sóc khách hàng."
                  </p>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                    <div>
                      <h4 className="font-semibold">Trần Thị B</h4>
                      <p className="text-sm text-gray-600">CEO, Startup XYZ</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 flex-grow">
                    "Báo cáo phân tích chi tiết giúp chúng tôi hiểu rõ hơn về hiệu quả của các chiến dịch tuyển dụng. Đây là công cụ không thể thiếu cho bất kỳ doanh nghiệp nào muốn tối ưu hóa quy trình tuyển dụng."
                  </p>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                    <div>
                      <h4 className="font-semibold">Lê Văn C</h4>
                      <p className="text-sm text-gray-600">Trưởng phòng tuyển dụng, Công ty DEF</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <motion.section
        id="contact"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="py-20 bg-gray-50"
      >
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Liên hệ với chúng tôi</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Bạn có câu hỏi hoặc cần tư vấn về giải pháp tuyển dụng? Hãy để lại thông tin, chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="fullName" className="text-sm font-medium">
                        Họ và tên <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="fullName"
                        name="fullName"
                        placeholder="Nguyễn Văn A"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="companyName" className="text-sm font-medium">
                        Tên công ty <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="companyName"
                        name="companyName"
                        placeholder="Công ty ABC"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="example@company.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">
                        Số điện thoại <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="0912345678"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Tiêu đề <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Tư vấn giải pháp tuyển dụng"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Nội dung <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Nhập nội dung tin nhắn của bạn..."
                      rows={4}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    Gửi tin nhắn
                  </Button>
                </form>
              </div>
              
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-6">Thông tin liên hệ</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                        <MapPin className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Địa chỉ</h4>
                        <p className="text-gray-600 mt-1">
                          Tòa nhà Innovation, 123 Đường Nguyễn Văn Linh<br />
                          Quận 7, TP. Hồ Chí Minh
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                        <Phone className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Điện thoại</h4>
                        <p className="text-gray-600 mt-1">
                          (028) 3123 4567<br />
                          Hotline: 0912 345 678
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                        <Mail className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Email</h4>
                        <p className="text-gray-600 mt-1">
                          info@myjob.vn<br />
                          support@myjob.vn
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-100">
                  <h4 className="font-medium mb-2 flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-blue-600" />
                    Giờ làm việc
                  </h4>
                  <p className="text-gray-600">
                    Thứ Hai - Thứ Sáu: 8:00 - 17:30<br />
                    Thứ Bảy: 8:00 - 12:00<br />
                    Chủ Nhật: Nghỉ
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <Footer/>
    </div>
  );
}
