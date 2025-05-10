"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  BarChart3,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  Download,
  Calendar,
  TrendingUp,
  Users,
  Briefcase,
  Building,
  CreditCard,
  FileText,
  Filter,
  RefreshCw,
  ArrowUpDown,
} from "lucide-react";

// Cấu hình dayjs
dayjs.extend(relativeTime);
dayjs.locale("vi");

export default function ReportsPage() {
  // State cho các bộ lọc
  const [dateRange, setDateRange] = useState("last30days");
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState("excel");
  const [refreshing, setRefreshing] = useState(false);

  // Dữ liệu mẫu cho biểu đồ
  const [revenueData, setRevenueData] = useState([
    { name: "T1", value: 12500000 },
    { name: "T2", value: 15800000 },
    { name: "T3", value: 14200000 },
    { name: "T4", value: 16500000 },
    { name: "T5", value: 18900000 },
    { name: "T6", value: 21500000 },
    { name: "T7", value: 19800000 },
    { name: "T8", value: 22500000 },
    { name: "T9", value: 25800000 },
    { name: "T10", value: 28500000 },
    { name: "T11", value: 32100000 },
    { name: "T12", value: 35800000 },
  ]);

  const [jobsData, setJobsData] = useState([
    { name: "T1", active: 120, pending: 45, expired: 30 },
    { name: "T2", active: 150, pending: 50, expired: 35 },
    { name: "T3", active: 180, pending: 55, expired: 40 },
    { name: "T4", active: 210, pending: 60, expired: 45 },
    { name: "T5", active: 240, pending: 65, expired: 50 },
    { name: "T6", active: 270, pending: 70, expired: 55 },
    { name: "T7", active: 300, pending: 75, expired: 60 },
    { name: "T8", active: 330, pending: 80, expired: 65 },
    { name: "T9", active: 360, pending: 85, expired: 70 },
    { name: "T10", active: 390, pending: 90, expired: 75 },
    { name: "T11", active: 420, pending: 95, expired: 80 },
    { name: "T12", active: 450, pending: 100, expired: 85 },
  ]);

  const [usersData, setUsersData] = useState([
    { name: "T1", candidates: 850, companies: 120 },
    { name: "T2", candidates: 920, companies: 135 },
    { name: "T3", candidates: 1050, companies: 150 },
    { name: "T4", candidates: 1150, companies: 165 },
    { name: "T5", candidates: 1250, companies: 180 },
    { name: "T6", candidates: 1350, companies: 195 },
    { name: "T7", candidates: 1450, companies: 210 },
    { name: "T8", candidates: 1550, companies: 225 },
    { name: "T9", candidates: 1650, companies: 240 },
    { name: "T10", candidates: 1750, companies: 255 },
    { name: "T11", candidates: 1850, companies: 270 },
    { name: "T12", candidates: 1950, companies: 285 },
  ]);

  const [packageDistribution, setPackageDistribution] = useState([
    { name: "Cơ bản", value: 45, color: "#4f46e5" },
    { name: "Tiêu chuẩn", value: 30, color: "#0ea5e9" },
    { name: "Chuyên nghiệp", value: 15, color: "#10b981" },
    { name: "Doanh nghiệp", value: 10, color: "#f59e0b" },
  ]);

  const [industryDistribution, setIndustryDistribution] = useState([
    { name: "Công nghệ thông tin", value: 35 },
    { name: "Tài chính - Ngân hàng", value: 20 },
    { name: "Bán lẻ", value: 15 },
    { name: "Sản xuất", value: 10 },
    { name: "Giáo dục", value: 8 },
    { name: "Y tế", value: 7 },
    { name: "Khác", value: 5 },
  ]);

  const [topCompanies, setTopCompanies] = useState([
    { name: "Công ty ABC", jobs: 45, applications: 350 },
    { name: "Công ty XYZ", jobs: 38, applications: 320 },
    { name: "Công ty DEF", jobs: 32, applications: 280 },
    { name: "Công ty GHI", jobs: 28, applications: 250 },
    { name: "Công ty JKL", jobs: 25, applications: 220 },
  ]);

  // Mô phỏng việc làm mới dữ liệu
  const refreshData = () => {
    setRefreshing(true);
    
    // Giả lập API call
    setTimeout(() => {
      // Cập nhật dữ liệu với một số thay đổi ngẫu nhiên
      setRevenueData(revenueData.map(item => ({
        ...item,
        value: item.value * (0.95 + Math.random() * 0.1)
      })));
      
      setRefreshing(false);
      toast.success("Dữ liệu đã được cập nhật");
    }, 1500);
  };

  // Xử lý xuất báo cáo
  const handleExportReport = () => {
    setIsExporting(true);
    
    // Giả lập quá trình xuất báo cáo
    setTimeout(() => {
      setIsExporting(false);
      setShowExportDialog(false);
      toast.success(`Báo cáo đã được xuất dưới dạng ${exportFormat.toUpperCase()}`);
    }, 2000);
  };

  // Format số tiền
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(value);
  };

  // Tính tổng doanh thu
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.value, 0);
  
  // Tính tổng tin tuyển dụng
  const totalJobs = jobsData.reduce((sum, item) => sum + item.active + item.pending + item.expired, 0);
  
  // Tính tổng người dùng
  const totalUsers = usersData[usersData.length - 1].candidates + usersData[usersData.length - 1].companies;

  // Màu cho biểu đồ
  const COLORS = ['#4f46e5', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Báo cáo thống kê</h1>
        <div className="flex items-center gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn khoảng thời gian" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last7days">7 ngày qua</SelectItem>
              <SelectItem value="last30days">30 ngày qua</SelectItem>
              <SelectItem value="last90days">90 ngày qua</SelectItem>
              <SelectItem value="last365days">365 ngày qua</SelectItem>
              <SelectItem value="custom">Tùy chỉnh...</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={refreshData} disabled={refreshing}>
            {refreshing ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Đang cập nhật...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Làm mới
              </>
            )}
          </Button>
          <Button onClick={() => setShowExportDialog(true)}>
            <Download className="mr-2 h-4 w-4" />
            Xuất báo cáo
          </Button>
        </div>
      </div>

      {/* Thống kê tổng quan */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Tổng doanh thu</p>
                <h3 className="text-2xl font-bold mt-2">{formatCurrency(totalRevenue)}</h3>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+15.8% so với kỳ trước</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Tổng tin tuyển dụng</p>
                <h3 className="text-2xl font-bold mt-2">{totalJobs}</h3>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+8.3% so với kỳ trước</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Tổng người dùng</p>
                <h3 className="text-2xl font-bold mt-2">{totalUsers}</h3>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+12.5% so với kỳ trước</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs báo cáo */}
      <Tabs defaultValue="revenue" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="revenue" className="flex items-center">
            <BarChart3 className="h-4 w-4 mr-2" />
            Doanh thu
          </TabsTrigger>
          <TabsTrigger value="jobs" className="flex items-center">
            <Briefcase className="h-4 w-4 mr-2" />
            Tin tuyển dụng
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center">
            <Users className="h-4 w-4 mr-2" />
            Người dùng
          </TabsTrigger>
          <TabsTrigger value="transactions" className="flex items-center">
            <CreditCard className="h-4 w-4 mr-2" />
            Giao dịch
          </TabsTrigger>
        </TabsList>

        {/* Tab Doanh thu */}
        <TabsContent value="revenue" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Doanh thu theo tháng</CardTitle>
              <CardDescription>
                Biểu đồ thể hiện doanh thu theo từng tháng trong năm
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={revenueData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis 
                      tickFormatter={(value) => 
                        new Intl.NumberFormat('vi-VN', {
                          notation: 'compact',
                          compactDisplay: 'short',
                          maximumFractionDigits: 1
                        }).format(value)
                      } 
                    />
                    <Tooltip 
                      formatter={(value) => [formatCurrency(value), "Doanh thu"]}
                      labelFormatter={(label) => `Tháng ${label}`}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#4f46e5" 
                      fillOpacity={1} 
                      fill="url(#colorRevenue)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Doanh thu theo gói dịch vụ</CardTitle>
                <CardDescription>
                  Phân bổ doanh thu theo các gói dịch vụ
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={packageDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {packageDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, "Tỷ lệ"]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Doanh thu theo phương thức thanh toán</CardTitle>
                <CardDescription>
                  Phân bổ doanh thu theo các phương thức thanh toán
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: "Thẻ tín dụng", value: 45 },
                        { name: "Chuyển khoản", value: 30 },
                        { name: "Ví điện tử", value: 15 },
                        { name: "PayPal", value: 10 },
                      ]}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={100} />
                      <Tooltip formatter={(value) => [`${value}%`, "Tỷ lệ"]} />
                      <Bar dataKey="value" fill="#0ea5e9" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab Tin tuyển dụng */}
        <TabsContent value="jobs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tin tuyển dụng theo tháng</CardTitle>
              <CardDescription>
                Biểu đồ thể hiện số lượng tin tuyển dụng theo từng tháng
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={jobsData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="active" name="Đang hoạt động" stackId="a" fill="#10b981" />
                    <Bar dataKey="pending" name="Chờ duyệt" stackId="a" fill="#f59e0b" />
                    <Bar dataKey="expired" name="Hết hạn" stackId="a" fill="#6b7280" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Phân bổ tin tuyển dụng theo ngành nghề</CardTitle>
                <CardDescription>
                  Tỷ lệ tin tuyển dụng theo các ngành nghề
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={industryDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name.length > 15 ? name.substring(0, 15) + '...' : name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {industryDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, "Tỷ lệ"]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top 5 doanh nghiệp đăng tuyển nhiều nhất</CardTitle>
                <CardDescription>
                  Doanh nghiệp có số lượng tin tuyển dụng nhiều nhất
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={topCompanies}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={100} />
                      <Tooltip />
                      <Bar dataKey="jobs" name="Tin tuyển dụng" fill="#4f46e5" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab Người dùng */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Người dùng theo tháng</CardTitle>
              <CardDescription>
                Biểu đồ thể hiện số lượng người dùng theo từng tháng
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={usersData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="candidates" 
                      name="Ứng viên" 
                      stroke="#4f46e5" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="companies" 
                      name="Doanh nghiệp" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Phân bổ ứng viên theo độ tuổi</CardTitle>
                <CardDescription>
                  Tỷ lệ ứng viên theo các nhóm tuổi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "18-24", value: 25 },
                          { name: "25-34", value: 40 },
                          { name: "35-44", value: 20 },
                          { name: "45-54", value: 10 },
                          { name: "55+", value: 5 },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {industryDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, "Tỷ lệ"]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Phân bổ doanh nghiệp theo quy mô</CardTitle>
                <CardDescription>
                  Tỷ lệ doanh nghiệp theo quy mô nhân sự
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: "1-10", value: 15 },
                        { name: "11-50", value: 30 },
                        { name: "51-200", value: 25 },
                        { name: "201-500", value: 20 },
                        { name: "500+", value: 10 },
                      ]}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={100} />
                      <Tooltip formatter={(value) => [`${value}%`, "Tỷ lệ"]} />
                      <Bar dataKey="value" name="Tỷ lệ doanh nghiệp theo quy mô nhân sự" fill="#4f46e5" radius={[0, 4, 4, 0]} />
                      </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab Giao dịch */}
        <TabsContent value="transactions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Doanh thu theo tháng</CardTitle>
              <CardDescription>
                Biểu đồ thể hiện doanh thu theo từng tháng
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={revenueData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => formatCurrency(value).split(' ')[0]} />
                    <Tooltip formatter={(value) => [formatCurrency(value), "Doanh thu"]} />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#4f46e5"
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Phân bổ doanh thu theo gói dịch vụ</CardTitle>
                <CardDescription>
                  Tỷ lệ doanh thu theo các gói dịch vụ
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={packageDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {packageDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, "Tỷ lệ"]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top 5 doanh nghiệp chi tiêu nhiều nhất</CardTitle>
                <CardDescription>
                  Doanh nghiệp có chi tiêu cao nhất trên hệ thống
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: "Công ty ABC", value: 45000000 },
                        { name: "Công ty XYZ", value: 38000000 },
                        { name: "Công ty DEF", value: 32000000 },
                        { name: "Công ty GHI", value: 28000000 },
                        { name: "Công ty JKL", value: 25000000 },
                      ]}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                      <XAxis type="number" tickFormatter={(value) => formatCurrency(value).split(' ')[0]} />
                      <YAxis dataKey="name" type="category" width={100} />
                      <Tooltip formatter={(value) => [formatCurrency(value), "Chi tiêu"]} />
                      <Bar dataKey="value" name="Chi tiêu" fill="#f59e0b" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Bảng thống kê giao dịch</CardTitle>
              <CardDescription>
                Danh sách các giao dịch gần đây trên hệ thống
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Mã giao dịch
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Doanh nghiệp
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Gói dịch vụ
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Số tiền
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ngày giao dịch
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Trạng thái
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      { id: "TX123456", company: "Công ty ABC", package: "Chuyên nghiệp", amount: 5000000, date: "2024-05-15", status: "success" },
                      { id: "TX123457", company: "Công ty XYZ", package: "Tiêu chuẩn", amount: 3000000, date: "2024-05-14", status: "success" },
                      { id: "TX123458", company: "Công ty DEF", package: "Doanh nghiệp", amount: 10000000, date: "2024-05-13", status: "success" },
                      { id: "TX123459", company: "Công ty GHI", package: "Cơ bản", amount: 1500000, date: "2024-05-12", status: "success" },
                      { id: "TX123460", company: "Công ty JKL", package: "Tiêu chuẩn", amount: 3000000, date: "2024-05-11", status: "failed" },
                    ].map((transaction, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {transaction.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {transaction.company}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {transaction.package}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatCurrency(transaction.amount)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(transaction.date).toLocaleDateString('vi-VN')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            transaction.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {transaction.status === 'success' ? 'Thành công' : 'Thất bại'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog xuất báo cáo */}
      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Xuất báo cáo</DialogTitle>
            <DialogDescription>
              Chọn định dạng và phạm vi dữ liệu để xuất báo cáo
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="format" className="text-right">
                Định dạng
              </Label>
              <Select
                value={exportFormat}
                onValueChange={setExportFormat}
                className="col-span-3"
              >
                <SelectTrigger id="format">
                  <SelectValue placeholder="Chọn định dạng" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                  <SelectItem value="csv">CSV (.csv)</SelectItem>
                  <SelectItem value="pdf">PDF (.pdf)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date-range" className="text-right">
                Khoảng thời gian
              </Label>
              <Select defaultValue="last30days" className="col-span-3">
                <SelectTrigger id="date-range">
                  <SelectValue placeholder="Chọn khoảng thời gian" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last7days">7 ngày qua</SelectItem>
                  <SelectItem value="last30days">30 ngày qua</SelectItem>
                  <SelectItem value="last90days">90 ngày qua</SelectItem>
                  <SelectItem value="last365days">365 ngày qua</SelectItem>
                  <SelectItem value="custom">Tùy chỉnh...</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="data-type" className="text-right">
                Loại dữ liệu
              </Label>
              <Select defaultValue="all" className="col-span-3">
                <SelectTrigger id="data-type">
                  <SelectValue placeholder="Chọn loại dữ liệu" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả dữ liệu</SelectItem>
                  <SelectItem value="revenue">Doanh thu</SelectItem>
                  <SelectItem value="jobs">Tin tuyển dụng</SelectItem>
                  <SelectItem value="users">Người dùng</SelectItem>
                  <SelectItem value="transactions">Giao dịch</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowExportDialog(false)}>
              Hủy
            </Button>
            <Button onClick={handleExportReport} disabled={isExporting}>
              {isExporting ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Đang xuất...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Xuất báo cáo
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
