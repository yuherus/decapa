"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, Globe, Phone, Mail, List, ListOrdered, AlignLeft, AlignCenter, AlignRight, Facebook, Twitter, Youtube, Instagram, Linkedin, FacebookIcon, Trash2, PlusCircle, XCircle } from "lucide-react";
import RichTextEditor from "@/components/ui/rich-text-editor";
import { useToast } from "@/hooks/use-toast";
import { useEnterpriseCompany } from "@/hooks/useEnterpriseCompany";
import { useSkills } from "@/hooks/useSkills";
import { useCountries } from "@/hooks/useCountries";
import { debounce } from 'lodash';

export default function CompanyProfilePage() {
  const { toast } = useToast();
  const { company, isLoading, updateCompany, isUpdating } = useEnterpriseCompany();
  const { skills } = useSkills();
  const { countries } = useCountries();
  
  const initialCompanyData = useMemo(() => {
    return {
      name: "",
      description: "",
      website: "",
      company_size: 0,
      industry: 0,
      company_type: 0,
      country_id: 1,
      company_addresses: [],
      company_social_links: [],
      skill_ids: []
    };
  }, []);

  const [companyData, setCompanyData] = useState(initialCompanyData);

  const [logoPreview, setLogoPreview] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [newAddress, setNewAddress] = useState({ province: "", full_address: "" });
  const [newSocialLink, setNewSocialLink] = useState({ link_type: "facebook", url: "" });
  
  // Cập nhật state từ dữ liệu công ty từ API
  useEffect(() => {
    if (company) {
      console.log("company", company);
      setCompanyData(prevData => {
        const updatedData = {
          ...prevData,
          name: company.name || prevData.name,
          description: company.description || prevData.description,
          website: company.website || prevData.website,
          company_size: company.company_size !== undefined ? company.company_size : prevData.company_size,
          industry: company.industry !== undefined ? company.industry : prevData.industry,
          company_type: company.company_type !== undefined ? company.company_type : prevData.company_type,
          company_addresses: company.company_addresses || prevData.company_addresses || [],
          company_social_links: company.company_social_links || prevData.company_social_links || [],
          skill_ids: company.skills?.map(skill => skill.id) || prevData.skill_ids || []
        };

        // Đảm bảo country_id luôn được gán đúng và chỉ thêm country object nếu cần
        if (company.country && company.country.id) {
          updatedData.country_id = company.country.id;
        } 

        return updatedData;
      });
      
      // Set logo và banner previews nếu có
      if (company.logo_url) setLogoPreview(company.logo_url);
      if (company.banner_url) setBannerPreview(company.banner_url);
    }
  }, [company]);
  
  // Theo dõi sự thay đổi của companyData để debug nhưng sử dụng điều kiện để giảm số lần log
  useEffect(() => {
    console.log("companyData updated:", companyData);
  }, [companyData]);
  
  // Sử dụng useCallback để các hàm không bị tạo lại mỗi khi component render
  // Handler functions
  const handleLogoUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleBannerUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setBannerPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleInputChange = useMemo(() => 
    debounce((field, value) => {
      setCompanyData(prevData => ({
        ...prevData,
        [field]: value
      }));
    }, 500)
  , []);
  
  const handleAddAddress = useCallback(() => {
    if (!newAddress.province || !newAddress.full_address) {
      toast({
        title: "Thông tin thiếu",
        description: "Vui lòng nhập đầy đủ thông tin địa chỉ",
        variant: "destructive"
      });
      return;
    }
    
    setCompanyData(prevData => ({
      ...prevData,
      company_addresses: [
        ...prevData.company_addresses,
        { ...newAddress }
      ]
    }));
    
    setNewAddress({ province: "", full_address: "" });
  }, [newAddress, toast]);
  
  const handleDeleteAddress = useCallback((index) => {
    setCompanyData(prevData => {
      const updatedAddresses = [...prevData.company_addresses];
      
      if (updatedAddresses[index].id) {
        // Đánh dấu xóa nếu đã có id (đã lưu trong DB)
        updatedAddresses[index] = {
          ...updatedAddresses[index],
          _destroy: true
        };
      } else {
        // Xóa trực tiếp nếu chưa có id (chưa lưu trong DB)
        updatedAddresses.splice(index, 1);
      }
      
      return {
        ...prevData,
        company_addresses: updatedAddresses
      };
    });
  }, []);
  
  const handleAddSocialLink = useCallback(() => {
    if (!newSocialLink.url) {
      toast({
        title: "Thông tin thiếu",
        description: "Vui lòng nhập URL mạng xã hội",
        variant: "destructive"
      });
      return;
    }
    
    setCompanyData(prevData => ({
      ...prevData,
      company_social_links: [
        ...prevData.company_social_links,
        { ...newSocialLink }
      ]
    }));
    
    setNewSocialLink({ link_type: "facebook", url: "" });
  }, [newSocialLink, toast]);
  
  const handleDeleteSocialLink = useCallback((index) => {
    setCompanyData(prevData => {
      const updatedLinks = [...prevData.company_social_links];
      
      if (updatedLinks[index].id) {
        // Đánh dấu xóa nếu đã có id (đã lưu trong DB)
        updatedLinks[index] = {
          ...updatedLinks[index],
          _destroy: true
        };
      } else {
        // Xóa trực tiếp nếu chưa có id (chưa lưu trong DB)
        updatedLinks.splice(index, 1);
      }
      
      return {
        ...prevData,
        company_social_links: updatedLinks
      };
    });
  }, []);
  
  const handleAddSkill = useCallback(() => {
    if (!selectedSkill) return;
    
    setCompanyData(prevData => {
      // Kiểm tra trùng lắp trong functional update để không phụ thuộc vào companyData
      if (prevData.skill_ids.includes(Number(selectedSkill))) {
        toast({
          title: "Lỗi",
          description: "Kỹ năng này đã được thêm",
          variant: "destructive"
        });
        return prevData; // Không thay đổi state nếu trùng
      }
      
      return {
        ...prevData,
        skill_ids: [...prevData.skill_ids, Number(selectedSkill)]
      };
    });
    
    setSelectedSkill("");
  }, [selectedSkill, toast]);
  
  const handleRemoveSkill = useCallback((skillId) => {
    setCompanyData(prevData => ({
      ...prevData,
      skill_ids: prevData.skill_ids.filter(id => id !== skillId)
    }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    
    const dataToSubmit = {
      ...companyData
    };
    
    if (logoFile) dataToSubmit.logo = logoFile;
    if (bannerFile) dataToSubmit.banner = bannerFile;
    
    updateCompany(dataToSubmit);
  }, [companyData, logoFile, bannerFile, updateCompany]);
  
  // Helper function to get skill name by id - memoized để tránh tính toán lại mỗi khi render
  const getSkillName = useCallback((id) => {
    const skill = skills?.find(s => s.id === id);
    return skill ? skill.skill_name : '';
  }, [skills]);
  
  // Don't render form while loading initial data
  if (isLoading) {
    return <div className="p-6 flex items-center justify-center">Đang tải thông tin công ty...</div>;
  }
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Hồ sơ công ty</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Ảnh bìa */}
        <Card>
          <CardContent className="p-6">
            <div className="relative h-48 bg-gray-100 rounded-lg overflow-hidden">
              {bannerPreview && (
                <Image
                  src={bannerPreview}
                  alt="Cover"
                  fill
                  className="object-cover"
                />
              )}
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <label className="cursor-pointer">
                  <div className="bg-white rounded-full p-3 hover:bg-gray-100">
                    <Upload className="h-6 w-6 text-gray-600" />
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleBannerUpload}
                  />
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Thông tin cơ bản */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Thông tin cơ bản</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2 flex items-center gap-4">
                <div className="relative w-24 h-24">
                  <div className={`w-full h-full rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden border ${!logoPreview ? 'border-dashed' : ''}`}>
                    {logoPreview && (
                      <Image
                        src={logoPreview}
                        alt="Logo"
                        fill
                        className="object-contain"
                      />
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 cursor-pointer">
                    <div className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50">
                      <Upload className="h-4 w-4 text-gray-600" />
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleLogoUpload}
                    />
                  </label>
                </div>
                
                <div className="flex-1">
                  <Input
                    placeholder="Tên công ty"
                    value={companyData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="font-medium text-lg"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Loại hình doanh nghiệp</label>
                <Select 
                  value={companyData.company_type.toString()}
                  onValueChange={(value) => handleInputChange('company_type', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại hình" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Công ty tư nhân</SelectItem>
                    <SelectItem value="1">Công ty đại chúng</SelectItem>
                    <SelectItem value="2">Cơ quan nhà nước</SelectItem>
                    <SelectItem value="3">Tổ chức phi lợi nhuận</SelectItem>
                    <SelectItem value="4">Startup</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Quy mô nhân sự</label>
                <Select
                  value={companyData.company_size.toString()}
                  onValueChange={(value) => handleInputChange('company_size', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn quy mô" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Dưới 50 nhân viên</SelectItem>
                    <SelectItem value="1">50 - 250 nhân viên</SelectItem>
                    <SelectItem value="2">Trên 250 nhân viên</SelectItem>
                    <SelectItem value="3">Trên 1000 nhân viên</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Ngành nghề</label>
                <Select
                  value={companyData.industry.toString()}
                  onValueChange={(value) => handleInputChange('industry', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn ngành nghề" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Công nghệ thông tin</SelectItem>
                    <SelectItem value="1">Tài chính - Ngân hàng</SelectItem>
                    <SelectItem value="2">Y tế - Dược phẩm</SelectItem>
                    <SelectItem value="3">Giáo dục - Đào tạo</SelectItem>
                    <SelectItem value="4">Bán lẻ</SelectItem>
                    <SelectItem value="5">Sản xuất</SelectItem>
                    <SelectItem value="6">Giải trí</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Quốc gia</label>
                <Select
                  value={companyData.country_id}
                  onValueChange={(value) => handleInputChange('country_id', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn quốc gia" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries?.map(country => (
                      <SelectItem key={country.id} value={country.id.toString()}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-2 space-y-2">
                <label className="text-sm font-medium">Website</label>
                <Input
                  value={companyData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="Website công ty"
                />
              </div>

              <div className="col-span-2 space-y-2">
                <label className="text-sm font-medium">Giới thiệu công ty</label>
                <RichTextEditor
                  key={companyData.description}
                  value={companyData.description} 
                  onChange={(content) => handleInputChange('description', content)} 
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Địa chỉ công ty */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Địa chỉ công ty</h2>
            
            <div className="space-y-4">
              {companyData.company_addresses?.filter(addr => !addr._destroy).map((address, index) => (
                <div key={address.id || index} className="flex items-center gap-2 p-3 border rounded-md">
                  <div className="flex-1">
                    <div className="font-medium">{address.province}</div>
                    <div className="text-gray-600 text-sm">{address.full_address}</div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleDeleteAddress(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              ))}
              
              <div className="border rounded-md p-4 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Tỉnh/Thành phố</label>
                    <Input
                      value={newAddress.province}
                      onChange={(e) => setNewAddress({...newAddress, province: e.target.value})}
                      placeholder="Ví dụ: Hà Nội, Tp.HCM"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Địa chỉ chi tiết</label>
                    <Input
                      value={newAddress.full_address}
                      onChange={(e) => setNewAddress({...newAddress, full_address: e.target.value})}
                      placeholder="Số nhà, đường, phường/xã, quận/huyện"
                    />
                  </div>
                </div>
                <Button 
                  type="button" 
                  onClick={handleAddAddress}
                  className="bg-blue-600 hover:bg-blue-700 mt-2"
                >
                  <PlusCircle className="h-4 w-4 mr-1" /> Thêm địa chỉ
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mạng xã hội */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Mạng xã hội</h2>
            
            <div className="space-y-4">
              {companyData.company_social_links?.filter(link => !link._destroy).map((link, index) => (
                <div key={link.id || index} className="flex items-center space-x-2 p-3 border rounded-md">
                  {link.link_type === 'facebook' && <Facebook strokeWidth={1} className="text-blue-600"/>}
                  {link.link_type === 'linkedin' && <Linkedin strokeWidth={1} className="text-blue-600"/>}
                  {link.link_type === 'instagram' && <Instagram strokeWidth={1} className="text-pink-600"/>}
                  {link.link_type === 'youtube' && <Youtube strokeWidth={1} className="text-red-700"/>}
                  <div className="flex-1 truncate">{link.url}</div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleDeleteSocialLink(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              ))}
              
              <div className="border rounded-md p-4 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Loại</label>
                    <Select
                      value={newSocialLink.link_type}
                      onValueChange={(value) => setNewSocialLink({...newSocialLink, link_type: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn mạng xã hội" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="facebook">Facebook</SelectItem>
                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="youtube">YouTube</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">URL</label>
                    <Input
                      value={newSocialLink.url}
                      onChange={(e) => setNewSocialLink({...newSocialLink, url: e.target.value})}
                      placeholder="https://..."
                    />
                  </div>
                </div>
                <Button 
                  type="button" 
                  onClick={handleAddSocialLink}
                  className="bg-blue-600 hover:bg-blue-700 mt-2"
                >
                  <PlusCircle className="h-4 w-4 mr-1" /> Thêm liên kết
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Kỹ năng chính */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Kỹ năng chính của công ty</h2>
            
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {companyData.skill_ids.map(skillId => (
                  <Badge key={skillId} className="px-3 py-1.5 bg-blue-100 text-blue-800 hover:bg-blue-200">
                    {getSkillName(skillId)}
                    <XCircle 
                      className="h-4 w-4 ml-1 cursor-pointer" 
                      onClick={() => handleRemoveSkill(skillId)} 
                    />
                  </Badge>
                ))}
                {companyData.skill_ids.length === 0 && (
                  <div className="text-gray-500 italic">Chưa có kỹ năng nào được thêm</div>
                )}
              </div>
              
              <div className="flex gap-2">
                <Select
                  value={selectedSkill}
                  onValueChange={setSelectedSkill}
                  className="flex-1"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn kỹ năng" />
                  </SelectTrigger>
                  <SelectContent>
                    {skills?.map(skill => (
                      <SelectItem key={skill.id} value={skill.id.toString()}>
                        {skill.skill_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button 
                  type="button" 
                  onClick={handleAddSkill}
                  variant="outline"
                >
                  Thêm
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700"
            disabled={isUpdating}
          >
            {isUpdating ? "Đang lưu..." : "Lưu thay đổi"}
          </Button>
        </div>
      </form>
    </div>
  );
} 
