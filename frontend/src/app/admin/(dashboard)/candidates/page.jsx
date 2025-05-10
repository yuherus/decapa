"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import PaginationBar from "@/components/shared/PaginationBar";
import { Search, Filter, Eye, Download, CheckCircle, XCircle, AlertCircle, User, Briefcase, GraduationCap, MapPin } from "lucide-react";

export default function AdminCandidatesPage() {
  // State cho tìm kiếm và lọc
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [verifiedFilter, setVerifiedFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showCandidateSheet, setShowCandidateSheet] = useState(false);
  const [showVerifyDialog, setShowVerifyDialog] = useState(false);
  const [verifyAction, setVerifyAction] = useState("approve");
  const [verifyNote, setVerifyNote] = useState("");
  const [showBlockDialog, setShowBlockDialog] = useState(false);
  const [blockReason, setBlockReason] = useState("");

  // Fetch danh sách ứng viên
  const fetchCandidates = async () => {
    // Trong thực tế, bạn sẽ gọi API với các tham số tìm kiếm và lọc
    // const { data } = await apiClient.get("/api/v1/admin/candidates", {
    //   params: { 
    //     search: searchQuery, 
    //     status: statusFilter, 
    //     verified: verifiedFilter,
    //     page: currentPage 
    //   }
    // });
    // return data;

    // Dữ liệu mẫu
    return {
      data: [
        {
          id: 1,
          name: "Nguyễn Văn A",
          avatar: null,
          email: "nguyenvana@gmail.com",
          phone: "0901234567",
          position: "Frontend Developer",
          skills: ["React", "TypeScript", "Tailwind CSS"],
          experience: "3 năm",
          education: "Đại học Bách Khoa Hà Nội",
          location: "Hà Nội",
          verified: true,
          status: "active",
          registeredAt: "2024-05-10T10:30:00Z",
          lastActive: "2024-05-20T15:45:00Z",
          completionRate: 85,
          appliedJobs: 12,
          savedJobs: 8,
          about: "Tôi là một Frontend Developer với 3 năm kinh nghiệm, chuyên về React và TypeScript. Tôi đam mê xây dựng giao diện người dùng đẹp và trải nghiệm người dùng tuyệt vời.",
          workExperience: [
            {
              company: "Tech Solutions",
              position: "Frontend Developer",
              duration: "2021 - Hiện tại",
              description: "Phát triển và duy trì các ứng dụng web sử dụng React, TypeScript và Tailwind CSS."
            },
            {
              company: "Digital Agency",
              position: "Junior Developer",
              duration: "2019 - 2021",
              description: "Làm việc với HTML, CSS, JavaScript và jQuery để xây dựng các trang web responsive."
            }
          ],
          educationDetails: [
            {
              school: "Đại học Bách Khoa Hà Nội",
              degree: "Kỹ sư Công nghệ thông tin",
              duration: "2015 - 2019"
            }
          ],
          cvUrl: "/sample-cv.pdf"
        },
        {
          id: 2,
          name: "Trần Thị B",
          avatar: "/avatars/female-1.jpg",
          email: "tranthib@gmail.com",
          phone: "0912345678",
          position: "UX/UI Designer",
          skills: ["Figma", "Adobe XD", "User Research"],
          experience: "4 năm",
          education: "Đại học FPT",
          location: "Hồ Chí Minh",
          verified: true,
          status: "active",
          registeredAt: "2024-04-15T09:20:00Z",
          lastActive: "2024-05-19T11:30:00Z",
          completionRate: 95,
          appliedJobs: 8,
          savedJobs: 15,
          about: "Tôi là một UX/UI Designer với 4 năm kinh nghiệm, chuyên về thiết kế trải nghiệm người dùng và giao diện người dùng. Tôi có kinh nghiệm làm việc với các công ty lớn và nhỏ.",
          workExperience: [
            {
              company: "Creative Studio",
              position: "Senior UX/UI Designer",
              duration: "2022 - Hiện tại",
              description: "Thiết kế trải nghiệm người dùng và giao diện người dùng cho các ứng dụng di động và web."
            },
            {
              company: "Design Agency",
              position: "UX/UI Designer",
              duration: "2020 - 2022",
              description: "Thiết kế giao diện người dùng và thực hiện nghiên cứu người dùng."
            }
          ],
          educationDetails: [
            {
              school: "Đại học FPT",
              degree: "Cử nhân Thiết kế đồ họa",
              duration: "2016 - 2020"
            }
          ],
          cvUrl: "/sample-cv.pdf"
        },
        {
          id: 3,
          name: "Lê Văn C",
          avatar: "/avatars/male-1.jpg",
          email: "levanc@gmail.com",
          phone: "0923456789",
          position: "Backend Developer",
          skills: ["Node.js", "Express", "MongoDB"],
          experience: "2 năm",
          education: "Đại học Công nghệ - ĐHQGHN",
          location: "Hà Nội",
          verified: false,
          status: "pending",
          registeredAt: "2024-05-18T14:10:00Z",
          lastActive: "2024-05-18T14:30:00Z",
          completionRate: 60,
          appliedJobs: 0,
          savedJobs: 3,
          about: "Tôi là một Backend Developer với 2 năm kinh nghiệm, chuyên về Node.js, Express và MongoDB. Tôi đam mê xây dựng các API hiệu quả và hệ thống backend mạnh mẽ.",
          workExperience: [
            {
              company: "Web Solutions",
              position: "Backend Developer",
              duration: "2022 - Hiện tại",
              description: "Phát triển và duy trì các API và hệ thống backend sử dụng Node.js, Express và MongoDB."
            },
            {
              company: "Tech Startup",
              position: "Junior Developer",
              duration: "2021 - 2022",
              description: "Làm việc với JavaScript và Node.js để xây dựng các ứng dụng web."
            }
          ],
          educationDetails: [
            {
              school: "Đại học Công nghệ - ĐHQGHN",
              degree: "Cử nhân Công nghệ thông tin",
              duration: "2017 - 2021"
            }
          ],
          cvUrl: "/sample-cv.pdf"
        },
        {
          id: 4,
          name: "Phạm Thị D",
          avatar: null,
          email: "phamthid@gmail.com",
          phone: "0934567890",
          position: "Product Manager",
          skills: ["Agile", "Scrum", "Product Development"],
          experience: "5 năm",
          education: "Đại học Kinh tế Quốc dân",
          location: "Hà Nội",
          verified: true,
          status: "blocked",
          registeredAt: "2024-03-20T11:15:00Z",
          lastActive: "2024-05-01T09:45:00Z",
          completionRate: 90,
          appliedJobs: 5,
          savedJobs: 10,
          about: "Tôi là một Product Manager với 5 năm kinh nghiệm, chuyên về phát triển sản phẩm và quản lý dự án. Tôi có kinh nghiệm làm việc với các đội ngũ phát triển sản phẩm và đưa sản phẩm ra thị trường.",
          workExperience: [
            {
              company: "Product Co.",
              position: "Product Manager",
              duration: "2021 - Hiện tại",
              description: "Quản lý vòng đời sản phẩm từ ý tưởng đến ra mắt và phát triển tiếp theo."
            },
            {
              company: "Tech Company",
              position: "Associate Product Manager",
              duration: "2019 - 2021",
              description: "Hỗ trợ quản lý sản phẩm và làm việc với các đội ngũ phát triển."
            }
          ],
          educationDetails: [
            {
              school: "Đại học Kinh tế Quốc dân",
              degree: "Thạc sĩ Quản trị kinh doanh",
              duration: "2017 - 2019"
            },
            {
              school: "Đại học Kinh tế Quốc dân",
              degree: "Cử nhân Kinh tế",
              duration: "2013 - 2017"
            }
          ],
          cvUrl: "/sample-cv.pdf",
          blockReason: "Vi phạm điều khoản sử dụng: Đăng thông tin không phù hợp"
        },
        {
          id: 5,
          name: "Hoàng Văn E",
          avatar: "/avatars/male-2.jpg",
          email: "hoangvane@gmail.com",
          phone: "0945678901",
          position: "DevOps Engineer",
          skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
          experience: "3 năm",
          education: "Đại học Bách Khoa TP.HCM",
          location: "Hồ Chí Minh",
          verified: false,
          status: "pending",
          registeredAt: "2024-05-17T16:20:00Z",
          lastActive: "2024-05-17T16:45:00Z",
          completionRate: 75,
          appliedJobs: 0,
          savedJobs: 5,
          about: "Tôi là một DevOps Engineer với 3 năm kinh nghiệm, chuyên về Docker, Kubernetes và AWS. Tôi đam mê xây dựng và duy trì hệ thống CI/CD và cơ sở hạ tầng đám mây.",
          workExperience: [
            {
              company: "Cloud Solutions",
              position: "DevOps Engineer",
              duration: "2022 - Hiện tại",
              description: "Quản lý cơ sở hạ tầng đám mây trên AWS và triển khai các ứng dụng sử dụng Docker và Kubernetes."
            },
            {
              company: "Tech Corp",
              position: "System Administrator",
              duration: "2020 - 2022",
              description: "Quản lý hệ thống máy chủ và cơ sở hạ tầng IT."
            }
          ],
          educationDetails: [
            {
              school: "Đại học Bách Khoa TP.HCM",
              degree: "Kỹ sư Khoa học máy tính",
              duration: "2016 - 2020"
            }
          ],
          cvUrl: "/sample-cv.pdf"
        }
      ],
      pagination: {
        total: 28,
        perPage: 10,
        currentPage: 1,
        totalPages: 3,
      }
    };
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["admin-candidates", searchQuery, statusFilter, verifiedFilter, currentPage],
    queryFn: fetchCandidates,
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

  // Xử lý xem chi tiết ứng viên
  const handleViewCandidate = (candidate) => {
    setSelectedCandidate(candidate);
    setShowCandidateSheet(true);
  };

  // Xử lý xác minh ứng viên
  const handleVerifyCandidate = (candidate, action) => {
    setSelectedCandidate(candidate);
    setVerifyAction(action);
    setVerifyNote("");
    setShowVerifyDialog(true);
  };

  // Xử lý gửi xác minh
  const handleConfirmVerify = async () => {
    try {
      // Trong thực tế, bạn sẽ gọi API để xác minh ứng viên
      // await apiClient.post(`/api/v1/admin/candidates/${selectedCandidate.id}/verify`, {
      //   action: verifyAction,
      //   note: verifyNote
      // });

      toast.success(
        verifyAction === "approve" 
          ? "Đã xác minh ứng viên thành công" 
          : "Đã từ chối xác minh ứng viên"
      );
      setShowVerifyDialog(false);
      refetch();
    } catch (error) {
      toast.error("Có lỗi xảy ra khi xác minh ứng viên");
      console.error(error);
    }
  };

  // Xử lý chặn/bỏ chặn ứng viên
  const handleToggleBlockCandidate = (candidate) => {
    if (candidate.status === "blocked") {
      // Bỏ chặn ứng viên
      try {
        // Trong thực tế, bạn sẽ gọi API để bỏ chặn ứng viên
        // await apiClient.post(`/api/v1/admin/candidates/${candidate.id}/unblock`);

        toast.success("Đã bỏ chặn ứng viên thành công");
        refetch();
      } catch (error) {
        toast.error("Có lỗi xảy ra khi bỏ chặn ứng viên");
        console.error(error);
      }
    } else {
      // Hiển thị dialog chặn ứng viên
      setSelectedCandidate(candidate);
      setBlockReason("");
      setShowBlockDialog(true);
    }
  };

  // Xử lý gửi yêu cầu chặn ứng viên
  const handleConfirmBlock = async () => {
    try {
      // Trong thực tế, bạn sẽ gọi API để chặn ứng viên
      // await apiClient.post(`/api/v1/admin/candidates/${selectedCandidate.id}/block`, {
      //   reason: blockReason
      // });

      toast.success("Đã chặn ứng viên thành công");
      setShowBlockDialog(false);
      refetch();
    } catch (error) {
      toast.error("Có lỗi xảy ra khi chặn ứng viên");
      console.error(error);
    }
  };

  // Xử lý tải CV
  const handleDownloadCV = (candidate) => {
    if (candidate?.cvUrl) {
      const link = document.createElement('a');
      link.href = candidate.cvUrl;
      link.download = `CV-${candidate.name}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Hiển thị trạng thái ứng viên
  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">Hoạt động</Badge>;
      case "pending":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">Chờ xác minh</Badge>;
      case "blocked":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">Đã chặn</Badge>;
      default:
        return null;
    }
  };

  // Tạo chữ cái đầu cho avatar fallback
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý hồ sơ ứng viên</h1>
      </div>

      {/* Bộ lọc và tìm kiếm */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Tìm kiếm theo tên, email, kỹ năng..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>

            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả trạng thái</SelectItem>
                  <SelectItem value="active">Hoạt động</SelectItem>
                  <SelectItem value="pending">Chờ xác minh</SelectItem>
                  <SelectItem value="blocked">Đã chặn</SelectItem>
                </SelectContent>
              </Select>

              <Select value={verifiedFilter} onValueChange={setVerifiedFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Xác minh" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="verified">Đã xác minh</SelectItem>
                  <SelectItem value="unverified">Chưa xác minh</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bảng danh sách ứng viên */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách ứng viên</CardTitle>
          <CardDescription>
            Quản lý và theo dõi tất cả ứng viên đã đăng ký trên hệ thống
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
                      <TableHead>Vị trí</TableHead>
                      <TableHead>Địa điểm</TableHead>
                      <TableHead>Ngày đăng ký</TableHead>
                      <TableHead>Hoạt động gần đây</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead>Xác minh</TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data?.data.map((candidate) => (
                      <TableRow key={candidate.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={candidate.avatar} alt={candidate.name} />
                              <AvatarFallback>{getInitials(candidate.name)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{candidate.name}</div>
                              <div className="text-sm text-gray-500">{candidate.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{candidate.position}</TableCell>
                        <TableCell>{candidate.location}</TableCell>
                        <TableCell>{dayjs(candidate.registeredAt).format("DD/MM/YYYY")}</TableCell>
                        <TableCell>{dayjs(candidate.lastActive).format("DD/MM/YYYY HH:mm")}</TableCell>
                        <TableCell>{getStatusBadge(candidate.status)}</TableCell>
                        <TableCell>
                          {candidate.verified ? (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
                              Đã xác minh
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-300">
                              Chưa xác minh
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleViewCandidate(candidate)}
                              title="Xem chi tiết"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDownloadCV(candidate)}
                              title="Tải CV"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            {!candidate.verified && candidate.status === "pending" && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleVerifyCandidate(candidate, "approve")}
                                title="Xác minh"
                                className="text-green-600"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleToggleBlockCandidate(candidate)}
                              title={candidate.status === "blocked" ? "Bỏ chặn" : "Chặn"}
                              className={candidate.status === "blocked" ? "text-green-600" : "text-red-600"}
                            >
                              {candidate.status === "blocked" ? (
                                <CheckCircle className="h-4 w-4" />
                              ) : (
                                <XCircle className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {data?.pagination.totalPages > 1 && (
                <div className="flex justify-center mt-6">
                  <PaginationBar
                    currentPage={currentPage}
                    totalPages={data.pagination.totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Sheet hiển thị thông tin chi tiết ứng viên */}
      <Sheet open={showCandidateSheet} onOpenChange={setShowCandidateSheet} side="right" className="w-full sm:max-w-xl">
        <SheetContent className="overflow-y-auto sm:max-w-xl">
          {selectedCandidate && (
            <>
              <SheetHeader className="text-left mb-6">
                <SheetTitle>Thông tin ứng viên</SheetTitle>
                <SheetDescription>
                  Chi tiết về ứng viên và hồ sơ
                </SheetDescription>
              </SheetHeader>
              
              <div className="space-y-6">
                {/* Thông tin cơ bản */}
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={selectedCandidate.avatar} alt={selectedCandidate.name} />
                    <AvatarFallback className="text-xl">{getInitials(selectedCandidate.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{selectedCandidate.name}</h3>
                    <p className="text-gray-500">{selectedCandidate.position}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-500">{selectedCandidate.location}</span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      {getStatusBadge(selectedCandidate.status)}
                      {selectedCandidate.verified ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
                          Đã xác minh
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-300">
                          Chưa xác minh
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Thông tin liên hệ */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{selectedCandidate.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Số điện thoại</p>
                    <p className="font-medium">{selectedCandidate.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Ngày đăng ký</p>
                    <p className="font-medium">{dayjs(selectedCandidate.registeredAt).format("DD/MM/YYYY")}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Hoạt động gần đây</p>
                    <p className="font-medium">{dayjs(selectedCandidate.lastActive).format("DD/MM/YYYY HH:mm")}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Mức độ hoàn thiện hồ sơ</p>
                    <p className="font-medium">{selectedCandidate.completionRate}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Số việc đã ứng tuyển</p>
                    <p className="font-medium">{selectedCandidate.appliedJobs}</p>
                  </div>
                </div>

                {/* Tabs thông tin chi tiết */}
                <Tabs defaultValue="about" className="mt-6">
                  <TabsList className="grid grid-cols-4 mb-4">
                    <TabsTrigger value="about">Giới thiệu</TabsTrigger>
                    <TabsTrigger value="experience">Kinh nghiệm</TabsTrigger>
                    <TabsTrigger value="education">Học vấn</TabsTrigger>
                    <TabsTrigger value="skills">Kỹ năng</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="about" className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <User className="h-4 w-4" /> Giới thiệu
                      </h4>
                      <p className="text-gray-700">{selectedCandidate.about}</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="experience" className="space-y-4">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Briefcase className="h-4 w-4" /> Kinh nghiệm làm việc
                    </h4>
                    {selectedCandidate.workExperience.map((exp, index) => (
                      <div key={index} className="border-l-2 border-gray-200 pl-4 pb-4">
                        <div className="flex justify-between">
                          <h5 className="font-medium">{exp.position}</h5>
                          <span className="text-sm text-gray-500">{exp.duration}</span>
                        </div>
                        <p className="text-gray-700">{exp.company}</p>
                        <p className="text-sm text-gray-600 mt-2">{exp.description}</p>
                      </div>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="education" className="space-y-4">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" /> Học vấn
                    </h4>
                    {selectedCandidate.educationDetails.map((edu, index) => (
                      <div key={index} className="border-l-2 border-gray-200 pl-4 pb-4">
                        <div className="flex justify-between">
                          <h5 className="font-medium">{edu.school}</h5>
                          <span className="text-sm text-gray-500">{edu.duration}</span>
                        </div>
                        <p className="text-gray-700">{edu.degree}</p>
                      </div>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="skills" className="space-y-4">
                    <h4 className="font-medium mb-2">Kỹ năng</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCandidate.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Nút tải CV */}
                <div className="mt-6">
                  <Button 
                    onClick={() => handleDownloadCV(selectedCandidate)} 
                    variant="outline" 
                    className="w-full"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Tải CV
                  </Button>
                </div>

                {/* Nút hành động */}
                <div className="mt-4 flex gap-2">
                  {!selectedCandidate.verified && selectedCandidate.status === "pending" && (
                    <Button 
                      onClick={() => {
                        setShowCandidateSheet(false);
                        handleVerifyCandidate(selectedCandidate, "approve");
                      }}
                      className="flex-1"
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Xác minh
                    </Button>
                  )}
                  
                  {selectedCandidate.status === "blocked" ? (
                    <Button 
                      onClick={() => {
                        setShowCandidateSheet(false);
                        handleToggleBlockCandidate(selectedCandidate);
                      }}
                      variant="outline"
                      className="flex-1"
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Bỏ chặn
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => {
                        setShowCandidateSheet(false);
                        handleToggleBlockCandidate(selectedCandidate);
                      }}
                      variant="outline"
                      className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Chặn
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Dialog xác minh ứng viên */}
      <Dialog open={showVerifyDialog} onOpenChange={setShowVerifyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {verifyAction === "approve" ? "Xác minh ứng viên" : "Từ chối xác minh"}
            </DialogTitle>
            <DialogDescription>
              {verifyAction === "approve" 
                ? "Xác minh hồ sơ của ứng viên này để cho phép họ sử dụng đầy đủ tính năng của hệ thống."
                : "Từ chối xác minh hồ sơ của ứng viên này và cung cấp lý do."}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={selectedCandidate?.avatar} alt={selectedCandidate?.name} />
                <AvatarFallback>{selectedCandidate?.name ? getInitials(selectedCandidate.name) : "UV"}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{selectedCandidate?.name}</p>
                <p className="text-sm text-gray-500">{selectedCandidate?.email}</p>
              </div>
            </div>
            
            <div>
              <label htmlFor="verify-note" className="text-sm font-medium">
                {verifyAction === "approve" ? "Ghi chú (không bắt buộc)" : "Lý do từ chối"}
              </label>
              <textarea
                id="verify-note"
                className="mt-1 w-full rounded-md border border-gray-300 p-2 text-sm"
                rows={3}
                value={verifyNote}
                onChange={(e) => setVerifyNote(e.target.value)}
                placeholder={verifyAction === "approve" 
                  ? "Thêm ghi chú về ứng viên này (không bắt buộc)"
                  : "Vui lòng cung cấp lý do từ chối xác minh"}
                required={verifyAction === "reject"}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowVerifyDialog(false)}>
              Hủy
            </Button>
            <Button 
              onClick={handleConfirmVerify}
              variant={verifyAction === "approve" ? "default" : "destructive"}
              disabled={verifyAction === "reject" && !verifyNote.trim()}
            >
              {verifyAction === "approve" ? "Xác nhận xác minh" : "Xác nhận từ chối"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog chặn/bỏ chặn ứng viên */}
      <Dialog open={showBlockDialog} onOpenChange={setShowBlockDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedCandidate?.status === "blocked" ? "Bỏ chặn ứng viên" : "Chặn ứng viên"}
            </DialogTitle>
            <DialogDescription>
              {selectedCandidate?.status === "blocked" 
                ? "Bỏ chặn ứng viên này để cho phép họ tiếp tục sử dụng hệ thống."
                : "Chặn ứng viên này để ngăn họ sử dụng hệ thống và cung cấp lý do."}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={selectedCandidate?.avatar} alt={selectedCandidate?.name} />
                <AvatarFallback>{selectedCandidate?.name ? getInitials(selectedCandidate.name) : "UV"}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{selectedCandidate?.name}</p>
                <p className="text-sm text-gray-500">{selectedCandidate?.email}</p>
              </div>
            </div>
            
            {selectedCandidate?.status !== "blocked" && (
              <div>
                <label htmlFor="block-reason" className="text-sm font-medium">
                  Lý do chặn
                </label>
                <textarea
                  id="block-reason"
                  className="mt-1 w-full rounded-md border border-gray-300 p-2 text-sm"
                  rows={3}
                  value={blockReason}
                  onChange={(e) => setBlockReason(e.target.value)}
                  placeholder="Vui lòng cung cấp lý do chặn ứng viên này"
                  required
                />
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBlockDialog(false)}>
              Hủy
            </Button>
            <Button 
              onClick={handleConfirmBlock}
              variant={selectedCandidate?.status === "blocked" ? "default" : "destructive"}
              disabled={selectedCandidate?.status !== "blocked" && !blockReason.trim()}
            >
              {selectedCandidate?.status === "blocked" ? "Xác nhận bỏ chặn" : "Xác nhận chặn"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
