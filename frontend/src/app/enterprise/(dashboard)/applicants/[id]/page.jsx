"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Briefcase,
  Building,
  Calendar as CalendarIcon,
  Clock,
  Download,
  ExternalLink,
  FileText,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  ThumbsDown,
  ThumbsUp,
  User,
  Video,
} from "lucide-react";
import { toast } from "sonner";

// Cấu hình dayjs
dayjs.extend(relativeTime);
dayjs.locale("vi");

export default function ApplicantDetailPage() {
  const params = useParams();
  const router = useRouter();
  const applicantId = params.id;

  // State cho dialog lên lịch phỏng vấn
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [scheduleForm, setScheduleForm] = useState({
    date: new Date(),
    time: "09:00",
    type: "online",
    location: "",
    note: "",
  });

  // Fetch thông tin ứng viên
  const fetchApplicant = async () => {
    // Trong thực tế, bạn sẽ gọi API để lấy thông tin ứng viên
    // const { data } = await apiClient.get(`/api/v1/enterprise/applicants/${applicantId}`);
    // return data;

    // Dữ liệu mẫu
    return {
      id: applicantId,
      name: "Nguyễn Văn A",
      avatar: null,
      email: "nguyenvana@gmail.com",
      phone: "0901234567",
      location: "Hà Nội, Việt Nam",
      title: "Senior Frontend Developer",
      summary: "Frontend Developer với hơn 5 năm kinh nghiệm làm việc với React, Vue.js và các công nghệ frontend hiện đại. Có kinh nghiệm phát triển các ứng dụng web phức tạp, tối ưu hiệu suất và trải nghiệm người dùng.",
      experience: [
        {
          id: 1,
          company: "Công ty ABC",
          position: "Senior Frontend Developer",
          fromDate: "2021-01",
          toDate: null,
          isCurrentJob: true,
          description: "Phát triển và duy trì các ứng dụng web sử dụng React, Redux và TypeScript. Tối ưu hóa hiệu suất và trải nghiệm người dùng. Làm việc với đội ngũ backend để thiết kế và triển khai API."
        },
        {
          id: 2,
          company: "Công ty XYZ",
          position: "Frontend Developer",
          fromDate: "2018-05",
          toDate: "2020-12",
          isCurrentJob: false,
          description: "Phát triển giao diện người dùng cho các ứng dụng web sử dụng Vue.js và JavaScript. Tham gia vào quá trình thiết kế và phát triển các tính năng mới."
        }
      ],
      education: [
        {
          id: 1,
          school: "Đại học Bách Khoa Hà Nội",
          degree: "Kỹ sư",
          field: "Công nghệ thông tin",
          fromDate: "2014-09",
          toDate: "2018-05",
          isCurrentEducation: false
        }
      ],
      skills: [
        { id: 1, name: "React", level: "Expert" },
        { id: 2, name: "Vue.js", level: "Advanced" },
        { id: 3, name: "JavaScript", level: "Expert" },
        { id: 4, name: "TypeScript", level: "Advanced" },
        { id: 5, name: "HTML/CSS", level: "Expert" },
        { id: 6, name: "Redux", level: "Advanced" },
        { id: 7, name: "Responsive Design", level: "Advanced" },
        { id: 8, name: "Git", level: "Advanced" }
      ],
      languages: [
        { id: 1, name: "Tiếng Việt", level: "Bản ngữ" },
        { id: 2, name: "Tiếng Anh", level: "Thành thạo" }
      ],
      projects: [
        {
          id: 1,
          name: "E-commerce Platform",
          description: "Xây dựng nền tảng thương mại điện tử với React, Redux và Node.js. Tích hợp thanh toán trực tuyến và quản lý đơn hàng.",
          url: "https://github.com/nguyenvana/ecommerce-platform"
        }
      ],
      certificates: [
        {
          id: 1,
          name: "AWS Certified Developer",
          issuer: "Amazon Web Services",
          date: "2022-03",
          url: "https://aws.amazon.com/certification/certified-developer-associate/"
        }
      ],
      cvUrl: "/sample-cv.pdf",
      appliedJobs: [
        {
          id: 1,
          title: "Senior Frontend Developer",
          appliedDate: "2023-10-15",
          status: "reviewing"
        }
      ],
      matchingScore: 92,
      status: "active",
      notes: "Ứng viên có kinh nghiệm phong phú với các công nghệ frontend hiện đại. Phù hợp với vị trí Senior Frontend Developer.",
      interviews: [
        {
          id: 1,
          scheduledAt: "2023-11-05T09:00:00Z",
          type: "online",
          location: "Google Meet",
          status: "scheduled",
          note: "Phỏng vấn kỹ thuật về React và TypeScript"
        }
      ]
    };
  };

  const { data: applicant, isLoading, error } = useQuery({
    queryKey: ["applicant", applicantId],
    queryFn: fetchApplicant,
  });

  // Xử lý lên lịch phỏng vấn
  const handleScheduleInterview = async () => {
    try {
      // Trong thực tế, bạn sẽ gọi API để lên lịch phỏng vấn
      // const response = await apiClient.post(`/api/v1/enterprise/applicants/${applicantId}/interviews`, {
      //   scheduledAt: `${dayjs(scheduleForm.date).format('YYYY-MM-DD')}T${scheduleForm.time}:00`,
      //   type: scheduleForm.type,
      //   location: scheduleForm.location,
      //   note: scheduleForm.note
      // });

      // Giả lập thành công
      toast.success("Đã lên lịch phỏng vấn thành công");
      setShowScheduleDialog(false);
      
      // Trong thực tế, bạn sẽ cập nhật dữ liệu từ API
      // queryClient.invalidateQueries(["applicant", applicantId]);
    } catch (error) {
      toast.error("Có lỗi xảy ra khi lên lịch phỏng vấn");
      console.error(error);
    }
  };

  // Xử lý tải CV
  const handleDownloadCV = () => {
    if (applicant?.cvUrl) {
      const link = document.createElement('a');
      link.href = applicant.cvUrl;
      link.download = `CV-${applicant.name}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Xử lý đánh giá ứng viên
  const handleRateApplicant = async (isPositive) => {
    try {
      // Trong thực tế, bạn sẽ gọi API để đánh giá ứng viên
      // await apiClient.post(`/api/v1/enterprise/applicants/${applicantId}/rate`, {
      //   isPositive
      // });

      toast.success(`Đã ${isPositive ? 'đánh giá tích cực' : 'đánh giá tiêu cực'} ứng viên`);
      
      // Trong thực tế, bạn sẽ cập nhật dữ liệu từ API
      // queryClient.invalidateQueries(["applicant", applicantId]);
    } catch (error) {
      toast.error("Có lỗi xảy ra khi đánh giá ứng viên");
      console.error(error);
    }
  };

  // Hiển thị trạng thái ứng viên
  const renderStatus = (status) => {
    switch (status) {
      case "reviewing":
        return <Badge className="bg-yellow-100 text-yellow-800">Đang xem xét</Badge>;
      case "contacted":
        return <Badge className="bg-blue-100 text-blue-800">Đã liên hệ</Badge>;
      case "interviewed":
        return <Badge className="bg-purple-100 text-purple-800">Đã phỏng vấn</Badge>;
      case "hired":
        return <Badge className="bg-green-100 text-green-800">Đã tuyển</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Đã từ chối</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Chưa xác định</Badge>;
    }
  };

  if (isLoading) return <div className="p-8 text-center">Đang tải thông tin ứng viên...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Có lỗi xảy ra khi tải thông tin ứng viên</div>;
  if (!applicant) return <div className="p-8 text-center">Không tìm thấy thông tin ứng viên</div>;

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Thông tin cơ bản */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <Avatar className="h-24 w-24">
                <AvatarImage src={applicant.avatar} alt={applicant.name} />
                <AvatarFallback className="text-2xl">
                  {applicant.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-grow space-y-2">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div>
                  <h1 className="text-2xl font-bold">{applicant.name}</h1>
                  <p className="text-gray-600">{applicant.title}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button onClick={() => setShowScheduleDialog(true)}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    Lên lịch phỏng vấn
                  </Button>
                  <Button variant="outline" onClick={handleDownloadCV}>
                    <Download className="mr-2 h-4 w-4" />
                    Tải CV
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>{applicant.email}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>{applicant.phone}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{applicant.location}</span>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center">
                    <span className="text-gray-600 mr-2">Độ phù hợp:</span>
                    <Badge className="bg-green-100 text-green-800">{applicant.matchingScore}%</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs thông tin chi tiết */}
      <Tabs defaultValue="profile">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Hồ sơ</TabsTrigger>
          <TabsTrigger value="applications">Đơn ứng tuyển</TabsTrigger>
          <TabsTrigger value="interviews">Lịch phỏng vấn</TabsTrigger>
          <TabsTrigger value="notes">Ghi chú</TabsTrigger>
        </TabsList>
        
        {/* Tab Hồ sơ */}
        <TabsContent value="profile" className="space-y-6">
          {/* Tóm tắt */}
          <Card>
            <CardHeader>
              <CardTitle>Tóm tắt</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{applicant.summary}</p>
            </CardContent>
          </Card>

          {/* Kinh nghiệm làm việc */}
          <Card>
            <CardHeader>
              <CardTitle>Kinh nghiệm làm việc</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {applicant.experience.map((exp) => (
                  <div key={exp.id} className="border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{exp.position}</h3>
                        <div className="flex items-center text-gray-600">
                          <Building className="h-4 w-4 mr-2" />
                          <span>{exp.company}</span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        {dayjs(exp.fromDate).format("MM/YYYY")} - {exp.isCurrentJob ? "Hiện tại" : dayjs(exp.toDate).format("MM/YYYY")}
                      </div>
                    </div>
                    <p className="mt-2 text-gray-700">{exp.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Học vấn */}
          <Card>
            <CardHeader>
              <CardTitle>Học vấn</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {applicant.education.map((edu) => (
                  <div key={edu.id} className="border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{edu.school}</h3>
                        <p className="text-gray-700">{edu.degree} - {edu.field}</p>
                      </div>
                      <div className="text-sm text-gray-600">
                        {dayjs(edu.fromDate).format("MM/YYYY")} - {edu.isCurrentEducation ? "Hiện tại" : dayjs(edu.toDate).format("MM/YYYY")}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Kỹ năng */}
          <Card>
            <CardHeader>
              <CardTitle>Kỹ năng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {applicant.skills.map((skill) => (
                  <Badge key={skill.id} variant="secondary" className="px-3 py-1">
                    {skill.name} <span className="ml-1 text-gray-500">•</span> <span className="text-gray-500">{skill.level}</span>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Ngôn ngữ */}
          <Card>
            <CardHeader>
              <CardTitle>Ngôn ngữ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {applicant.languages.map((language) => (
                  <Badge key={language.id} variant="outline" className="px-3 py-1">
                    {language.name} <span className="ml-1 text-gray-500">•</span> <span className="text-gray-500">{language.level}</span>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Dự án */}
          {applicant.projects && applicant.projects.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Dự án</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {applicant.projects.map((project) => (
                    <div key={project.id} className="border-b pb-4 last:border-0 last:pb-0">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-lg">{project.name}</h3>
                        {project.url && (
                          <Button variant="ghost" size="sm" asChild>
                            <a href={project.url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-1" /> Xem
                            </a>
                          </Button>
                        )}
                      </div>
                      <p className="mt-2 text-gray-700">{project.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Chứng chỉ */}
          {applicant.certificates && applicant.certificates.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Chứng chỉ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applicant.certificates.map((certificate) => (
                    <div key={certificate.id} className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{certificate.name}</h3>
                        <p className="text-sm text-gray-600">{certificate.issuer} • {dayjs(certificate.date).format("MM/YYYY")}</p>
                      </div>
                      {certificate.url && (
                        <Button variant="ghost" size="sm" asChild>
                          <a href={certificate.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-1" /> Xem
                          </a>
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        {/* Tab Đơn ứng tuyển */}
        <TabsContent value="applications">
          <Card>
            <CardHeader>
              <CardTitle>Đơn ứng tuyển</CardTitle>
              <CardDescription>Danh sách các vị trí mà ứng viên đã ứng tuyển</CardDescription>
            </CardHeader>
            <CardContent>
              {applicant.appliedJobs && applicant.appliedJobs.length > 0 ? (
                <div className="space-y-4">
                  {applicant.appliedJobs.map((job) => (
                    <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{job.title}</h3>
                        <p className="text-sm text-gray-600">Ngày ứng tuyển: {dayjs(job.appliedDate).format("DD/MM/YYYY")}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        {renderStatus(job.status)}
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/enterprise/jobs/${job.id}`}>
                            Xem tin tuyển dụng
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Ứng viên chưa ứng tuyển vào vị trí nào
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Tab Lịch phỏng vấn */}
        <TabsContent value="interviews">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Lịch phỏng vấn</CardTitle>
                  <CardDescription>Lịch phỏng vấn đã lên với ứng viên</CardDescription>
                </div>
                <Button onClick={() => setShowScheduleDialog(true)}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Lên lịch mới
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {applicant.interviews && applicant.interviews.length > 0 ? (
                <div className="space-y-4">
                  {applicant.interviews.map((interview) => (
                    <div key={interview.id} className="p-4 border rounded-lg">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center">
                            <CalendarIcon className="h-5 w-5 mr-2 text-gray-500" />
                            <span className="font-medium">{dayjs(interview.scheduledAt).format("DD/MM/YYYY")}</span>
                            <span className="mx-2">•</span>
                            <Clock className="h-5 w-5 mr-2 text-gray-500" />
                            <span>{dayjs(interview.scheduledAt).format("HH:mm")}</span>
                          </div>
                          <div className="mt-2 flex items-center">
                            {interview.type === "online" ? (
                              <Video className="h-5 w-5 mr-2 text-gray-500" />
                            ) : (
                              <MapPin className="h-5 w-5 mr-2 text-gray-500" />
                            )}
                            <span>{interview.location}</span>
                          </div>
                          {interview.note && (
                            <p className="mt-2 text-gray-600">{interview.note}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={
                            interview.status === "scheduled" ? "bg-blue-100 text-blue-800" :
                            interview.status === "completed" ? "bg-green-100 text-green-800" :
                            interview.status === "cancelled" ? "bg-red-100 text-red-800" :
                            "bg-gray-100 text-gray-800"
                          }>
                            {interview.status === "scheduled" ? "Đã lên lịch" :
                             interview.status === "completed" ? "Đã hoàn thành" :
                             interview.status === "cancelled" ? "Đã hủy" : "Không xác định"}
                          </Badge>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/enterprise/interviews/${interview.id}`}>
                              Chi tiết
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Chưa có lịch phỏng vấn nào với ứng viên này
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Tab Ghi chú */}
        <TabsContent value="notes">
          <Card>
            <CardHeader>
              <CardTitle>Ghi chú & Đánh giá</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="notes">Ghi chú về ứng viên</Label>
                  <Textarea
                    id="notes"
                    className="mt-2"
                    placeholder="Nhập ghi chú về ứng viên..."
                    rows={5}
                    defaultValue={applicant.notes}
                  />
                  <div className="mt-2 flex justify-end">
                    <Button>Lưu ghi chú</Button>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="font-medium mb-4">Đánh giá ứng viên</h3>
                  <div className="flex gap-4">
                    <Button 
                      variant="outline" 
                      className="flex-1 border-green-200 text-green-600 hover:bg-green-50 hover:text-green-700"
                      onClick={() => handleRateApplicant(true)}
                    >
                      <ThumbsUp className="mr-2 h-5 w-5" />
                      Đánh giá tích cực
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                      onClick={() => handleRateApplicant(false)}
                    >
                      <ThumbsDown className="mr-2 h-5 w-5" />
                      Đánh giá tiêu cực
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog lên lịch phỏng vấn */}
      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Lên lịch phỏng vấn</DialogTitle>
            <DialogDescription>
              Lên lịch phỏng vấn với ứng viên {applicant.name}
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
                    {scheduleForm.date.toISOString().split('T')[0]}
                  </Button>
                </PopoverTrigger>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Thời gian phỏng vấn</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    {scheduleForm.time}
                  </Button>
                </PopoverTrigger>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Loại phỏng vấn</Label>
              <Select
                value={scheduleForm.type}
                onValueChange={(value) => setScheduleForm({ ...scheduleForm, type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Loại phỏng vấn" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Địa điểm phỏng vấn</Label>
              <Input
                id="location"
                value={scheduleForm.location}
                onChange={(e) => setScheduleForm({ ...scheduleForm, location: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="note">Ghi chú</Label>
              <Textarea
                id="note"
                value={scheduleForm.note}
                onChange={(e) => setScheduleForm({ ...scheduleForm, note: e.target.value })}
              />
            </div>
            <div className="mt-4 flex justify-end">
              <Button type="submit" onClick={handleScheduleInterview}>
                Lên lịch phỏng vấn
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
