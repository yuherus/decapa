"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Users,
  Briefcase,
  Eye,
  UserCheck,
  TrendingUp,
  Calendar,
  Building,
  ArrowRight,
  CreditCard,
  AlertTriangle,
} from "lucide-react";

export default function AdminOverview() {
  const [recentCompanies] = useState([
    {
      id: 1,
      name: "Công ty ABC",
      logo: "/avatars/company1.jpg",
      industry: "Công nghệ thông tin",
      status: "active",
      registeredAt: "2024-05-15",
    },
    {
      id: 2,
      name: "Công ty XYZ",
      logo: "/avatars/company2.jpg",
      industry: "Tài chính - Ngân hàng",
      status: "pending",
      registeredAt: "2024-05-14",
    },
  ]);

  const [pendingJobs] = useState([
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "Công ty ABC",
      location: "Hà Nội",
      submittedAt: "2024-05-15",
    },
    {
      id: 2,
      title: "Product Manager",
      company: "Công ty XYZ",
      location: "Hồ Chí Minh",
      submittedAt: "2024-05-14",
    },
  ]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tổng quan hệ thống</h1>
      </div>

      {/* Thống kê */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Tổng doanh nghiệp</p>
                <h3 className="text-2xl font-bold mt-2">1,234</h3>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Building className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+5.2% so với tháng trước</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Tin tuyển dụng</p>
                <h3 className="text-2xl font-bold mt-2">5,678</h3>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+8.3% so với tháng trước</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Ứng viên</p>
                <h3 className="text-2xl font-bold mt-2">12,345</h3>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Users className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+12.5% so với tháng trước</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Doanh thu</p>
                <h3 className="text-2xl font-bold mt-2">1.2 tỷ</h3>
              </div>
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-orange-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+15.8% so với tháng trước</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cần xử lý */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                Doanh nghiệp chờ duyệt
              </CardTitle>
              <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                15 mới
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCompanies.map((company) => (
                <div key={company.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={company.logo} />
                      <AvatarFallback>{company.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{company.name}</p>
                      <p className="text-sm text-gray-500">{company.industry}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Xem
                  </Button>
                </div>
              ))}
              <Button variant="ghost" className="w-full" asChild>
                <Link href="/admin/companies?status=pending">
                  Xem tất cả <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                Tin tuyển dụng chờ duyệt
              </CardTitle>
              <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                28 mới
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingJobs.map((job) => (
                <div key={job.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{job.title}</p>
                    <p className="text-sm text-gray-500">{job.company} • {job.location}</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Xem
                  </Button>
                </div>
              ))}
              <Button variant="ghost" className="w-full" asChild>
                <Link href="/admin/jobs?status=pending">
                  Xem tất cả <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                CV chờ xác thực
              </CardTitle>
              <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                42 mới
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Nguyễn Văn A</p>
                  <p className="text-sm text-gray-500">Senior Developer • 5 năm kinh nghiệm</p>
                </div>
                <Button size="sm" variant="outline">
                  Xem
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Trần Thị B</p>
                  <p className="text-sm text-gray-500">Product Manager • 7 năm kinh nghiệm</p>
                </div>
                <Button size="sm" variant="outline">
                  Xem
                </Button>
              </div>
              <Button variant="ghost" className="w-full" asChild>
                <Link href="/admin/candidates?status=pending">
                  Xem tất cả <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Biểu đồ thống kê */}
      <Card>
        <CardHeader>
          <CardTitle>Thống kê hoạt động</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
            <p className="text-gray-500">Biểu đồ thống kê sẽ được hiển thị ở đây</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
