"use client";

import { useState } from "react";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Bookmark } from "lucide-react";
import PaginationBar from "@/components/shared/PaginationBar";

export default function FavoriteJobsDashboard() {
  // Mẫu dữ liệu cho Favorite Jobs
  const [favoriteJobs, setFavoriteJobs] = useState([
    {
      id: 1,
      title: "Technical Support Specialist",
      company: "Google",
      logo: "G",
      location: "Idaho, USA",
      salary: "$15K-$20K",
      jobType: "Full Time",
      status: "expired",
      daysRemaining: 0,
    },
    {
      id: 2,
      title: "UI/UX Designer",
      company: "YouTube",
      logo: "YT",
      location: "Minnesota, USA",
      salary: "$10K-$15K",
      jobType: "Full Time",
      status: "active",
      daysRemaining: 4,
    },
    {
      id: 3,
      title: "Senior UX Designer",
      company: "Dribbble",
      logo: "Db",
      location: "United Kingdom of Great Britain",
      salary: "$30K-$35K",
      jobType: "Full Time",
      status: "active",
      daysRemaining: 4,
    },
    {
      id: 4,
      title: "Junior Graphic Designer",
      company: "Facebook",
      logo: "Fb",
      location: "Mymensingh, Bangladesh",
      salary: "$40K-$50K",
      jobType: "Full Time",
      status: "active",
      daysRemaining: 4,
    },
    {
      id: 5,
      title: "Technical Support Specialist",
      company: "Google",
      logo: "G",
      location: "Idaho, USA",
      salary: "$15K-$20K",
      jobType: "Full Time",
      status: "expired",
      daysRemaining: 0,
    },
  ]);

  // State cho trang hiện tại
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Hàm xử lý logo placeholder dựa trên tên công ty
  const getLogoBackground = (company) => {
    const companyColors = {
      Google: "bg-blue-500",
      YouTube: "bg-red-500",
      Dribbble: "bg-pink-400",
      Facebook: "bg-blue-600",
      Twitter: "bg-blue-400",
      Microsoft: "bg-gray-100",
      Apple: "bg-gray-900 text-white",
      Adobe: "bg-red-600",
      Upwork: "bg-green-500",
    };
    
    return companyColors[company] || "bg-gray-200";
  };

  return (
    <div className="p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Favorite Jobs <span className="text-sm text-gray-500 font-normal">(17)</span></h2>
      </div>

      <div className="space-y-4">
        {favoriteJobs.map((job) => (
          <Card key={job.id} className="relative overflow-hidden border border-gray-200">
            <CardContent className="p-0">
              <div className="flex items-center p-4">
                {/* Logo công ty */}
                <div className={`w-12 h-12 rounded-md flex items-center justify-center mr-4 text-lg font-bold ${getLogoBackground(job.company)}`}>
                  {job.logo}
                </div>

                {/* Thông tin công việc */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{job.title}</h3>
                      <div className="mt-1 flex items-center text-gray-500 text-sm">
                        <span className="inline-block mr-4">{job.location}</span>
                        <span className="inline-block mr-4">{job.salary}</span>
                        {job.status === "expired" ? (
                          <span className="text-red-500">Job Expired</span>
                        ) : (
                          <span className="text-gray-500">{job.daysRemaining} Days Remaining</span>
                        )}
                      </div>
                    </div>

                    {/* Job Type Badge */}
                    <div className="flex items-center space-x-1">
                      <Badge variant="outline" className="text-xs bg-blue-50 text-blue-600 border-blue-100 px-2 py-0.5">
                        {job.jobType}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Bookmark icon */}
                <Bookmark className="h-5 w-5 text-gray-400 ml-2" />

                {/* Apply button */}
                {job.status === "active" ? (
                  <Button className="ml-4 px-4" size="sm">
                    Apply Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <div className="ml-4 px-4 py-2 bg-gray-100 text-gray-500 rounded-md text-sm">
                    Deadline Expired
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <PaginationBar 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={handlePageChange} 
      />
    </div>
  );
}
