"use client";

import { useState, useEffect } from "react";
import { useCompanies } from "@/hooks/useCompanies";
import { useCountries } from "@/hooks/useCountries";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Building,
  CheckCircle,
  Edit,
  Eye,
  FileText,
  Globe,
  Lock,
  MapPin,
  Phone,
  Search,
  Trash2,
  User,
  Users,
  XCircle,
  AlertTriangle,
  Plus,
  X,
  Instagram,
  Youtube,
  Linkedin,
  Facebook,
  Twitter,
  Upload,
  Link,
  Image,
} from "lucide-react";
import PaginationBar from "@/components/shared/PaginationBar";

// Constants
const companySizes = [
  { value: "0", label: "Dưới 50 nhân viên" },
  { value: "1", label: "51-250 nhân viên" },
  { value: "2", label: "251-1000 nhân viên" },
  { value: "3", label: "Trên 1000 nhân viên" },
];

const industries = [
  { value: "0", label: "Công nghệ thông tin" },
  { value: "1", label: "Tài chính - Ngân hàng" },
  { value: "2", label: "Y tế" },
  { value: "3", label: "Giáo dục" },
  { value: "4", label: "Bán lẻ" },
  { value: "5", label: "Sản xuất" },
  { value: "6", label: "Giải trí" }
];

const companyTypes = [
  { value: "0", label: "Công ty tư nhân" },
  { value: "1", label: "Công ty đại chúng" },
  { value: "2", label: "Chính phủ" },
  { value: "3", label: "Tổ chức phi lợi nhuận" },
  { value: "4", label: "Startup" },
];

const companyStatuses = [
  { value: "0", label: "Chờ duyệt" },
  { value: "1", label: "Hoạt động" },
  { value: "2", label: "Đã xác minh" },
  { value: "3", label: "Bị khóa" },
];

