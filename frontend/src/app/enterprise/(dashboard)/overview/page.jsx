"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Users,
  Briefcase,
  Eye,
  UserCheck,
  TrendingUp,
  Calendar,
  Building,
  ArrowRight,
  MapPin,
  DollarSign,
} from "lucide-react";

export default function EnterpriseOverview() {
  const [recentJobs] = useState([
    {
      id: 1,
      title: "Senior Frontend Developer",
      location: "Hà Nội",
      type: "Full-time",
      salary: "2000-3000",
      applications: 12,
      views: 156,
      status: "active",
      postedAt: "2024-03-15",
    },
    {
      id: 2,
      title: "Product Manager",
      location: "Hồ Chí Minh",
      type: "Full-time",
      salary: "2500-4000",
      applications: 8,
      views: 98,
      status: "active",
      postedAt: "2024-03-14",
    },
  ]);

  const [topCandidates] = useState([
    {
      id: 1,
      name: "Nguyễn Văn A",
      avatar: "/avatars/candidate1.jpg",
      position: "Senior Frontend Developer",
      experience: "5 năm",
      skills: ["React", "Vue", "TypeScript"],
      matchRate: 95,
    },
    {
      id: 2,
      name: "Trần Thị B",
      avatar: "/avatars/candidate2.jpg",
      position: "Product Manager",
      experience: "7 năm",
      skills: ["Product Strategy", "Agile", "Team Leadership"],
      matchRate: 90,
    },
  ]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tổng quan</h1>
        <Button>
          <Link href="/enterprise/post-job" className="flex items-center">
            Đăng tin tuyển dụng <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Thống kê */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Tin đang đăng</p>
                <h3 className="text-2xl font-bold mt-2">12</h3>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+2.5% so với tháng trước</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Lượt xem</p>
                <h3 className="text-2xl font-bold mt-2">1,234</h3>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Eye className="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+12% so với tháng trước</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Ứng viên mới</p>
                <h3 className="text-2xl font-bold mt-2">48</h3>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Users className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+5% so với tháng trước</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Phỏng vấn</p>
                <h3 className="text-2xl font-bold mt-2">8</h3>
              </div>
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Calendar className="h-5 w-5 text-orange-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+3 cuộc phỏng vấn mới</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tin tuyển dụng gần đây */}
      <Card className="mt-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Tin tuyển dụng gần đây</CardTitle>
            <Button variant="ghost">
              <Link href="/enterprise/jobs" className="flex items-center">
                Xem tất cả <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentJobs.map((job) => (
              <div
                key={job.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="space-y-2">
                  <h3 className="font-medium">{job.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {job.salary} USD
                    </div>
                    <Badge variant="outline">{job.type}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <p className="font-medium">{job.applications}</p>
                    <p className="text-gray-500">Ứng viên</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium">{job.views}</p>
                    <p className="text-gray-500">Lượt xem</p>
                  </div>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                    Đang đăng
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ứng viên nổi bật */}
      <Card className="mt-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Ứng viên nổi bật</CardTitle>
            <Button variant="ghost">
              <Link href="/enterprise/candidates" className="flex items-center">
                Xem tất cả <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topCandidates.map((candidate) => (
              <div
                key={candidate.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={candidate.avatar} />
                    <AvatarFallback>
                      {candidate.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{candidate.name}</h3>
                    <p className="text-sm text-gray-500">{candidate.position}</p>
                    <div className="flex gap-2 mt-2">
                      {candidate.skills.map((skill, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="font-medium text-green-600">
                      {candidate.matchRate}%
                    </p>
                    <p className="text-sm text-gray-500">Phù hợp</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Xem hồ sơ
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
