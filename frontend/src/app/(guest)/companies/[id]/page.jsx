"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Facebook, Twitter, Instagram, Linkedin, ArrowBigLeft, ArrowRight, CheckCircle, XCircle } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import dayjs from "dayjs";
import 'dayjs/locale/vi';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.locale('vi');

export default function CompanyDetailPage() {
  const params = useParams();
  const companyId = params.id;
  const queryClient = useQueryClient();

  const { data: company, isLoading, error } = useQuery({
    queryKey: ["company", companyId],
    queryFn: async () => {
      const { data } = await apiClient.get(`/api/v1/companies/${companyId}`);
      return data;
    },
  });

  const [isHovered, setIsHovered] = useState(false);

  const getSocialIcon = (type) => {
    switch (type) {
      case 0: return <Facebook className="h-4 w-4" />;
      case 1: return <Twitter className="h-4 w-4" />;
      case 2: return <Linkedin className="h-4 w-4" />;
      case 3: return <Instagram className="h-4 w-4" />;
      default: return <Facebook className="h-4 w-4" />;
    }
  };

  if (isLoading) return <div className="container mx-auto p-6">Đang tải...</div>;
  if (error) return <div className="container mx-auto p-6 text-red-500">Có lỗi xảy ra khi tải dữ liệu</div>;
  if (!company) return <div className="container mx-auto p-6">Không tìm thấy công ty</div>;

  return (
    <div className="min-h-screen">
      <div className="flex justify-between mb-6">
        <div className="text-2xl font-medium">Company Details</div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/companies">Company</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{company.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="container mx-auto py-4">
        {/* Company Banner */}
        <div className="relative w-full h-64 bg-gray-200 rounded-t-lg overflow-hidden">
          {company.banner_url ? (
            <Image 
              src={company.banner_url} 
              alt={`${company.name} banner`} 
              fill 
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500" />
          )}
        </div>

        {/* Company Info */}
        <div className="bg-white rounded-b-lg border border-t-0 shadow-md p-6 relative">
          <div className="flex flex-col md:flex-row">
            {/* Logo */}
            <div className="absolute -top-16 left-6 w-32 h-32 bg-white rounded-lg shadow-md p-2 flex items-center justify-center">
              <Image 
                src={company.logo_url} 
                alt={company.name} 
                width={100} 
                height={100} 
                className="object-contain"
              />
            </div>

            {/* Company Details */}
            <div className="mt-16 md:mt-0 md:ml-40 flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{company.name}</h2>
                  <p className="text-gray-600 mt-1">{company.industry_text}</p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    className="mt-4 p-4 py-5 md:mt-0 border border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={async () => {
                      try {
                        if (company.is_followed) {
                          await apiClient.delete(`/api/v1/companies/${company.id}/unfollow`);
                        } else {
                          await apiClient.post(`/api/v1/companies/${company.id}/follow`);
                        }
                        // Refresh data
                        queryClient.invalidateQueries(["company", companyId]);
                      } catch (error) {
                        console.error("Error following/unfollowing company:", error);
                      }
                    }}
                  >
                    {!company.is_followed ? (
                      "Follow"
                    ) : (
                      <>
                        {isHovered ? (
                          <>
                            Unfollow <XCircle className="inline-block ml-1" />
                          </>
                        ) : (
                          <>
                            Followed <CheckCircle className="inline-block ml-1" />
                          </>
                        )}
                      </>
                    )}
                  </Button>
                  <Button className="mt-4 p-4 py-5 md:mt-0 bg-blue-600 hover:bg-blue-700">
                    <Link href="#open-position">View Open Position</Link>
                    <ArrowRight/>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Company Content */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h3 className="text-xl font-bold mb-4">Description</h3>
              <div className="prose max-w-none">
                <p>{company.description}</p>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm text-gray-500 mb-2">Share profile:</p>
              <div className="flex space-x-2">
                <Link href="#" className="flex items-center text-blue-600 text-sm">
                  <Facebook className="h-4 w-4 mr-1" /> Facebook
                </Link>
                <Link href="#" className="flex items-center text-blue-400 text-sm">
                  <Twitter className="h-4 w-4 mr-1" /> Facebook
                </Link>
                <Link href="#" className="flex items-center text-red-500 text-sm">
                  <Instagram className="h-4 w-4 mr-1" /> Pinterest
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mr-3">
                  <svg className="h-5 w-5 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">FOUNDED IN</p>
                  <p className="font-medium">{company.founded_at || "14 June, 2021"}</p>
                </div>
              </div>

              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mr-3">
                  <svg className="h-5 w-5 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 21V19C19 17.9391 18.5786 16.9217 17.8284 16.1716C17.0783 15.4214 16.0609 15 15 15H9C7.93913 15 6.92172 15.4214 6.17157 16.1716C5.42143 16.9217 5 17.9391 5 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">ORGANIZATION TYPE</p>
                  <p className="font-medium">Private Company</p>
                </div>
              </div>

              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mr-3">
                  <svg className="h-5 w-5 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M23 21V19C22.9986 17.1771 21.765 15.5857 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16 3.13C17.7699 3.58317 19.0078 5.17799 19.0078 7.005C19.0078 8.83201 17.7699 10.4268 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">TEAM SIZE</p>
                  <p className="font-medium">{company.company_size_text || "120-300 Candidates"}</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mr-3">
                  <svg className="h-5 w-5 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">INDUSTRY TYPE</p>
                  <p className="font-medium">{company.industry_text || "Technology"}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold mb-4">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mr-3 mt-1">
                    <svg className="h-5 w-5 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">WEBSITE</p>
                    <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {company.website || "www.estherhoward.com"}
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mr-3 mt-1">
                    <svg className="h-5 w-5 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7294C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77383 17.3147 6.72534 15.2662 5.19 12.85C3.49998 10.2412 2.44824 7.27099 2.12 4.18C2.09501 3.90347 2.12788 3.62476 2.2165 3.36162C2.30513 3.09849 2.44757 2.85669 2.63477 2.65162C2.82196 2.44655 3.04981 2.28271 3.30379 2.17052C3.55778 2.05833 3.83234 2.00026 4.11 2H7.11C7.59531 1.99522 8.06579 2.16708 8.43376 2.48353C8.80173 2.79999 9.04208 3.23945 9.11 3.72C9.23662 4.68007 9.47145 5.62273 9.81 6.53C9.94455 6.88792 9.97366 7.27691 9.89391 7.65088C9.81415 8.02485 9.62886 8.36811 9.36 8.64L8.09 9.91C9.51356 12.4135 11.5865 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9752 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0554 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">PHONE</p>
                    <p>{company.phone || "+1-202-555-0141"}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mr-3 mt-1">
                    <svg className="h-5 w-5 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">EMAIL ADDRESS</p>
                    <a href={`mailto:${company.email || "esther.howard@gmail.com"}`} className="text-blue-600 hover:underline">
                      {company.email || "esther.howard@gmail.com"}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm font-medium mb-2">Follow us on:</p>
              <div className="flex space-x-2">
                {company.company_social_links && company.company_social_links.map((link, index) => (
                  <a 
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-100"
                  >
                    {getSocialIcon(link.social_type)}
                  </a>
                ))}
                {(!company.company_social_links || company.company_social_links.length === 0) && (
                  <>
                    <a href="#" className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-100">
                      <Facebook className="h-4 w-4" />
                    </a>
                    <a href="#" className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-100">
                      <Twitter className="h-4 w-4" />
                    </a>
                    <a href="#" className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-100">
                      <Instagram className="h-4 w-4" />
                    </a>
                    <a href="#" className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-100">
                      <Youtube className="h-4 w-4" />
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Open Positions */}
        <div className="mt-16" id="open-position">
          <h2 className="text-2xl font-bold mb-8">Open Position ({company.open_positions?.length || 0})</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {company.open_positions && company.open_positions.length > 0 ? (
              company.open_positions.map((job) => (
                <Link href={`/jobs/${job.id}`} key={job.id} className="block">
                  <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-md flex items-center justify-center mr-3">
                        <Image 
                          src={company.logo_url || "/api/placeholder/48/48"} 
                          alt={company.name} 
                          width={24} 
                          height={24} 
                          className="object-contain" 
                        />
                      </div>
                      <div>
                        {job.is_featured && (
                          <Badge className="bg-pink-100 text-pink-600 border-pink-200 mb-1">Featured</Badge>
                        )}
                        <p className="text-sm">{company.location || "China"}</p>
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg mb-4">{job.title}</h3>
                    <div className="flex justify-between items-center">
                      <p className="text-sm">{job.contract_type === 0 ? "Full Time" : job.contract_type === 1 ? "Part Time" : "Contract Base"}</p>
                      <p className="text-sm text-blue-600">${job.min_salary}-${job.max_salary}k</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-3 text-center py-12 bg-white rounded-lg shadow-sm">
                <p className="text-gray-500">Không có vị trí tuyển dụng nào</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
