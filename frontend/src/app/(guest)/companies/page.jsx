"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Building, MapPin, Briefcase, CheckCircle } from "lucide-react";
import SearchBar from "@/components/shared/SearchBar";
import DisplayFilters from "@/components/DisplayFilters";
import PaginationBar from "@/components/shared/PaginationBar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import CompanyGridCard from "./components/CompanyGridCard";
import CompanyListCard from "./components/CompanyListCard";

export default function FindEmployersPage() {
  const [radiusValue, setRadiusValue] = useState(32);
  const [viewMode, setViewMode] = useState("grid");
  const [filter, setFilter] = useState({
    search: "",
    location: "",
    category: "",
    sort: "created_at desc",
    perPage: "12",
    page: 1
  });
  
  const fetchCompanies = async () => {
    // Tạo đối tượng query cho Ransack
    const q = {};
    
    // Tìm kiếm theo từ khóa
    if (filter.search) {
      q['name_or_description_cont'] = filter.search;
    }
    
    // Lọc theo địa điểm
    if (filter.location) {
      q['company_addresses_city_cont'] = filter.location;
    }
    
    // Lọc theo ngành nghề/danh mục
    if (filter.category) {
      q['industry_eq'] = filter.category;
    }
    
    // Sắp xếp
    if (filter.sort) {
      q['s'] = filter.sort;
    }
    
    // Tạo params cho API request
    const params = {
      q: q,
      page: filter.page,
      per_page: filter.perPage
    };
    
    const { data } = await apiClient.get("/api/v1/companies", { params });
    console.log(data);
    return data;
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["companies", filter],
    queryFn: fetchCompanies,
  });

  const handleSearch = (searchValues) => {
    setFilter({
      ...filter,
      search: searchValues.search,
      location: searchValues.location,
      category: searchValues.category,
      page: 1
    });
  };

  const handlePageChange = (page) => {
    setFilter({
      ...filter,
      page: page
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleSortChange = (sortValue) => {
    let sortString = "";
    switch(sortValue) {
      case "latest":
        sortString = "created_at desc";
        break;
      case "oldest":
        sortString = "created_at asc";
        break;
      case "most-jobs":
        sortString = "jobs_count desc";
        break;
      default:
        sortString = "created_at desc";
    }
    
    setFilter({
      ...filter,
      sort: sortString,
      page: 1
    });
  };
  
  const handlePerPageChange = (perPage) => {
    setFilter({
      ...filter,
      perPage: perPage,
      page: 1
    });
  };
  
  const totalPages = data?.metadata?.total_pages || 1;

  return (
    <div className="mb-6">
      <div>
        <div className="flex justify-between mb-6">
          <div className="text-2xl font-medium">Tất cả công ty</div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Công ty</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <SearchBar 
          onSearch={handleSearch} 
          showAdvancedFilter={false}
          buttonText="Tìm công ty"
          categories={[
            { value: "0", label: "Công nghệ thông tin" },
            { value: "1", label: "Tài chính - Ngân hàng" },
            { value: "2", label: "Y tế - Dược phẩm" },
            { value: "3", label: "Giáo dục - Đào tạo" },
            { value: "4", label: "Bán lẻ" },
            { value: "5", label: "Sản xuất" },
            { value: "6", label: "Giải trí" }
          ]}
        />
      </div>

      <div className="flex flex-wrap justify-end items-center mb-6 gap-y-4">
        <DisplayFilters 
          activeView={viewMode}
          setActiveView={setViewMode}
          defaultSort={filter.sort === "created_at desc" ? "latest" : filter.sort === "created_at asc" ? "oldest" : "most-jobs"}
          defaultPerPage={filter.perPage}
          onSortChange={handleSortChange}
          onPerPageChange={handlePerPageChange}
          sortOptions={[
            { value: "latest", label: "Mới nhất" },
            { value: "oldest", label: "Cũ nhất" },
            { value: "most-jobs", label: "Nhiều vị trí nhất" }
          ]}
        />
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6).fill(0).map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Skeleton className="h-12 w-12 rounded-md" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-3/4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {error && <div className="text-red-500">Có lỗi xảy ra khi tải danh sách công ty.</div>}
      
      {data && (
        <>
          <div className="mb-6">
            <p className="text-gray-500">Hiển thị {data.companies.length} trong tổng số {data.metadata.count} công ty</p>
          </div>
          
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.companies.map((company) => (
                <CompanyGridCard company={company} key={company.id}/>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {data.companies.map((company) => (
                <CompanyListCard company={company} key={company.id}/>
              ))}
            </div>
          )}
          
          <div className="mt-8 flex justify-center">
            <PaginationBar 
              currentPage={parseInt(filter.page)} 
              totalPages={totalPages} 
              onPageChange={handlePageChange} 
            />
          </div>
        </>
      )}
    </div>
  );
}
