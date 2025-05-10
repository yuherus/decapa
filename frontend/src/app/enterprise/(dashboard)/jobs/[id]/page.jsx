"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  Clock,
  Copy,
  DollarSign,
  Edit,
  GraduationCap,
  MapPin,
  RefreshCw,
  Trash2,
  UserCheck,
} from "lucide-react";
import { toast } from "sonner";

// Cấu hình dayjs
dayjs.extend(relativeTime);
dayjs.locale("vi");

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params.id;
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showRepostDialog, setShowRepostDialog] = useState(false);

  // Fetch chi tiết công việc
  const fetchJobDetail = async () => {
    // Dữ liệu mẫu
    return {
      id: jobId,
      title: "Senior Frontend Developer",
      location: "Hà Nội",
      work_type: "Toàn thời gian",
      is_remote: true,
      salary_visible: true,
      salary_min: 25000000,
      salary_max: 35000000,
      salary_currency: "VND",
      salary_type: "month",
      description: "Chúng tôi đang tìm kiếm một Senior Frontend Developer có kinh nghiệm làm việc với React và TypeScript để tham gia vào đội ngũ phát triển sản phẩm của chúng tôi.",
      experience: "3-5 năm",
      education: "Đại học",
      application_deadline: "2024-06-15",
      is_urgent: true,
      is_featured: true,
      requirements: [
        "Tối thiểu 3 năm kinh nghiệm với React",
        "Thành thạo TypeScript và JavaScript",
        "Kinh nghiệm với Redux, GraphQL là một lợi thế",
        "Có khả năng làm việc độc lập và theo nhóm"
      ],
      benefits: [
        "Lương cạnh tranh",
        "Bảo hiểm sức khỏe",
        "Thưởng cuối năm",
        "Môi trường làm việc năng động"
      ],
      skills: [
        "React",
        "TypeScript",
        "JavaScript",
        "Redux",
        "GraphQL"
      ],
      application_email: "recruitment@company.com",
      application_url: "https://company.com/careers/apply",
      contact_phone: "0912345678",
      contact_email: "contact@company.com",
      company_website: "https://company.com",
      status: "active",
      applications: 12,
      views: 156,
      created_at: "2024-05-15T08:30:22Z",
      expires_at: "2024-06-15T08:30:22Z",
    };
  };

  const { data: job, isLoading, error } = useQuery({
    queryKey: ["enterprise-job-detail", jobId],
    queryFn: fetchJobDetail,
  });

  const handleDeleteJob = () => {
    
    toast.success(`Đã xóa tin tuyển dụng "${job.title}"`);
    setShowDeleteDialog(false);
    router.push("/enterprise/jobs");
  };

  const handleRepostJob = () => {
    
    toast.success(`Đã đăng lại tin tuyển dụng "${job.title}"`);
    setShowRepostDialog(false);
    router.refresh();
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

  if (isLoading) return <div className="p-6">Đang tải...</div>;
  if (error) return <div className="p-6 text-red-500">Có lỗi xảy ra khi tải dữ liệu</div>;
  if (!job) return <div className="p-6">Không tìm thấy tin tuyển dụng</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/enterprise/jobs">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Chi tiết tin tuyển dụng</h1>
        </div>
        <div className="flex items-center space-x-2">
          {job.status === "expired" && (
            <Button onClick={() => setShowRepostDialog(true)}>
              <RefreshCw className="h-4 w-4 mr-2" /> Đăng lại
            </Button>
          )}
          <Button variant="outline" asChild>
            <Link href={`/enterprise/jobs/${job.id}/edit`}>
              <Edit className="h-4 w-4 mr-2" /> Chỉnh sửa
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/enterprise/post-job?duplicate=${job.id}`}>
              <Copy className="h-4 w-4 mr-2" /> Nhân bản
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/enterprise/jobs/${job.id}/applications`}>
              <UserCheck className="h-4 w-4 mr-2" /> Xem ứng viên ({job.applications})
            </Link>
          </Button>
          <Button variant="destructive" onClick={() => setShowDeleteDialog(true)}>
            <Trash2 className="h-4 w-4 mr-2" /> Xóa
          </Button>
        </div>
      </div>

      {/* Thông tin cơ bản */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{job.title}</CardTitle>
              <CardDescription className="mt-2">
                Đăng ngày {dayjs(job.created_at).format("DD/MM/YYYY")}
                {" • "}
                {renderStatus(job.status)}
                {job.is_urgent && (
                  <Badge className="ml-2 bg-red-100 text-red-800 hover:bg-red-100">
                    Tuyển gấp
                  </Badge>
                )}
                {job.is_featured && (
                  <Badge className="ml-2 bg-blue-100 text-blue-800 hover:bg-blue-100">
                    Nổi bật
                  </Badge>
                )}
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Lượt xem</div>
              <div className="text-2xl font-bold">{job.views}</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                <span>{job.location}</span>
                {job.is_remote && (
                  <Badge className="ml-2 bg-blue-100 text-blue-800 hover:bg-blue-100">
                    Làm việc từ xa
                  </Badge>
                )}
              </div>
              <div className="flex items-center">
                <Briefcase className="h-5 w-5 text-gray-500 mr-2" />
                <span>{job.work_type}</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 text-gray-500 mr-2" />
                <span>
                  {job.salary_visible
                    ? `${job.salary_min.toLocaleString()} - ${job.salary_max.toLocaleString()} ${job.salary_currency}/${
                        job.salary_type === "month" ? "tháng" : "năm"
                      }`
                    : "Thương lượng"}
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-500 mr-2" />
                <span>Kinh nghiệm: {job.experience}</span>
              </div>
              <div className="flex items-center">
                <GraduationCap className="h-5 w-5 text-gray-500 mr-2" />
                <span>Học vấn: {job.education}</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                <span>Hạn nộp hồ sơ: {dayjs(job.application_deadline).format("DD/MM/YYYY")}</span>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Kỹ năng yêu cầu:</h3>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <Badge key={index} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Thông tin liên hệ:</h3>
                <div className="space-y-2 text-sm">
                  {job.application_email && (
                    <p>Email ứng tuyển: {job.application_email}</p>
                  )}
                  {job.application_url && (
                    <p>
                      URL ứng tuyển:{" "}
                      <a
                        href={job.application_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {job.application_url}
                      </a>
                    </p>
                  )}
                  {job.contact_phone && <p>Điện thoại: {job.contact_phone}</p>}
                  {job.contact_email && <p>Email liên hệ: {job.contact_email}</p>}
                  {job.company_website && (
                    <p>
                      Website công ty:{" "}
                      <a
                        href={job.company_website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {job.company_website}
                      </a>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mô tả công việc */}
      <Card>
        <CardHeader>
          <CardTitle>Mô tả công việc</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <p>{job.description}</p>
          </div>
        </CardContent>
      </Card>

      {/* Yêu cầu công việc */}
      <Card>
        <CardHeader>
          <CardTitle>Yêu cầu công việc</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <ul className="space-y-2">
              {job.requirements.map((requirement, index) => (
                <li key={index}>{requirement}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Quyền lợi */}
      <Card>
        <CardHeader>
          <CardTitle>Quyền lợi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <ul className="space-y-2">
              {job.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Dialog xác nhận xóa */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa tin tuyển dụng</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa tin tuyển dụng "{job.title}"? Hành động này không thể hoàn tác.
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
              Bạn có muốn đăng lại tin tuyển dụng "{job.title}"? Tin tuyển dụng sẽ được đăng lại với thời hạn mới.
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
