"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  Bell, 
  Briefcase, 
  FileText, 
  LogOut, 
  Settings, 
  ChevronRight, 
  BookmarkIcon, 
  ArrowRight,
  DollarSign,
  MapPin
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Sidebar from "@/components/candidate/Sidebar";

export default function CandidateDashboard() {
  // Sample user data
  const userData = {
    name: "Esther Howard",
    profileImage: "/profile-avatar.png",
    stats: {
      appliedJobs: 589,
      favoriteJobs: 238,
      jobAlerts: 574
    },
    profileCompleted: false
  };

  // Sample recently applied jobs
  const recentlyAppliedJobs = [
    {
      id: 1,
      title: "Networking Engineer",
      company: "Upwork",
      companyLogo: "/upwork-logo.png",
      location: "Washington",
      salary: "$50k-80k/month",
      type: "Remote",
      date: "Feb 2, 2019 19:28",
      status: "Active"
    },
    {
      id: 2,
      title: "Product Designer",
      company: "Dribbble",
      companyLogo: "/dribbble-logo.png",
      location: "Dhaka",
      salary: "$50k-80k/month",
      type: "Full Time",
      date: "Dec 7, 2019 23:26",
      status: "Active"
    },
    {
      id: 3,
      title: "Junior Graphic Designer",
      company: "Apple",
      companyLogo: "/apple-logo.png",
      location: "Brazil",
      salary: "$50k-80k/month",
      type: "Temporary",
      date: "Feb 2, 2019 19:28",
      status: "Active"
    },
    {
      id: 4,
      title: "Visual Designer",
      company: "Microsoft",
      companyLogo: "/microsoft-logo.png",
      location: "Wisconsin",
      salary: "$50k-80k/month",
      type: "Contract Base",
      date: "Dec 7, 2019 23:26",
      status: "Active",
      highlighted: true
    }
  ];

  return (
    <div className="flex-1 p-6 w-full">
      {/* Welcome Section */}
      <div className="mb-6">
        <h1 className="text-xl font-medium">Hello, {userData.name}</h1>
        <p className="text-gray-500">Here is your daily activities and job alerts</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-blue-50 border-none">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">{userData.stats.appliedJobs}</h2>
              <p className="text-gray-600">Applied jobs</p>
            </div>
            <div className="bg-white p-3 rounded-lg">
              <Briefcase className="h-6 w-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-amber-50 border-none">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">{userData.stats.favoriteJobs}</h2>
              <p className="text-gray-600">Favorite jobs</p>
            </div>
            <div className="bg-white p-3 rounded-lg">
              <BookmarkIcon className="h-6 w-6 text-amber-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-none">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">{userData.stats.jobAlerts}</h2>
              <p className="text-gray-600">Job Alerts</p>
            </div>
            <div className="bg-white p-3 rounded-lg">
              <Bell className="h-6 w-6 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Profile Completion Alert */}
      {!userData.profileCompleted && (
        <div className="bg-red-500 text-white rounded-lg p-4 mb-6 flex items-center">
          <div className="mr-4">
            <Image
              src={userData.profileImage}
              alt="Profile"
              width={60}
              height={60}
              className="rounded-full"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-medium mb-1">Your profile editing is not completed.</h3>
            <p className="text-sm">Complete your profile editing & build your custom Resume</p>
          </div>
          <Button className="bg-white text-red-500 hover:bg-gray-100 ml-4">
            Edit Profile <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Recently Applied Jobs */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Recently Applied</h2>
          <Link href="/all-applications" className="text-blue-600 flex items-center text-sm">
            View all <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="bg-white rounded-lg overflow-hidden border">
          <table className="w-full">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Job</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date Applied</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentlyAppliedJobs.map((job) => (
                <tr key={job.id} className={job.highlighted ? "bg-blue-50" : ""}>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded bg-gray-100 flex items-center justify-center">
                        <Image
                          src={job.companyLogo}
                          alt={job.company}
                          width={24}
                          height={24}
                          className="max-h-6"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">{job.title}</div>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Badge className={`mr-2 ${
                            job.type === "Remote" ? "bg-blue-100 text-blue-800" : 
                            job.type === "Full Time" ? "bg-green-100 text-green-800" :
                            job.type === "Temporary" ? "bg-orange-100 text-orange-800" :
                            "bg-purple-100 text-purple-800"
                          } border-none`}>
                            {job.type}
                          </Badge>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          {job.location}
                          <span className="mx-2">•</span>
                          <DollarSign className="h-4 w-4 mr-1" />
                          {job.salary}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{job.date}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 inline-flex items-center text-xs font-medium text-green-800">
                      <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <Button className={`${job.highlighted ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"}`}>
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
