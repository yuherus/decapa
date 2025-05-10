"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  DollarSign, 
  Clock, 
  Filter, 
  Search,
  CheckCircle2,
  Clock8,
  Timer,
  ThumbsUp,
  XCircle
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PaginationBar from "@/components/shared/PaginationBar";
import { applicationService } from "@/services/applications";
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

export default function JobApplicationsDashboard() {
  const { requireAuth } = useAuth();
  const { isLoading: isAuthLoading } = requireAuth();

  const [filter, setFilter] = useState({
    search: "",
    status: "",
    page: 1,
    per_page: 10
  });

  const { toast } = useToast();

  // Fetch dữ liệu đơn ứng tuyển từ API
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['applications', filter],
    queryFn: () => applicationService.getApplications(filter),
    enabled: !isAuthLoading
  });

  // Xử lý lọc theo status
  const handleStatusFilter = (value) => {
    setFilter(prev => ({
      ...prev,
      status: value,
      page: 1 // Reset về trang 1 khi thay đổi bộ lọc
    }));
  };

  // Xử lý tìm kiếm
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setFilter(prev => ({
        ...prev,
        search: e.target.value,
        page: 1 // Reset về trang 1 khi tìm kiếm mới
      }));
    }
  };

  // Xử lý chuyển trang
  const handlePageChange = (page) => {
    setFilter(prev => ({
      ...prev,
      page
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 flex items-center gap-1">
            <Clock8 className="h-3 w-3" />
            Đang chờ
          </Badge>
        );
      case 'reviewing':
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1">
            <Timer className="h-3 w-3" />
            Đang xem xét
          </Badge>
        );
      case 'interview':
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Phỏng vấn
          </Badge>
        );
      case 'accepted':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
            <ThumbsUp className="h-3 w-3" />
            Đã chấp nhận
          </Badge>
        );
      case 'rejected':
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1">
            <XCircle className="h-3 w-3" />
            Bị từ chối
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            {status}
          </Badge>
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

  // Format ngày giờ
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'dd MMM yyyy HH:mm', { locale: vi });
    } catch (error) {
      return dateString;
    }
  };

  // Tổng số đơn ứng tuyển
  const totalApplications = data?.metadata?.count || 0;
  const totalPages = data?.metadata?.total_pages || 1;

  return (
    <div className="p-6 w-full">
      <div className="mb-6">
        <h2 className="text-xl font-medium">Công việc đã ứng tuyển ({totalApplications})</h2>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input 
            placeholder="Tìm kiếm công việc..." 
            className="pl-9"
            onKeyDown={handleSearch}
          />
        </div>
        <Select value={filter.status} onValueChange={handleStatusFilter}>
          <SelectTrigger className="w-full md:w-[180px] flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <SelectValue placeholder="Lọc theo trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={null}>Tất cả trạng thái</SelectItem>
            <SelectItem value="pending">Đang chờ</SelectItem>
            <SelectItem value="reviewing">Đang xem xét</SelectItem>
            <SelectItem value="interview">Phỏng vấn</SelectItem>
            <SelectItem value="accepted">Đã chấp nhận</SelectItem>
            <SelectItem value="rejected">Bị từ chối</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading && (
        <div className="text-center py-8">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-blue-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-2 text-gray-500">Đang tải dữ liệu...</p>
        </div>
      )}

      {isError && (
        <div className="text-center py-8">
          <p className="text-red-500">Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.</p>
          <Button variant="outline" className="mt-2" onClick={() => refetch()}>
            Thử lại
          </Button>
        </div>
      )}

      {!isLoading && !isError && data?.applications?.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-gray-100 rounded-full p-4 mx-auto w-16 h-16 flex items-center justify-center mb-4">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium mb-2">Chưa có đơn ứng tuyển nào</h3>
          <p className="text-gray-500 mb-4">Bạn chưa ứng tuyển vào công việc nào. Hãy tìm kiếm và nộp đơn ngay!</p>
          <Button asChild>
            <Link href="/jobs">
              Tìm việc ngay
            </Link>
          </Button>
        </div>
      )}

      {!isLoading && !isError && data?.applications?.length > 0 && (
        <>
          <Card>
            <CardContent className="p-0">
              {/* Table Header */}
              <div className="grid grid-cols-12 bg-gray-50 p-4 text-sm text-gray-500 font-medium">
                <div className="col-span-5 sm:col-span-6">CÔNG VIỆC</div>
                <div className="col-span-3 sm:col-span-2 text-center">NGÀY ỨNG TUYỂN</div>
                <div className="col-span-2 text-center hidden sm:block">TRẠNG THÁI</div>
                <div className="col-span-4 sm:col-span-2 text-right">CHI TIẾT</div>
              </div>

              {/* Job Applications */}
              {data.applications.map((application) => (
                <div 
                  key={application.id} 
                  className="grid grid-cols-12 p-4 border-t border-gray-100 items-center"
                >
                  <div className="col-span-5 sm:col-span-6 flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-md flex items-center justify-center text-white font-bold ${getLogoBackground(application.job.company.name)}`}>
                      {getCompanyInitial(application.job.company.name)}
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-sm sm:text-base truncate">{application.job.title}</div>
                      <div className="text-xs text-gray-500 truncate">{application.job.company.name}</div>
                      <div className="sm:hidden mt-1">
                        {getStatusBadge(application.status)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-span-3 sm:col-span-2 text-center text-xs text-gray-500">
                    {formatDate(application.created_at)}
                  </div>
                  
                  <div className="col-span-2 text-center hidden sm:block">
                    {getStatusBadge(application.status)}
                  </div>
                  
                  <div className="col-span-4 sm:col-span-2 text-right">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-blue-600 border-blue-200 hover:bg-blue-50"
                      asChild
                    >
                      <Link href={`/dashboard/applied-jobs/${application.id}`}>
                        Xem chi tiết
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Pagination */}
          <div className="mt-6 flex justify-center">
            <PaginationBar 
              currentPage={filter.page} 
              totalPages={totalPages} 
              onPageChange={handlePageChange} 
            />
          </div>
        </>
      )}
    </div>
  );
}
