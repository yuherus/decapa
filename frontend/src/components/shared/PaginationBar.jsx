"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function PaginationBar({
  currentPage = 1,
  totalPages = 5,
  onPageChange,
  className = "",
}) {
  const handlePageChange = (page) => {
    if (onPageChange && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className={`flex justify-center pt-12 ${className}`}>
      <Pagination>
        <PaginationContent className="flex items-center gap-1">
          <PaginationItem>
            <PaginationPrevious
              className="text-blue-500 h-8 w-8 p-0 border-0 rounded-full hover:bg-gray-200 hover:text-blue-600 flex items-center justify-center"
              icon={<ChevronLeft size={16} />}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
          </PaginationItem>

          {getPageNumbers().map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={page === currentPage}
                className={
                  page === currentPage
                    ? "h-8 w-8 p-0 bg-blue-600 text-white border-0 rounded-full hover:bg-blue-600 hover:text-white flex items-center justify-center"
                    : "h-8 w-8 p-0 border-0 rounded-full hover:bg-gray-200 flex items-center justify-center"
                }
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(page);
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              className="text-blue-500 h-8 w-8 p-0 border-0 rounded-full hover:bg-gray-200 hover:text-blue-600 flex items-center justify-center"
              icon={<ChevronRight size={16} />}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
} 
