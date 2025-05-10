"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight } from "lucide-react";

export default function CompanyListCard({ company }) {
  return (
    <div className="bg-white rounded-[8px] border shadow-sm p-4 flex justify-between items-center hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-md flex items-center justify-center`}>
          <Image
            src={company.logo_url}
            alt={company.name}
            width={24}
            height={24}
            className="object-contain"
          />
        </div>
        <div>
          <h3 className="font-medium">{company.name}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
            <MapPin size={14} />
            <span>{company.country.name}</span>
            <span className="inline-block w-1 h-1 bg-gray-500 rounded-full mx-1"></span>
            <span>{company.open_positions_count} vị trí đang mở</span>
          </div>
        </div>
      </div>
      <Button
        variant="ghost"
        className="text-blue-600 rounded hover:text-blue-800 bg-blue-50 hover:bg-blue-100"
        asChild
      >
        <a href={`/companies/${company.id}`}>
          Xem chi tiết<ArrowRight size={16} className="ml-1" />
        </a>
      </Button>
    </div>
  );
} 
