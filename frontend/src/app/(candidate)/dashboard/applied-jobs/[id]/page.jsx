"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { 
  ArrowLeft, 
  Building, 
  Calendar, 
  MapPin, 
  DollarSign, 
  File, 
  Clock, 
  User,
  Mail,
  Phone,
  FileText,
  MessageSquare,
  CheckCircle2,
  Clock8,
  Timer,
  ThumbsUp,
  XCircle,
  AlertCircle
} from "lucide-react";
import { applicationService } from "@/services/applications";
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

export default function ApplicationDetail() {
  const { requireAuth } = useAuth();
  const { isLoading: isAuthLoading } = requireAuth();
  const { id } = useParams();
  const router = useRouter();
  const { toast } = useToast();

  // Lấy chi tiết đơn ứng tuyển
  const { data: application, isLoading, isError, refetch } = useQuery({
    queryKey: ['application', id],
    queryFn: () => applicationService.getApplication(id),
    enabled: !isAuthLoading && !!id,
  });

  if (isLoading || isAuthLoading) {
    return (
      <div className="p-6 w-full text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-blue-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="mt-2 text-gray-500">Đang tải thông tin đơn ứng tuyển...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 w-full">
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Lỗi</AlertTitle>
          <AlertDescription>
            Không thể tải thông tin đơn ứng tuyển. Vui lòng thử lại sau.
          </AlertDescription>
        </Alert>
        <Button variant="outline" onClick={() => refetch()}>Thử lại</Button>
        <Button variant="ghost" className="ml-2" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại
        </Button>
      </div>
    );
  }

  // Format ngày giờ
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'dd MMM yyyy HH:mm', { locale: vi });
    } catch (error) {
      return dateString;
    }
  };

  // Render trạng thái đơn ứng tuyển
  const renderStatus = (status) => {
    switch (status) {
      case 'pending':
        return (
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 flex items-center gap-1">
              <Clock8 className="h-3 w-3" />
              Đang chờ
            </Badge>
            <span className="text-sm text-gray-500">
              Đơn của bạn đang chờ xem xét
            </span>
          </div>
        );
      case 'reviewing':
        return (
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1">
              <Timer className="h-3 w-3" />
              Đang xem xét
            </Badge>
            <span className="text-sm text-gray-500">
              Nhà tuyển dụng đang xem xét hồ sơ của bạn
            </span>
          </div>
        );
      case 'interview':
        return (
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              Phỏng vấn
            </Badge>
            <span className="text-sm text-gray-500">
              Bạn đã được mời tham gia phỏng vấn
            </span>
          </div>
        );
      case 'accepted':
        return (
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
              <ThumbsUp className="h-3 w-3" />
              Đã chấp nhận
            </Badge>
            <span className="text-sm text-gray-500">
              Chúc mừng! Đơn ứng tuyển của bạn đã được chấp nhận
            </span>
          </div>
        );
      case 'rejected':
        return (
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1">
              <XCircle className="h-3 w-3" />
              Bị từ chối
            </Badge>
            <span className="text-sm text-gray-500">
              Đơn ứng tuyển của bạn không phù hợp với vị trí này
            </span>
          </div>
        );
      default:
        return (
          <Badge variant="outline">{status}</Badge>
        );
    }
  };

  // Lấy chữ cái đầu của tên công ty
  const getCompanyInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "";
  };

  // Xác định màu logo dựa trên tên công ty
  const getLogoBackground = (company) => {
    const colors = [
      "bg-blue-500", "bg-green-500", "bg-yellow-500", 
      "bg-red-500", "bg-purple-500", "bg-pink-500", 
      "bg-indigo-500", "bg-teal-500", "bg-orange-500"
    ];
    
    let hash = 0;
    for (let i = 0; i < company.length; i++) {
      hash = company.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };

  // Render timeline dựa trên trạng thái
  const renderTimeline = () => {
    const statusOrder = ['pending', 'reviewing', 'interview', 'accepted', 'rejected'];
    const currentStatusIndex = statusOrder.indexOf(application.status);
    
    // Nếu bị từ chối, không hiển thị timeline
    if (application.status === 'rejected') {
      return (
        <Alert className="bg-red-50 border-red-200 text-red-800">
          <XCircle className="h-4 w-4" />
          <AlertTitle>Đơn ứng tuyển đã bị từ chối</AlertTitle>
          <AlertDescription>
            Nhà tuyển dụng đã quyết định không tiếp tục với đơn ứng tuyển của bạn. Đừng nản lòng, hãy tiếp tục tìm kiếm cơ hội khác phù hợp hơn.
          </AlertDescription>
        </Alert>
      );
    }
    
    return (
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Trạng thái đơn ứng tuyển</h3>
        <div className="relative">
          {/* Timeline track */}
          <div className="absolute left-1.5 top-0 bottom-0 w-0.5 bg-gray-100"></div>
          
          {/* Steps */}
          <div className="space-y-6">
            {statusOrder.map((status, index) => {
              // Không hiển thị bước "rejected" trong timeline nếu đơn không bị từ chối
              if (status === 'rejected' && application.status !== 'rejected') return null;
              
              // Không hiển thị các bước sau bước hiện tại
              if (index > currentStatusIndex && status !== 'rejected') return null;
              
              const isActive = index <= currentStatusIndex;
              
              let icon, title, description;
              
              switch (status) {
                case 'pending':
                  icon = <Clock8 className="h-4 w-4" />;
                  title = "Đã nộp đơn";
                  description = `Bạn đã nộp đơn vào ngày ${formatDate(application.created_at)}`;
                  break;
                case 'reviewing':
                  icon = <Timer className="h-4 w-4" />;
                  title = "Đang xem xét";
                  description = "Nhà tuyển dụng đang xem xét đơn ứng tuyển của bạn";
                  break;
                case 'interview':
                  icon = <Calendar className="h-4 w-4" />;
                  title = "Phỏng vấn";
                  description = "Bạn đã được chọn để tham gia phỏng vấn";
                  break;
                case 'accepted':
                  icon = <CheckCircle2 className="h-4 w-4" />;
                  title = "Chấp nhận";
                  description = "Chúc mừng! Đơn ứng tuyển của bạn đã được chấp nhận";
                  break;
                case 'rejected':
                  icon = <XCircle className="h-4 w-4" />;
                  title = "Từ chối";
                  description = "Đơn ứng tuyển của bạn không phù hợp với vị trí này";
                  break;
              }
              
              return (
                <div key={status} className="relative flex items-start">
                  <div className={`absolute left-0 w-3 h-3 rounded-full border-2 ${
                    isActive 
                      ? 'bg-blue-500 border-blue-500' 
                      : 'bg-white border-gray-300'
                  }`}></div>
                  <div className="ml-6">
                    <div className={`text-sm font-medium ${isActive ? '' : 'text-gray-500'}`}>
                      {title}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 w-full">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại
        </Button>
        <h2 className="text-xl font-medium">Chi tiết đơn ứng tuyển</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cột thông tin chính */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-md flex items-center justify-center text-white font-bold ${getLogoBackground(application.job.company.name)}`}>
                  {getCompanyInitial(application.job.company.name)}
                </div>
                <div>
                  <CardTitle className="text-xl">{application.job.title}</CardTitle>
                  <CardDescription>
                    <Link href={`/companies/${application.job.company.id}`} className="text-blue-600 hover:underline">
                      {application.job.company.name}
                    </Link>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-3 pb-0">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>{application.job.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <DollarSign className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>{application.job.salary_range || "Thỏa thuận"}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>Ngày nộp: {formatDate(application.created_at)}</span>
                  </div>
                </div>

                <Separator />
                
                <div className="space-y-3 pt-1">
                  <h3 className="text-sm font-medium">Trạng thái hiện tại</h3>
                  {renderStatus(application.status)}
                </div>
                
                <Separator />

                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Thông tin ứng viên</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{application.full_name}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{application.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{application.phone}</span>
                    </div>
                  </div>
                </div>
                
                {application.cover_letter && (
                  <>
                    <Separator />
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium flex items-center">
                        <MessageSquare className="h-4 w-4 mr-2 text-gray-500" />
                        Thư xin việc
                      </h3>
                      <div className="text-sm bg-gray-50 p-4 rounded-md whitespace-pre-wrap">
                        {application.cover_letter}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
            
            <CardFooter className="pt-6 flex justify-between">
              <Button
                variant="outline"
                size="sm"
                asChild
              >
                <Link href={`/jobs/${application.job.id}`}>
                  Xem chi tiết công việc
                </Link>
              </Button>
              
              {application.status === 'rejected' && (
                <Button
                  variant="default"
                  size="sm"
                  asChild
                >
                  <Link href="/jobs">
                    Tìm việc mới
                  </Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* CV sử dụng */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">CV của bạn</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center p-3 bg-gray-50 rounded-md">
                <FileText className="h-5 w-5 mr-3 text-blue-500" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">
                    {application.user_cv ? application.user_cv.name : "CV đã tải lên"}
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatDate(application.created_at)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Timeline */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Tiến trình</CardTitle>
            </CardHeader>
            <CardContent>
              {renderTimeline()}
            </CardContent>
          </Card>
          
          {/* Gợi ý hành động */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Gợi ý tiếp theo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {application.status === 'pending' && (
                <div className="text-sm">
                  <p className="mb-2">Đơn ứng tuyển của bạn đang được xem xét. Trong thời gian chờ đợi, bạn có thể:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Tiếp tục tìm kiếm và ứng tuyển các vị trí khác</li>
                    <li>Cập nhật hồ sơ cá nhân của bạn</li>
                    <li>Chuẩn bị cho các câu hỏi phỏng vấn tiềm năng</li>
                  </ul>
                </div>
              )}
              
              {application.status === 'reviewing' && (
                <div className="text-sm">
                  <p className="mb-2">Nhà tuyển dụng đang xem xét đơn của bạn. Bạn nên:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Chuẩn bị cho phỏng vấn tiềm năng</li>
                    <li>Nghiên cứu kỹ về công ty và vị trí</li>
                    <li>Chuẩn bị các câu hỏi để hỏi nhà tuyển dụng</li>
                  </ul>
                </div>
              )}
              
              {application.status === 'interview' && (
                <div className="text-sm">
                  <p className="mb-2">Bạn đã được mời phỏng vấn! Hãy:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Xác nhận lịch phỏng vấn</li>
                    <li>Chuẩn bị kỹ cho buổi phỏng vấn</li>
                    <li>Ôn tập các câu hỏi kỹ thuật nếu cần</li>
                    <li>Mặc trang phục phù hợp</li>
                  </ul>
                </div>
              )}
              
              {application.status === 'accepted' && (
                <div className="text-sm">
                  <p className="mb-2">Chúc mừng! Đơn ứng tuyển của bạn đã được chấp nhận. Bước tiếp theo:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Xem xét và đàm phán đề nghị công việc</li>
                    <li>Xác nhận ngày bắt đầu</li>
                    <li>Hoàn thành các thủ tục giấy tờ cần thiết</li>
                    <li>Chuẩn bị cho ngày đầu tiên đi làm</li>
                  </ul>
                </div>
              )}
              
              {application.status === 'rejected' && (
                <div className="text-sm">
                  <p className="mb-2">Rất tiếc đơn ứng tuyển không thành công. Đừng nản lòng:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Xem các công việc khác phù hợp hơn</li>
                    <li>Nâng cao kỹ năng và kinh nghiệm của bạn</li>
                    <li>Cập nhật CV để tăng cơ hội</li>
                    <li>Tham gia các khóa học hoặc chứng chỉ liên quan</li>
                  </ul>
                  <Button className="w-full mt-3" size="sm" asChild>
                    <Link href="/jobs">Tìm việc phù hợp hơn</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 
