"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from "@/components/ui/avatar";
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
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Search,
  Filter,
  MoreVertical,
  Star,
  Mail,
  Calendar,
  Trash2,
  FileText,
  MessageSquare,
  User,
  Bookmark,
  BookmarkCheck,
  ArrowUpDown,
  Eye,
  MapPin,
  Briefcase,
  GraduationCap,
  Phone,
  Clock,
  Building,
  CheckCircle,
  XCircle
} from "lucide-react";
import PaginationBar from "@/components/shared/PaginationBar";

export default function SavedCandidatesPage() {
  // State cho tìm kiếm và lọc
  const [searchQuery, setSearchQuery] = useState("");
  const [jobFilter, setJobFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [candidateToRemove, setCandidateToRemove] = useState(null);
  const [sortBy, setSortBy] = useState("savedDate");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showCandidateSheet, setShowCandidateSheet] = useState(false);

  // Fetch danh sách ứng viên đã lưu
  const fetchSavedCandidates = async () => {
    // Trong thực tế, bạn sẽ gọi API với các tham số tìm kiếm và lọc
    // const { data } = await apiClient.get("/api/v1/enterprise/saved-candidates", {
    //   params: { 
    //     search: searchQuery, 
    //     job: jobFilter, 
    //     status: statusFilter, 
    //     page: currentPage,
    //     sortBy: sortBy,
    //     sortOrder: sortOrder
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
          matchRate: 92,
          savedDate: "2024-05-20T10:30:00Z",
          status: "applied",
          appliedJob: {
            id: 1,
            title: "Senior Frontend Developer",
          },
          note: "Ứng viên có kinh nghiệm tốt với React và TypeScript",
          location: "Hà Nội",
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
          ]
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
          matchRate: 88,
          savedDate: "2024-05-18T14:20:00Z",
          status: "interviewed",
          appliedJob: {
            id: 2,
            title: "Senior UX/UI Designer",
          },
          note: "Đã phỏng vấn vòng 1, ấn tượng với portfolio",
          location: "Hồ Chí Minh",
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
          ]
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
          matchRate: 85,
          savedDate: "2024-05-15T09:45:00Z",
          status: "hired",
          appliedJob: {
            id: 3,
            title: "Backend Developer",
          },
          note: "Đã nhận việc, bắt đầu làm từ 01/06/2024",
          location: "Hà Nội",
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
          ]
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
          matchRate: 90,
          savedDate: "2024-05-12T16:30:00Z",
          status: "rejected",
          appliedJob: {
            id: 4,
            title: "Senior Product Manager",
          },
          note: "Không phù hợp với văn hóa công ty",
          location: "Hà Nội",
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
          ]
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
          matchRate: 94,
          savedDate: "2024-05-10T11:15:00Z",
          status: "applied",
          appliedJob: {
            id: 5,
            title: "DevOps Engineer",
          },
          note: "Kinh nghiệm tốt với AWS và Docker",
          location: "Hồ Chí Minh",
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
          ]
        },
        {
          id: 6,
          name: "Ngô Thị F",
          avatar: "/avatars/female-2.jpg",
          email: "ngothif@gmail.com",
          phone: "0956789012",
          position: "Data Analyst",
          skills: ["SQL", "Python", "Power BI", "Data Visualization"],
          experience: "2 năm",
          education: "Đại học Khoa học Tự nhiên TP.HCM",
          matchRate: 87,
          savedDate: "2024-05-08T09:20:00Z",
          status: "applied",
          appliedJob: {
            id: 6,
            title: "Data Analyst",
          },
          note: "Có kinh nghiệm với phân tích dữ liệu lớn",
          location: "Hồ Chí Minh",
          about: "Tôi là một Data Analyst với 2 năm kinh nghiệm, chuyên về SQL, Python và Power BI. Tôi đam mê phân tích dữ liệu và tạo ra các báo cáo trực quan để hỗ trợ ra quyết định kinh doanh.",
          workExperience: [
            {
              company: "Data Insights",
              position: "Data Analyst",
              duration: "2022 - Hiện tại",
              description: "Phân tích dữ liệu kinh doanh và tạo ra các báo cáo trực quan sử dụng Power BI."
            },
            {
              company: "E-commerce Company",
              position: "Junior Analyst",
              duration: "2021 - 2022",
              description: "Hỗ trợ phân tích dữ liệu khách hàng và báo cáo hiệu suất kinh doanh."
            }
          ],
          educationDetails: [
            {
              school: "Đại học Khoa học Tự nhiên TP.HCM",
              degree: "Cử nhân Toán học ứng dụng",
              duration: "2017 - 2021"
            }
          ]
        },
      ],
      pagination: {
        total: 12,
        perPage: 10,
        currentPage: 1,
        totalPages: 2,
      },
      jobs: [
        { id: 1, title: "Senior Frontend Developer" },
        { id: 2, title: "Senior UX/UI Designer" },
        { id: 3, title: "Backend Developer" },
        { id: 4, title: "Senior Product Manager" },
        { id: 5, title: "DevOps Engineer" },
        { id: 6, title: "Data Analyst" },
      ],
    };
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["saved-candidates", searchQuery, jobFilter, statusFilter, currentPage, sortBy, sortOrder],
    queryFn: fetchSavedCandidates,
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

  // Xử lý xóa ứng viên khỏi danh sách đã lưu
  const handleRemoveCandidate = () => {
    // Trong thực tế, bạn sẽ gọi API để xóa
    // await apiClient.delete(`/api/v1/enterprise/saved-candidates/${candidateToRemove.id}`);
    
    // Cập nhật UI
    refetch();
    setShowRemoveDialog(false);
  };

  // Xử lý xem chi tiết ứng viên
  const handleViewCandidate = (candidate) => {
    setSelectedCandidate(candidate);
    setShowCandidateSheet(true);
  };

  // Hiển thị trạng thái ứng viên
  const getStatusBadge = (status) => {
    switch (status) {
      case "applied":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">Đã ứng tuyển</Badge>;
      case "interviewed":
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-300">Đã phỏng vấn</Badge>;
      case "hired":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">Đã tuyển dụng</Badge>;
      case "rejected":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">Đã từ chối</Badge>;
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
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Ứng viên đã lưu</h1>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <form onSubmit={handleSearch} className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Tìm kiếm theo tên, email, kỹ năng..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit">Tìm kiếm</Button>
            </form>

            <div className="flex gap-2">
              <Select value={jobFilter} onValueChange={setJobFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Vị trí ứng tuyển" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả vị trí</SelectItem>
                  {data?.jobs?.map((job) => (
                    <SelectItem key={job.id} value={job.id.toString()}>
                      {job.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả trạng thái</SelectItem>
                  <SelectItem value="applied">Đã ứng tuyển</SelectItem>
                  <SelectItem value="interviewed">Đã phỏng vấn</SelectItem>
                  <SelectItem value="hired">Đã tuyển dụng</SelectItem>
                  <SelectItem value="rejected">Đã từ chối</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách ứng viên đã lưu</CardTitle>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {data?.data.map((candidate) => (
                  <Card 
                    key={candidate.id} 
                    className="overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer"
                    onClick={() => handleViewCandidate(candidate)}
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center mb-4">
                        <Avatar className="h-20 w-20 mb-3">
                          <AvatarImage src={candidate.avatar} />
                          <AvatarFallback className="text-lg">
                            {getInitials(candidate.name)}
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="font-medium text-lg">{candidate.name}</h3>
                        <p className="text-gray-500 text-sm">{candidate.position}</p>
                        
                        <div className="flex items-center mt-2 text-sm text-gray-500">
                          <MapPin size={14} className="mr-1" />
                          <span>{candidate.location}</span>
                        </div>
                        
                        <div className="mt-3 flex flex-wrap justify-center gap-1">
                          {candidate.skills.slice(0, 3).map((skill, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                            >
                              {skill}
                            </Badge>
                          ))}
                          {candidate.skills.length > 3 && (
                            <Badge
                              variant="secondary"
                              className="text-xs"
                            >
                              +{candidate.skills.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-medium">
                              {candidate.matchRate}%
                            </div>
                            <span className="text-sm text-gray-500 ml-2">Phù hợp</span>
                          </div>
                          <div>
                            {getStatusBadge(candidate.status)}
                          </div>
                        </div>
                        
                        <div className="mt-3 text-sm text-gray-500">
                          <p className="truncate" title={candidate.appliedJob.title}>
                            Vị trí: {candidate.appliedJob.title}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
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
                  Chi tiết về ứng viên và thông tin liên hệ
                </SheetDescription>
              </SheetHeader>
              
              <div className="space-y-6">
                {/* Thông tin cơ bản */}
                <div className="flex flex-col items-center text-center mb-6">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={selectedCandidate.avatar} />
                    <AvatarFallback className="text-xl">
                      {getInitials(selectedCandidate.name)}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold">{selectedCandidate.name}</h2>
                  <p className="text-gray-500">{selectedCandidate.position}</p>
                  
                  <div className="flex items-center mt-2 text-gray-500">
                    <MapPin size={16} className="mr-1" />
                    <span>{selectedCandidate.location}</span>
                  </div>
                  
                  <div className="mt-4 flex justify-center">
                    {getStatusBadge(selectedCandidate.status)}
                  </div>
                  
                  <div className="mt-4 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-medium text-lg">
                      {selectedCandidate.matchRate}%
                    </div>
                    <span className="text-gray-500 ml-2">Phù hợp với vị trí</span>
                  </div>
                </div>
                
                {/* Tabs thông tin */}
                <Tabs defaultValue="profile" className="w-full">
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="profile">Hồ sơ</TabsTrigger>
                    <TabsTrigger value="contact">Liên hệ</TabsTrigger>
                    <TabsTrigger value="application">Ứng tuyển</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="profile" className="space-y-4">
                    {/* Giới thiệu */}
                    <div className="space-y-2">
                      <h3 className="font-medium text-gray-900">Giới thiệu</h3>
                      <p className="text-gray-600 text-sm">{selectedCandidate.about}</p>
                    </div>
                    
                    {/* Kỹ năng */}
                    <div className="space-y-2">
                      <h3 className="font-medium text-gray-900">Kỹ năng</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedCandidate.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    {/* Kinh nghiệm làm việc */}
                    <div className="space-y-2">
                      <h3 className="font-medium text-gray-900">Kinh nghiệm làm việc</h3>
                      <div className="space-y-3">
                        {selectedCandidate.workExperience.map((exp, index) => (
                          <div key={index} className="border-l-2 border-gray-200 pl-4 py-1">
                            <div className="font-medium">{exp.position}</div>
                            <div className="text-sm text-gray-600">{exp.company}</div>
                            <div className="text-xs text-gray-500">{exp.duration}</div>
                            <p className="text-sm text-gray-600 mt-1">{exp.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="contact" className="space-y-4">
                    {/* Liên hệ */}
                    <div className="space-y-2">
                      <h3 className="font-medium text-gray-900">Thông tin liên hệ</h3>
                      <p className="text-gray-600 text-sm">Email: {selectedCandidate.email}</p>
                      <p className="text-gray-600 text-sm">Số điện thoại: {selectedCandidate.phone}</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="application" className="space-y-4">
                    {/* Thông tin ứng tuyển */}
                    <div className="space-y-2">
                      <h3 className="font-medium text-gray-900">Thông tin ứng tuyển</h3>
                      <p className="text-gray-600 text-sm">Vị trí: {selectedCandidate.appliedJob.title}</p>
                      <p className="text-gray-600 text-sm">Kinh nghiệm: {selectedCandidate.experience}</p>
                      <p className="text-gray-600 text-sm">Học vấn: {selectedCandidate.education}</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
} 
