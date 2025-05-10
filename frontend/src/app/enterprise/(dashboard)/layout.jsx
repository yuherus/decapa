"use client";

import { useState } from "react";
import EnterpriseHeader from "@/components/enterprise/EnterpriseHeader";
import EnterpriseSidebar from "@/components/enterprise/EnterpriseSidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function EnterpriseLayout({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <main className="flex-grow">
        <EnterpriseHeader/>
        <div className="flex container mx-auto px-4 py-2 ">
          <EnterpriseSidebar/>
          <ScrollArea className="h-[calc(100vh-8rem)] w-full">
            {children}
          </ScrollArea>
        </div>
        <div className="flex justify-center text-sm items-center py-3 border-t">
          @ 2025 Decapa. All rights reserved
        </div>
      </main>
    </QueryClientProvider>
  );
}
