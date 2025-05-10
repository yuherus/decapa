"use client";

import { useState } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  Search,
  Download,
  FileText,
  CreditCard,
  CheckCircle,
  AlertTriangle,
  XCircle,
  MoreVertical,
  Eye,
  Building,
  Calendar,
  ArrowUpDown,
  Filter,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import PaginationBar from "@/components/shared/PaginationBar";

dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);
dayjs.locale("vi");

export default function TransactionsManagementPage() {
  // State cho tìm kiếm và lọc
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("all");
  const [dateRangeFilter, setDateRangeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // State cho xem chi tiết giao dịch
  const [showTransactionSheet, setShowTransactionSheet] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // State cho dialog xác nhận giao dịch
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [transactionToConfirm, setTransactionToConfirm] = useState(null);
  const [confirmNote, setConfirmNote] = useState("");

  // State cho dialog từ chối giao dịch
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [transactionToReject, setTransactionToReject] = useState(null);
  const [rejectReason, setRejectReason] = useState("");

  // Dữ liệu mẫu cho giao dịch
  const [transactions, setTransactions] = useState([
    {
      id: "TRX-2024-0001",
      companyId: 1,
      companyName: "Công ty TNHH ABC",
      companyLogo: "/logos/company1.png",
      amount: "3.500.000 đ",
      rawAmount: 3500000,
      description: "Gói Chuyên nghiệp - Thanh toán hàng tháng",
      paymentMethod: "Thẻ tín dụng",
      status: "completed",
      date: "2024-06-15",
      invoiceNumber: "INV-2024-0012",
      packageName: "Chuyên nghiệp",
      packageDuration: "1 tháng",
      paymentDetails: {
        cardType: "Visa",
        cardNumber: "**** **** **** 4567",
        bankName: "Vietcombank",
      },
      notes: "Thanh toán tự động hàng tháng",
      history: [
        { date: "2024-06-15 08:30:22", action: "Giao dịch hoàn tất", user: "Hệ thống" },
        { date: "2024-06-15 08:30:15", action: "Xác nhận thanh toán", user: "Cổng thanh toán" },
        { date: "2024-06-15 08:30:00", action: "Khởi tạo giao dịch", user: "Nguyễn Văn A (Công ty ABC)" },
      ]
    },
    {
      id: "TRX-2024-0002",
      companyId: 2,
      companyName: "Công ty Cổ phần XYZ",
      companyLogo: "/logos/company2.png",
      amount: "9.000.000 đ",
      rawAmount: 9000000,
      description: "Gói Doanh nghiệp - Thanh toán 3 tháng",
      paymentMethod: "Chuyển khoản ngân hàng",
      status: "pending",
      date: "2024-06-14",
      invoiceNumber: "INV-2024-0011",
      packageName: "Doanh nghiệp",
      packageDuration: "3 tháng",
      paymentDetails: {
        bankName: "Techcombank",
        accountNumber: "19033245678",
        accountName: "CÔNG TY CỔ PHẦN XYZ",
        transferContent: "THANHTOAN INV-2024-0011",
      },
      notes: "Đang chờ xác nhận từ bộ phận tài chính",
      history: [
        { date: "2024-06-14 15:45:10", action: "Tải lên biên lai chuyển khoản", user: "Trần Thị B (Công ty XYZ)" },
        { date: "2024-06-14 14:30:00", action: "Khởi tạo giao dịch", user: "Trần Thị B (Công ty XYZ)" },
      ]
    },
    {
      id: "TRX-2024-0003",
      companyId: 3,
      companyName: "Công ty DEF",
      companyLogo: "/logos/company3.png",
      amount: "1.500.000 đ",
      rawAmount: 1500000,
      description: "Gói Cơ bản - Thanh toán hàng tháng",
      paymentMethod: "Ví điện tử MoMo",
      status: "completed",
      date: "2024-06-10",
      invoiceNumber: "INV-2024-0010",
      packageName: "Cơ bản",
      packageDuration: "1 tháng",
      paymentDetails: {
        walletType: "MoMo",
        walletId: "0909123456",
        transactionId: "MOMO123456789",
      },
      notes: "",
      history: [
        { date: "2024-06-10 10:20:05", action: "Giao dịch hoàn tất", user: "Hệ thống" },
        { date: "2024-06-10 10:19:55", action: "Xác nhận thanh toán", user: "Cổng thanh toán MoMo" },
        { date: "2024-06-10 10:19:30", action: "Khởi tạo giao dịch", user: "Lê Văn C (Công ty DEF)" },
      ]
    },
    {
      id: "TRX-2024-0004",
      companyId: 4,
      companyName: "Tập đoàn GHI",
      companyLogo: "/logos/company4.png",
      amount: "30.000.000 đ",
      rawAmount: 30000000,
      description: "Gói Doanh nghiệp - Thanh toán 12 tháng",
      paymentMethod: "Chuyển khoản ngân hàng",
      status: "failed",
      date: "2024-06-08",
      invoiceNumber: "INV-2024-0009",
      packageName: "Doanh nghiệp",
      packageDuration: "12 tháng",
      paymentDetails: {
        bankName: "BIDV",
        accountNumber: "21500987654",
        accountName: "TẬP ĐOÀN GHI",
        transferContent: "THANHTOAN INV-2024-0009",
      },
      notes: "Số tiền chuyển khoản không khớp với hóa đơn",
      history: [
        { date: "2024-06-09 09:15:30", action: "Giao dịch thất bại", user: "Nguyễn Thị D (Admin)" },
        { date: "2024-06-08 16:45:10", action: "Tải lên biên lai chuyển khoản", user: "Phạm Thị D (Tập đoàn GHI)" },
        { date: "2024-06-08 14:30:00", action: "Khởi tạo giao dịch", user: "Phạm Thị D (Tập đoàn GHI)" },
      ]
    },
    {
      id: "TRX-2024-0005",
      companyId: 5,
      companyName: "Công ty Startup JKL",
      companyLogo: "/logos/company5.png",
      amount: "8.500.000 đ",
      rawAmount: 8500000,
      description: "Gói Chuyên nghiệp - Thanh toán 3 tháng",
      paymentMethod: "PayPal",
      status: "completed",
      date: "2024-06-05",
      invoiceNumber: "INV-2024-0008",
      packageName: "Chuyên nghiệp",
      packageDuration: "3 tháng",
      paymentDetails: {
        paypalEmail: "finance@jkl.com",
        transactionId: "PAY-12345678ABCDEF",
      },
      notes: "",
      history: [
        { date: "2024-06-05 14:25:18", action: "Giao dịch hoàn tất", user: "Hệ thống" },
        { date: "2024-06-05 14:25:10", action: "Xác nhận thanh toán", user: "Cổng thanh toán PayPal" },
        { date: "2024-06-05 14:24:30", action: "Khởi tạo giao dịch", user: "Hoàng Văn E (Công ty JKL)" },
      ]
    },
    {
      id: "TRX-2024-0006",
      companyId: 2,
      companyName: "Công ty Cổ phần XYZ",
      companyLogo: "/logos/company2.png",
      amount: "3.500.000 đ",
      rawAmount: 3500000,
      description: "Gói Chuyên nghiệp - Thanh toán hàng tháng",
      paymentMethod: "Thẻ tín dụng",
      status: "refunded",
      date: "2024-05-15",
      invoiceNumber: "INV-2024-0007",
      packageName: "Chuyên nghiệp",
      packageDuration: "1 tháng",
      paymentDetails: {
        cardType: "Mastercard",
        cardNumber: "**** **** **** 8901",
        bankName: "HSBC",
      },
      notes: "Hoàn tiền theo yêu cầu của khách hàng - Chuyển đổi gói dịch vụ",
      history: [
        { date: "2024-05-20 11:30:00", action: "Hoàn tiền thành công", user: "Lê Thị H (Admin)" },
        { date: "2024-05-19 09:45:22", action: "Yêu cầu hoàn tiền", user: "Trần Thị B (Công ty XYZ)" },
        { date: "2024-05-15 08:30:22", action: "Giao dịch hoàn tất", user: "Hệ thống" },
        { date: "2024-05-15 08:30:15", action: "Xác nhận thanh toán", user: "Cổng thanh toán" },
        { date: "2024-05-15 08:30:00", action: "Khởi tạo giao dịch", user: "Trần Thị B (Công ty XYZ)" },
      ]
    },
  ]);

  // Xử lý lọc theo khoảng thời gian
  const getFilteredByDate = (transactions) => {
    const today = new Date();
    const oneDay = 24 * 60 * 60 * 1000;
    const sevenDays = 7 * oneDay;
    const thirtyDays = 30 * oneDay;
    
    switch (dateRangeFilter) {
      case "today":
        return transactions.filter(transaction => {
          const transactionDate = new Date(transaction.date);
          return transactionDate.toDateString() === today.toDateString();
        });
      case "last7days":
        return transactions.filter(transaction => {
          const transactionDate = new Date(transaction.date);
          return (today - transactionDate) <= sevenDays;
        });
      case "last30days":
        return transactions.filter(transaction => {
          const transactionDate = new Date(transaction.date);
          return (today - transactionDate) <= thirtyDays;
        });
      default:
        return transactions;
    }
  };

  // Lọc giao dịch theo tìm kiếm và bộ lọc
  const filteredTransactions = transactions.filter(transaction => {
    // Lọc theo từ khóa tìm kiếm
    const matchesSearch = 
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Lọc theo trạng thái
    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter;
    
    // Lọc theo phương thức thanh toán
    const matchesPaymentMethod = paymentMethodFilter === "all" || 
      transaction.paymentMethod.toLowerCase().includes(paymentMethodFilter.toLowerCase());
    
    return matchesSearch && matchesStatus && matchesPaymentMethod;
  });

  // Lọc theo khoảng thời gian
  const dateFilteredTransactions = getFilteredByDate(filteredTransactions);
  
  // Phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = dateFilteredTransactions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(dateFilteredTransactions.length / itemsPerPage);

  // Xử lý xem chi tiết giao dịch
  const handleViewTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setShowTransactionSheet(true);
  };

  // Xử lý xác nhận giao dịch
  const handleConfirmTransaction = (transaction) => {
    setTransactionToConfirm(transaction);
    setConfirmNote("");
    setShowConfirmDialog(true);
  };

  // Xác nhận giao dịch
  const confirmTransaction = () => {
    setTransactions(transactions.map(transaction => 
      transaction.id === transactionToConfirm.id ? { 
        ...transaction, 
        status: "completed",
        notes: confirmNote ? confirmNote : transaction.notes,
        history: [
          { 
            date: dayjs(new Date()).format("yyyy-MM-dd HH:mm:ss"), 
            action: "Xác nhận giao dịch", 
            user: "Admin" 
          },
          ...transaction.history
        ]
      } : transaction
    ));
    setShowConfirmDialog(false);
    toast.success(`Đã xác nhận giao dịch ${transactionToConfirm.id} thành công!`);
  };

  // Xử lý từ chối giao dịch
  const handleRejectTransaction = (transaction) => {
    setTransactionToReject(transaction);
    setRejectReason("");
    setShowRejectDialog(true);
  };

  // Từ chối giao dịch
  const rejectTransaction = () => {
    if (!rejectReason.trim()) return;
    
    setTransactions(transactions.map(transaction => 
      transaction.id === transactionToReject.id ? { 
        ...transaction, 
        status: "failed",
        notes: rejectReason,
        history: [
          { 
            date: dayjs(new Date()).format("yyyy-MM-dd HH:mm:ss"), 
            action: "Giao dịch thất bại", 
            user: "Admin" 
          },
          ...transaction.history
        ]
      } : transaction
    ));
    setShowRejectDialog(false);
    toast.success(`Đã từ chối giao dịch ${transactionToReject.id}`);
  };

  // Hiển thị badge trạng thái
  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">Đã thanh toán</Badge>;
      case "pending":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">Đang xử lý</Badge>;
      case "failed":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">Thất bại</Badge>;
      case "refunded":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">Đã hoàn tiền</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý giao dịch</h1>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Danh sách giao dịch</CardTitle>
              <CardDescription>Quản lý tất cả giao dịch thanh toán trong hệ thống</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Tìm kiếm giao dịch..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="completed">Đã thanh toán</SelectItem>
                  <SelectItem value="pending">Đang xử lý</SelectItem>
                  <SelectItem value="failed">Thất bại</SelectItem>
                  <SelectItem value="refunded">Đã hoàn tiền</SelectItem>
                </SelectContent>
              </Select>
              <Select value={paymentMethodFilter} onValueChange={setPaymentMethodFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Phương thức thanh toán" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="Thẻ tín dụng">Thẻ tín dụng</SelectItem>
                  <SelectItem value="Chuyển khoản">Chuyển khoản</SelectItem>
                  <SelectItem value="Ví điện tử">Ví điện tử</SelectItem>
                  <SelectItem value="PayPal">PayPal</SelectItem>
                </SelectContent>
              </Select>
              <Select value={dateRangeFilter} onValueChange={setDateRangeFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Thời gian" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="today">Hôm nay</SelectItem>
                  <SelectItem value="last7days">7 ngày qua</SelectItem>
                  <SelectItem value="last30days">30 ngày qua</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã giao dịch</TableHead>
                <TableHead>Doanh nghiệp</TableHead>
                <TableHead>Ngày</TableHead>
                <TableHead>Mô tả</TableHead>
                <TableHead>Số tiền</TableHead>
                <TableHead>Phương thức</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentTransactions.length > 0 ? (
                currentTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{transaction.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={transaction.companyLogo} alt={transaction.companyName} />
                          <AvatarFallback>{transaction.companyName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{transaction.companyName}</span>
                      </div>
                    </TableCell>
                    <TableCell>{dayjs(transaction.date).format("YYYY-MM-DD HH:mm:ss")}</TableCell>
                    <TableCell className="max-w-[200px] truncate" title={transaction.description}>
                      {transaction.description}
                    </TableCell>
                    <TableCell>{transaction.amount}</TableCell>
                    <TableCell>{transaction.paymentMethod}</TableCell>
                    <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleViewTransaction(transaction)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {transaction.status === "pending" && (
                          <>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="text-green-600"
                              onClick={() => handleConfirmTransaction(transaction)}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="text-red-600"
                              onClick={() => handleRejectTransaction(transaction)}
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/companies?id=${transaction.companyId}`}>
                                <Building className="mr-2 h-4 w-4" />
                                <span>Xem doanh nghiệp</span>
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              <span>Xuất hóa đơn</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              <span>Tải xuống biên lai</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-6">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <CreditCard className="h-10 w-10 mb-2" />
                      <p>Không tìm thấy giao dịch nào</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {totalPages > 1 && (
            <div className="mt-6">
              <PaginationBar 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Sheet xem chi tiết giao dịch */}
      <Sheet open={showTransactionSheet} onOpenChange={setShowTransactionSheet}>
        <SheetContent className="sm:max-w-xl overflow-y-auto">
          {selectedTransaction && (
            <>
              <SheetHeader className="mb-5">
                <SheetTitle>Chi tiết giao dịch</SheetTitle>
                <SheetDescription>
                  Thông tin chi tiết về giao dịch {selectedTransaction.id}
                </SheetDescription>
              </SheetHeader>
              
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Thông tin</TabsTrigger>
                  <TabsTrigger value="payment">Thanh toán</TabsTrigger>
                  <TabsTrigger value="history">Lịch sử</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="space-y-4 mt-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-lg">{selectedTransaction.id}</h3>
                      <p className="text-sm text-gray-500">Hóa đơn: {selectedTransaction.invoiceNumber}</p>
                    </div>
                    <div>{getStatusBadge(selectedTransaction.status)}</div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={selectedTransaction.companyLogo} alt={selectedTransaction.companyName} />
                        <AvatarFallback>{selectedTransaction.companyName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{selectedTransaction.companyName}</p>
                        <p className="text-sm text-gray-500">Mã DN: {selectedTransaction.companyId}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Ngày giao dịch</p>
                        <p className="font-medium">{dayjs(selectedTransaction.date).format("YYYY-MM-DD HH:mm:ss")}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Số tiền</p>
                        <p className="font-medium">{selectedTransaction.amount}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Gói dịch vụ</p>
                        <p className="font-medium">{selectedTransaction.packageName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Thời hạn</p>
                        <p className="font-medium">{selectedTransaction.packageDuration}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Mô tả</p>
                      <p className="font-medium">{selectedTransaction.description}</p>
                    </div>
                    
                    {selectedTransaction.notes && (
                      <div>
                        <p className="text-sm text-gray-500">Ghi chú</p>
                        <p className="font-medium">{selectedTransaction.notes}</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="payment" className="space-y-4 mt-4">
                  <div>
                    <h3 className="font-semibold">Chi tiết thanh toán</h3>
                    <p className="text-sm text-gray-500">Phương thức: {selectedTransaction.paymentMethod}</p>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    {selectedTransaction.paymentMethod === "Thẻ tín dụng" && (
                      <>
                        <div>
                          <p className="text-sm text-gray-500">Loại thẻ</p>
                          <p className="font-medium">{selectedTransaction.paymentDetails.cardType}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Số thẻ</p>
                          <p className="font-medium">{selectedTransaction.paymentDetails.cardNumber}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Ngân hàng</p>
                          <p className="font-medium">{selectedTransaction.paymentDetails.bankName}</p>
                        </div>
                      </>
                    )}
                    
                    {selectedTransaction.paymentMethod === "Chuyển khoản ngân hàng" && (
                      <>
                        <div>
                          <p className="text-sm text-gray-500">Ngân hàng</p>
                          <p className="font-medium">{selectedTransaction.paymentDetails.bankName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Số tài khoản</p>
                          <p className="font-medium">{selectedTransaction.paymentDetails.accountNumber}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Tên tài khoản</p>
                          <p className="font-medium">{selectedTransaction.paymentDetails.accountName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Nội dung chuyển khoản</p>
                          <p className="font-medium">{selectedTransaction.paymentDetails.transferContent}</p>
                        </div>
                      </>
                    )}
                    
                    {selectedTransaction.paymentMethod === "Ví điện tử MoMo" && (
                      <>
                        <div>
                          <p className="text-sm text-gray-500">Loại ví</p>
                          <p className="font-medium">{selectedTransaction.paymentDetails.walletType}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Số điện thoại</p>
                          <p className="font-medium">{selectedTransaction.paymentDetails.walletId}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Mã giao dịch</p>
                          <p className="font-medium">{selectedTransaction.paymentDetails.transactionId}</p>
                        </div>
                      </>
                    )}
                    
                    {selectedTransaction.paymentMethod === "PayPal" && (
                      <>
                        <div>
                          <p className="text-sm text-gray-500">Email PayPal</p>
                          <p className="font-medium">{selectedTransaction.paymentDetails.paypalEmail}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Mã giao dịch</p>
                          <p className="font-medium">{selectedTransaction.paymentDetails.transactionId}</p>
                        </div>
                      </>
                    )}
                  </div>
                  
                  {selectedTransaction.status === "pending" && (
                    <div className="flex gap-2 mt-4">
                      <Button 
                        className="flex-1"
                        onClick={() => {
                          setShowTransactionSheet(false);
                          handleConfirmTransaction(selectedTransaction);
                        }}
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Xác nhận giao dịch
                      </Button>
                      <Button 
                        variant="outline"
                        className="flex-1 text-red-600"
                        onClick={() => {
                          setShowTransactionSheet(false);
                          handleRejectTransaction(selectedTransaction);
                        }}
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Từ chối
                      </Button>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="history" className="space-y-4 mt-4">
                  <h3 className="font-semibold">Lịch sử giao dịch</h3>
                  
                  <div className="space-y-3">
                    {selectedTransaction.history.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 pb-3 border-b border-gray-100">
                        <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                          <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{item.action}</p>
                          <div className="flex justify-between text-sm text-gray-500">
                            <span>{item.user}</span>
                            <span>{dayjs(item.date).format("YYYY-MM-DD HH:mm:ss")}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Dialog xác nhận giao dịch */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận giao dịch</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xác nhận giao dịch này không?
            </DialogDescription>
          </DialogHeader>
          
          {transactionToConfirm && (
            <div className="space-y-4 py-2">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={transactionToConfirm.companyLogo} alt={transactionToConfirm.companyName} />
                  <AvatarFallback>{transactionToConfirm.companyName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{transactionToConfirm.companyName}</p>
                  <p className="text-sm text-gray-500">{transactionToConfirm.id}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Số tiền</p>
                  <p className="font-medium">{transactionToConfirm.amount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phương thức</p>
                  <p className="font-medium">{transactionToConfirm.paymentMethod}</p>
                </div>
              </div>
              
              <div>
                <Label htmlFor="confirm-note">Ghi chú (không bắt buộc)</Label>
                <Textarea
                  id="confirm-note"
                  placeholder="Nhập ghi chú về giao dịch này..."
                  value={confirmNote}
                  onChange={(e) => setConfirmNote(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>Hủy</Button>
            <Button onClick={confirmTransaction}>Xác nhận</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog từ chối giao dịch */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Từ chối giao dịch</DialogTitle>
            <DialogDescription>
              Vui lòng cung cấp lý do từ chối giao dịch này.
            </DialogDescription>
          </DialogHeader>
          
          {transactionToReject && (
            <div className="space-y-4 py-2">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={transactionToReject.companyLogo} alt={transactionToReject.companyName} />
                  <AvatarFallback>{transactionToReject.companyName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{transactionToReject.companyName}</p>
                  <p className="text-sm text-gray-500">{transactionToReject.id}</p>
                </div>
              </div>
              
              <div>
                <Label htmlFor="reject-reason" className="text-red-500">Lý do từ chối <span className="text-red-500">*</span></Label>
                <Textarea
                  id="reject-reason"
                  placeholder="Nhập lý do từ chối giao dịch..."
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className="mt-1"
                  required
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>Hủy</Button>
            <Button 
              variant="destructive" 
              onClick={rejectTransaction}
              disabled={!rejectReason.trim()}
            >
              Từ chối giao dịch
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
