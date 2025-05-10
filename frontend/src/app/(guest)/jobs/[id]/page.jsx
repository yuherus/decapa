"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import apiClient from "@/lib/apiClient";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { 
  Building2, 
  MapPin, 
  Clock, 
  Calendar, 
  Briefcase, 
  GraduationCap, 
  DollarSign,
  Share2,
  Bookmark,
  Send,
  Phone,
  Mail,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import dayjs from "dayjs";
import 'dayjs/locale/vi';
import ApplyJobDialog from "./components/ApplyJobDialog";
import SocialMediaLinks from "./components/SocialMediaLinks";
import RelatedJobs from "./components/RelatedJobs";

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params.id;
  const [showApplyDialog, setShowApplyDialog] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Fetch chi tiết công việc
  const fetchJobDetail = async () => {
    const { data } = await apiClient.get(`/api/v1/jobs/${jobId}`);
    return data;
  };

  const { data: job, isLoading, error } = useQuery({
    queryKey: ["job", jobId],
    queryFn: fetchJobDetail,
  });

  // Xử lý lưu công việc
  const handleSaveJob = async () => {
    try {
      // Trong thực tế, bạn sẽ gọi API để lưu/bỏ lưu công việc
      setIsSaved(!isSaved);
    } catch (error) {
      console.error("Lỗi khi lưu công việc:", error);
    }
  };

  // Xử lý ứng tuyển
  const handleApplyJob = () => {
    setShowApplyDialog(true);
  };

  // Xử lý chia sẻ công việc
  const handleShare = (platform) => {
    const url = window.location.href;
    const title = `Xem tin tuyển dụng ${job.title} tại ${job.company.name}`;
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      default:
        navigator.clipboard.writeText(url);
        alert("Đã sao chép liên kết vào clipboard!");
    }
  };

  const getCompanySizeText = (size) => {
    const sizes = {
      0: "Dưới 50 nhân viên",
      1: "50 - 250 nhân viên",
      2: "Trên 250 nhân viên",
      3: "Trên 1000 nhân viên"
    };
    return sizes[size] || "Không xác định";
  };

  const getIndustryText = (industry) => {
    const industries = {
      0: "Công nghệ",
      1: "Tài chính",
      2: "Y tế",
      3: "Giáo dục",
      4: "Bán lẻ",
      5: "Sản xuất",
      6: "Giải trí"
    };
    return industries[industry] || "Khác";
  };

  const getCompanyTypeText = (type) => {
    const types = {
      0: "Công ty tư nhân",
      1: "Công ty đại chúng",
      2: "Cơ quan nhà nước",
      3: "Tổ chức phi lợi nhuận",
      4: "Startup"
    };
    return types[type] || "Khác";
  };

  if (isLoading) return <div className="container mx-auto p-6">Đang tải...</div>;
  if (error) return <div className="container mx-auto p-6 text-red-500">Có lỗi xảy ra khi tải dữ liệu</div>;
  if (!job) return <div className="container mx-auto p-6">Không tìm thấy tin tuyển dụng</div>;

  return (
    <div>
      <div className="flex justify-between mb-6">
        <div className="text-2xl font-medium">Job Details</div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/jobs">Jobs</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{job.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Job Header */}
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Company Logo */}
            <div className="w-20 h-20 rounded-lg flex items-center justify-center overflow-hidden">
              <Image 
                src={job.companyLogo? job.companyLogo : "/images/default_company.png"} 
                alt={job.company.name} 
                width={80} 
                height={80} 
                className="border rounded-[4px]"
              />
            </div>

            {/* Job Title and Actions */}
            <div className="flex-grow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-2xl font-semibold">{job.title}</h1>
                    {job.is_featured && (
                      <Badge className="bg-pink-100 text-pink-600 border-pink-200">Featured</Badge>
                    )}
                    <Badge className="bg-blue-100 text-blue-600 border-blue-200">
                      {job.contract_type === 0 ? "Full Time" : 
                       job.contract_type === 1 ? "Part Time" : 
                       job.contract_type === 2 ? "Freelance" : "Internship"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-gray-500 text-sm">
                    <Link href={`/companies/${job.company.id}`} className="hover:text-blue-600 flex items-center">
                      <Globe className="w-4 h-4 mr-1" />
                      {job.company.website ? job.company.website.replace(/^https?:\/\//, '') : 'https://instagram.com'}
                    </Link>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-1" />
                      {job.company.phone || "(400) 555-0120"}
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-1" />
                      {job.company.email || "career@instagram.com"}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={handleSaveJob}
                    className={isSaved ? "text-blue-600" : ""}
                  >
                    <Bookmark className="h-5 w-5" />
                  </Button>
                  <Button 
                    onClick={handleApplyJob} 
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Apply Now <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Job Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Job Description</h2>
                <div className="prose max-w-none text-gray-700">
                  <div dangerouslySetInnerHTML={{ __html: job.description.replace(/\n/g, '<br />') }} />
                </div>

                <h2 className="text-xl font-semibold mt-8 mb-4">Responsibilities</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {job.requirements && job.requirements.split('\n').map((req, index) => (
                    <li className="list-none" key={index}>{req}</li>
                  ))}
                </ul>

                <h2 className="text-xl font-semibold mt-8 mb-4">Benefits</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {job.benefit && job.benefit.split('\n').map((req, index) => (
                    <li className="list-none" key={index}>{req}</li>
                  ))}
                </ul>

                <div className="mt-8 flex items-center">
                  <h3 className="font-semibold mr-2">Share this job:</h3>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-blue-600" 
                      onClick={() => handleShare('facebook')}
                    >
                      <Facebook className="h-4 w-4 mr-1" /> Facebook
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-blue-400" 
                      onClick={() => handleShare('twitter')}
                    >
                      <Twitter className="h-4 w-4 mr-1" /> Twitter
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Job Overview */}
          <div className="space-y-6">
            {/* Job Overview */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Job Overview</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-blue-50 rounded-md flex items-center justify-center mr-3">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">JOB POSTED</p>
                      <p className="font-medium">{dayjs(job.created_at).format('DD MMMM, YYYY')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-blue-50 rounded-md flex items-center justify-center mr-3">
                      <Clock className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">JOB EXPIRE IN</p>
                      <p className="font-medium">{dayjs(job.expired_at).format('DD MMMM, YYYY')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-blue-50 rounded-md flex items-center justify-center mr-3">
                      <GraduationCap className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">EDUCATION</p>
                      <p className="font-medium">Graduation</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-blue-50 rounded-md flex items-center justify-center mr-3">
                      <DollarSign className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">SALARY</p>
                      <p className="font-medium">
                        {`$${job.min_salary}-${job.max_salary}/month`}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-blue-50 rounded-md flex items-center justify-center mr-3">
                      <Briefcase className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">JOB TYPE</p>
                      <p className="font-medium">
                        {job.contract_type === 0 ? "Full Time" : 
                         job.contract_type === 1 ? "Part Time" : 
                         job.contract_type === 2 ? "Freelance" : "Internship"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-blue-50 rounded-md flex items-center justify-center mr-3">
                      <Clock className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">EXPERIENCE</p>
                      <p className="font-medium">
                        {job.experience === 0 ? "No Experience" :
                         job.experience === 1 ? "Fresher" :
                         job.experience === 2 ? "Junior" :
                         job.experience === 3 ? "Senior" : "Manager"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start col-span-2">
                    <div className="w-10 h-10 bg-blue-50 rounded-md flex items-center justify-center mr-3">
                      <MapPin className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">LOCATION</p>
                      <p className="font-medium">
                        {`${job.company_address.full_address}, ${job.company_address.province}`}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Company Info */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">{job.company.name}</h2>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-md flex items-center justify-center mr-3">
                    <Image 
                      src={job.companyLogo? job.companyLogo : "/images/default_company.png"} 
                      alt={job.company.name} 
                      width={80} 
                      height={80} 
                      className="border rounded-[4px]"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{job.company.description}</p>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Industry:</span>
                    <span className="font-medium">{getIndustryText(job.company.industry)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Organization type:</span>
                    <span className="font-medium">{getCompanyTypeText(job.company.company_type)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Company size:</span>
                    <span className="font-medium">{getCompanySizeText(job.company.company_size)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Website:</span>
                    <a 
                      href={job.company.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {job.company.website.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  {job.company.company_social_links && job.company.company_social_links.length > 0 && (
                    <SocialMediaLinks socialLinks={job.company.company_social_links} />
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Related Jobs */}
      <div className="container mx-auto px-4 md:px-6 pb-12">
        <RelatedJobs currentJobId={jobId} />
      </div>

      {/* Dialog ứng tuyển */}
      <ApplyJobDialog 
        open={showApplyDialog} 
        onOpenChange={setShowApplyDialog}
        job={{
          id: job.id,
          title: job.title,
          company: job.company.name
        }}
      />
    </div>
  );
}
