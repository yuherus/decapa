"use client";

import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

export default function GuestLayout({ children }) {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        {children}
      </main>
      <Footer />
    </>
  );
}
