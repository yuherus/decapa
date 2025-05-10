"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Briefcase,
  Calendar,
  Copy,
  Edit,
  Eye,
  MoreVertical,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  UserCheck,
} from "lucide-react";
import PaginationBar from "@/components/shared/PaginationBar";
import { toast } from "sonner";

// Cấu hình dayjs
dayjs.extend(relativeTime);
dayjs.locale("vi");

export default function EnterpriseJobsPage() {
  // State cho tìm kiếm và lọc
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [showRepostDialog, setShowRepostDialog] = useState(false);
  const [jobToRepost, setJobToRepost] = useState(null);

  // Fetch danh sách công việc
  const fetchJobs = async () => {
    // Trong thực tế, bạn sẽ gọi API với các tham số tìm kiếm và lọc
    // const { data } = await apiClient.get("/api/v1/enterprise/jobs", {
    //   params: { search: searchQuery, status: statusFilter, page: currentPage }
    // });
    // return data;

    // Dữ liệu mẫu
    return {
      jobs: [
        {
          id: 1,
          title: "Senior Frontend Developer",
          location: "Hà Nội",
          work_type: "Toàn thời gian",
          applications: 12,
          views: 156,
          status: "active",
          created_at: "2024-05-15T08:30:22Z",
          expires_at: "2024-06-15T08:30:22Z",
        },
        {
          id: 2,
          title: "Product Manager",
          location: "Hồ Chí Minh",
          work_type: "Toàn thời gian",
          applications: 8,
          views: 98,
          status: "active",
          created_at: "2024-05-14T15:45:10Z",
          expires_at: "2024-06-14T15:45:10Z",
        },
        {
          id: 3,
          title: "UX/UI Designer",
          location: "Đà Nẵng",
          work_type: "Toàn thời gian",
          applications: 5,
          views: 76,
          status: "draft",
          created_at: "2024-05-13T10:20:05Z",
          expires_at: null,
        },
        {
          id: 4,
          title: "Backend Developer",
          location: "Hà Nội",
          work_type: "Toàn thời gian",
          applications: 10,
          views: 120,
          status: "expired",
          created_at: "2024-04-10T09:15:30Z",
          expires_at: "2024-05-10T09:15:30Z",
        },
        {
          id: 5,
          title: "DevOps Engineer",
          location: "Hồ Chí Minh",
          work_type: "Toàn thời gian",
          applications: 6,
          views: 88,
          status: "active",
          created_at: "2024-05-12T14:25:18Z",
          expires_at: "2024-06-12T14:25:18Z",
        },
      ],
      pagination: {
        total: 15,
        perPage: 10,
        currentPage: 1,
        totalPages: 2,
      },
    };
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["enterprise-jobs", searchQuery, statusFilter, currentPage],
    queryFn: fetchJobs,
  });

  // Xử lý tìm kiếm
  const handleSearch = (e) => {
    e.preventDefault();
    refetch();
  };

  // Xử lý thay đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Xử lý xóa công việc
  const handleDeleteJob = () => {
    
    toast.success(`Đã xóa tin tuyển dụng "${jobToDelete.title}"`);
    setShowDeleteDialog(false);
    setJobToDelete(null);
    refetch();
  };

  // Xử lý đăng lại công việc
  const handleRepostJob = () => {
    
    toast.success(`Đã đăng lại tin tuyển dụng "${jobToRepost.title}"`);
    setShowRepostDialog(false);
    setJobToRepost(null);
    refetch();
  };

  const renderStatus = (status) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Đang đăng
          </Badge>
        );
      case "draft":
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            Bản nháp
          </Badge>
        );
      case "expired":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            Hết hạn
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            {status}
          </Badge>
        );
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý tin tuyển dụng</h1>
        <Button>
          <Link href="/enterprise/post-job" className="flex items-center">
            <Plus className="mr-2 h-4 w-4" /> Đăng tin mới
          </Link>
        </Button>
      </div>

      {/* Thống kê */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Tin đang đăng</p>
                <h3 className="text-2xl font-bold mt-2">
                  {data?.jobs.filter((job) => job.status === "active").length || 0}
                </h3>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Tổng ứng viên</p>
                <h3 className="text-2xl font-bold mt-2">
                  {data?.jobs.reduce((sum, job) => sum + job.applications, 0) || 0}
                </h3>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <UserCheck className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Tổng lượt xem</p>
                <h3 className="text-2xl font-bold mt-2">
                  {data?.jobs.reduce((sum, job) => sum + job.views, 0) || 0}
                </h3>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Eye className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bộ lọc và tìm kiếm */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <form onSubmit={handleSearch} className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Tìm kiếm theo tiêu đề, vị trí..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit">Tìm kiếm</Button>
            </form>

            <div className="w-full md:w-48">
              <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="active">Đang đăng</SelectItem>
                  <SelectItem value="draft">Bản nháp</SelectItem>
                  <SelectItem value="expired">Hết hạn</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Danh sách công việc */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách tin tuyển dụng</CardTitle>
          <CardDescription>
            Quản lý tất cả các tin tuyển dụng của doanh nghiệp
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-4">Đang tải...</div>
          ) : error ? (
            <div className="text-center py-4 text-red-500">
              Có lỗi xảy ra khi tải dữ liệu
            </div>
          ) : (
            <>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tiêu đề</TableHead>
                      <TableHead>Vị trí</TableHead>
                      <TableHead>Loại</TableHead>
                      <TableHead className="text-center">Ứng viên</TableHead>
                      <TableHead className="text-center">Lượt xem</TableHead>
                      <TableHead>Ngày đăng</TableHead>
                      <TableHead>Hạn nộp</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data?.jobs.map((job) => (
                      <TableRow key={job.id}>
                        <TableCell className="font-medium">{job.title}</TableCell>
                        <TableCell>{job.location}</TableCell>
                        <TableCell>{job.work_type}</TableCell>
                        <TableCell className="text-center">{job.applications}</TableCell>
                        <TableCell className="text-center">{job.views}</TableCell>
                        <TableCell>{dayjs(job.created_at).format("DD/MM/YYYY")}</TableCell>
                        <TableCell>
                          {job.expires_at
                            ? dayjs(job.expires_at).format("DD/MM/YYYY")
                            : "N/A"}
                        </TableCell>
                        <TableCell>{renderStatus(job.status)}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/enterprise/jobs/${job.id}`}>
                                  <Eye className="h-4 w-4 mr-2" /> Xem chi tiết
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/enterprise/jobs/${job.id}/applications`}>
                                  <UserCheck className="h-4 w-4 mr-2" /> Xem ứng viên
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/enterprise/jobs/${job.id}/edit`}>
                                  <Edit className="h-4 w-4 mr-2" /> Chỉnh sửa
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/enterprise/post-job?duplicate=${job.id}`}>
                                  <Copy className="h-4 w-4 mr-2" /> Nhân bản
                                </Link>
                              </DropdownMenuItem>
                              {job.status === "expired" && (
                                <DropdownMenuItem
                                  onClick={() => {
                                    setJobToRepost(job);
                                    setShowRepostDialog(true);
                                  }}
                                >
                                  <RefreshCw className="h-4 w-4 mr-2" /> Đăng lại
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem
                                onClick={() => {
                                  setJobToDelete(job);
                                  setShowDeleteDialog(true);
                                }}
                                className="text-red-600 focus:text-red-600"
                              >
                                <Trash2 className="h-4 w-4 mr-2" /> Xóa
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Phân trang */}
              {data?.pagination && (
                <div className="mt-4 flex justify-center">
                  <PaginationBar
                    currentPage={data.pagination.currentPage}
                    totalPages={data.pagination.totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Dialog xác nhận xóa */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa tin tuyển dụng</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa tin tuyển dụng "{jobToDelete?.title}"? Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteJob} className="bg-red-600 hover:bg-red-700">
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Dialog xác nhận đăng lại */}
      <Dialog open={showRepostDialog} onOpenChange={setShowRepostDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Đăng lại tin tuyển dụng</DialogTitle>
            <DialogDescription>
              Bạn có muốn đăng lại tin tuyển dụng "{jobToRepost?.title}"? Tin tuyển dụng sẽ được đăng lại với thời hạn mới.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-gray-500" />
              <span>Tin tuyển dụng sẽ được đăng trong 30 ngày kể từ hôm nay</span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRepostDialog(false)}>
              Hủy
            </Button>
            <Button onClick={handleRepostJob}>
              <RefreshCw className="h-4 w-4 mr-2" /> Đăng lại
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
