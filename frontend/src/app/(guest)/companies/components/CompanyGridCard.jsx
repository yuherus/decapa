"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function CompanyGridCard({ company }) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        <div className="flex flex-col items-center text-center mb-4">
          <div className={`w-32 h-32 rounded-md flex items-center justify-center mb-3`}>
            <Image
              src={company.logo_url}
              alt={company.name}
              width={128}
              height={128}
              className="border rounded-[8px]"
            />
          </div>
          <h3 className="font-medium text-lg">{company.name}</h3>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-2">
            <MapPin size={14} />
            <span>{company.country.name}</span>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">{company.open_positions_count} vị trí đang mở</span>
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-600 rounded hover:text-blue-800 bg-blue-50 hover:bg-blue-100"
              asChild
            >
              <a href={`/companies/${company.id}`}>
                Xem chi tiết <ArrowRight size={14} className="ml-1" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
} 
