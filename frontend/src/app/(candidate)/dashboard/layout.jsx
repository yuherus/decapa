"use client";

import Sidebar from "@/components/candidate/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex scrollbar-hide">
      <div className="sticky top-[103px] h-[calc(100vh-103px)]">
        <Sidebar activePage="overview" />
      </div>
      {children}
    </div>
  );
}
