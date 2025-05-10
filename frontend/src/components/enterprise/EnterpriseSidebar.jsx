"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Building,
  UserCog,
  FileText,
  Briefcase,
  UserCheck,
  Search,
  CreditCard,
  Calendar1,
  FileUser,
} from "lucide-react";

const sidebarItems = [
  {
    title: "Tổng quan",
    href: "/enterprise/overview",
    icon: LayoutDashboard,
  },
  {
    title: "Hồ sơ công ty",
    href: "/enterprise/company-profile",
    icon: Building,
  },
  {
    title: "Quản lý tài khoản",
    href: "/enterprise/account-management",
    icon: UserCog,
  },
  {
    title: "Đăng tin tuyển dụng",
    href: "/enterprise/post-job",
    icon: FileText,
  },
  {
    title: "Quản lý tin tuyển dụng",
    href: "/enterprise/jobs",
    icon: Briefcase,
  },
  {
    title: "Quản lý tin đơn ứng tuyển",
    href: "/enterprise/applicants",
    icon: FileUser,
  },
  {
    title: "Quản lý phỏng vấn",
    href: "/enterprise/interviews",
    icon: Calendar1,
  },
  {
    title: "Ứng viên đã lưu",
    href: "/enterprise/saved-candidates",
    icon: UserCheck,
  },
  {
    title: "Scout",
    href: "/enterprise/scout",
    icon: Search,
    badge: "Pro",
  },
  {
    title: "Gói dịch vụ & Thanh toán",
    href: "/enterprise/billing",
    icon: CreditCard,
  },
];

export default function EnterpriseSidebar() {
  const pathname = usePathname();

  return (
    <div className="pb-12 border-r">
      <div className="space-y-4 py-2">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Dashboard</h2>
            <div className="space-y-1">
              {sidebarItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center py-2 px-4 text-sm rounded-md hover:bg-gray-100",
                    pathname === item.href && "bg-gray-100"
                  )}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.title}
                  {item.badge && (
                    <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>
        </div>
      </div>
    </div>
  );
}
