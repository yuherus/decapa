"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Clock, 
  GraduationCap, 
  Calendar,
  Plus,
  Trash2,
  Save,
  Send,
  ArrowLeft,
  Info
} from "lucide-react";

export default function PostJobPage() {
  const router = useRouter();
  
  // State cho form đăng tin tuyển dụng
  const [jobForm, setJobForm] = useState({
    title: "",
    department: "",
    location: "",
    work_type: "full_time",
    salary_min: "",
    salary_max: "",
    salary_type: "month",
    salary_currency: "VND",
    salary_visible: true,
    experience: "",
    education: "",
    description: "",
    requirements: [""],
    benefits: [""],
    skills: [""],
    application_deadline: "",
    application_email: "",
    application_url: "",
    contact_phone: "",
    contact_email: "",
    company_website: "",
    is_remote: false,
    is_urgent: false,
    is_featured: false
  });
  
  // State cho tab hiện tại
  const [activeTab, setActiveTab] = useState("basic");
  
  // Xử lý thay đổi input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobForm({
      ...jobForm,
      [name]: value
    });
  };
  
  // Xử lý thay đổi checkbox
  const handleCheckboxChange = (name) => {
    setJobForm({
      ...jobForm,
      [name]: !jobForm[name]
    });
  };
  
  // Xử lý thay đổi select
  const handleSelectChange = (name, value) => {
    setJobForm({
      ...jobForm,
      [name]: value
    });
  };
  
  // Xử lý thêm mục vào mảng (requirements, benefits, skills)
  const handleAddItem = (field) => {
    setJobForm({
      ...jobForm,
      [field]: [...jobForm[field], ""]
    });
  };
  
  // Xử lý xóa mục khỏi mảng
  const handleRemoveItem = (field, index) => {
    const newItems = [...jobForm[field]];
    newItems.splice(index, 1);
    setJobForm({
      ...jobForm,
      [field]: newItems
    });
  };
  
  // Xử lý thay đổi giá trị trong mảng
  const handleItemChange = (field, index, value) => {
    const newItems = [...jobForm[field]];
    newItems[index] = value;
    setJobForm({
      ...jobForm,
      [field]: newItems
    });
  };
  
  // Xử lý lưu nháp
  const handleSaveDraft = () => {
    console.log("Lưu nháp:", jobForm);
    // Thực hiện API call để lưu nháp
    alert("Đã lưu nháp thành công!");
  };
  
  // Xử lý đăng tin
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Kiểm tra dữ liệu đầu vào
    if (!jobForm.title || !jobForm.location || !jobForm.description) {
      alert("Vui lòng điền đầy đủ thông tin cơ bản của tin tuyển dụng");
      return;
    }
    
    console.log("Đăng tin:", jobForm);
    // Thực hiện API call để đăng tin
    
    // Chuyển hướng đến trang quản lý tin tuyển dụng
    alert("Đăng tin tuyển dụng thành công!");
    router.push("/enterprise/job-management");
  };
  
  // Danh sách các loại công việc
  const workTypes = [
    { value: "full_time", label: "Toàn thời gian" },
    { value: "part_time", label: "Bán thời gian" },
    { value: "contract", label: "Hợp đồng" },
    { value: "temporary", label: "Tạm thời" },
    { value: "internship", label: "Thực tập" },
    { value: "freelance", label: "Freelance" }
  ];
  
  // Danh sách các loại tiền tệ
  const currencies = [
    { value: "VND", label: "VNĐ" },
    { value: "USD", label: "USD" },
    { value: "EUR", label: "EUR" }
  ];
  
  // Danh sách các loại kỳ lương
  const salaryTypes = [
    { value: "hour", label: "Giờ" },
    { value: "day", label: "Ngày" },
    { value: "week", label: "Tuần" },
    { value: "month", label: "Tháng" },
    { value: "year", label: "Năm" }
  ];
  
  // Danh sách các trình độ học vấn
  const educationLevels = [
    { value: "high_school", label: "Trung học phổ thông" },
    { value: "associate", label: "Cao đẳng" },
    { value: "bachelor", label: "Cử nhân" },
    { value: "master", label: "Thạc sĩ" },
    { value: "phd", label: "Tiến sĩ" },
    { value: "other", label: "Khác" }
  ];
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Đăng tin tuyển dụng</h1>
          <p className="text-gray-500">Tạo tin tuyển dụng mới để tìm kiếm ứng viên phù hợp</p>
        </div>
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Quay lại
        </Button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="basic">Thông tin cơ bản</TabsTrigger>
            <TabsTrigger value="details">Chi tiết công việc</TabsTrigger>
            <TabsTrigger value="requirements">Yêu cầu & Quyền lợi</TabsTrigger>
            <TabsTrigger value="application">Thông tin ứng tuyển</TabsTrigger>
          </TabsList>
          
          {/* Tab thông tin cơ bản */}
          <TabsContent value="basic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin cơ bản</CardTitle>
                <CardDescription>
                  Nhập các thông tin cơ bản về vị trí tuyển dụng
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Tiêu đề công việc <span className="text-red-500">*</span></Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Ví dụ: Senior Frontend Developer"
                    value={jobForm.title}
                    onChange={handleInputChange}
                    required
                  />
                  <p className="text-sm text-gray-500">
                    Tiêu đề rõ ràng sẽ giúp thu hút ứng viên phù hợp hơn
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="department">Phòng ban</Label>
                  <Input
                    id="department"
                    name="department"
                    placeholder="Ví dụ: Kỹ thuật, Marketing, Nhân sự"
                    value={jobForm.department}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Địa điểm làm việc <span className="text-red-500">*</span></Label>
                    <div className="flex items-center space-x-2">
                      <div className="relative flex-1">
                        <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                          id="location"
                          name="location"
                          placeholder="Ví dụ: Hà Nội, TP. Hồ Chí Minh"
                          className="pl-8"
                          value={jobForm.location}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="work_type">Loại công việc <span className="text-red-500">*</span></Label>
                    <div className="flex items-center space-x-2">
                      <div className="relative flex-1">
                        <Briefcase className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                        <Select
                          value={jobForm.work_type}
                          onValueChange={(value) => handleSelectChange("work_type", value)}
                        >
                          <SelectTrigger className="pl-8">
                            <SelectValue placeholder="Chọn loại công việc" />
                          </SelectTrigger>
                          <SelectContent>
                            {workTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Làm việc từ xa</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="is_remote"
                      checked={jobForm.is_remote}
                      onCheckedChange={() => handleCheckboxChange("is_remote")}
                    />
                    <label
                      htmlFor="is_remote"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Cho phép làm việc từ xa
                    </label>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label>Thông tin lương</Label>
                  <div className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      id="salary_visible"
                      checked={jobForm.salary_visible}
                      onCheckedChange={() => handleCheckboxChange("salary_visible")}
                    />
                    <label
                      htmlFor="salary_visible"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Hiển thị thông tin lương
                    </label>
                  </div>
                  
                  {jobForm.salary_visible && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="salary_min">Lương tối thiểu</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                          <Input
                            id="salary_min"
                            name="salary_min"
                            type="number"
                            placeholder="Ví dụ: 15000000"
                            className="pl-8"
                            value={jobForm.salary_min}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="salary_max">Lương tối đa</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                          <Input
                            id="salary_max"
                            name="salary_max"
                            type="number"
                            placeholder="Ví dụ: 25000000"
                            className="pl-8"
                            value={jobForm.salary_max}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="salary_currency">Đơn vị tiền tệ</Label>
                        <Select
                          value={jobForm.salary_currency}
                          onValueChange={(value) => handleSelectChange("salary_currency", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn đơn vị tiền tệ" />
                          </SelectTrigger>
                          <SelectContent>
                            {currencies.map((currency) => (
                              <SelectItem key={currency.value} value={currency.value}>
                                {currency.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="salary_type">Kỳ lương</Label>
                        <Select
                          value={jobForm.salary_type}
                          onValueChange={(value) => handleSelectChange("salary_type", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn kỳ lương" />
                          </SelectTrigger>
                          <SelectContent>
                            {salaryTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={handleSaveDraft} type="button">
                <Save className="mr-2 h-4 w-4" />
                Lưu nháp
              </Button>
              <Button onClick={() => setActiveTab("details")} type="button">
                Tiếp theo
              </Button>
            </div>
          </TabsContent>
          
          {/* Tab chi tiết công việc */}
          <TabsContent value="details" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Chi tiết công việc</CardTitle>
                <CardDescription>
                  Mô tả chi tiết về vị trí tuyển dụng
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="description">Mô tả công việc <span className="text-red-500">*</span></Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Mô tả chi tiết về vị trí công việc, trách nhiệm, nhiệm vụ..."
                    className="min-h-[200px]"
                    value={jobForm.description}
                    onChange={handleInputChange}
                    required
                  />
                  <p className="text-sm text-gray-500">
                    Mô tả chi tiết sẽ giúp ứng viên hiểu rõ hơn về vị trí và trách nhiệm công việc
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="experience">Kinh nghiệm yêu cầu</Label>
                    <div className="relative">
                      <Clock className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        id="experience"
                        name="experience"
                        placeholder="Ví dụ: 2-3 năm"
                        className="pl-8"
                        value={jobForm.experience}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="education">Trình độ học vấn</Label>
                    <div className="relative">
                      <GraduationCap className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                      <Select
                        value={jobForm.education}
                        onValueChange={(value) => handleSelectChange("education", value)}
                      >
                        <SelectTrigger className="pl-8">
                          <SelectValue placeholder="Chọn trình độ học vấn" />
                        </SelectTrigger>
                        <SelectContent>
                          {educationLevels.map((level) => (
                            <SelectItem key={level.value} value={level.value}>
                              {level.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="application_deadline">Hạn nộp hồ sơ</Label>
                  <div className="relative">
                    <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      id="application_deadline"
                      name="application_deadline"
                      type="date"
                      className="pl-8"
                      value={jobForm.application_deadline}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Tùy chọn hiển thị</Label>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="is_urgent"
                        checked={jobForm.is_urgent}
                        onCheckedChange={() => handleCheckboxChange("is_urgent")}
                      />
                      <label
                        htmlFor="is_urgent"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Đánh dấu là tin tuyển dụng gấp
                      </label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="is_featured"
                        checked={jobForm.is_featured}
                        onCheckedChange={() => handleCheckboxChange("is_featured")}
                      />
                      <label
                        htmlFor="is_featured"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Đánh dấu là tin tuyển dụng nổi bật
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("basic")} type="button">
                Quay lại
              </Button>
              <Button onClick={() => setActiveTab("requirements")} type="button">
                Tiếp theo
              </Button>
            </div>
          </TabsContent>
          
          {/* Tab yêu cầu & quyền lợi */}
          <TabsContent value="requirements" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Yêu cầu & Quyền lợi</CardTitle>
                <CardDescription>
                  Thêm các yêu cầu và quyền lợi cho vị trí tuyển dụng
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Yêu cầu công việc</Label>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleAddItem("requirements")}
                      type="button"
                    >
                      <Plus className="h-4 w-4 mr-1" /> Thêm yêu cầu
                    </Button>
                  </div>
                  
                  {jobForm.requirements.map((requirement, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={requirement}
                        onChange={(e) => handleItemChange("requirements", index, e.target.value)}
                        placeholder={`Yêu cầu ${index + 1}`}
                        className="flex-1"
                      />
                      {jobForm.requirements.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveItem("requirements", index)}
                          type="button"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Quyền lợi</Label>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleAddItem("benefits")}
                      type="button"
                    >
                      <Plus className="h-4 w-4 mr-1" /> Thêm quyền lợi
                    </Button>
                  </div>
                  
                  {jobForm.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={benefit}
                        onChange={(e) => handleItemChange("benefits", index, e.target.value)}
                        placeholder={`Quyền lợi ${index + 1}`}
                        className="flex-1"
                      />
                      {jobForm.benefits.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveItem("benefits", index)}
                          type="button"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Kỹ năng yêu cầu</Label>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleAddItem("skills")}
                      type="button"
                    >
                      <Plus className="h-4 w-4 mr-1" /> Thêm kỹ năng
                    </Button>
                  </div>
                  
                  {jobForm.skills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={skill}
                        onChange={(e) => handleItemChange("skills", index, e.target.value)}
                        placeholder={`Kỹ năng ${index + 1}`}
                        className="flex-1"
                      />
                      {jobForm.skills.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveItem("skills", index)}
                          type="button"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("details")} type="button">
                Quay lại
              </Button>
              <Button onClick={() => setActiveTab("application")} type="button">
                Tiếp theo
              </Button>
            </div>
          </TabsContent>
          
          {/* Tab thông tin ứng tuyển */}
          <TabsContent value="application" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin ứng tuyển</CardTitle>
                <CardDescription>
                  Thêm thông tin liên hệ và cách thức ứng tuyển
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="application_email">Email nhận hồ sơ</Label>
                  <Input
                    id="application_email"
                    name="application_email"
                    type="email"
                    placeholder="Ví dụ: recruitment@company.com"
                    value={jobForm.application_email}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="application_url">URL ứng tuyển (nếu có)</Label>
                  <Input
                    id="application_url"
                    name="application_url"
                    placeholder="Ví dụ: https://company.com/careers/apply"
                    value={jobForm.application_url}
                    onChange={handleInputChange}
                  />
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label>Thông tin liên hệ</Label>
                  <p className="text-sm text-gray-500">
                    Thông tin này sẽ được hiển thị trên trang chi tiết công việc
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div className="space-y-2">
                      <Label htmlFor="contact_phone">Số điện thoại liên hệ</Label>
                      <Input
                        id="contact_phone"
                        name="contact_phone"
                        placeholder="Ví dụ: 0912345678"
                        value={jobForm.contact_phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="contact_email">Email liên hệ</Label>
                      <Input
                        id="contact_email"
                        name="contact_email"
                        type="email"
                        placeholder="Ví dụ: contact@company.com"
                        value={jobForm.contact_email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company_website">Website công ty</Label>
                  <Input
                    id="company_website"
                    name="company_website"
                    placeholder="Ví dụ: https://company.com"
                    value={jobForm.company_website}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="application_deadline">Hạn nộp hồ sơ</Label>
                  <Input
                    id="application_deadline"
                    name="application_deadline"
                    type="date"
                    value={jobForm.application_deadline}
                    onChange={handleInputChange}
                  />
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label>Tùy chọn hiển thị</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="is_urgent" 
                        checked={jobForm.is_urgent}
                        onCheckedChange={() => handleCheckboxChange("is_urgent")}
                      />
                      <Label htmlFor="is_urgent" className="font-normal">
                        Đánh dấu là tin tuyển dụng gấp
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="is_featured" 
                        checked={jobForm.is_featured}
                        onCheckedChange={() => handleCheckboxChange("is_featured")}
                      />
                      <Label htmlFor="is_featured" className="font-normal">
                        Đánh dấu là tin tuyển dụng nổi bật
                      </Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("description")} type="button">
                Quay lại
              </Button>
              <div className="space-x-2">
                <Button variant="outline" onClick={handleSaveDraft} type="button">
                  <Save className="h-4 w-4 mr-2" />
                  Lưu nháp
                </Button>
                <Button onClick={handleSubmit} type="submit">
                  <Send className="h-4 w-4 mr-2" />
                  Đăng tin
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </form>
      
      {/* Xem trước tin tuyển dụng */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Xem trước tin tuyển dụng</h2>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Tiêu đề và thông tin cơ bản */}
              <div>
                <h1 className="text-2xl font-bold">{jobForm.title || "Tiêu đề công việc"}</h1>
                <div className="flex flex-wrap gap-4 mt-2">
                  <div className="flex items-center text-gray-600">
                    <Briefcase className="h-4 w-4 mr-1" />
                    <span>{workTypes.find(type => type.value === jobForm.work_type)?.label || "Loại công việc"}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{jobForm.location || "Địa điểm"}</span>
                    {jobForm.is_remote && <span className="ml-1">(Từ xa)</span>}
                  </div>
                  {jobForm.salary_visible && (
                    <div className="flex items-center text-gray-600">
                      <DollarSign className="h-4 w-4 mr-1" />
                      <span>
                        {jobForm.salary_min && jobForm.salary_max 
                          ? `${jobForm.salary_min} - ${jobForm.salary_max} ${jobForm.salary_currency}/${jobForm.salary_type === 'month' ? 'tháng' : 'năm'}`
                          : "Thương lượng"}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{jobForm.experience || "Kinh nghiệm"}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <GraduationCap className="h-4 w-4 mr-1" />
                    <span>{jobForm.education || "Trình độ học vấn"}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>
                      {jobForm.application_deadline 
                        ? `Hạn nộp: ${new Date(jobForm.application_deadline).toLocaleDateString('vi-VN')}`
                        : "Hạn nộp hồ sơ"}
                    </span>
                  </div>
                </div>
                
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {jobForm.is_urgent && (
                    <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      Tuyển gấp
                    </span>
                  )}
                  {jobForm.is_featured && (
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      Nổi bật
                    </span>
                  )}
                  {jobForm.is_remote && (
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      Làm việc từ xa
                    </span>
                  )}
                </div>
              </div>
              
              <Separator />
              
              {/* Mô tả công việc */}
              <div>
                <h2 className="text-lg font-semibold mb-2">Mô tả công việc</h2>
                <div className="text-gray-700 whitespace-pre-line">
                  {jobForm.description || "Chưa có mô tả công việc"}
                </div>
              </div>
              
              {/* Yêu cầu */}
              <div>
                <h2 className="text-lg font-semibold mb-2">Yêu cầu công việc</h2>
                {jobForm.requirements.filter(req => req.trim()).length > 0 ? (
                  <ul className="list-disc pl-5 space-y-1">
                    {jobForm.requirements.map((req, index) => (
                      req.trim() && <li key={index} className="text-gray-700">{req}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">Chưa có yêu cầu công việc</p>
                )}
              </div>
              
              {/* Quyền lợi */}
              <div>
                <h2 className="text-lg font-semibold mb-2">Quyền lợi</h2>
                {jobForm.benefits.filter(benefit => benefit.trim()).length > 0 ? (
                  <ul className="list-disc pl-5 space-y-1">
                    {jobForm.benefits.map((benefit, index) => (
                      benefit.trim() && <li key={index} className="text-gray-700">{benefit}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">Chưa có quyền lợi</p>
                )}
              </div>
              
              {/* Kỹ năng */}
              <div>
                <h2 className="text-lg font-semibold mb-2">Kỹ năng yêu cầu</h2>
                {jobForm.skills.filter(skill => skill.trim()).length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {jobForm.skills.map((skill, index) => (
                      skill.trim() && (
                        <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      )
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">Chưa có kỹ năng yêu cầu</p>
                )}
              </div>
              
              <Separator />
              
              {/* Thông tin liên hệ */}
              <div>
                <h2 className="text-lg font-semibold mb-2">Thông tin liên hệ</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {jobForm.contact_phone && (
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                        <span className="text-blue-600">📞</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Điện thoại</p>
                        <p>{jobForm.contact_phone}</p>
                      </div>
                    </div>
                  )}
                  
                  {jobForm.contact_email && (
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                        <span className="text-blue-600">✉️</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p>{jobForm.contact_email}</p>
                      </div>
                    </div>
                  )}
                  
                  {jobForm.company_website && (
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                        <span className="text-blue-600">🌐</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Website</p>
                        <p>{jobForm.company_website}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Nút ứng tuyển */}
              <div className="flex justify-center mt-4">
                <Button className="w-full md:w-auto" disabled>
                  Ứng tuyển ngay
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
