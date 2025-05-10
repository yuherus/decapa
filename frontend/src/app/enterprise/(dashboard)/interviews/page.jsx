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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar as CalendarIcon,
  Clock,
  Eye,
  Filter,
  MoreVertical,
  Plus,
  Search,
  Trash2,
  UserCheck,
  Video,
  X,
  User,
} from "lucide-react";
import PaginationBar from "@/components/shared/PaginationBar";
import { toast } from "sonner";

// Cấu hình dayjs
dayjs.extend(relativeTime);
dayjs.locale("vi");

export default function EnterpriseInterviewsPage() {
  // State cho tìm kiếm và lọc
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [interviewToCancel, setInterviewToCancel] = useState(null);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [scheduleForm, setScheduleForm] = useState({
    date: new Date(),
    time: "09:00",
    type: "online",
    location: "",
    note: "",
  });

  // Fetch danh sách phỏng vấn
  const fetchInterviews = async () => {
    // Trong thực tế, bạn sẽ gọi API với các tham số tìm kiếm và lọc
    // const { data } = await apiClient.get("/api/v1/enterprise/interviews", {
    //   params: { search: searchQuery, status: statusFilter, page: currentPage }
    // });
    // return data;

    // Dữ liệu mẫu
    return {
      interviews: [
        {
          id: 1,
          applicant: {
            id: 101,
            name: "Nguyễn Văn A",
            avatar: null,
            email: "nguyenvana@gmail.com",
            phone: "0901234567",
            position: "Senior Frontend Developer",
          },
          job: {
            id: 1,
            title: "Senior Frontend Developer",
          },
          scheduledAt: "2024-06-10T09:00:00Z",
          type: "online",
          location: "Google Meet",
          status: "scheduled",
          note: "Phỏng vấn kỹ thuật về React và TypeScript",
          createdAt: "2024-05-20T08:30:22Z",
        },
        {
          id: 2,
          applicant: {
            id: 102,
            name: "Trần Thị B",
            avatar: null,
            email: "tranthib@gmail.com",
            phone: "0912345678",
            position: "Product Manager",
          },
          job: {
            id: 2,
            title: "Product Manager",
          },
          scheduledAt: "2024-06-12T14:30:00Z",
          type: "offline",
          location: "Văn phòng công ty, tầng 5, tòa nhà ABC, Hà Nội",
          status: "scheduled",
          note: "Phỏng vấn về kinh nghiệm quản lý sản phẩm",
          createdAt: "2024-05-21T10:15:30Z",
        },
        {
          id: 3,
          applicant: {
            id: 103,
            name: "Lê Văn C",
            avatar: null,
            email: "levanc@gmail.com",
            phone: "0923456789",
            position: "UX/UI Designer",
          },
          job: {
            id: 3,
            title: "UX/UI Designer",
          },
          scheduledAt: "2024-06-05T10:00:00Z",
          type: "online",
          location: "Zoom",
          status: "completed",
          note: "Phỏng vấn về portfolio và kinh nghiệm thiết kế",
          createdAt: "2024-05-18T09:45:15Z",
        },
        {
          id: 4,
          applicant: {
            id: 104,
            name: "Phạm Thị D",
            avatar: null,
            email: "phamthid@gmail.com",
            phone: "0934567890",
            position: "Backend Developer",
          },
          job: {
            id: 4,
            title: "Backend Developer",
          },
          scheduledAt: "2024-06-08T15:00:00Z",
          type: "online",
          location: "Microsoft Teams",
          status: "cancelled",
          note: "Phỏng vấn kỹ thuật về Node.js và MongoDB",
          createdAt: "2024-05-19T14:20:10Z",
          cancelReason: "Ứng viên không thể tham gia vào thời gian này",
        },
        {
          id: 5,
          applicant: {
            id: 105,
            name: "Hoàng Văn E",
            avatar: null,
            email: "hoangvane@gmail.com",
            phone: "0945678901",
            position: "DevOps Engineer",
          },
          job: {
            id: 5,
            title: "DevOps Engineer",
          },
          scheduledAt: "2024-06-15T11:00:00Z",
          type: "offline",
          location: "Văn phòng công ty, tầng 5, tòa nhà ABC, Hà Nội",
          status: "scheduled",
          note: "Phỏng vấn về kinh nghiệm với AWS và Docker",
          createdAt: "2024-05-22T11:30:45Z",
        },
      ],
      pagination: {
        total: 12,
        perPage: 10,
        currentPage: 1,
        totalPages: 2,
      },
    };
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["enterprise-interviews", searchQuery, statusFilter, currentPage],
    queryFn: fetchInterviews,
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

  // Xử lý hủy phỏng vấn
  const handleCancelInterview = () => {
    // Trong thực tế, bạn sẽ gọi API để hủy phỏng vấn
    // await apiClient.put(`/api/v1/enterprise/interviews/${interviewToCancel.id}/cancel`);
    
    toast.success(`Đã hủy lịch phỏng vấn với ${interviewToCancel.applicant.name}`);
    setShowCancelDialog(false);
    setInterviewToCancel(null);
    refetch();
  };

  // Xử lý lên lịch phỏng vấn
  const handleScheduleInterview = () => {
    // Trong thực tế, bạn sẽ gọi API để lên lịch phỏng vấn
    // await apiClient.post(`/api/v1/enterprise/interviews`, {
    //   applicantId: selectedApplicant.id,
    //   jobId: selectedApplicant.jobId,
    //   scheduledAt: `${dayjs(scheduleForm.date).format('YYYY-MM-DD')}T${scheduleForm.time}:00`,
    //   type: scheduleForm.type,
    //   location: scheduleForm.location,
    //   note: scheduleForm.note
    // });
    
    toast.success(`Đã lên lịch phỏng vấn với ${selectedApplicant.name}`);
    setShowScheduleDialog(false);
    setSelectedApplicant(null);
    setScheduleForm({
      date: new Date(),
      time: "09:00",
      type: "online",
      location: "",
      note: "",
    });
    refetch();
  };

  const renderStatus = (status) => {
    switch (status) {
      case "scheduled":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Đã lên lịch
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Đã hoàn thành
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            Đã hủy
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

  const renderInterviewType = (type) => {
    switch (type) {
      case "online":
        return (
          <div className="flex items-center">
            <Video className="h-4 w-4 mr-2 text-blue-500" />
            <span>Trực tuyến</span>
          </div>
        );
      case "offline":
        return (
          <div className="flex items-center">
            <UserCheck className="h-4 w-4 mr-2 text-green-500" />
            <span>Trực tiếp</span>
          </div>
        );
      default:
        return type;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý phỏng vấn</h1>
        <Button>
          <Link href="/enterprise/interviews" className="flex items-center">
            <Plus className="mr-2 h-4 w-4" /> Lên lịch phỏng vấn mới
          </Link>
        </Button>
      </div>

      {/* Thống kê */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Phỏng vấn sắp tới</p>
                <h3 className="text-2xl font-bold mt-2">
                  {data?.interviews.filter((interview) => interview.status === "scheduled").length || 0}
                </h3>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <CalendarIcon className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Đã hoàn thành</p>
                <h3 className="text-2xl font-bold mt-2">
                  {data?.interviews.filter((interview) => interview.status === "completed").length || 0}
                </h3>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <UserCheck className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Đã hủy</p>
                <h3 className="text-2xl font-bold mt-2">
                  {data?.interviews.filter((interview) => interview.status === "cancelled").length || 0}
                </h3>
              </div>
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <X className="h-5 w-5 text-red-600" />
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
                  placeholder="Tìm kiếm theo tên ứng viên, vị trí..."
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
                  <SelectItem value="scheduled">Đã lên lịch</SelectItem>
                  <SelectItem value="completed">Đã hoàn thành</SelectItem>
                  <SelectItem value="cancelled">Đã hủy</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Danh sách phỏng vấn */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách phỏng vấn</CardTitle>
          <CardDescription>
            Quản lý tất cả các cuộc phỏng vấn của doanh nghiệp
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
                      <TableHead>Ứng viên</TableHead>
                      <TableHead>Vị trí ứng tuyển</TableHead>
                      <TableHead>Thời gian</TableHead>
                      <TableHead>Hình thức</TableHead>
                      <TableHead>Địa điểm</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data?.interviews.map((interview) => (
                      <TableRow key={interview.id}>
                        <TableCell>
                          <div className="font-medium">{interview.applicant.name}</div>
                          <div className="text-sm text-gray-500">{interview.applicant.email}</div>
                        </TableCell>
                        <TableCell>{interview.job.title}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>{dayjs(interview.scheduledAt).format("DD/MM/YYYY")}</span>
                            <span className="text-sm text-gray-500">{dayjs(interview.scheduledAt).format("HH:mm")}</span>
                          </div>
                        </TableCell>
                        <TableCell>{renderInterviewType(interview.type)}</TableCell>
                        <TableCell>
                          <div className="max-w-[200px] truncate" title={interview.location}>
                            {interview.location}
                          </div>
                        </TableCell>
                        <TableCell>{renderStatus(interview.status)}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/enterprise/interviews/${interview.id}`}>
                                  <Eye className="h-4 w-4 mr-2" /> Xem chi tiết phỏng vấn
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/enterprise/applicants/${interview.applicant.id}`}>
                                  <User className="h-4 w-4 mr-2" /> Xem hồ sơ ứng viên
                                </Link>
                              </DropdownMenuItem>
                              {interview.status === "scheduled" && (
                                <>
                                  <DropdownMenuItem asChild>
                                    <Link href={`/enterprise/interviews/${interview.id}/edit`}>
                                      <Clock className="h-4 w-4 mr-2" /> Thay đổi lịch
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setInterviewToCancel(interview);
                                      setShowCancelDialog(true);
                                    }}
                                    className="text-red-600 focus:text-red-600"
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" /> Hủy phỏng vấn
                                  </DropdownMenuItem>
                                </>
                              )}
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

      {/* Dialog xác nhận hủy phỏng vấn */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận hủy phỏng vấn</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn hủy cuộc phỏng vấn với {interviewToCancel?.applicant.name} vào lúc {interviewToCancel && dayjs(interviewToCancel.scheduledAt).format("HH:mm DD/MM/YYYY")}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Đóng</AlertDialogCancel>
            <AlertDialogAction onClick={handleCancelInterview} className="bg-red-600 hover:bg-red-700">
              Hủy phỏng vấn
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Dialog lên lịch phỏng vấn */}
      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Lên lịch phỏng vấn</DialogTitle>
            <DialogDescription>
              Lên lịch phỏng vấn với ứng viên {selectedApplicant?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="date">Ngày phỏng vấn</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {scheduleForm.date ? (
                      dayjs(scheduleForm.date).format("DD/MM/YYYY")
                    ) : (
                      <span>Chọn ngày</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={scheduleForm.date}
                    onSelect={(date) => setScheduleForm({ ...scheduleForm, date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Thời gian</Label>
              <Input
                id="time"
                type="time"
                value={scheduleForm.time}
                onChange={(e) => setScheduleForm({ ...scheduleForm, time: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Hình thức phỏng vấn</Label>
              <Select
                value={scheduleForm.type}
                onValueChange={(value) => setScheduleForm({ ...scheduleForm, type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn hình thức" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="online">Trực tuyến</SelectItem>
                  <SelectItem value="offline">Trực tiếp</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">
                {scheduleForm.type === "online" ? "Link phỏng vấn" : "Địa điểm phỏng vấn"}
              </Label>
              <Input
                id="location"
                value={scheduleForm.location}
                onChange={(e) => setScheduleForm({ ...scheduleForm, location: e.target.value })}
                placeholder={
                  scheduleForm.type === "online"
                    ? "Link Google Meet, Zoom, ..."
                    : "Địa chỉ văn phòng"
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="note">Ghi chú</Label>
              <Textarea
                id="note"
                value={scheduleForm.note}
                onChange={(e) => setScheduleForm({ ...scheduleForm, note: e.target.value })}
                placeholder="Thông tin thêm về cuộc phỏng vấn"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowScheduleDialog(false)}>
              Hủy
            </Button>
            <Button onClick={handleScheduleInterview}>
              Lên lịch phỏng vấn
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 