export default function CompaniesManagementPage() {
  // Lấy dữ liệu quốc gia
  const { countries, isLoading: isLoadingCountries } = useCountries();

  // Trạng thái tìm kiếm và phân trang
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [industryFilter, setIndustryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    website: "",
    company_size: "",
    industry: "",
    company_type: "",
    country_id: "11", // Mặc định
    status: "0", // Mặc định là pending
    logo: null,
    banner: null,
    images: [],
    company_addresses_attributes: [{ province: "", full_address: "" }],
    company_social_links_attributes: [{ link_type: "facebook", url: "" }]
  });

  // Lấy dữ liệu từ API
  const { 
    companies, 
    metadata, 
    isLoading, 
    createCompany, 
    updateCompany, 
    deleteCompany 
  } = useCompanies({
    page: currentPage,
    per_page: 10,
    q: searchQuery,
    status: statusFilter !== "all" ? statusFilter : null,
    industry: industryFilter !== "all" ? industryFilter : null,
  });

  // Dialog state
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState(null);
  const [showVerifyDialog, setShowVerifyDialog] = useState(false);
  const [companyToVerify, setCompanyToVerify] = useState(null);
  const [verifyAction, setVerifyAction] = useState("approve"); // "approve" hoặc "reject"
  const [verifyNote, setVerifyNote] = useState("");
  const [showLockDialog, setShowLockDialog] = useState(false);
  const [companyToLock, setCompanyToLock] = useState(null);
  const [showCompanySheet, setShowCompanySheet] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  // Xử lý tìm kiếm
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  // Lọc doanh nghiệp theo tìm kiếm và bộ lọc
  const filteredCompanies = companies.filter(company => {
    // Lọc theo từ khóa tìm kiếm
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase())
    
    // Lọc theo trạng thái
    const matchesStatus = statusFilter === "all" || company.status === statusFilter;
    
    // Lọc theo ngành nghề
    const matchesIndustry = industryFilter === "all" || company.industry === industryFilter;
    
    return matchesSearch && matchesStatus && matchesIndustry;
  });

  // Phân trang
  const indexOfLastItem = currentPage * metadata.per_page;
  const indexOfFirstItem = indexOfLastItem - metadata.per_page;
  const currentCompanies = filteredCompanies.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCompanies.length / metadata.per_page);

  // Xử lý xem chi tiết doanh nghiệp
  const handleViewCompany = (company) => {
    setSelectedCompany(company);
    setShowCompanySheet(true);
  };

  // Xử lý tải lên hình ảnh cho logo
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, logo: file });
    }
  };

  // Xử lý tải lên hình ảnh cho banner
  const handleBannerUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, banner: file });
    }
  };

  // Xử lý tải lên nhiều hình ảnh
  const handleImagesUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setFormData({ ...formData, images: [...formData.images, ...files] });
    }
  };

  // Xử lý xóa hình ảnh đã tải lên
  const handleRemoveImage = (index) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData({ ...formData, images: newImages });
  };

  // Xử lý tạo doanh nghiệp mới
  const handleCreateCompany = () => {
    // Chuẩn bị dữ liệu để gửi đi
    const companyData = {
      name: formData.name,
      description: formData.description,
      website: formData.website,
      company_size: Number(formData.company_size),
      industry: Number(formData.industry),
      company_type: Number(formData.company_type),
      country_id: formData.country_id,
      status: Number(formData.status),
      company_addresses_attributes: formData.company_addresses_attributes.filter(address => 
        address.province.trim() !== "" || address.full_address.trim() !== ""
      ),
      company_social_links_attributes: formData.company_social_links_attributes.filter(link => 
        link.url.trim() !== ""
      )
    };
    
    // Thêm file hình ảnh nếu có
    if (formData.logo instanceof File) {
      companyData.logo = formData.logo;
    }
    
    if (formData.banner instanceof File) {
      companyData.banner = formData.banner;
    }
    
    // Thêm các hình ảnh khác nếu có
    if (formData.images && formData.images.length > 0) {
      companyData.images = formData.images.filter(image => image instanceof File);
    }
    
    createCompany(companyData, {
      onSuccess: () => {
        setShowCreateDialog(false);
        setFormData({
          name: "",
          description: "",
          website: "",
          company_size: "",
          industry: "",
          company_type: "",
          country_id: "11",
          status: "0",
          logo: null,
          banner: null,
          images: [],
          company_addresses_attributes: [{ province: "", full_address: "" }],
          company_social_links_attributes: [{ link_type: "facebook", url: "" }]
        });
      },
    });
  };

  // Xử lý sửa doanh nghiệp
  const handleEditClick = (company) => {
    setSelectedCompany(company);
    // Đảm bảo rằng company_addresses và company_social_links luôn là mảng
    const companyAddresses = company.company_addresses && company.company_addresses.length > 0 
      ? company.company_addresses 
      : [{ province: "", full_address: "" }];
      
    const companySocialLinks = company.company_social_links && company.company_social_links.length > 0 
      ? company.company_social_links 
      : [{ link_type: "facebook", url: "" }];
    
    setFormData({
      name: company.name,
      description: company.description || "",
      website: company.website || "",
      company_size: String(company.company_size),
      industry: String(company.industry),
      company_type: String(company.company_type),
      country_id: String(company.country?.id || "11"),
      status: String(company.status),
      logo: company.logo_url || null,
      banner: company.banner_url || null,
      images: company.image_urls || [],
      company_addresses_attributes: companyAddresses,
      company_social_links_attributes: companySocialLinks
    });
    
    setShowEditDialog(true);
  };

  // Xác nhận sửa doanh nghiệp
  const handleEditCompany = () => {
    // Chuẩn bị dữ liệu để gửi đi
    const companyData = {
      name: formData.name,
      description: formData.description,
      website: formData.website,
      company_size: Number(formData.company_size),
      industry: Number(formData.industry),
      company_type: Number(formData.company_type),
      status: Number(formData.status),
      country_id: formData.country_id,
      company_addresses_attributes: formData.company_addresses_attributes.map(address => {
        // Xử lý _destroy cho các địa chỉ đã có
        if (address.id && (address.province.trim() === "" && address.full_address.trim() === "")) {
          return { ...address, _destroy: true };
        }
        return address;
      }),
      company_social_links_attributes: formData.company_social_links_attributes.map(link => {
        // Xử lý _destroy cho các liên kết đã có
        if (link.id && link.url.trim() === "") {
          return { ...link, _destroy: true };
        }
        return link;
      })
    };
    
    // Thêm file hình ảnh nếu có
    if (formData.logo instanceof File) {
      companyData.logo = formData.logo;
    }
    
    if (formData.banner instanceof File) {
      companyData.banner = formData.banner;
    }
    
    // Thêm các hình ảnh khác nếu có
    if (formData.images && formData.images.length > 0) {
      companyData.images = formData.images.filter(image => image instanceof File);
    }
    
    updateCompany(
      { 
        id: selectedCompany.id, 
        data: companyData
      },
      {
        onSuccess: () => {
          setShowEditDialog(false);
          setSelectedCompany(null);
        },
      }
    );
  };

  // Xử lý xóa doanh nghiệp
  const handleDeleteCompany = (company) => {
    setCompanyToDelete(company);
    setShowDeleteDialog(true);
  };

  // Xác nhận xóa doanh nghiệp
  const confirmDeleteCompany = () => {
    deleteCompany(companyToDelete.id, {
      onSuccess: () => {
        setShowDeleteDialog(false);
        if (showCompanySheet) {
          setShowCompanySheet(false);
        }
      },
    });
  };

  // Xử lý xác nhận/từ chối doanh nghiệp
  const handleVerifyCompany = (company, action) => {
    setCompanyToVerify(company);
    setVerifyAction(action);
    setVerifyNote("");
    setShowVerifyDialog(true);
  };

  // Xác nhận xác thực doanh nghiệp
  const confirmVerifyCompany = () => {
    const newStatus = verifyAction === "approve" 
      ? (companyToVerify.status === 0 ? 1 : 2) 
      : 3;

    updateCompany({
      id: companyToVerify.id,
      data: {
        status: newStatus,
        note: verifyNote
      }
    }, {
      onSuccess: () => {
        setShowVerifyDialog(false);
      }
    });
  };

  // Xử lý khóa/mở khóa doanh nghiệp
  const handleLockCompany = (company) => {
    setCompanyToLock(company);
    setShowLockDialog(true);
  };

  // Xác nhận khóa/mở khóa doanh nghiệp
  const confirmLockCompany = () => {
    const newStatus = companyToLock.status === 3 
      ? (companyToLock.status === 2 ? 2 : 1) 
      : 3;
        
    updateCompany({
      id: companyToLock.id,
      data: { 
        status: newStatus
      }
    }, {
      onSuccess: () => {
        setShowLockDialog(false);
      }
    });
  };

  // Hiển thị badge trạng thái
  const getStatusBadge = (status) => {
    switch (status) {
      case 1:
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">Hoạt động</Badge>;
      case 2:
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300 flex items-center gap-1">
          <CheckCircle className="h-3 w-3" /> Đã xác minh
        </Badge>;
      case 3:
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">Bị khóa</Badge>;
      case 0:
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">Chờ duyệt</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý doanh nghiệp</h1>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Tạo doanh nghiệp mới
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Danh sách doanh nghiệp</CardTitle>
              <CardDescription>Quản lý tất cả doanh nghiệp trong hệ thống</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Tìm kiếm doanh nghiệp..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="active">Hoạt động</SelectItem>
                  <SelectItem value="inactive">Bị khóa</SelectItem>
                  <SelectItem value="pending">Chờ duyệt</SelectItem>
                </SelectContent>
              </Select>
              <Select value={industryFilter} onValueChange={setIndustryFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Ngành nghề" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả ngành nghề</SelectItem>
                  {industries.map((industry) => (
                    <SelectItem key={industry.value} value={industry.value}>{industry.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Doanh nghiệp</TableHead>
                  <TableHead className="hidden md:table-cell">Ngành nghề</TableHead>
                  <TableHead className="hidden lg:table-cell">Website</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Vị trí tuyển</TableHead>
                  <TableHead className="hidden md:table-cell">Quy mô</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6">
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <p>Đang tải dữ liệu...</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : companies.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6">
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <Building className="h-10 w-10 mb-2" />
                        <p>Không tìm thấy doanh nghiệp nào</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  companies.map((company) => (
                    <TableRow key={company.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9 shrink-0">
                            <AvatarImage src={company.logo_url} alt={company.name} />
                            <AvatarFallback>{company.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="font-medium truncate">{company.name}</p>
                            <p className="text-sm text-gray-500 truncate">{company.country?.name}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {industries.find(i => i.value === String(company.industry))?.label || company.industry}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <a 
                          href={company.website} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-blue-600 hover:underline truncate block max-w-[150px]"
                        >
                          {company.website}
                        </a>
                      </TableCell>
                      <TableCell>{getStatusBadge(company.status)}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{company.open_positions_count}</Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {companySizes.find(s => s.value === String(company.company_size))?.label || company.company_size}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="icon" onClick={() => handleViewCompany(company)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon" onClick={() => handleEditClick(company)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          {company.status === 0 && (
                            <>
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="text-green-600 hidden sm:flex"
                                onClick={() => handleVerifyCompany(company, "approve")}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="text-red-600 hidden sm:flex"
                                onClick={() => handleVerifyCompany(company, "reject")}
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={() => handleDeleteCompany(company)}
                            className="text-red-600 hidden sm:flex"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          
                          {/* Menu dropdown cho mobile */}
                          <div className="sm:hidden">
                            <Select 
                              onValueChange={(value) => {
                                if (value === "verify") handleVerifyCompany(company, "approve");
                                if (value === "reject") handleVerifyCompany(company, "reject");
                                if (value === "delete") handleDeleteCompany(company);
                              }}
                            >
                              <SelectTrigger className="w-8 h-8 p-0">
                                <SelectValue placeholder="..." />
                              </SelectTrigger>
                              <SelectContent align="end">
                                {company.status === 0 && (
                                  <>
                                    <SelectItem value="verify">Duyệt</SelectItem>
                                    <SelectItem value="reject">Từ chối</SelectItem>
                                  </>
                                )}
                                <SelectItem value="delete" className="text-red-600">Xóa</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {metadata && metadata.total_pages > 1 && (
            <div className="mt-6">
              <PaginationBar 
                currentPage={currentPage}
                totalPages={metadata.total_pages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Sheet xem chi tiết doanh nghiệp */}
      <Sheet open={showCompanySheet} onOpenChange={setShowCompanySheet}>
        <SheetContent className="sm:max-w-xl overflow-y-auto">
          {selectedCompany && (
            <>
              <SheetHeader className="mb-5">
                <SheetTitle>Thông tin doanh nghiệp</SheetTitle>
                <SheetDescription>
                  Chi tiết về doanh nghiệp và hoạt động tuyển dụng
                </SheetDescription>
              </SheetHeader>
              
              <Tabs defaultValue="info" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="info">Thông tin</TabsTrigger>
                  <TabsTrigger value="jobs">Tin tuyển dụng</TabsTrigger>
                </TabsList>
                
                <TabsContent value="info" className="space-y-4 mt-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={selectedCompany.logo_url} alt={selectedCompany.name} />
                      <AvatarFallback>{selectedCompany.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold">{selectedCompany.name}</h3>
                      <p className="text-sm text-gray-500">
                        {industries.find(i => i.value === String(selectedCompany.industry))?.label || selectedCompany.industry}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        {getStatusBadge(selectedCompany.status)}
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
                          <FileText className="h-3.5 w-3.5 mr-1" />
                          {selectedCompany.active_jobs_count || 0} vị trí
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {selectedCompany.banner_url && (
                    <div className="mt-4">
                      <p className="font-medium mb-2">Banner</p>
                      <div className="w-full h-40 bg-gray-100 rounded-md overflow-hidden">
                        <img 
                          src={selectedCompany.banner_url} 
                          alt={`${selectedCompany.name} banner`} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-3 mt-6">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Địa điểm</p>
                        <p className="text-gray-600">{selectedCompany.country?.name}</p>
                      </div>
                    </div>

                    {selectedCompany.company_addresses && selectedCompany.company_addresses.length > 0 && (
                      <div className="flex items-start gap-2">
                        <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Địa chỉ chi tiết</p>
                          <div className="space-y-2">
                            {selectedCompany.company_addresses.map((address, index) => (
                              <div key={index} className="text-gray-600 border-l-2 border-gray-200 pl-2 mt-1">
                                <p>{address.province}</p>
                                <p>{address.full_address}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-start gap-2">
                      <Users className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Quy mô</p>
                        <p className="text-gray-600">
                          {companySizes.find(s => s.value === String(selectedCompany.company_size))?.label || selectedCompany.company_size}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <Globe className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Website</p>
                        <a href={selectedCompany.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {selectedCompany.website}
                        </a>
                      </div>
                    </div>

                    {selectedCompany.company_social_links && selectedCompany.company_social_links.length > 0 && (
                      <div className="flex items-start gap-2">
                        <Globe className="h-5 w-5 text-gray-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Mạng xã hội</p>
                          <div className="space-y-1 mt-1">
                            {selectedCompany.company_social_links.map((link, index) => (
                              <div key={index} className="flex items-center">
                                {link.link_type === "facebook" && <Facebook className="h-5 w-5 text-blue-600" />}
                                {link.link_type === "twitter" && <Twitter className="h-5 w-5 text-blue-400" />}
                                {link.link_type === "linkedin" && <Linkedin className="h-5 w-5 text-blue-700" />}
                                {link.link_type === "instagram" && <Instagram className="h-5 w-5 text-pink-600" />}
                                {link.link_type === "youtube" && <Youtube className="h-5 w-5 text-red-600" />}
                                {link.link_type === "other" && <Link className="h-5 w-5 text-gray-500" />}
                                <a 
                                  href={link.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="ml-2 text-blue-600 hover:underline"
                                >
                                  {link.url}
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-start gap-2">
                      <FileText className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Mô tả</p>
                        <p className="text-gray-600">{selectedCompany.description}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Building className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Loại hình doanh nghiệp</p>
                        <p className="text-gray-600">
                          {companyTypes.find(t => t.value === String(selectedCompany.company_type))?.label || selectedCompany.company_type}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <User className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Ngày tạo</p>
                        <p className="text-gray-600">{new Date(selectedCompany.created_at).toLocaleDateString('vi-VN')}</p>
                      </div>
                    </div>

                    {selectedCompany.image_urls && selectedCompany.image_urls.length > 0 && (
                      <div className="pt-4">
                        <p className="font-medium mb-2">Hình ảnh</p>
                        <div className="grid grid-cols-3 gap-2">
                          {selectedCompany.image_urls.map((image, index) => (
                            <div key={index} className="aspect-square bg-gray-100 rounded-md overflow-hidden">
                              <img 
                                src={image} 
                                alt={`${selectedCompany.name} image ${index + 1}`} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="jobs" className="space-y-4 mt-4">
                  {selectedCompany.jobs && selectedCompany.jobs.length > 0 ? (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Tin tuyển dụng đang hoạt động</h3>
                        <Badge>{selectedCompany.jobs.length}</Badge>
                      </div>
                      <div className="border rounded-md divide-y">
                        {selectedCompany.jobs.map(job => (
                          <div key={job.id} className="p-3 flex justify-between items-center">
                            <div>
                              <p className="font-medium">{job.title}</p>
                              <p className="text-sm text-gray-500">
                                Đăng {new Date(job.created_at).toLocaleDateString('vi-VN')}
                              </p>
                            </div>
                            <Button onClick={() => window.open(`/jobs/${job.id}`, '_blank')} variant="outline" size="sm">Xem</Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                      <FileText className="h-10 w-10 mb-2" />
                      <p>Không có tin tuyển dụng nào</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
              
              <SheetFooter className="mt-6">
                <div className="flex gap-2 w-full">
                  {selectedCompany.status === 0 && (
                    <>
                      <Button 
                        className="flex-1"
                        onClick={() => {
                          setShowCompanySheet(false);
                          handleVerifyCompany(selectedCompany, "approve");
                        }}
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Duyệt doanh nghiệp
                      </Button>
                      <Button 
                        variant="outline"
                        className="flex-1 text-red-600"
                        onClick={() => {
                          setShowCompanySheet(false);
                          handleVerifyCompany(selectedCompany, "reject");
                        }}
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Từ chối
                      </Button>
                    </>
                  )}
                  {selectedCompany.status === 1 && (
                    <>
                      <Button 
                        className="flex-1"
                        onClick={() => {
                          setShowCompanySheet(false);
                          handleVerifyCompany(selectedCompany, "approve");
                        }}
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Xác minh doanh nghiệp
                      </Button>
                      <Button 
                        variant="outline"
                        className="flex-1 text-amber-600"
                        onClick={() => {
                          setShowCompanySheet(false);
                          handleLockCompany(selectedCompany);
                        }}
                      >
                        <Lock className="mr-2 h-4 w-4" />
                        Khóa tài khoản
                      </Button>
                    </>
                  )}
                  {selectedCompany.status !== 0 && selectedCompany.status !== 1 && (
                    <>
                      <Button 
                        variant={selectedCompany.status === 2 ? "outline" : "default"}
                        className={selectedCompany.status === 2 ? "flex-1 text-amber-600" : "flex-1"}
                        onClick={() => {
                          setShowCompanySheet(false);
                          handleLockCompany(selectedCompany);
                        }}
                      >
                        <Lock className="mr-2 h-4 w-4" />
                        {selectedCompany.status === 3 ? "Mở khóa tài khoản" : "Khóa tài khoản"}
                      </Button>
                      <Button 
                        variant="outline"
                        className="flex-1 text-red-600"
                        onClick={() => {
                          setShowCompanySheet(false);
                          handleDeleteCompany(selectedCompany);
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Xóa doanh nghiệp
                      </Button>
                    </>
                  )}
                </div>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Dialog xác nhận xóa doanh nghiệp */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa doanh nghiệp</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa doanh nghiệp {companyToDelete?.name}? 
              Hành động này sẽ xóa vĩnh viễn tất cả dữ liệu liên quan đến doanh nghiệp này và không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-yellow-50 p-4 rounded-md flex items-start">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-700">
                <p className="font-medium">Lưu ý quan trọng:</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Tất cả tin tuyển dụng của doanh nghiệp sẽ bị xóa</li>
                  <li>Dữ liệu ứng viên đã ứng tuyển vào doanh nghiệp này sẽ bị ảnh hưởng</li>
                  <li>Lịch sử giao dịch và thanh toán sẽ bị xóa</li>
                </ul>
              </div>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteCompany}
              className="bg-red-600 hover:bg-red-700"
            >
              Xóa doanh nghiệp
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Dialog xác nhận khóa/mở khóa doanh nghiệp */}
      <AlertDialog open={showLockDialog} onOpenChange={setShowLockDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {companyToLock?.status === 3 ? "Khóa doanh nghiệp" : "Mở khóa doanh nghiệp"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {companyToLock?.status === 3 
                ? `Bạn có chắc chắn muốn khóa doanh nghiệp ${companyToLock?.name}? Doanh nghiệp này sẽ không thể đăng nhập và các tin tuyển dụng sẽ bị ẩn.`
                : `Bạn có chắc chắn muốn mở khóa doanh nghiệp ${companyToLock?.name}? Doanh nghiệp này sẽ có thể đăng nhập và các tin tuyển dụng sẽ được hiển thị lại.`
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmLockCompany}
              className={companyToLock?.status === 3 ? "bg-amber-600 hover:bg-amber-700" : "bg-green-600 hover:bg-green-700"}
            >
              {companyToLock?.status === 3 ? "Khóa doanh nghiệp" : "Mở khóa doanh nghiệp"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Dialog xác nhận duyệt/từ chối doanh nghiệp */}
      <Dialog open={showVerifyDialog} onOpenChange={setShowVerifyDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {verifyAction === "approve" ? "Duyệt doanh nghiệp" : "Từ chối doanh nghiệp"}
            </DialogTitle>
            <DialogDescription>
              {verifyAction === "approve" 
                ? `Xác nhận duyệt doanh nghiệp ${companyToVerify?.name}`
                : `Xác nhận từ chối doanh nghiệp ${companyToVerify?.name}`
              }
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            {verifyAction === "approve" && companyToVerify?.status === 1 && (
              <div className="flex items-center space-x-2">
                <p>Công ty đã được duyệt. Bạn có muốn cấp tick xác minh cho công ty này?</p>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="verifyNote">Ghi chú</Label>
              <Textarea 
                id="verifyNote" 
                placeholder={verifyAction === "approve" 
                  ? "Nhập ghi chú cho doanh nghiệp (không bắt buộc)" 
                  : "Nhập lý do từ chối doanh nghiệp"
                }
                value={verifyNote}
                onChange={(e) => setVerifyNote(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowVerifyDialog(false)}>
              Hủy
            </Button>
            <Button 
              onClick={confirmVerifyCompany}
              className={verifyAction === "approve" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}
            >
              {verifyAction === "approve" 
                ? (companyToVerify?.status === 1 ? "Xác minh doanh nghiệp" : "Duyệt doanh nghiệp") 
                : "Từ chối doanh nghiệp"
              }
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog tạo doanh nghiệp mới */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Tạo doanh nghiệp mới</DialogTitle>
            <DialogDescription>
              Nhập thông tin để tạo doanh nghiệp mới trong hệ thống
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Tên doanh nghiệp *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Nhập tên doanh nghiệp"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Mô tả</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                placeholder="Mô tả về doanh nghiệp"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://example.com"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="country">Quốc gia *</Label>
                <Select
                  value={formData.country_id}
                  onValueChange={(value) => setFormData({ ...formData, country_id: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn quốc gia" />
                  </SelectTrigger>
                  <SelectContent>
                    {isLoadingCountries ? (
                      <SelectItem value="loading" disabled>Đang tải...</SelectItem>
                    ) : (
                      countries.map((country) => (
                        <SelectItem key={country.id} value={String(country.id)}>
                          {country.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="company_size">Quy mô</Label>
                <Select
                  value={formData.company_size}
                  onValueChange={(value) => setFormData({ ...formData, company_size: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn quy mô" />
                  </SelectTrigger>
                  <SelectContent>
                    {companySizes.map((size) => (
                      <SelectItem key={size.value} value={size.value}>
                        {size.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="industry">Ngành nghề</Label>
                <Select
                  value={formData.industry}
                  onValueChange={(value) => setFormData({ ...formData, industry: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn ngành nghề" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry.value} value={industry.value}>
                        {industry.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="company_type">Loại hình doanh nghiệp</Label>
                <Select
                  value={formData.company_type}
                  onValueChange={(value) => setFormData({ ...formData, company_type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại hình" />
                  </SelectTrigger>
                  <SelectContent>
                    {companyTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="status">Trạng thái</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  {companyStatuses.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Hình ảnh</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="logo">Logo công ty</Label>
                  <div className="mt-2 flex items-center gap-4">
                    <div className="h-20 w-20 rounded-md overflow-hidden border bg-gray-100 flex items-center justify-center">
                      {formData.logo instanceof File ? (
                        <img
                          src={URL.createObjectURL(formData.logo)}
                          alt="Preview"
                          className="h-full w-full object-cover"
                        />
                      ) : formData.logo ? (
                        <img
                          src={formData.logo}
                          alt="Company logo"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <Building className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <Label
                        htmlFor="logo-upload"
                        className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Tải lên
                      </Label>
                      <Input
                        id="logo-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleLogoUpload}
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="banner">Banner</Label>
                  <div className="mt-2 flex items-center gap-4">
                    <div className="h-20 w-36 rounded-md overflow-hidden border bg-gray-100 flex items-center justify-center">
                      {formData.banner instanceof File ? (
                        <img
                          src={URL.createObjectURL(formData.banner)}
                          alt="Preview"
                          className="h-full w-full object-cover"
                        />
                      ) : formData.banner ? (
                        <img
                          src={formData.banner}
                          alt="Company banner"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <Image className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <Label
                        htmlFor="banner-upload"
                        className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Tải lên
                      </Label>
                      <Input
                        id="banner-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleBannerUpload}
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="images">Các hình ảnh khác</Label>
                  <div className="mt-2 flex items-center gap-4">
                    <div>
                      <Label
                        htmlFor="images-upload"
                        className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Tải lên nhiều ảnh
                      </Label>
                      <Input
                        id="images-upload"
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleImagesUpload}
                      />
                    </div>
                  </div>
                  
                  {formData.images && formData.images.length > 0 && (
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative h-16 w-full rounded-md overflow-hidden border">
                          {image instanceof File ? (
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`Preview ${index}`}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <img
                              src={image}
                              alt={`Company image ${index}`}
                              className="h-full w-full object-cover"
                            />
                          )}
                          <Button
                            variant="destructive"
                            size="icon"
                            className="h-5 w-5 absolute top-1 right-1"
                            onClick={() => handleRemoveImage(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label>Địa chỉ</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setFormData({
                      ...formData,
                      company_addresses_attributes: [
                        ...formData.company_addresses_attributes,
                        { province: "", full_address: "" }
                      ]
                    });
                  }}
                >
                  <Plus className="h-4 w-4 mr-1" /> Thêm địa chỉ
                </Button>
              </div>
              
              {formData.company_addresses_attributes.map((address, index) => (
                <div key={index} className="border rounded-md p-4 mb-2">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-medium">Địa chỉ {index + 1}</h4>
                    {formData.company_addresses_attributes.length > 1 && (
                      <Button
                        variant="destructive"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => {
                          const newAddresses = [...formData.company_addresses_attributes];
                          newAddresses.splice(index, 1);
                          setFormData({ ...formData, company_addresses_attributes: newAddresses });
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid gap-3">
                    <div className="grid gap-2">
                      <Label htmlFor={`province-${index}`}>Tỉnh/Thành phố</Label>
                      <Input
                        id={`province-${index}`}
                        value={address.province}
                        onChange={(e) => {
                          const newAddresses = [...formData.company_addresses_attributes];
                          newAddresses[index].province = e.target.value;
                          setFormData({ ...formData, company_addresses_attributes: newAddresses });
                        }}
                        placeholder="Hà Nội, TP Hồ Chí Minh,..."
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor={`full-address-${index}`}>Địa chỉ đầy đủ</Label>
                      <Textarea
                        id={`full-address-${index}`}
                        value={address.full_address}
                        onChange={(e) => {
                          const newAddresses = [...formData.company_addresses_attributes];
                          newAddresses[index].full_address = e.target.value;
                          setFormData({ ...formData, company_addresses_attributes: newAddresses });
                        }}
                        placeholder="Số nhà, tên đường, phường/xã, quận/huyện..."
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label>Liên kết mạng xã hội</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setFormData({
                      ...formData,
                      company_social_links_attributes: [
                        ...formData.company_social_links_attributes,
                        { link_type: "facebook", url: "" }
                      ]
                    });
                  }}
                >
                  <Plus className="h-4 w-4 mr-1" /> Thêm liên kết
                </Button>
              </div>
              
              {formData.company_social_links_attributes.map((link, index) => (
                <div key={index} className="border rounded-md p-4 mb-2">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-medium">Liên kết {index + 1}</h4>
                    {formData.company_social_links_attributes.length > 1 && (
                      <Button
                        variant="destructive"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => {
                          const newLinks = [...formData.company_social_links_attributes];
                          newLinks.splice(index, 1);
                          setFormData({ ...formData, company_social_links_attributes: newLinks });
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid gap-3">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="grid gap-2">
                        <Label htmlFor={`link-type-${index}`}>Loại</Label>
                        <Select
                          value={link.link_type}
                          onValueChange={(value) => {
                            const newLinks = [...formData.company_social_links_attributes];
                            newLinks[index].link_type = value;
                            setFormData({ ...formData, company_social_links_attributes: newLinks });
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="facebook">Facebook</SelectItem>
                            <SelectItem value="twitter">Twitter</SelectItem>
                            <SelectItem value="linkedin">LinkedIn</SelectItem>
                            <SelectItem value="instagram">Instagram</SelectItem>
                            <SelectItem value="youtube">YouTube</SelectItem>
                            <SelectItem value="other">Khác</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid gap-2 sm:col-span-2">
                        <Label htmlFor={`link-url-${index}`}>URL</Label>
                        <Input
                          id={`link-url-${index}`}
                          value={link.url}
                          onChange={(e) => {
                            const newLinks = [...formData.company_social_links_attributes];
                            newLinks[index].url = e.target.value;
                            setFormData({ ...formData, company_social_links_attributes: newLinks });
                          }}
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Hủy
            </Button>
            <Button onClick={handleCreateCompany}>
              Tạo doanh nghiệp
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog sửa doanh nghiệp */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Sửa thông tin doanh nghiệp</DialogTitle>
            <DialogDescription>
              Cập nhật thông tin doanh nghiệp {selectedCompany?.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Tên doanh nghiệp *</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Nhập tên doanh nghiệp"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-description">Mô tả</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                placeholder="Mô tả về doanh nghiệp"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-website">Website</Label>
                <Input
                  id="edit-website"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://example.com"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-country">Quốc gia *</Label>
                <Select
                  value={formData.country_id}
                  onValueChange={(value) => setFormData({ ...formData, country_id: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn quốc gia" />
                  </SelectTrigger>
                  <SelectContent>
                    {isLoadingCountries ? (
                      <SelectItem value="loading" disabled>Đang tải...</SelectItem>
                    ) : (
                      countries.map((country) => (
                        <SelectItem key={country.id} value={String(country.id)}>
                          {country.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-company_size">Quy mô</Label>
                <Select
                  value={formData.company_size}
                  onValueChange={(value) => setFormData({ ...formData, company_size: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn quy mô" />
                  </SelectTrigger>
                  <SelectContent>
                    {companySizes.map((size) => (
                      <SelectItem key={size.value} value={size.value}>
                        {size.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-industry">Ngành nghề</Label>
                <Select
                  value={formData.industry}
                  onValueChange={(value) => setFormData({ ...formData, industry: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn ngành nghề" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry.value} value={industry.value}>
                        {industry.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-company_type">Loại hình doanh nghiệp</Label>
                <Select
                  value={formData.company_type}
                  onValueChange={(value) => setFormData({ ...formData, company_type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại hình" />
                  </SelectTrigger>
                  <SelectContent>
                    {companyTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-status">Trạng thái</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  {companyStatuses.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Hình ảnh</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="edit-logo">Logo công ty</Label>
                  <div className="mt-2 flex items-center gap-4">
                    <div className="h-20 w-20 rounded-md overflow-hidden border bg-gray-100 flex items-center justify-center">
                      {formData.logo instanceof File ? (
                        <img
                          src={URL.createObjectURL(formData.logo)}
                          alt="Preview"
                          className="h-full w-full object-cover"
                        />
                      ) : formData.logo ? (
                        <img
                          src={formData.logo}
                          alt="Company logo"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <Building className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <Label
                        htmlFor="edit-logo-upload"
                        className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Tải lên
                      </Label>
                      <Input
                        id="edit-logo-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleLogoUpload}
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="edit-banner">Banner</Label>
                  <div className="mt-2 flex items-center gap-4">
                    <div className="h-20 w-36 rounded-md overflow-hidden border bg-gray-100 flex items-center justify-center">
                      {formData.banner instanceof File ? (
                        <img
                          src={URL.createObjectURL(formData.banner)}
                          alt="Preview"
                          className="h-full w-full object-cover"
                        />
                      ) : formData.banner ? (
                        <img
                          src={formData.banner}
                          alt="Company banner"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <Image className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <Label
                        htmlFor="edit-banner-upload"
                        className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Tải lên
                      </Label>
                      <Input
                        id="edit-banner-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleBannerUpload}
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="edit-images">Các hình ảnh khác</Label>
                  <div className="mt-2 flex items-center gap-4">
                    <div>
                      <Label
                        htmlFor="edit-images-upload"
                        className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Tải lên nhiều ảnh
                      </Label>
                      <Input
                        id="edit-images-upload"
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleImagesUpload}
                      />
                    </div>
                  </div>
                  
                  {formData.images && formData.images.length > 0 && (
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative h-16 w-full rounded-md overflow-hidden border">
                          {image instanceof File ? (
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`Preview ${index}`}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <img
                              src={image}
                              alt={`Company image ${index}`}
                              className="h-full w-full object-cover"
                            />
                          )}
                          <Button
                            variant="destructive"
                            size="icon"
                            className="h-5 w-5 absolute top-1 right-1"
                            onClick={() => handleRemoveImage(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label>Địa chỉ</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setFormData({
                      ...formData,
                      company_addresses_attributes: [
                        ...formData.company_addresses_attributes,
                        { province: "", full_address: "" }
                      ]
                    });
                  }}
                >
                  <Plus className="h-4 w-4 mr-1" /> Thêm địa chỉ
                </Button>
              </div>
              
              {formData.company_addresses_attributes.map((address, index) => (
                <div key={index} className="border rounded-md p-4 mb-2">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-medium">Địa chỉ {index + 1}</h4>
                    {formData.company_addresses_attributes.length > 1 && (
                      <Button
                        variant="destructive"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => {
                          const newAddresses = [...formData.company_addresses_attributes];
                          newAddresses.splice(index, 1);
                          setFormData({ ...formData, company_addresses_attributes: newAddresses });
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid gap-3">
                    <div className="grid gap-2">
                      <Label htmlFor={`edit-province-${index}`}>Tỉnh/Thành phố</Label>
                      <Input
                        id={`edit-province-${index}`}
                        value={address.province}
                        onChange={(e) => {
                          const newAddresses = [...formData.company_addresses_attributes];
                          newAddresses[index].province = e.target.value;
                          setFormData({ ...formData, company_addresses_attributes: newAddresses });
                        }}
                        placeholder="Hà Nội, TP Hồ Chí Minh,..."
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor={`edit-full-address-${index}`}>Địa chỉ đầy đủ</Label>
                      <Textarea
                        id={`edit-full-address-${index}`}
                        value={address.full_address}
                        onChange={(e) => {
                          const newAddresses = [...formData.company_addresses_attributes];
                          newAddresses[index].full_address = e.target.value;
                          setFormData({ ...formData, company_addresses_attributes: newAddresses });
                        }}
                        placeholder="Số nhà, tên đường, phường/xã, quận/huyện..."
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label>Liên kết mạng xã hội</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setFormData({
                      ...formData,
                      company_social_links_attributes: [
                        ...formData.company_social_links_attributes,
                        { link_type: "facebook", url: "" }
                      ]
                    });
                  }}
                >
                  <Plus className="h-4 w-4 mr-1" /> Thêm liên kết
                </Button>
              </div>
              
              {formData.company_social_links_attributes.map((link, index) => (
                <div key={index} className="border rounded-md p-4 mb-2">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-medium">Liên kết {index + 1}</h4>
                    {formData.company_social_links_attributes.length > 1 && (
                      <Button
                        variant="destructive"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => {
                          const newLinks = [...formData.company_social_links_attributes];
                          newLinks.splice(index, 1);
                          setFormData({ ...formData, company_social_links_attributes: newLinks });
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid gap-3">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="grid gap-2">
                        <Label htmlFor={`edit-link-type-${index}`}>Loại</Label>
                        <Select
                          value={link.link_type}
                          onValueChange={(value) => {
                            const newLinks = [...formData.company_social_links_attributes];
                            newLinks[index].link_type = value;
                            setFormData({ ...formData, company_social_links_attributes: newLinks });
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="facebook">Facebook</SelectItem>
                            <SelectItem value="twitter">Twitter</SelectItem>
                            <SelectItem value="linkedin">LinkedIn</SelectItem>
                            <SelectItem value="instagram">Instagram</SelectItem>
                            <SelectItem value="youtube">YouTube</SelectItem>
                            <SelectItem value="other">Khác</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid gap-2 sm:col-span-2">
                        <Label htmlFor={`edit-link-url-${index}`}>URL</Label>
                        <Input
                          id={`edit-link-url-${index}`}
                          value={link.url}
                          onChange={(e) => {
                            const newLinks = [...formData.company_social_links_attributes];
                            newLinks[index].url = e.target.value;
                            setFormData({ ...formData, company_social_links_attributes: newLinks });
                          }}
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Hủy
            </Button>
            <Button onClick={handleEditCompany}>
              Lưu thay đổi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
