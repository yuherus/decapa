"use client";

import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="vi">
      <QueryClientProvider client={queryClient}>
        <body className="min-h-screen flex flex-col">
            {children}
          <Toaster/>
          <SonnerToaster/>
        </body>
      </QueryClientProvider>
    </html>
  );
}
