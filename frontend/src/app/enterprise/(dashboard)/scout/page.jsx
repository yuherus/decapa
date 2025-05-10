"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  DialogDescription
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Briefcase,
  Building,
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  Search,
  Filter,
  GraduationCap,
  Award,
  Star,
  Send,
  User,
  BookOpen,
  Code,
  Globe,
  CheckCircle2
} from "lucide-react";
import PaginationBar from "@/components/shared/PaginationBar";
import { toast } from "sonner";

export default function ScoutPage() {
  // State cho tìm kiếm và lọc
  const [searchQuery, setSearchQuery] = useState("");
  const [skillFilter, setSkillFilter] = useState("all");
  const [experienceFilter, setExperienceFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showCandidateSheet, setShowCandidateSheet] = useState(false);
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [inviteForm, setInviteForm] = useState({
    jobId: "",
    message: "",
  });

  // Fetch danh sách ứng viên ẩn danh
  const fetchAnonymousCandidates = async () => {
    // Trong thực tế, bạn sẽ gọi API với các tham số tìm kiếm và lọc
    // const { data } = await apiClient.get("/api/v1/enterprise/scout", {
    //   params: { 
    //     search: searchQuery, 
    //     skill: skillFilter, 
    //     experience: experienceFilter,
    //     location: locationFilter,
    //     page: currentPage 
    //   }
    // });
    // return data;

    // Dữ liệu mẫu
    return {
      data: [
        {
          id: 1,
          anonymousId: "DEV-10045",
          avatar: null,
          position: "Frontend Developer",
          skills: ["React", "TypeScript", "Tailwind CSS", "Redux"],
          experience: "3 năm",
          education: "Đại học Bách Khoa Hà Nội",
          location: "Hà Nội",
          matchRate: 92,
          lastActive: "2024-05-20T10:30:00Z",
          about: "Frontend Developer với 3 năm kinh nghiệm, chuyên về React và TypeScript. Đam mê xây dựng giao diện người dùng đẹp và trải nghiệm người dùng tuyệt vời.",
          workExperience: [
            {
              position: "Frontend Developer",
              industry: "Công nghệ",
              duration: "2021 - Hiện tại",
              description: "Phát triển và duy trì các ứng dụng web sử dụng React, TypeScript và Tailwind CSS."
            },
            {
              position: "Junior Developer",
              industry: "Agency",
              duration: "2019 - 2021",
              description: "Làm việc với HTML, CSS, JavaScript và jQuery để xây dựng các trang web responsive."
            }
          ],
          educationDetails: [
            {
              degree: "Kỹ sư Công nghệ thông tin",
              school: "Đại học Bách Khoa Hà Nội",
              duration: "2015 - 2019"
            }
          ],
          languages: ["Tiếng Việt (Bản ngữ)", "Tiếng Anh (Thành thạo)"],
          certificates: ["AWS Certified Developer", "React Developer Certification"],
          openToWork: true
        },
        {
          id: 2,
          anonymousId: "DES-20078",
          avatar: null,
          position: "UX/UI Designer",
          skills: ["Figma", "Adobe XD", "User Research", "Wireframing", "Prototyping"],
          experience: "4 năm",
          education: "Đại học FPT",
          location: "Hồ Chí Minh",
          matchRate: 88,
          lastActive: "2024-05-18T14:20:00Z",
          about: "UX/UI Designer với 4 năm kinh nghiệm, chuyên về thiết kế trải nghiệm người dùng và giao diện người dùng. Có kinh nghiệm làm việc với các công ty lớn và nhỏ.",
          workExperience: [
            {
              position: "Senior UX/UI Designer",
              industry: "Studio thiết kế",
              duration: "2022 - Hiện tại",
              description: "Thiết kế trải nghiệm người dùng và giao diện người dùng cho các ứng dụng di động và web."
            },
            {
              position: "UX/UI Designer",
              industry: "Agency thiết kế",
              duration: "2020 - 2022",
              description: "Thiết kế giao diện người dùng và thực hiện nghiên cứu người dùng."
            }
          ],
          educationDetails: [
            {
              degree: "Cử nhân Thiết kế đồ họa",
              school: "Đại học FPT",
              duration: "2016 - 2020"
            }
          ],
          languages: ["Tiếng Việt (Bản ngữ)", "Tiếng Anh (Khá)"],
          certificates: ["UI/UX Design Professional", "Google UX Design Certificate"],
          openToWork: true
        },
        {
          id: 3,
          anonymousId: "BE-30056",
          avatar: null,
          position: "Backend Developer",
          skills: ["Node.js", "Express", "MongoDB", "RESTful API", "GraphQL"],
          experience: "2 năm",
          education: "Đại học Công nghệ - ĐHQGHN",
          location: "Hà Nội",
          matchRate: 85,
          lastActive: "2024-05-15T09:45:00Z",
          about: "Backend Developer với 2 năm kinh nghiệm, chuyên về Node.js, Express và MongoDB. Đam mê xây dựng các API hiệu quả và hệ thống backend mạnh mẽ.",
          workExperience: [
            {
              position: "Backend Developer",
              industry: "Công nghệ",
              duration: "2022 - Hiện tại",
              description: "Phát triển và duy trì các API và hệ thống backend sử dụng Node.js, Express và MongoDB."
            },
            {
              position: "Junior Developer",
              industry: "Startup công nghệ",
              duration: "2021 - 2022",
              description: "Làm việc với JavaScript và Node.js để xây dựng các ứng dụng web."
            }
          ],
          educationDetails: [
            {
              degree: "Cử nhân Công nghệ thông tin",
              school: "Đại học Công nghệ - ĐHQGHN",
              duration: "2017 - 2021"
            }
          ],
          languages: ["Tiếng Việt (Bản ngữ)", "Tiếng Anh (Khá)"],
          certificates: ["MongoDB Certified Developer", "Node.js Certification"],
          openToWork: true
        },
        {
          id: 4,
          anonymousId: "PM-40023",
          avatar: null,
          position: "Product Manager",
          skills: ["Agile", "Scrum", "Product Development", "User Stories", "Roadmapping"],
          experience: "5 năm",
          education: "Đại học Kinh tế Quốc dân",
          location: "Hà Nội",
          matchRate: 90,
          lastActive: "2024-05-12T16:30:00Z",
          about: "Product Manager với 5 năm kinh nghiệm, chuyên về phát triển sản phẩm và quản lý dự án. Có kinh nghiệm làm việc với các đội ngũ phát triển sản phẩm và đưa sản phẩm ra thị trường.",
          workExperience: [
            {
              position: "Product Manager",
              industry: "Công nghệ",
              duration: "2021 - Hiện tại",
              description: "Quản lý vòng đời sản phẩm từ ý tưởng đến ra mắt và phát triển tiếp theo."
            },
            {
              position: "Associate Product Manager",
              industry: "Công ty công nghệ",
              duration: "2019 - 2021",
              description: "Hỗ trợ quản lý sản phẩm và làm việc với các đội ngũ phát triển."
            }
          ],
          educationDetails: [
            {
              degree: "Thạc sĩ Quản trị kinh doanh",
              school: "Đại học Kinh tế Quốc dân",
              duration: "2017 - 2019"
            },
            {
              degree: "Cử nhân Kinh tế",
              school: "Đại học Kinh tế Quốc dân",
              duration: "2013 - 2017"
            }
          ],
          languages: ["Tiếng Việt (Bản ngữ)", "Tiếng Anh (Thành thạo)", "Tiếng Trung (Cơ bản)"],
          certificates: ["Certified Scrum Product Owner", "Product Management Professional"],
          openToWork: false
        },
        {
          id: 5,
          anonymousId: "DEV-50089",
          avatar: null,
          position: "DevOps Engineer",
          skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform", "Jenkins"],
          experience: "3 năm",
          education: "Đại học Bách Khoa TP.HCM",
          location: "Hồ Chí Minh",
          matchRate: 94,
          lastActive: "2024-05-10T11:15:00Z",
          about: "DevOps Engineer với 3 năm kinh nghiệm, chuyên về Docker, Kubernetes và AWS. Đam mê xây dựng và duy trì hệ thống CI/CD và cơ sở hạ tầng đám mây.",
          workExperience: [
            {
              position: "DevOps Engineer",
              industry: "Dịch vụ đám mây",
              duration: "2022 - Hiện tại",
              description: "Quản lý cơ sở hạ tầng đám mây trên AWS và triển khai các ứng dụng sử dụng Docker và Kubernetes."
            },
            {
              position: "System Administrator",
              industry: "Công nghệ",
              duration: "2020 - 2022",
              description: "Quản lý hệ thống máy chủ và cơ sở hạ tầng IT."
            }
          ],
          educationDetails: [
            {
              degree: "Kỹ sư Khoa học máy tính",
              school: "Đại học Bách Khoa TP.HCM",
              duration: "2016 - 2020"
            }
          ],
          languages: ["Tiếng Việt (Bản ngữ)", "Tiếng Anh (Thành thạo)"],
          certificates: ["AWS Certified DevOps Engineer", "Certified Kubernetes Administrator"],
          openToWork: true
        },
        {
          id: 6,
          anonymousId: "DA-60034",
          avatar: null,
          position: "Data Analyst",
          skills: ["SQL", "Python", "Power BI", "Data Visualization", "Excel", "Statistical Analysis"],
          experience: "2 năm",
          education: "Đại học Khoa học Tự nhiên TP.HCM",
          location: "Hồ Chí Minh",
          matchRate: 87,
          lastActive: "2024-05-08T09:20:00Z",
          about: "Data Analyst với 2 năm kinh nghiệm, chuyên về SQL, Python và Power BI. Đam mê phân tích dữ liệu và tạo ra các báo cáo trực quan để hỗ trợ ra quyết định kinh doanh.",
          workExperience: [
            {
              position: "Data Analyst",
              industry: "Phân tích dữ liệu",
              duration: "2022 - Hiện tại",
              description: "Phân tích dữ liệu kinh doanh và tạo ra các báo cáo trực quan sử dụng Power BI."
            },
            {
              position: "Junior Analyst",
              industry: "Thương mại điện tử",
              duration: "2021 - 2022",
              description: "Hỗ trợ phân tích dữ liệu khách hàng và báo cáo hiệu suất kinh doanh."
            }
          ],
          educationDetails: [
            {
              degree: "Cử nhân Toán học ứng dụng",
              school: "Đại học Khoa học Tự nhiên TP.HCM",
              duration: "2017 - 2021"
            }
          ],
          languages: ["Tiếng Việt (Bản ngữ)", "Tiếng Anh (Khá)"],
          certificates: ["Microsoft Power BI Data Analyst", "Google Data Analytics Certificate"],
          openToWork: true
        },
      ],
      pagination: {
        total: 24,
        perPage: 10,
        currentPage: 1,
        totalPages: 3,
      },
      filters: {
        skills: [
          "React", "TypeScript", "JavaScript", "Node.js", "Python", 
          "Java", "AWS", "Docker", "Kubernetes", "SQL", "MongoDB",
          "Figma", "Adobe XD", "UI/UX", "Agile", "Scrum"
        ],
        experience: [
          "Dưới 1 năm", "1-2 năm", "3-5 năm", "5-10 năm", "Trên 10 năm"
        ],
        locations: [
          "Hà Nội", "Hồ Chí Minh", "Đà Nẵng", "Hải Phòng", "Cần Thơ"
        ]
      },
      jobs: [
        { id: 1, title: "Senior Frontend Developer" },
        { id: 2, title: "UX/UI Designer" },
        { id: 3, title: "Backend Developer" },
        { id: 4, title: "Product Manager" },
        { id: 5, title: "DevOps Engineer" },
        { id: 6, title: "Data Analyst" },
      ]
    };
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["anonymous-candidates", searchQuery, skillFilter, experienceFilter, locationFilter, currentPage],
    queryFn: fetchAnonymousCandidates,
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

  // Xử lý mở dialog gửi lời mời
  const handleOpenInviteDialog = (candidate) => {
    setSelectedCandidate(candidate);
    setInviteForm({
      jobId: "",
      message: `Chào bạn,

Chúng tôi đã xem qua hồ sơ của bạn và rất ấn tượng với kinh nghiệm và kỹ năng của bạn. Chúng tôi tin rằng bạn sẽ là một ứng viên phù hợp cho vị trí tại công ty chúng tôi.

Rất mong nhận được phản hồi từ bạn.

Trân trọng,
[Tên công ty của bạn]`
    });
    setShowInviteDialog(true);
  };

  // Xử lý gửi lời mời
  const handleSendInvitation = () => {
    if (!inviteForm.jobId) {
      toast.error("Vui lòng chọn vị trí công việc");
      return;
    }

    // Trong thực tế, bạn sẽ gọi API để gửi lời mời
    // await apiClient.post("/api/v1/enterprise/invitations", {
    //   candidateId: selectedCandidate.id,
    //   jobId: inviteForm.jobId,
    //   message: inviteForm.message
    // });

    toast.success("Đã gửi lời mời tuyển dụng thành công!");
    setShowInviteDialog(false);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Scout - Tìm kiếm ứng viên ẩn danh</h1>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <form onSubmit={handleSearch} className="flex-1 flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="text"
                    placeholder="Tìm kiếm theo kỹ năng, vị trí..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button type="submit">Tìm kiếm</Button>
              </form>
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">Lọc theo:</span>
              
              <Select value={skillFilter} onValueChange={setSkillFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Kỹ năng" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả kỹ năng</SelectItem>
                  {data?.filters?.skills?.map((skill) => (
                    <SelectItem key={skill} value={skill}>
                      {skill}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={experienceFilter} onValueChange={setExperienceFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Kinh nghiệm" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả kinh nghiệm</SelectItem>
                  {data?.filters?.experience?.map((exp) => (
                    <SelectItem key={exp} value={exp}>
                      {exp}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Địa điểm" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả địa điểm</SelectItem>
                  {data?.filters?.locations?.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách ứng viên ẩn danh</CardTitle>
          <CardDescription>
            Xem hồ sơ ẩn danh của các ứng viên tiềm năng và gửi lời mời tuyển dụng
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">Đang tải dữ liệu...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">
              Có lỗi xảy ra khi tải dữ liệu
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.data.map((candidate) => (
                  <Card key={candidate.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {candidate.anonymousId.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{candidate.anonymousId}</h3>
                            <p className="text-sm text-gray-500">{candidate.position}</p>
                          </div>
                        </div>
                        {candidate.openToWork && (
                          <Badge className="bg-green-100 text-green-700 border-green-300">
                            Đang tìm việc
                          </Badge>
                        )}
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{candidate.location}</span>
                        </div>

                        <div className="flex items-center text-sm text-gray-500">
                          <Briefcase className="h-4 w-4 mr-1" />
                          <span>{candidate.experience}</span>
                        </div>

                        <div className="flex items-center text-sm text-gray-500">
                          <GraduationCap className="h-4 w-4 mr-1" />
                          <span>{candidate.education}</span>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500 mb-2">Kỹ năng:</p>
                          <div className="flex flex-wrap gap-1">
                            {candidate.skills.slice(0, 4).map((skill, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {candidate.skills.length > 4 && (
                              <Badge variant="outline" className="text-xs">
                                +{candidate.skills.length - 4}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-medium">
                            {candidate.matchRate}%
                          </div>
                          <span className="text-sm text-gray-500 ml-2">Phù hợp</span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewCandidate(candidate)}>
                            Chi tiết
                          </Button>
                          <Button size="sm" onClick={() => handleOpenInviteDialog(candidate)}>
                            Mời ứng tuyển
                          </Button>
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

      {/* Sheet hiển thị thông tin chi tiết ứng viên ẩn danh */}
      <Sheet open={showCandidateSheet} onOpenChange={setShowCandidateSheet} side="right" className="w-full sm:max-w-xl">
        <SheetContent className="overflow-y-auto sm:max-w-xl">
          {selectedCandidate && (
            <>
              <SheetHeader className="text-left mb-6">
                <SheetTitle>Thông tin ứng viên ẩn danh</SheetTitle>
                <SheetDescription>
                  Chi tiết về ứng viên {selectedCandidate.anonymousId}
                </SheetDescription>
              </SheetHeader>
              
              <div className="space-y-6">
                {/* Thông tin cơ bản */}
                <div className="flex flex-col items-center text-center mb-6">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarFallback className="text-xl bg-primary/10 text-primary">
                      {selectedCandidate.anonymousId.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold">{selectedCandidate.anonymousId}</h2>
                  <p className="text-gray-500">{selectedCandidate.position}</p>
                  
                  <div className="flex items-center mt-2 text-gray-500">
                    <MapPin size={16} className="mr-1" />
                    <span>{selectedCandidate.location}</span>
                  </div>
                  
                  {selectedCandidate.openToWork && (
                    <Badge className="mt-2 bg-green-100 text-green-700 border-green-300">
                      Đang tìm việc
                    </Badge>
                  )}
                  
                  <div className="mt-4 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-medium text-lg">
                      {selectedCandidate.matchRate}%
                    </div>
                    <span className="text-gray-500 ml-2">Phù hợp với công ty bạn</span>
                  </div>
                </div>
                
                {/* Tabs thông tin */}
                <Tabs defaultValue="profile" className="w-full">
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="profile">Hồ sơ</TabsTrigger>
                    <TabsTrigger value="experience">Kinh nghiệm</TabsTrigger>
                    <TabsTrigger value="education">Học vấn</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="profile">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Giới thiệu</h3>
                        <p className="text-gray-600">{selectedCandidate.about}</p>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Kỹ năng</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedCandidate.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Ngôn ngữ</h3>
                        <ul className="list-disc list-inside text-gray-600">
                          {selectedCandidate.languages.map((language, index) => (
                            <li key={index}>{language}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Chứng chỉ</h3>
                        <ul className="list-disc list-inside text-gray-600">
                          {selectedCandidate.certificates.map((certificate, index) => (
                            <li key={index}>{certificate}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex items-center justify-center mt-6">
                        <Button onClick={() => handleOpenInviteDialog(selectedCandidate)}>
                          <Send className="h-4 w-4 mr-2" />
                          Gửi lời mời tuyển dụng
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="experience">
                    <div className="space-y-6">
                      <h3 className="font-medium text-gray-900 mb-4">Kinh nghiệm làm việc</h3>
                      
                      {selectedCandidate.workExperience.map((exp, index) => (
                        <div key={index} className="border-l-2 border-gray-200 pl-4 pb-6 relative">
                          <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1"></div>
                          <h4 className="font-medium text-gray-900">{exp.position}</h4>
                          <p className="text-sm text-gray-600">{exp.industry}</p>
                          <p className="text-sm text-gray-500 mb-2">{exp.duration}</p>
                          <p className="text-gray-600">{exp.description}</p>
                        </div>
                      ))}
                      
                      <div className="flex items-center justify-center mt-6">
                        <Button onClick={() => handleOpenInviteDialog(selectedCandidate)}>
                          <Send className="h-4 w-4 mr-2" />
                          Gửi lời mời tuyển dụng
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="education">
                    <div className="space-y-6">
                      <h3 className="font-medium text-gray-900 mb-4">Học vấn</h3>
                      
                      {selectedCandidate.educationDetails.map((edu, index) => (
                        <div key={index} className="border-l-2 border-gray-200 pl-4 pb-6 relative">
                          <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1"></div>
                          <h4 className="font-medium text-gray-900">{edu.degree}</h4>
                          <p className="text-sm text-gray-600">{edu.school}</p>
                          <p className="text-sm text-gray-500">{edu.duration}</p>
                        </div>
                      ))}
                      
                      <div className="flex items-center justify-center mt-6">
                        <Button onClick={() => handleOpenInviteDialog(selectedCandidate)}>
                          <Send className="h-4 w-4 mr-2" />
                          Gửi lời mời tuyển dụng
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Dialog gửi lời mời tuyển dụng */}
      <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Gửi lời mời tuyển dụng</DialogTitle>
            <DialogDescription>
              Gửi lời mời tuyển dụng đến ứng viên {selectedCandidate?.anonymousId}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="job" className="text-sm font-medium">
                Chọn vị trí công việc
              </label>
              <Select
                value={inviteForm.jobId}
                onValueChange={(value) => setInviteForm({ ...inviteForm, jobId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn vị trí công việc" />
                </SelectTrigger>
                <SelectContent>
                  {data?.jobs.map((job) => (
                    <SelectItem key={job.id} value={job.id.toString()}>
                      {job.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Tin nhắn
              </label>
              <textarea
                id="message"
                rows={6}
                className="w-full p-2 border rounded-md"
                value={inviteForm.message}
                onChange={(e) => setInviteForm({ ...inviteForm, message: e.target.value })}
              />
              <p className="text-xs text-gray-500">
                Tin nhắn này sẽ được gửi đến ứng viên cùng với thông tin công việc
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowInviteDialog(false)}>
              Hủy
            </Button>
            <Button onClick={handleSendInvitation}>
              <Send className="h-4 w-4 mr-2" />
              Gửi lời mời
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 
