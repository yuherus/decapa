"use client";

import Link from "next/link";
import { 
  Briefcase, 
  FileText, 
  LogOut, 
  Settings, 
  BookmarkIcon,
  User,
  Mail,
  FileUser,
  Inbox
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Sidebar({ activePage = "overview" }) {
  return (
    <div className="w-64 border-r h-full flex flex-col bg-white">
      <div className="p-4 border-b">
        <p className="text-xs text-gray-500 uppercase font-medium">CANDIDATE DASHBOARD</p>
      </div>

      <div className="py-2">
        <Link 
          href="/dashboard/overview" 
          className={`flex items-center px-4 py-3 ${
            activePage === "overview" 
              ? "text-blue-600 border-l-4 border-blue-600 bg-blue-50" 
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <FileText className="h-5 w-5 mr-3" />
          <span>Overview</span>
        </Link>
        
        <Link 
          href="/dashboard/profile" 
          className={`flex items-center px-4 py-3 ${
            activePage === "profile" 
              ? "text-blue-600 border-l-4 border-blue-600 bg-blue-50" 
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <User className="h-5 w-5 mr-3" />
          <span>Profile</span>
        </Link>

        <Link 
          href="/dashboard/my-cv" 
          className={`flex items-center px-4 py-3 ${
            activePage === "profile" 
              ? "text-blue-600 border-l-4 border-blue-600 bg-blue-50" 
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <FileUser className="h-5 w-5 mr-3" />
          <span>My CV</span>
        </Link>

        <Link 
          href="/dashboard/applied-jobs" 
          className={`flex items-center px-4 py-3 ${
            activePage === "applied-jobs" 
              ? "text-blue-600 border-l-4 border-blue-600 bg-blue-50" 
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <Briefcase className="h-5 w-5 mr-3" />
          <span>Applied Jobs</span>
        </Link>
        
        <Link 
          href="/dashboard/favorite-jobs" 
          className={`flex items-center px-4 py-3 ${
            activePage === "favorite-jobs" 
              ? "text-blue-600 border-l-4 border-blue-600 bg-blue-50" 
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <BookmarkIcon className="h-5 w-5 mr-3" />
          <span>Favorite Jobs</span>
        </Link>
        
        <Link 
          href="/dashboard/job-invitation" 
          className={`flex items-center px-4 py-3 justify-between ${
            activePage === "job-alert" 
              ? "text-blue-600 border-l-4 border-blue-600 bg-blue-50" 
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <div className="flex items-center">
            <Inbox className="h-5 w-5 mr-3" />
            <span>Job Invitation</span>
          </div>
          <Badge className="bg-gray-200 text-gray-700 rounded-full h-6 w-6 flex items-center justify-center p-0">09</Badge>
        </Link>

        <Link 
          href="/dashboard/email-subscriptions" 
          className={`flex items-center px-4 py-3 justify-between ${
            activePage === "job-alert" 
              ? "text-blue-600 border-l-4 border-blue-600 bg-blue-50" 
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <div className="flex items-center">
            <Mail className="h-5 w-5 mr-3" />
            <span>Email Subscriptions</span>
          </div>
        </Link>
        
        <Link 
          href="/dashboard/settings" 
          className={`flex items-center px-4 py-3 ${
            activePage === "settings" 
              ? "text-blue-600 border-l-4 border-blue-600 bg-blue-50" 
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <Settings className="h-5 w-5 mr-3" />
          <span>Settings</span>
        </Link>
      </div>

      <div className="mt-auto w-64 border-t">
        <button className="flex items-center px-4 py-3 text-gray-700 w-full hover:bg-gray-100">
          <LogOut className="h-5 w-5 mr-3" />
          <span>Log-out</span>
        </button>
      </div>
    </div>
  );
}
