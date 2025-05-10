"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  CreditCard,
  CheckCircle2,
  ArrowRight,
  Download,
  Calendar,
  Clock,
  AlertCircle,
  ChevronUp,
  ChevronDown,
  Info,
} from "lucide-react";
import { toast } from "sonner";

export default function BillingPage() {
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showFeatureDetails, setShowFeatureDetails] = useState({});

  // Dữ liệu mẫu cho gói dịch vụ hiện tại
  const currentPlan = {
    name: "Chuyên nghiệp",
    price: "3.500.000 đ",
    billingCycle: "Tháng",
    nextBillingDate: "15/07/2024",
    status: "active",
    features: [
      "Đăng 30 tin tuyển dụng",
      "Tiếp cận không giới hạn hồ sơ",
      "Hỗ trợ ưu tiên 24/7",
      "Báo cáo chi tiết",
      "Đề xuất ứng viên phù hợp",
    ],
  };

  // Dữ liệu mẫu cho các gói dịch vụ
  const plans = [
    {
      id: "basic",
      name: "Cơ bản",
      price: "1.500.000 đ",
      billingCycle: "Tháng",
      description: "Dành cho doanh nghiệp nhỏ",
      features: [
        "Đăng 10 tin tuyển dụng",
        "Tiếp cận 100 hồ sơ ứng viên",
        "Hỗ trợ email",
        "Báo cáo cơ bản",
      ],
      popular: false,
    },
    {
      id: "pro",
      name: "Chuyên nghiệp",
      price: "3.500.000 đ",
      billingCycle: "Tháng",
      description: "Dành cho doanh nghiệp vừa",
      features: [
        "Đăng 30 tin tuyển dụng",
        "Tiếp cận không giới hạn hồ sơ",
        "Hỗ trợ ưu tiên 24/7",
        "Báo cáo chi tiết",
        "Đề xuất ứng viên phù hợp",
      ],
      popular: true,
    },
    {
      id: "enterprise",
      name: "Doanh nghiệp",
      price: "Liên hệ",
      billingCycle: "",
      description: "Dành cho tập đoàn lớn",
      features: [
        "Đăng không giới hạn tin tuyển dụng",
        "Tiếp cận không giới hạn hồ sơ",
        "Quản lý tài khoản chuyên biệt",
        "Tích hợp API",
        "Giải pháp tùy chỉnh",
      ],
      popular: false,
    },
  ];

  // Dữ liệu mẫu cho lịch sử thanh toán
  const paymentHistory = [
    {
      id: "INV-2024-0012",
      date: "15/06/2024",
      amount: "3.500.000 đ",
      status: "completed",
      method: "Thẻ tín dụng",
      description: "Gói Chuyên nghiệp - Thanh toán hàng tháng",
    },
    {
      id: "INV-2024-0011",
      date: "15/05/2024",
      amount: "3.500.000 đ",
      status: "completed",
      method: "Thẻ tín dụng",
      description: "Gói Chuyên nghiệp - Thanh toán hàng tháng",
    },
    {
      id: "INV-2024-0010",
      date: "15/04/2024",
      amount: "3.500.000 đ",
      status: "completed",
      method: "Thẻ tín dụng",
      description: "Gói Chuyên nghiệp - Thanh toán hàng tháng",
    },
    {
      id: "INV-2024-0009",
      date: "15/03/2024",
      amount: "1.500.000 đ",
      status: "completed",
      method: "Chuyển khoản ngân hàng",
      description: "Gói Cơ bản - Thanh toán hàng tháng",
    },
    {
      id: "INV-2024-0008",
      date: "15/02/2024",
      amount: "1.500.000 đ",
      status: "completed",
      method: "Chuyển khoản ngân hàng",
      description: "Gói Cơ bản - Thanh toán hàng tháng",
    },
  ];

  // Xử lý nâng cấp gói dịch vụ
  const handleUpgrade = (plan) => {
    setSelectedPlan(plan);
    setShowUpgradeDialog(true);
  };

  // Xử lý xác nhận nâng cấp
  const confirmUpgrade = () => {
    toast.success(`Đã nâng cấp lên gói ${selectedPlan.name} thành công!`);
    setShowUpgradeDialog(false);
  };

  // Xử lý hủy gói dịch vụ
  const confirmCancel = () => {
    toast.success("Đã hủy gói dịch vụ thành công. Gói dịch vụ sẽ hết hạn vào ngày 15/07/2024.");
    setShowCancelDialog(false);
  };

  // Hiển thị trạng thái thanh toán
  const getPaymentStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">Đã thanh toán</Badge>;
      case "pending":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">Đang xử lý</Badge>;
      case "failed":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">Thất bại</Badge>;
      default:
        return null;
    }
  };

  // Chuyển đổi hiển thị chi tiết tính năng
  const toggleFeatureDetails = (planId) => {
    setShowFeatureDetails(prev => ({
      ...prev,
      [planId]: !prev[planId]
    }));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gói dịch vụ & Thanh toán</h1>
      </div>

      <Tabs defaultValue="current-plan" className="space-y-6">
        <TabsList>
          <TabsTrigger value="current-plan">Gói dịch vụ hiện tại</TabsTrigger>
          <TabsTrigger value="plans">Nâng cấp gói dịch vụ</TabsTrigger>
          <TabsTrigger value="payment-history">Lịch sử thanh toán</TabsTrigger>
        </TabsList>

        {/* Tab gói dịch vụ hiện tại */}
        <TabsContent value="current-plan" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Gói dịch vụ hiện tại</CardTitle>
              <CardDescription>Thông tin chi tiết về gói dịch vụ bạn đang sử dụng</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 p-6 bg-blue-50 rounded-lg border border-blue-100">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold">{currentPlan.name}</h3>
                    <Badge className="bg-blue-500">Đang hoạt động</Badge>
                  </div>
                  <p className="text-gray-600 mt-1">Thanh toán {currentPlan.billingCycle.toLowerCase()}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{currentPlan.price}<span className="text-sm font-normal text-gray-600">/{currentPlan.billingCycle.toLowerCase()}</span></div>
                  <p className="text-sm text-gray-600">Thanh toán tiếp theo: {currentPlan.nextBillingDate}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Tính năng bao gồm</h3>
                <ul className="space-y-2">
                  {currentPlan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="outline" onClick={() => setShowCancelDialog(true)}>
                  Hủy gói dịch vụ
                </Button>
                <Button>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Cập nhật phương thức thanh toán
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Thông tin thanh toán</CardTitle>
              <CardDescription>Phương thức thanh toán và thông tin hóa đơn</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Phương thức thanh toán</h3>
                <div className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium">Thẻ tín dụng</p>
                    <p className="text-sm text-gray-600">Visa **** **** **** 4567</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Thông tin hóa đơn</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tên công ty</span>
                    <span>Công ty ABC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mã số thuế</span>
                    <span>0123456789</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Địa chỉ</span>
                    <span>123 Đường Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email nhận hóa đơn</span>
                    <span>billing@company.com</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Cập nhật thông tin hóa đơn</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Tab nâng cấp gói dịch vụ */}
        <TabsContent value="plans" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <Card key={plan.id} className={`border-2 ${plan.popular ? 'border-blue-500 shadow-lg' : 'border-gray-200 hover:border-blue-500 transition-all duration-300'} relative`}>
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 text-sm font-semibold rounded-bl-lg">
                    Phổ biến nhất
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                    <div className="text-4xl font-bold mb-2">{plan.price}<span className="text-base font-normal text-gray-600">{plan.billingCycle ? `/${plan.billingCycle.toLowerCase()}` : ''}</span></div>
                    <p className="text-gray-600">{plan.description}</p>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                        <span>{feature}</span>
                      </div>
                    ))}
                    <div className="pt-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-blue-600 p-0 h-auto"
                        onClick={() => toggleFeatureDetails(plan.id)}
                      >
                        {showFeatureDetails[plan.id] ? (
                          <span className="flex items-center">Ẩn chi tiết <ChevronUp className="ml-1 h-4 w-4" /></span>
                        ) : (
                          <span className="flex items-center">Xem chi tiết <ChevronDown className="ml-1 h-4 w-4" /></span>
                        )}
                      </Button>
                      
                      {showFeatureDetails[plan.id] && (
                        <div className="mt-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                          <ul className="space-y-2">
                            {plan.id === "basic" && (
                              <>
                                <li>• Đăng tối đa 10 tin tuyển dụng cùng lúc</li>
                                <li>• Xem thông tin chi tiết của 100 hồ sơ ứng viên</li>
                                <li>• Hỗ trợ qua email trong giờ hành chính</li>
                                <li>• Báo cáo cơ bản về hiệu quả tin tuyển dụng</li>
                              </>
                            )}
                            {plan.id === "pro" && (
                              <>
                                <li>• Đăng tối đa 30 tin tuyển dụng cùng lúc</li>
                                <li>• Xem không giới hạn thông tin chi tiết ứng viên</li>
                                <li>• Hỗ trợ ưu tiên 24/7 qua email và điện thoại</li>
                                <li>• Báo cáo chi tiết về hiệu quả tuyển dụng và phân tích dữ liệu</li>
                                <li>• Hệ thống AI đề xuất ứng viên phù hợp với yêu cầu</li>
                              </>
                            )}
                            {plan.id === "enterprise" && (
                              <>
                                <li>• Đăng không giới hạn tin tuyển dụng</li>
                                <li>• Xem không giới hạn thông tin chi tiết ứng viên</li>
                                <li>• Được phân công chuyên viên quản lý tài khoản riêng</li>
                                <li>• Tích hợp API với hệ thống HR nội bộ</li>
                                <li>• Giải pháp tùy chỉnh theo nhu cầu doanh nghiệp</li>
                                <li>• Đào tạo và hỗ trợ triển khai</li>
                              </>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {plan.id === "enterprise" ? (
                    <Button variant="outline" className="w-full">
                      Liên hệ với chúng tôi
                    </Button>
                  ) : (
                    <Button 
                      className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                      onClick={() => handleUpgrade(plan)}
                      disabled={currentPlan.name === plan.name}
                    >
                      {currentPlan.name === plan.name ? 'Gói hiện tại' : 'Nâng cấp ngay'}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tab lịch sử thanh toán */}
        <TabsContent value="payment-history">
          <Card>
            <CardHeader>
              <CardTitle>Lịch sử thanh toán</CardTitle>
              <CardDescription>Xem lại các giao dịch thanh toán trước đây</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mã hóa đơn</TableHead>
                    <TableHead>Ngày</TableHead>
                    <TableHead>Mô tả</TableHead>
                    <TableHead>Phương thức</TableHead>
                    <TableHead>Số tiền</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentHistory.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.id}</TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>{payment.description}</TableCell>
                      <TableCell>{payment.method}</TableCell>
                      <TableCell>{payment.amount}</TableCell>
                      <TableCell>{getPaymentStatusBadge(payment.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Tải hóa đơn
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog xác nhận nâng cấp */}
      <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Xác nhận nâng cấp gói dịch vụ</DialogTitle>
            <DialogDescription>
              Bạn đang nâng cấp từ gói <span className="font-medium">{currentPlan.name}</span> lên gói <span className="font-medium">{selectedPlan?.name}</span>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Gói mới:</span>
                <span>{selectedPlan?.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Giá:</span>
                <span>{selectedPlan?.price}/{selectedPlan?.billingCycle.toLowerCase()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Ngày bắt đầu:</span>
                <span>Ngay lập tức</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Thanh toán đầu tiên:</span>
                <span>Ngay lập tức</span>
              </div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-md flex items-start">
              <Info className="h-5 w-5 text-yellow-600 mr-2 shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-700">
                Việc nâng cấp sẽ được áp dụng ngay lập tức. Chúng tôi sẽ tính phí chênh lệch cho thời gian còn lại của chu kỳ thanh toán hiện tại.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUpgradeDialog(false)}>
              Hủy
            </Button>
            <Button onClick={confirmUpgrade}>
              Xác nhận nâng cấp
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog xác nhận hủy gói */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận hủy gói dịch vụ</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn hủy gói dịch vụ {currentPlan.name}? Bạn vẫn có thể sử dụng dịch vụ đến hết ngày {currentPlan.nextBillingDate}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="bg-yellow-50 p-4 rounded-md flex items-start mt-2">
            <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 shrink-0 mt-0.5" />
            <div className="text-sm text-yellow-700">
              <p className="font-medium">Lưu ý quan trọng:</p>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Tất cả tin tuyển dụng đang hoạt động sẽ vẫn hiển thị đến khi hết hạn</li>
                <li>Bạn sẽ không thể đăng tin tuyển dụng mới sau khi hủy gói</li>
                <li>Dữ liệu tài khoản của bạn sẽ được giữ lại trong 30 ngày</li>
              </ul>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={confirmCancel} className="bg-red-600 hover:bg-red-700">
              Xác nhận hủy gói
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
} 
