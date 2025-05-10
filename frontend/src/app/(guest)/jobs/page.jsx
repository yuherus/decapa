"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";
import JobCard from "./components/JobCard";
import JobListCard from "./components/JobListCard";
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

export default function JobsIndexPage() {
  const [filter, setFilter] = useState({
    search: "",
    jobType: "",
    location: "",
    category: "",
    sort: "created_at desc",
    perPage: "12",
    page: 1
  });
  const [activeFilter, setActiveFilter] = useState('grid');

  const fetchJobs = async () => {
    // Tạo đối tượng query cho Ransack
    const q = {};
    
    // Tìm kiếm theo từ khóa
    if (filter.search) {
      q['title_or_description_cont'] = filter.search;
    }
    
    // Lọc theo loại công việc
    if (filter.jobType) {
      q['job_type_eq'] = filter.jobType;
    }
    
    // Lọc theo địa điểm
    if (filter.location) {
      q['company_address_city_eq'] = filter.location;
    }
    
    // Lọc theo ngành nghề/danh mục
    if (filter.category) {
      q['company_industry_eq'] = filter.category;
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
    
    const { data } = await apiClient.get("/api/v1/jobs", { params });
    return data;
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["jobs", filter],
    queryFn: fetchJobs,
  });

  const handleSearch = (searchValues) => {
    setFilter({
      ...filter,
      search: searchValues.search,
      location: searchValues.location,
      category: searchValues.category,
      page: 1 // Reset về trang 1 khi tìm kiếm mới
    });
  };

  const handleSortChange = (value) => {
    let sortValue;
    switch (value) {
      case 'latest':
        sortValue = 'created_at desc';
        break;
      case 'oldest':
        sortValue = 'created_at asc';
        break;
      case 'salary_high':
        sortValue = 'max_salary desc';
        break;
      case 'salary_low':
        sortValue = 'min_salary asc';
        break;
      default:
        sortValue = 'created_at desc';
    }
    
    setFilter({
      ...filter,
      sort: sortValue,
      page: 1 // Reset về trang 1 khi thay đổi sắp xếp
    });
  };

  const handlePerPageChange = (value) => {
    setFilter({
      ...filter,
      perPage: value,
      page: 1 // Reset về trang 1 khi thay đổi số lượng hiển thị
    });
  };

  const handlePageChange = (page) => {
    setFilter({
      ...filter,
      page: page
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Lấy tổng số trang từ metadata của API
  const totalPages = data?.metadata?.pages || 1;

  return (
    <div>
      <div className="mb-6">
        <div>
          <div className="flex justify-between mb-6">
            <div className="text-2xl font-medium">All Jobs</div>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Jobs</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <SearchBar 
            onSearch={handleSearch} 
            showAdvancedFilter={true}
            buttonText="Tìm việc"
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-end items-center mb-6 gap-y-4">
        <DisplayFilters 
          activeView={activeFilter}
          setActiveView={setActiveFilter}
          defaultSort={filter.sort}
          defaultPerPage={filter.perPage}
          onSortChange={handleSortChange}
          onPerPageChange={handlePerPageChange}
        />
      </div>

      {isLoading && <div>Đang tải...</div>}
      {error && <div>Có lỗi xảy ra khi tải danh sách công việc.</div>}
      
      {data && (
        <>
          <div className="mb-6">
            <p className="text-gray-500">Hiển thị {data.jobs.length} trong tổng số {data.metadata.count} công việc</p>
          </div>
          
          {activeFilter === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.jobs.map((job) => (
                <JobCard 
                  key={job.id} 
                  job={{
                    id: job.id,
                    title: job.title,
                    company: job.company.name,
                    companyLogo: job.company.logo || "/images/default_company.png",
                    location: job.company_address.province,
                    jobType: job.job_type === 0 ? "Office" : job.job_type === 1 ? "Remote" : "Hybrid",
                    contractType: job.contract_type === 0 ? "Toàn thời gian" : job.contract_type === 1 ? "Bán thời gian" : job.contract_type === 2 ? "Freelance" : "Thực tập",
                    experience: job.experience === 0 ? "No Experience" : job.experience === 1 ? "Fresher" : job.experience === 2 ? "Junior" : job.experience === 3 ? "Senior" : "Manager",
                    salary: job.min_salary && job.max_salary ? `${job.min_salary.toLocaleString()} - ${job.max_salary.toLocaleString()} USD` : "Thương lượng",
                    postedDate: new Date(job.created_at),
                    description: job.description,
                    skills: job.skills.map(skill => skill.skill_name),
                    isUrgent: new Date(job.expired_at) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                    created_at: job.created_at,
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {data.jobs.map((job) => (
                <JobListCard 
                  key={job.id} 
                  job={{
                    id: job.id,
                    title: job.title,
                    company: job.company.name,
                    companyLogo: job.company.logo || "/images/default_company.png",
                    location: job.company_address.province,
                    jobType: job.job_type === 0 ? "Văn phòng" : job.job_type === 1 ? "Từ xa" : "Hybrid",
                    contractType: job.contract_type === 0 ? "Toàn thời gian" : job.contract_type === 1 ? "Bán thời gian" : job.contract_type === 2 ? "Freelance" : "Thực tập",
                    experience: job.experience === 0 ? "No Experience" : job.experience === 1 ? "Fresher" : job.experience === 2 ? "Junior" : job.experience === 3 ? "Senior" : "Manager",
                    salary: job.min_salary && job.max_salary ? `${job.min_salary.toLocaleString()} - ${job.max_salary.toLocaleString()} USD` : "Thương lượng",
                    postedDate: new Date(job.created_at),
                    description: job.description,
                    skills: job.skills.map(skill => skill.skill_name),
                    isUrgent: new Date(job.expired_at) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                    created_at: job.created_at,
                  }}
                />
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
