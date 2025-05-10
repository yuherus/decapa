"use client";

import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import vi from "dayjs/locale/vi";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Briefcase, DollarSign, FileText } from "lucide-react";
import ApplyJobDialog from "./ApplyJobDialog";
dayjs.extend(relativeTime);
dayjs.locale(vi);

export default function JobCard({ job }) {
  return (
    <Card className="border shadow-sm hover:shadow-lg transition-shadow duration-200">
      <div className="p-4 flex flex-col h-full">
        <div className="flex flex-row mb-3">
          <Image 
            src={job.companyLogo} 
            className="border rounded-[4px]" 
            width={60} 
            height={60} 
            alt={`${job.company?.name || 'Company'} logo`}
          />
          <div className="flex flex-col ml-3">
            <p className="text-sm font-[600] text-blue-600">{job.company}</p>
            <h2 className="text-xl text-blue-900 font-bold">{job.title}</h2>
            <div className="flex items-center">
              <DollarSign size={14} strokeWidth={3} className="mr-1" />
              <span>{job.salary || "Thương lượng"}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3 text-xs text-gray-700 mb-3">
          <div className="flex items-center">
            <MapPin size={14} className="mr-1" />
            <span className="text-base/14 h-[14px]">{job.location}</span>
          </div>
          <div className="flex items-center">
            <Briefcase size={14} className="mr-1" />
            <span className="text-base/14 h-[14px]">{job.jobType}</span>
          </div>
          <div className="flex items-center">
            <FileText size={14} className="mr-1" />
            <span className="text-base/14 h-[14px]">{job.contractType}</span>
          </div>
        </div>
        
        {job.skills && job.skills.length > 0 && (
          <div className="flex gap-2 mb-2 flex-wrap">
            {job.skills.map((skill, index) => (
              <Badge key={index} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        )}
        
        <p className="text-gray-700 flex-grow line-clamp-2">
          {job.description && job.description.length > 100
            ? job.description.substring(0, 100) + "..."
            : job.description}
        </p>
        
        <div className="mt-4 flex justify-between items-center">
          <Button variant="outline" asChild>
            <Link href={`/jobs/${job.id}`}>
              Xem chi tiết
            </Link>
          </Button>
          <ApplyJobDialog jobId={job.id} jobTitle={job.title}>
            <Button>
              Nộp đơn ngay
          </Button>
          </ApplyJobDialog>
        </div>
        
        <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
          <span>Đăng {dayjs(job.created_at).fromNow()}</span>
          {job.isUrgent && (
            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
              Tuyển gấp
            </Badge>
          )}
        </div>
      </div>
    </Card>
  );
}
