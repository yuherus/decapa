"use client";

import { useState, useEffect } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function AdminLayout({ children }) {
  const [queryClient] = useState(() => new QueryClient());
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640); 
    };

    handleResize(); 
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <AdminHeader onMobileMenuClick={() => setShowMobileMenu(true)} />
        <div className="flex flex-1">
          <AdminSidebar isMobile={isMobile}/>
          <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
            <SheetContent side="left" className="p-0">
              <>
                <SheetHeader className="mb-1">
                  <SheetTitle></SheetTitle>
                </SheetHeader>
                <AdminSidebar isMobile={!isMobile}/>
              </>
            </SheetContent>
          </Sheet>
          <main className="flex-1 overflow-y-auto bg-gray-50">{children}</main>
        </div>
      </div>
    </QueryClientProvider>
  );
}
