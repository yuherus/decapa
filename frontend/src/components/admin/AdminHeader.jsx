"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Search,
  Settings,
  Shield,
  User,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function AdminHeader({ onMobileMenuClick }) {
  const { user, logoutAdmin } = useAuth();
  const [notifications] = useState([
    {
      id: 1,
      title: "Doanh nghiệp mới đăng ký",
      message: "Công ty ABC vừa đăng ký tài khoản mới",
      time: "5 phút trước",
      read: false,
    },
    {
      id: 2,
      title: "Tin tuyển dụng cần duyệt",
      message: "Có 5 tin tuyển dụng mới đang chờ duyệt",
      time: "30 phút trước",
      read: false,
    },
    {
      id: 3,
      title: "Báo cáo vi phạm",
      message: "Người dùng báo cáo tin tuyển dụng có nội dung không phù hợp",
      time: "1 giờ trước",
      read: true,
    },
  ]);

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-2 lg:gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onMobileMenuClick}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <Link href="/admin/overview" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="MyJob" width={80} height={80} />
            <span className="hidden text-sm font-bold lg:inline-block">
              Admin Panel
            </span>
          </Link>
        </div>

        {/* Thanh tìm kiếm */}
        <div className="hidden md:block flex-1 px-6 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Tìm kiếm người dùng, tin tuyển dụng..."
              className="pl-10 bg-gray-50"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {notifications.filter((n) => !n.read).length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="p-4 border-b">
                <h3 className="font-medium">Thông báo</h3>
                <p className="text-sm text-gray-500">
                  Bạn có {notifications.filter((n) => !n.read).length} thông báo
                  chưa đọc
                </p>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b ${
                      !notification.read ? "bg-blue-50" : ""
                    }`}
                  >
                    <h4 className="font-medium text-sm">
                      {notification.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {notification.time}
                    </p>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t text-center">
                <Link
                  href="/admin/notifications"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Xem tất cả thông báo
                </Link>
              </div>
            </PopoverContent>
          </Popover>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/admin-avatar.jpg" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  { 
                    user && (<p className="text-sm font-medium">{user.fullname}</p>)
                  }
                  <p className="text-xs text-gray-500">Quản trị viên</p>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <Link href="/admin/profile">Hồ sơ</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <Link href="/admin/settings">Cài đặt</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600" onClick={logoutAdmin}>
                <LogOut className="mr-2 h-4 w-4" />
                Đăng xuất
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
