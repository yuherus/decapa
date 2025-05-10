"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  UserCog,
  FileText,
  Briefcase,
  FileUser,
  CreditCard,
  Shield,
  Settings,
  BarChart,
  Building,
} from "lucide-react";

const sidebarItems = [
  {
    title: "Tổng quan",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Quản lý tài khoản",
    href: "/admin/accounts",
    icon: UserCog,
  },
  {
    title: "Quản lý doanh nghiệp",
    href: "/admin/companies",
    icon: Building,
  },
  {
    title: "Quản lý tin tuyển dụng",
    href: "/admin/jobs",
    icon: Briefcase,
  },
  {
    title: "Quản lý hồ sơ ứng viên",
    href: "/admin/candidates",
    icon: FileUser,
  },
  {
    title: "Quản lý giao dịch",
    href: "/admin/transactions",
    icon: CreditCard,
  },
  {
    title: "Báo cáo thống kê",
    href: "/admin/reports",
    icon: BarChart,
  },
  {
    title: "Cài đặt hệ thống",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminSidebar({ isMobile }) {
  const pathname = usePathname();

  return (
    <div className={`border-r bg-gray-50/50 ${isMobile? "hidden" : "block"}`}>
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4">
          <Link
            href="/admin/overview"
            className="flex items-center gap-2 font-semibold"
          >
            <Shield className="h-6 w-6" />
            <span>Admin Dashboard</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium">
            {sidebarItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-blue-900 hover:bg-gray-100",
                    pathname === item.href
                      ? "bg-blue-100 text-blue-900"
                      : "text-gray-500"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
