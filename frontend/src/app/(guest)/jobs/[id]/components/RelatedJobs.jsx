"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import apiClient from "@/lib/apiClient";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, Clock, ChevronLeft, ChevronRight, Briefcase, DollarSign } from "lucide-react";
import dayjs from "dayjs";
import 'dayjs/locale/vi';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.locale('vi');

export default function RelatedJobs({ currentJobId }) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;

  // Fetch các công việc liên quan
  const fetchRelatedJobs = async () => {
    try {
      // Đầu tiên lấy thông tin công việc hiện tại để biết ngành nghề, kỹ năng
      const { data: currentJob } = await apiClient.get(`/api/v1/jobs/${currentJobId}`);
      
      // Sau đó lấy các công việc liên quan dựa trên ngành nghề hoặc kỹ năng tương tự
      const { data } = await apiClient.get("/api/v1/jobs", {
        params: {
          q: {
            id_not_eq: currentJobId,
            company_industry_eq: currentJob.company.industry,
          },
          per_page: 6
        }
      });

      console.log(data);
      return data.jobs;
    } catch (error) {
      console.error("Lỗi khi lấy công việc liên quan:", error);      
      const { data } = await apiClient.get("/api/v1/jobs", {
        params: {
          q: {
            id_not_eq: currentJobId
          },
          per_page: 6
        }
      });
      
      
      return data.jobs;
    }
  };

  const { data: relatedJobs, isLoading, error } = useQuery({
    queryKey: ["related-jobs", currentJobId],
    queryFn: fetchRelatedJobs,
  });

  // Xử lý chuyển trang
  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    if (!relatedJobs) return;
    const maxPage = Math.ceil(relatedJobs.length / itemsPerPage) - 1;
    setCurrentPage(prev => Math.min(maxPage, prev + 1));
  };

  // Lấy các công việc cho trang hiện tại
  const getCurrentPageJobs = () => {
    if (!relatedJobs) return [];
    const startIndex = currentPage * itemsPerPage;
    return relatedJobs.slice(startIndex, startIndex + itemsPerPage);
  };

  const getJobTypeText = (size) => {
    const sizes = {
      0: "Office",
      1: "Remote",
      2: "Hybrid"
    };
    return sizes[size] || "Không xác định";
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Việc làm tương tự</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" disabled>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" disabled>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="mb-4 last:mb-0">
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !relatedJobs || relatedJobs.length === 0) {
    return null;
  }

  const currentJobs = getCurrentPageJobs();
  const totalPages = Math.ceil(relatedJobs.length / itemsPerPage);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold">Việc làm tương tự</h3>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handlePrevPage}
              disabled={currentPage === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleNextPage}
              disabled={currentPage >= totalPages - 1 || totalPages <= 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentJobs.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-md flex items-center justify-center mr-3">
                  {job.company.logo ? (
                    <Image 
                      src={job.company.logo} 
                      alt={job.company.name} 
                      width={24} 
                      height={24} 
                      className="object-contain" 
                    />
                  ) : (
                    <Building2 className="h-5 w-5 text-blue-600" />
                  )}
                </div>
                <div>
                  {job.is_featured && (
                    <Badge className="bg-pink-100 text-pink-600 border-pink-200 mb-1">Nổi bật</Badge>
                  )}
                  <p className="text">{job.company.name}</p>
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-2 line-clamp-1">{job.title}</h3>
              <div className="flex justify-between">
                <div className="flex items-center text-sm text-gray-500 mt-1 mb-4">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span className="line-clamp-1">{job.company_address.province}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500 mt-1 mb-4">
                  <Briefcase className="h-3 w-3 mr-1" />
                  <span className="line-clamp-1">{getJobTypeText(job.job_type)}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500 mt-1 mb-4">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{dayjs(job.created_at).fromNow()}</span>
                </div>
              </div>
              <div className="flex items-center text-md font-medium text-gray-600 mt-1 mb-4">
                <DollarSign size={24} strokeWidth={3} className="h-4 w-4 mr-1" />
                <span className="h-[24px] text-base/24">{`${job.min_salary}-${job.max_salary} / month`}</span>
              </div>
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700" 
                asChild
              >
                <Link href={`/jobs/${job.id}`}>Ứng tuyển ngay</Link>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 
