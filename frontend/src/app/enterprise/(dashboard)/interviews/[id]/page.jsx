"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import dayjs from "dayjs";
import { toast } from "sonner";
import {
  Calendar,
  Clock,
  MapPin,
  Building,
  User,
  Mail,
  Phone,
  FileText,
  Briefcase,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  ArrowLeft,
} from "lucide-react";

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

export default function InterviewDetailPage() {
  const params = useParams();
  const router = useRouter();
  const interviewId = params.id;
  
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showCompleteDialog, setShowCompleteDialog] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [interviewResult, setInterviewResult] = useState({
    status: "passed",
    feedback: "",
  });

  // Fetch thông tin chi tiết phỏng vấn
  const fetchInterviewDetail = async () => {
    // Trong thực tế, bạn sẽ gọi API để lấy thông tin chi tiết phỏng vấn
    // const { data } = await apiClient.get(`/api/v1/enterprise/interviews/${interviewId}`);
    // return data;

    // Dữ liệu mẫu
    return {
      id: interviewId,
      applicant: {
        id: 101,
        name: "Nguyễn Văn A",
        avatar: null,
        email: "nguyenvana@gmail.com",
        phone: "0901234567",
        position: "Frontend Developer",
        skills: ["React", "TypeScript", "Tailwind CSS"],
        experience: "3 năm",
        education: "Đại học Bách Khoa Hà Nội",
        location: "Hà Nội",
        cvUrl: "/sample-cv.pdf",
      },
      job: {
        id: 1,
        title: "Senior Frontend Developer",
        department: "Engineering",
        location: "Hà Nội",
      },
      scheduledAt: "2024-06-05T10:30:00Z",
      type: "online",
      location: "Google Meet: https://meet.google.com/abc-defg-hij",
      status: "scheduled", // scheduled, completed, cancelled
      note: "Phỏng vấn kỹ thuật về React và TypeScript. Chuẩn bị một số câu hỏi về hooks và state management.",
      createdAt: "2024-05-20T14:30:00Z",
      createdBy: {
        id: 1,
        name: "Admin",
      },
      interviewers: [
        {
          id: 1,
          name: "Trần Văn B",
          position: "Tech Lead",
          email: "tranvanb@company.com",
        },
        {
          id: 2,
          name: "Lê Thị C",
          position: "HR Manager",
          email: "lethic@company.com",
        },
      ],
      feedback: null,
      result: null,
      cancelReason: null,
    };
  };

  const { data: interview, isLoading, error, refetch } = useQuery({
    queryKey: ["interview-detail", interviewId],
    queryFn: fetchInterviewDetail,
  });

  // Xử lý hủy phỏng vấn
  const handleCancelInterview = async () => {
    try {
      // Trong thực tế, bạn sẽ gọi API để hủy phỏng vấn
      // await apiClient.put(`/api/v1/enterprise/interviews/${interviewId}/cancel`, {
      //   reason: cancelReason
      // });
      
      toast.success("Đã hủy lịch phỏng vấn thành công");
      setShowCancelDialog(false);
      refetch();
    } catch (error) {
      toast.error("Có lỗi xảy ra khi hủy lịch phỏng vấn");
      console.error(error);
    }
  };

  // Xử lý hoàn thành phỏng vấn
  const handleCompleteInterview = async () => {
    try {
      // Trong thực tế, bạn sẽ gọi API để cập nhật kết quả phỏng vấn
      // await apiClient.put(`/api/v1/enterprise/interviews/${interviewId}/complete`, {
      //   status: interviewResult.status,
      //   feedback: interviewResult.feedback
      // });
      
      toast.success("Đã cập nhật kết quả phỏng vấn thành công");
      setShowCompleteDialog(false);
      refetch();
    } catch (error) {
      toast.error("Có lỗi xảy ra khi cập nhật kết quả phỏng vấn");
      console.error(error);
    }
  };

  // Xử lý tải CV
  const handleDownloadCV = () => {
    if (interview?.applicant?.cvUrl) {
      const link = document.createElement('a');
      link.href = interview.applicant.cvUrl;
      link.download = `CV-${interview.applicant.name}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Hiển thị trạng thái phỏng vấn
  const renderStatus = (status) => {
    switch (status) {
      case "scheduled":
        return <Badge className="bg-blue-100 text-blue-800">Đã lên lịch</Badge>;
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Đã hoàn thành</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Đã hủy</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Không xác định</Badge>;
    }
  };

  // Hiển thị kết quả phỏng vấn
  const renderResult = (result) => {
    if (!result) return null;
    
    switch (result) {
      case "passed":
        return (
          <div className="flex items-center text-green-600">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span>Đạt yêu cầu</span>
          </div>
        );
      case "failed":
        return (
          <div className="flex items-center text-red-600">
            <XCircle className="h-5 w-5 mr-2" />
            <span>Chưa đạt yêu cầu</span>
          </div>
        );
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

  if (isLoading) return <div className="p-8 text-center">Đang tải thông tin phỏng vấn...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Có lỗi xảy ra khi tải thông tin phỏng vấn</div>;
  if (!interview) return <div className="p-8 text-center">Không tìm thấy thông tin phỏng vấn</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-4" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại
        </Button>
        <h1 className="text-2xl font-bold">Chi tiết phỏng vấn</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Thông tin phỏng vấn */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Thông tin phỏng vấn</CardTitle>
                  <CardDescription>Chi tiết về buổi phỏng vấn</CardDescription>
                </div>
                <div className="flex items-center">
                  {renderStatus(interview.status)}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center text-gray-700">
                    <Calendar className="h-5 w-5 mr-2 text-gray-500" />
                    <span>Ngày phỏng vấn: {dayjs(interview.scheduledAt).format("DD/MM/YYYY")}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Clock className="h-5 w-5 mr-2 text-gray-500" />
                    <span>Thời gian: {dayjs(interview.scheduledAt).format("HH:mm")}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <MapPin className="h-5 w-5 mr-2 text-gray-500" />
                    <span>Hình thức: {interview.type === "online" ? "Trực tuyến" : "Trực tiếp"}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-700">
                    <Building className="h-5 w-5 mr-2 text-gray-500" />
                    <span>Vị trí: {interview.job.title}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Briefcase className="h-5 w-5 mr-2 text-gray-500" />
                    <span>Phòng ban: {interview.job.department}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <MapPin className="h-5 w-5 mr-2 text-gray-500" />
                    <span>Địa điểm: {interview.job.location}</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-2">Địa điểm phỏng vấn:</h3>
                <p className="text-gray-700">{interview.location}</p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Ghi chú:</h3>
                <p className="text-gray-700">{interview.note || "Không có ghi chú"}</p>
              </div>

              {interview.status === "cancelled" && (
                <div>
                  <h3 className="font-medium mb-2 text-red-600">Lý do hủy:</h3>
                  <p className="text-gray-700">{interview.cancelReason}</p>
                </div>
              )}

              {interview.status === "completed" && interview.result && (
                <>
                  <Separator />
                  <div>
                    <h3 className="font-medium mb-2">Kết quả phỏng vấn:</h3>
                    {renderResult(interview.result)}
                  </div>
                  {interview.feedback && (
                    <div>
                      <h3 className="font-medium mb-2">Đánh giá:</h3>
                      <p className="text-gray-700">{interview.feedback}</p>
                    </div>
                  )}
                </>
              )}
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <div className="text-sm text-gray-500">
                Tạo lúc: {dayjs(interview.createdAt).format("HH:mm DD/MM/YYYY")}
              </div>
              <div className="flex gap-2">
                {interview.status === "scheduled" && (
                  <>
                    <Button variant="outline" asChild>
                      <Link href={`/enterprise/interviews/${interview.id}/edit`}>
                        <Edit className="h-4 w-4 mr-2" />
                        Chỉnh sửa
                      </Link>
                    </Button>
                    <Button variant="outline" onClick={() => setShowCompleteDialog(true)}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Hoàn thành
                    </Button>
                    <Button variant="destructive" onClick={() => setShowCancelDialog(true)}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Hủy phỏng vấn
                    </Button>
                  </>
                )}
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Người phỏng vấn</CardTitle>
              <CardDescription>Danh sách người tham gia phỏng vấn</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {interview.interviewers.map((interviewer) => (
                  <div key={interviewer.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>{getInitials(interviewer.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{interviewer.name}</h3>
                        <p className="text-sm text-gray-500">{interviewer.position}</p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {interviewer.email}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Thông tin ứng viên */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Thông tin ứng viên</CardTitle>
              <CardDescription>Chi tiết về ứng viên phỏng vấn</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={interview.applicant.avatar} />
                  <AvatarFallback className="text-xl">
                    {getInitials(interview.applicant.name)}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">{interview.applicant.name}</h2>
                <p className="text-gray-500">{interview.applicant.position}</p>
                
                <div className="flex items-center mt-2 text-gray-500">
                  <MapPin size={16} className="mr-1" />
                  <span>{interview.applicant.location}</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center text-gray-700">
                  <Mail className="h-5 w-5 mr-2 text-gray-500" />
                  <span>{interview.applicant.email}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Phone className="h-5 w-5 mr-2 text-gray-500" />
                  <span>{interview.applicant.phone}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Briefcase className="h-5 w-5 mr-2 text-gray-500" />
                  <span>Kinh nghiệm: {interview.applicant.experience}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <User className="h-5 w-5 mr-2 text-gray-500" />
                  <span>Học vấn: {interview.applicant.education}</span>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Kỹ năng:</h3>
                <div className="flex flex-wrap gap-2">
                  {interview.applicant.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex flex-col gap-2">
                <Button asChild>
                  <Link href={`/enterprise/applicants/${interview.applicant.id}`}>
                    Xem hồ sơ đầy đủ
                  </Link>
                </Button>
                {interview.applicant.cvUrl && (
                  <Button variant="outline" onClick={handleDownloadCV}>
                    <FileText className="h-4 w-4 mr-2" />
                    Tải CV
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Dialog xác nhận hủy phỏng vấn */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận hủy phỏng vấn</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn hủy cuộc phỏng vấn với {interview.applicant.name} vào lúc {dayjs(interview.scheduledAt).format("HH:mm DD/MM/YYYY")}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Label htmlFor="cancel-reason">Lý do hủy phỏng vấn</Label>
            <Textarea
              id="cancel-reason"
              placeholder="Nhập lý do hủy phỏng vấn..."
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className="mt-2"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Đóng</AlertDialogCancel>
            <AlertDialogAction onClick={handleCancelInterview} className="bg-red-600 hover:bg-red-700">
              Hủy phỏng vấn
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Dialog hoàn thành phỏng vấn */}
      <Dialog open={showCompleteDialog} onOpenChange={setShowCompleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hoàn thành phỏng vấn</DialogTitle>
            <DialogDescription>
              Cập nhật kết quả phỏng vấn với {interview.applicant.name}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label>Kết quả phỏng vấn</Label>
              <RadioGroup
                value={interviewResult.status}
                onValueChange={(value) => setInterviewResult({ ...interviewResult, status: value })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="passed" id="passed" />
                  <Label htmlFor="passed" className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                    Đạt yêu cầu
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="failed" id="failed" />
                  <Label htmlFor="failed" className="flex items-center">
                    <XCircle className="h-4 w-4 mr-2 text-red-600" />
                    Chưa đạt yêu cầu
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="feedback">Đánh giá chi tiết</Label>
              <Textarea
                id="feedback"
                placeholder="Nhập đánh giá chi tiết về buổi phỏng vấn..."
                value={interviewResult.feedback}
                onChange={(e) => setInterviewResult({ ...interviewResult, feedback: e.target.value })}
                rows={5}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCompleteDialog(false)}>
              Hủy
            </Button>
            <Button onClick={handleCompleteInterview}>
              Lưu kết quả
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
