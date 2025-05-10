"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useJobs } from "@/hooks/useJobs";
import { useCompanies } from "@/hooks/useCompanies";
import {
  AlertTriangle,
  ArrowRight,
  Calendar,
  CheckCircle,
  Clock,
  Edit,
  Eye,
  FileText,
  Filter,
  MoreHorizontal,
  RefreshCw,
  Search,
  Trash2,
  XCircle,
  Users,
  Plus,
  Upload,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PaginationBar from "@/components/shared/PaginationBar";
import { toast } from "sonner";

// Các enum và constants
const JOB_TYPES = [
  { value: 0, label: "Văn phòng" },
  { value: 1, label: "Remote" },
  { value: 2, label: "Hybrid" },
];

const CONTRACT_TYPES = [
  { value: 0, label: "Toàn thời gian" },
  { value: 1, label: "Bán thời gian" },
  { value: 2, label: "Freelance" },
  { value: 3, label: "Thực tập" },
];

const EXPERIENCE_LEVELS = [
  { value: 0, label: "Không yêu cầu kinh nghiệm" },
  { value: 1, label: "Fresher" },
  { value: 2, label: "Junior" },
  { value: 3, label: "Senior" },
  { value: 4, label: "Manager" },
];

const STATUS_TYPES = [
  { value: 0, label: "Chờ duyệt" },
  { value: 1, label: "Đã duyệt" },
  { value: 2, label: "Đã đóng" },
];

// Danh sách ngành nghề để lọc
const INDUSTRIES = [
  "Công nghệ thông tin",
  "Tài chính - Ngân hàng",
  "Kế toán - Kiểm toán",
  "Marketing - Truyền thông",
  "Bán hàng",
  "Hành chính - Nhân sự",
  "Xây dựng",
  "Giáo dục - Đào tạo",
  "Y tế - Dược phẩm",
  "Du lịch - Nhà hàng - Khách sạn",
  "Bất động sản",
  "Thiết kế",
  "Phân tích dữ liệu",
  "Luật",
  "Sản xuất",
  "Logistics",
  "Khác"
];

export default function JobsManagementPage() {
  // State cho tìm kiếm và lọc
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [industryFilter, setIndustryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // State cho xem chi tiết tin tuyển dụng
  const [showJobSheet, setShowJobSheet] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  // State cho xóa tin tuyển dụng
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);

  // State cho duyệt/từ chối tin tuyển dụng
  const [showVerifyDialog, setShowVerifyDialog] = useState(false);
  const [jobToVerify, setJobToVerify] = useState(null);
  const [verifyAction, setVerifyAction] = useState("approve");
  const [verifyNote, setVerifyNote] = useState("");

  // State cho form chỉnh sửa tin tuyển dụng
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    benefit: "",
    job_type: 0,
    contract_type: 0,
    min_salary: "",
    max_salary: "",
    experience: 0,
    expired_at: "",
    company_id: "",
    company_address_id: "",
    status: 0,
    skill_ids: []
  });

  // Lấy danh sách jobs từ API
  const { 
    jobs, 
    metadata, 
    isLoading, 
    updateJob,
    deleteJob 
  } = useJobs({
    page: currentPage,
    per_page: 12,
    q: searchQuery ? { title_cont: searchQuery } : null,
    status_eq: statusFilter !== "all" ? statusFilter : null,
  });

  // Lấy danh sách công ty để hiển thị trong form
  const { companies } = useCompanies({ per_page: 100 });

  // Xử lý xem chi tiết tin tuyển dụng
  const handleViewJob = (job) => {
    setSelectedJob(job);
    setShowJobSheet(true);
  };

  // Xử lý mở form chỉnh sửa tin tuyển dụng
  const handleEditClick = (job) => {
    setSelectedJob(job);
    setFormData({
      title: job.title,
      description: job.description || "",
      requirements: job.requirements || "",
      benefit: job.benefit || "",
      job_type: job.job_type,
      contract_type: job.contract_type,
      min_salary: job.min_salary || "",
      max_salary: job.max_salary || "",
      experience: job.experience,
      expired_at: formatDateForInput(job.expired_at),
      company_id: job.company.id,
      company_address_id: job.company_address?.id || "",
      status: job.status,
      skill_ids: job.skills.map(skill => skill.id)
    });
    setShowEditDialog(true);
  };

  // Format date string for input
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  // Xử lý lưu chỉnh sửa tin tuyển dụng
  const handleSaveJob = () => {
    updateJob.mutate({
      id: selectedJob.id,
      data: formData
    }, {
      onSuccess: () => {
        setShowEditDialog(false);
      }
    });
  };

  // Xử lý xóa tin tuyển dụng
  const handleDeleteJob = (job) => {
    setJobToDelete(job);
    setShowDeleteDialog(true);
  };

  // Xác nhận xóa tin tuyển dụng
  const confirmDeleteJob = () => {
    deleteJob.mutate(jobToDelete.id, {
      onSuccess: () => {
        setShowDeleteDialog(false);
        if (showJobSheet && selectedJob?.id === jobToDelete.id) {
          setShowJobSheet(false);
        }
      }
    });
  };

  // Xử lý duyệt/từ chối tin tuyển dụng
  const handleVerifyJob = (job, action) => {
    setJobToVerify(job);
    setVerifyAction(action);
    setVerifyNote("");
    setShowVerifyDialog(true);
  };

  // Xác nhận duyệt/từ chối tin tuyển dụng
  const confirmVerifyJob = () => {
    const newStatus = verifyAction === "approve" ? 1 : 2;
    
    updateJob.mutate({
      id: jobToVerify.id,
      data: { 
        status: newStatus,
        note: verifyNote
      }
    }, {
      onSuccess: () => {
        setShowVerifyDialog(false);
        const actionText = verifyAction === "approve" ? "Đã duyệt" : "Đã từ chối";
        toast.success(`${actionText} tin tuyển dụng "${jobToVerify.title}"`);
      }
    });
  };

  // Hiển thị badge trạng thái
  const getStatusBadge = (status) => {
    switch (status) {
      case 1:
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">Đã duyệt</Badge>;
      case 0:
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">Chờ duyệt</Badge>;
      case 2:
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">Đã đóng</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý tin tuyển dụng</h1>
      </div>

      {/* Thống kê */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Tổng tin tuyển dụng</p>
                <h3 className="text-2xl font-bold mt-2">{metadata.count || 0}</h3>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Chờ duyệt</p>
                <h3 className="text-2xl font-bold mt-2">
                  {jobs.filter(job => job.status === 0).length}
                </h3>
              </div>
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Đã duyệt</p>
                <h3 className="text-2xl font-bold mt-2">
                  {jobs.filter(job => job.status === 1).length}
                </h3>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Đã đóng</p>
                <h3 className="text-2xl font-bold mt-2">
                  {jobs.filter(job => job.status === 2).length}
                </h3>
              </div>
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bộ lọc */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Tìm kiếm tin tuyển dụng..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="w-full md:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="0">Chờ duyệt</SelectItem>
                  <SelectItem value="1">Đã duyệt</SelectItem>
                  <SelectItem value="2">Đã đóng</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-48">
              <Select value={industryFilter} onValueChange={setIndustryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Ngành nghề" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả ngành nghề</SelectItem>
                  {INDUSTRIES.map((industry, index) => (
                    <SelectItem key={index} value={industry}>{industry}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Danh sách tin tuyển dụng */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách tin tuyển dụng</CardTitle>
          <CardDescription>
            Quản lý và kiểm duyệt tất cả tin tuyển dụng trong hệ thống
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tin tuyển dụng</TableHead>
                <TableHead>Doanh nghiệp</TableHead>
                <TableHead className="hidden md:table-cell">Ngành nghề</TableHead>
                <TableHead className="hidden md:table-cell">Ngày đăng</TableHead>
                <TableHead className="hidden md:table-cell">Hạn nộp</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <p>Đang tải dữ liệu...</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : jobs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <FileText className="h-10 w-10 mb-2" />
                      <p>Không tìm thấy tin tuyển dụng nào</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                jobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{job.title}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {job.contract_type === 0 && (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300 text-xs">
                              Toàn thời gian
                            </Badge>
                          )}
                          {job.job_type === 1 && (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300 text-xs">
                              Remote
                            </Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={job.company?.logo_url} alt={job.company?.name} />
                          <AvatarFallback>{job.company?.name?.charAt(0) || "C"}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{job.company?.name}</p>
                          <p className="text-xs text-gray-500">{job.company_address?.province || "Không có địa chỉ"}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {job.company?.industry_text || "Công nghệ thông tin"}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(job.created_at).toLocaleDateString('vi-VN')}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {job.expired_at ? new Date(job.expired_at).toLocaleDateString('vi-VN') : "Không có hạn"}
                    </TableCell>
                    <TableCell>{getStatusBadge(job.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon" onClick={() => handleViewJob(job)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => handleEditClick(job)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        {job.status === 0 && (
                          <>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="text-green-600"
                              onClick={() => handleVerifyJob(job, "approve")}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="text-red-600"
                              onClick={() => handleVerifyJob(job, "reject")}
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => handleDeleteJob(job)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {metadata && metadata.total_pages > 1 && (
            <div className="mt-6">
              <PaginationBar 
                currentPage={currentPage}
                totalPages={metadata.total_pages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Sheet xem chi tiết tin tuyển dụng */}
      <Sheet open={showJobSheet} onOpenChange={setShowJobSheet}>
        <SheetContent className="sm:max-w-xl overflow-y-auto">
          {selectedJob && (
            <>
              <SheetHeader className="mb-5">
                <SheetTitle>Chi tiết tin tuyển dụng</SheetTitle>
                <SheetDescription>
                  Thông tin chi tiết về tin tuyển dụng
                </SheetDescription>
              </SheetHeader>
              
              <Tabs defaultValue="info" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="info">Thông tin</TabsTrigger>
                  <TabsTrigger value="stats">Thống kê</TabsTrigger>
                </TabsList>
                
                <TabsContent value="info" className="space-y-4 mt-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold">{selectedJob.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={selectedJob.company?.logo_url} alt={selectedJob.company?.name} />
                          <AvatarFallback>{selectedJob.company?.name?.charAt(0) || "C"}</AvatarFallback>
                        </Avatar>
                        <p className="text-sm">{selectedJob.company?.name}</p>
                        {selectedJob.company?.verified && (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300 text-xs">
                            <CheckCircle className="h-3 w-3 mr-1" /> Đã xác thực
                          </Badge>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {getStatusBadge(selectedJob.status)}
                        {CONTRACT_TYPES.find(type => type.value === selectedJob.contract_type) && (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
                            {CONTRACT_TYPES.find(type => type.value === selectedJob.contract_type).label}
                          </Badge>
                        )}
                        {selectedJob.job_type === 1 && (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
                            Remote
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Địa điểm</p>
                        <p>{selectedJob.company_address?.province || "Không có địa chỉ"}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Mức lương</p>
                        <p>
                          {selectedJob.min_salary && selectedJob.max_salary 
                            ? `${selectedJob.min_salary} - ${selectedJob.max_salary} triệu` 
                            : "Thương lượng"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Loại công việc</p>
                        <p>
                          {JOB_TYPES.find(type => type.value === selectedJob.job_type)?.label || "Không xác định"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Kinh nghiệm</p>
                        <p>
                          {EXPERIENCE_LEVELS.find(level => level.value === selectedJob.experience)?.label || "Không xác định"}
                        </p>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500">Mô tả công việc</p>
                      <p className="mt-1 whitespace-pre-line">{selectedJob.description}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500">Yêu cầu</p>
                      <p className="mt-1 whitespace-pre-line">{selectedJob.requirements}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500">Quyền lợi</p>
                      <p className="mt-1 whitespace-pre-line">{selectedJob.benefit}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500">Kỹ năng</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedJob.skills && selectedJob.skills.map((skill) => (
                          <Badge key={skill.id} variant="outline">{skill.name}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="stats" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-500">Lượt xem</p>
                            <h3 className="text-2xl font-bold mt-2">{selectedJob.view_count || 0}</h3>
                          </div>
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Eye className="h-5 w-5 text-blue-600" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-500">Ứng viên</p>
                            <h3 className="text-2xl font-bold mt-2">{selectedJob.application_count || 0}</h3>
                          </div>
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5 text-green-600" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium text-gray-500">Ngày đăng</p>
                      <p>{new Date(selectedJob.created_at).toLocaleDateString('vi-VN')}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium text-gray-500">Hạn nộp</p>
                      <p>
                        {selectedJob.expired_at 
                          ? new Date(selectedJob.expired_at).toLocaleDateString('vi-VN')
                          : "Không có hạn"
                        }
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <SheetFooter className="mt-6">
                <div className="flex gap-2 w-full">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => {
                      setShowJobSheet(false);
                      handleEditClick(selectedJob);
                    }}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Chỉnh sửa
                  </Button>
                  {selectedJob.status === 0 && (
                    <>
                      <Button 
                        className="flex-1"
                        onClick={() => {
                          setShowJobSheet(false);
                          handleVerifyJob(selectedJob, "approve");
                        }}
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Duyệt tin
                      </Button>
                      <Button 
                        variant="outline"
                        className="flex-1 text-red-600"
                        onClick={() => {
                          setShowJobSheet(false);
                          handleVerifyJob(selectedJob, "reject");
                        }}
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Từ chối
                      </Button>
                    </>
                  )}
                  <Button 
                    variant="destructive" 
                    className="flex-1"
                    onClick={() => {
                      setShowJobSheet(false);
                      handleDeleteJob(selectedJob);
                    }}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Xóa tin
                  </Button>
                </div>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Dialog xác nhận duyệt/từ chối tin tuyển dụng */}
      <Dialog open={showVerifyDialog} onOpenChange={setShowVerifyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {verifyAction === "approve" ? "Duyệt tin tuyển dụng" : "Từ chối tin tuyển dụng"}
            </DialogTitle>
            <DialogDescription>
              {verifyAction === "approve" 
                ? "Tin tuyển dụng sẽ được hiển thị công khai sau khi được duyệt." 
                : "Vui lòng cung cấp lý do từ chối để doanh nghiệp có thể hiểu và cải thiện."}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {jobToVerify && (
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={jobToVerify.company?.logo_url} alt={jobToVerify.company?.name} />
                  <AvatarFallback>{jobToVerify.company?.name?.charAt(0) || "C"}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{jobToVerify.title}</p>
                  <p className="text-sm text-gray-500">{jobToVerify.company?.name}</p>
                </div>
              </div>
            )}
            
            {verifyAction === "reject" && (
              <div className="space-y-2">
                <Label htmlFor="verify-note">Lý do từ chối</Label>
                <Textarea 
                  id="verify-note" 
                  placeholder="Nhập lý do từ chối tin tuyển dụng này..." 
                  value={verifyNote}
                  onChange={(e) => setVerifyNote(e.target.value)}
                />
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowVerifyDialog(false)}>
              Hủy
            </Button>
            <Button 
              onClick={confirmVerifyJob}
              className={verifyAction === "approve" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}
            >
              {verifyAction === "approve" ? "Duyệt" : "Từ chối"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog xác nhận xóa tin tuyển dụng */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa tin tuyển dụng</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa tin tuyển dụng này? Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          {jobToDelete && (
            <div className="flex items-center gap-2 py-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={jobToDelete.company?.logo_url} alt={jobToDelete.company?.name} />
                <AvatarFallback>{jobToDelete.company?.name?.charAt(0) || "C"}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{jobToDelete.title}</p>
                <p className="text-sm text-gray-500">{jobToDelete.company?.name}</p>
              </div>
            </div>
          )}
          
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteJob}
              className="bg-red-600 hover:bg-red-700"
            >
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Dialog chỉnh sửa tin tuyển dụng */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa tin tuyển dụng</DialogTitle>
            <DialogDescription>
              Chỉnh sửa thông tin cho tin tuyển dụng
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Tiêu đề *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Nhập tiêu đề tin tuyển dụng"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="job_type">Hình thức làm việc</Label>
                <Select
                  value={formData.job_type}
                  onValueChange={(value) => setFormData({ ...formData, job_type: parseInt(value) })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn hình thức" />
                  </SelectTrigger>
                  <SelectContent>
                    {JOB_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="contract_type">Loại hợp đồng</Label>
                <Select
                  value={formData.contract_type}
                  onValueChange={(value) => setFormData({ ...formData, contract_type: parseInt(value) })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại hợp đồng" />
                  </SelectTrigger>
                  <SelectContent>
                    {CONTRACT_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="experience">Kinh nghiệm</Label>
                <Select
                  value={formData.experience}
                  onValueChange={(value) => setFormData({ ...formData, experience: parseInt(value) })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn kinh nghiệm" />
                  </SelectTrigger>
                  <SelectContent>
                    {EXPERIENCE_LEVELS.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="min_salary">Lương tối thiểu</Label>
                <Input
                  id="min_salary"
                  type="number"
                  value={formData.min_salary}
                  onChange={(e) => setFormData({ ...formData, min_salary: e.target.value })}
                  placeholder="VD: 15 (triệu đồng)"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="max_salary">Lương tối đa</Label>
                <Input
                  id="max_salary"
                  type="number"
                  value={formData.max_salary}
                  onChange={(e) => setFormData({ ...formData, max_salary: e.target.value })}
                  placeholder="VD: 25 (triệu đồng)"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="expired_at">Hạn nộp hồ sơ</Label>
                <Input
                  id="expired_at"
                  type="date"
                  value={formData.expired_at}
                  onChange={(e) => setFormData({ ...formData, expired_at: e.target.value })}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Mô tả công việc</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={5}
                placeholder="Mô tả chi tiết về công việc..."
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="requirements">Yêu cầu công việc</Label>
              <Textarea
                id="requirements"
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                rows={5}
                placeholder="Các yêu cầu đối với ứng viên..."
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="benefit">Quyền lợi</Label>
              <Textarea
                id="benefit"
                value={formData.benefit}
                onChange={(e) => setFormData({ ...formData, benefit: e.target.value })}
                rows={5}
                placeholder="Các quyền lợi dành cho ứng viên..."
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="status">Trạng thái</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_TYPES.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Phần chọn công ty và địa chỉ có thể thêm sau khi có API liên quan */}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Hủy
            </Button>
            <Button onClick={handleSaveJob}>
              Lưu thay đổi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
