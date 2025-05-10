"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bell, Search, ChevronDown, LogOut, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";

export default function EnterpriseHeader() {
  const { user, logoutEmployer } = useAuth();
  const [notifications] = useState([
    {
      id: 1,
      title: "Ứng viên mới",
      message: "Nguyễn Văn A đã ứng tuyển vào vị trí Frontend Developer",
      time: "5 phút trước",
      unread: true,
    },
    {
      id: 2,
      title: "Nhắc nhở phỏng vấn",
      message: "Cuộc phỏng vấn với Trần Thị B sẽ diễn ra trong 1 giờ nữa",
      time: "1 giờ trước",
      unread: true,
    },
  ]);

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-2 lg:gap-4">
          <Link href="/enterprise/overview" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="MyJob" width={80} height={80} />
            <span className="hidden text-sm font-bold lg:inline-block">for Enterprise</span>
          </Link>
        </div>

        {/* Thanh tìm kiếm */}
        <div className="hidden md:block flex-1 px-6 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Tìm kiếm ứng viên, tin tuyển dụng..."
              className="pl-10 bg-gray-50"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
              >
                <Bell className="h-5 w-5" />
                {notifications.some(n => n.unread) && (
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Thông báo</h4>
                  <Badge variant="secondary" className="font-normal">
                    {notifications.filter(n => n.unread).length} mới
                  </Badge>
                </div>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b last:border-0 hover:bg-gray-50 ${
                      notification.unread ? "bg-blue-50/50" : ""
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h5 className="font-medium">{notification.title}</h5>
                      <span className="text-xs text-gray-500">{notification.time}</span>
                    </div>
                    <p className="text-sm text-gray-600">{notification.message}</p>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t text-center">
                <Link href="/enterprise/notifications" className="text-sm text-blue-600 hover:underline">
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
                  <AvatarImage src="/avatars/company-avatar.jpg" />
                  <AvatarFallback>CT</AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  { 
                    user && (<p className="text-sm font-medium">{user.fullname}</p>)
                  }
                  <p className="text-xs text-gray-500">Enterprise</p>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <Link href="/enterprise/profile">Hồ sơ</Link>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <Link href="/enterprise/settings">Cài đặt</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600" onClick={logoutEmployer}>
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
