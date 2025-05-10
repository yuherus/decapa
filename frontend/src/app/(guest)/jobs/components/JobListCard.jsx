"use client";

import Link from "next/link";
import Image from "next/image"
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Briefcase, DollarSign, Award, Star, FileText } from "lucide-react";
import ApplyJobDialog from "./ApplyJobDialog";
dayjs.extend(relativeTime);
dayjs.locale('vi');

export default function JobListCard({ job }) {
  return (
    <Card className="border shadow-sm hover:shadow-lg transition-shadow duration-200 w-full mb-4">
      <div className="p-4 flex flex-col md:flex-row md:items-center">
        <div className="flex-grow md:pr-6">
          <div className="flex flex-row mb-3">
            <Image src={job.companyLogo} className="border rounded-[4px]" width={80} height={80} alt="Company Logo"/>
            <div className="flex flex-1 flex-col md:flex-row md:justify-between ml-3">
              <div className="flex flex-col justify-between">
                <p className="text-sm font-[600] text-blue-600">{job.company}</p>
                <p className="text-xl text-blue-900 font-bold">{job.title}</p>
                <div className="flex items-center">
                  <DollarSign size={14} strokeWidth={3} className="mr-1" />
                  <span>{job.salary || "Thương lượng"}</span>
                </div>
              </div>
              <p className="text-sm text-gray-500">Posted {dayjs(job.postedDate).fromNow()}</p>
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
              <Star size={14} className="mr-1" />
              <span className="text-base/14 h-[14px]">{job.experience}</span>
            </div>
            <div className="flex items-center">
              <FileText size={14} className="mr-1" />
              <span className="text-base/14 h-[14px]">{job.contractType}</span>
            </div>
          </div>

          <div className="flex gap-2 mb-2">
            {job.skills.map((skill, index) => (
              <Badge key={index} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
          
          <p className="text-gray-700 mb-4 line-clamp-2">
            {job.description}
          </p>
        </div>
        
        <div className="flex flex-row md:flex-col gap-2 mt-4 md:mt-0 md:min-w-[180px] justify-end">
          <Button variant="outline" asChild className="flex-1 md:w-full">
            <Link href={`/jobs/${job.id}`}>
              Xem chi tiết
            </Link>
          </Button>
          <ApplyJobDialog jobId={job.id} jobTitle={job.title}>
            <Button className="flex-1 md:w-full">
              Nộp đơn ngay
          </Button>
          </ApplyJobDialog>
        </div>
      </div>
    </Card>
  );
} 
