import React, { forwardRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { 
  Bell, 
  PhoneCall, 
  Search, 
  User,
  Settings,
  LogOut
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

import LanguageSelector from "@/components/shared/LanguageSelector";

export default function Header() {
  const [activeNav, setActiveNav] = useState("/");
  const router = useRouter();
  const { user, isAuthenticated, logoutUser } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="flex items-center justify-between px-8 bg-gray-100 border-b">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink 
                  className={`${navigationMenuTriggerStyle()} ${activeNav === "/" ? "text-blue-600 border-b-2 border-blue-600" : ""}`} 
                  onClick={() => setActiveNav("/")}
                >
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/jobs" legacyBehavior passHref>
                <NavigationMenuLink 
                  className={`${navigationMenuTriggerStyle()} ${activeNav === "/jobs" ? "text-blue-600 border-b-2 border-blue-600" : ""}`} 
                  onClick={() => setActiveNav("/jobs")}
                >
                  Jobs
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/companies" legacyBehavior passHref>
                <NavigationMenuLink 
                  className={`${navigationMenuTriggerStyle()} ${activeNav === "/companies" ? "text-blue-600 border-b-2 border-blue-600" : ""}`} 
                  onClick={() => setActiveNav("/companies")}
                >
                  Companies
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/dashboard/overview" legacyBehavior passHref>
                <NavigationMenuLink 
                  className={`${navigationMenuTriggerStyle()} ${activeNav === "/dashboard/overview" ? "text-blue-600 border-b-2 border-blue-600" : ""}`} 
                  onClick={() => setActiveNav("/dashboard/overview")}
                >
                  Dashboard
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Tools</NavigationMenuTrigger>
              <NavigationMenuContent className="w-auto min-w-[150px]">
                <ul className="grid gap-1 p-2 bg-white w-[150px] md:w-[180px] lg:w-[200px]">
                  <ListItem href="/create-cv">Create CV</ListItem>
                  <ListItem href="/docs">Convert CV</ListItem>
                  <ListItem href="/docs">Interview Questions</ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center gap-4 pe-4">
          <div className="flex items-center gap-2">
            <PhoneCall className="h-5 w-5 text-gray-600" />
            <span className="text-sm text-gray-600">+84 912730122</span>
          </div>
          <LanguageSelector/>
        </div>
      </div>
      <div className="flex items-center justify-between px-12 py-3">
        <div className="flex items-center gap-12">
          <Image src="/logo.svg" alt="MyJob" width={96} height={96} />
          <div className="flex border rounded-[4px]">
            <Select>
              <SelectTrigger className="w-[100px] border-0 shadow-none">
                <SelectValue placeholder="Hà Nội" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="hanoi">Hà Nội</SelectItem>
                <SelectItem value="danang">Đà Nẵng</SelectItem>
                <SelectItem value="hochiminh">Hồ Chí Minh</SelectItem>
                <SelectItem value="other">Khác</SelectItem>
              </SelectContent>
            </Select>
            <div className="border-r-2 my-1"></div>
            <div className="relative flex items-center gap-4">
              <Search className="absolute left-3 h-4 w-4 text-gray-500" />
              <Input placeholder="Job title, keyword, company" className="pl-10 pr-40 border-0 shadow-none placeholder:text-gray-500 placeholder:italic" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          
          {isAuthenticated ? (
            <>
              <Bell className="h-5 w-5 text-gray-600 cursor-pointer"/>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="cursor-pointer flex items-center justify-center rounded-full bg-blue-100 p-1 h-9 w-9 hover:bg-blue-200 transition-colors">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 mt-1 bg-white">
                  <DropdownMenuLabel>
                    { `Hello ${user?.fullname}` || "Tài khoản của tôi"}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer" onClick={() => router.push('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => router.push('/settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Cài đặt</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="cursor-pointer text-red-600" 
                    onClick={logoutUser}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Đăng xuất</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button 
                className="bg-blue-600 text-white rounded-[4px] hover:bg-blue-700" 
              >
                <Link href="/login">
                  Login
                </Link>
              </Button>
              <Button className="bg-blue-600 text-white rounded-[4px] hover:bg-blue-700">
                <Link href="/enterprise">
                  For Employers
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

const ListItem = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-primary hover:scale-105 focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{children}</div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem";
