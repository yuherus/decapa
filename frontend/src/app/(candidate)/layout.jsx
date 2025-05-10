"use client";

import Header from "@/components/shared/Header";

export default function CandidateLayout({ children }) {
  return (
    <>
      <Header />
      <main className="container mx-auto flex-grow">
        {children}
      </main>
    </>
  );
}
