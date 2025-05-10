"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Filter, ChevronDown, ChevronUp, BriefcaseBusiness } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function SearchBar({ 
  onSearch, 
  showAdvancedFilter = false,
  categories = [
    { value: "design", label: "Design" },
    { value: "development", label: "Development" },
    { value: "marketing", label: "Marketing" },
    { value: "support", label: "Support" }
  ],
  buttonText = "Tìm kiếm"
}) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchValues, setSearchValues] = useState({
    search: "",
    location: "",
    category: ""
  });

  const handleInputChange = (field, value) => {
    setSearchValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    if (onSearch) {
      onSearch(searchValues);
    }
  };

  return (
    <div className="rounded-[6px] p-3 shadow-[0_8px_16px_rgba(0,0,0,0.05),0_-8px_16px_rgba(0,0,0,0.05),8px_0px_16px_rgba(0,0,0,0.05),-8px_0px_16px_rgba(0,0,0,0.05)] mb-6 flex flex-wrap gap-2">
      <div className="flex items-center rounded px-3 py-2 flex-1 min-w-[200px]">
        <Search size={20} className="text-blue-600 mr-2" />
        <Input 
          type="text" 
          placeholder="Chức danh, từ khóa, công ty ..." 
          className="border-none shadow-none focus-visible:ring-0 bg-transparent flex-1 placeholder:text-gray-500 placeholder:italic"
          value={searchValues.search}
          onChange={(e) => handleInputChange("search", e.target.value)}
        />
      </div>

      <div className="w-px bg-gray-300 mx-4"></div>
      
      <div className="flex items-center rounded px-3 py-2 flex-1 min-w-[200px]">
        <MapPin size={20} className="text-blue-600 mr-2" />
        <Input 
          type="text" 
          placeholder="Địa điểm" 
          className="border-none shadow-none focus-visible:ring-0 bg-transparent flex-1 placeholder:text-gray-500 placeholder:italic"
          value={searchValues.location}
          onChange={(e) => handleInputChange("location", e.target.value)}
        />
      </div>

      <div className="w-px bg-gray-300 mx-4"></div>

      <div className="flex-1 min-w-[200px]">
        <Select 
          value={searchValues.category}
          onValueChange={(value) => handleInputChange("category", value)}
        >
          <SelectTrigger className="border-none shadow-none h-full">
            <div className="flex items-center">
              <div className="text-blue-600 mr-2">
                <BriefcaseBusiness size={20} className="text-blue-600"/>
              </div>
              <SelectValue placeholder="Chọn danh mục" />
            </div>
          </SelectTrigger>
          <SelectContent className="bg-white">
            {categories.map(category => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {showAdvancedFilter && (
        <>
          <div className="w-px bg-gray-300 mx-4"></div>

          <div className="flex-1 min-w-[200px] max-w-[200px]">
            <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <PopoverTrigger asChild>
                <Button className="h-full w-full flex items-center gap-2 shadow-none">
                  <Filter size={20} className="text-blue-600"/>
                  <span>Bộ lọc nâng cao</span>
                  {isFilterOpen ? <ChevronUp size={16} className="text-gray-500"/> : <ChevronDown size={16} className="text-gray-500" />}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0 bg-white" align="center" sideOffset={5}>
                <div className="w-full p-0">
                  <div className="grid grid-cols-5 divide-x">
                    {/* Experience Column */}
                    <div className="p-4">
                      <h3 className="font-medium mb-4">Kinh nghiệm</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="freshers" />
                          <Label htmlFor="freshers">Mới tốt nghiệp</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="1-2years" />
                          <Label htmlFor="1-2years">1 - 2 Năm</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="2-4years" />
                          <Label htmlFor="2-4years">2 - 4 Năm</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="4-6years" checked />
                          <Label htmlFor="4-6years">4 - 6 Năm</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="6-8years" />
                          <Label htmlFor="6-8years">6 - 8 Năm</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="8-10years" />
                          <Label htmlFor="8-10years">8 - 10 Năm</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="10-15years" />
                          <Label htmlFor="10-15years">10 - 15 Năm</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="15+years" />
                          <Label htmlFor="15+years">15+ Năm</Label>
                        </div>
                      </div>
                    </div>

                    {/* Salary Column */}
                    <div className="p-4">
                      <h3 className="font-medium mb-4">Mức lương</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="50-1000" />
                          <Label htmlFor="50-1000">$50 - $1000</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="1000-2000" />
                          <Label htmlFor="1000-2000">$1000 - $2000</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="3000-4000" />
                          <Label htmlFor="3000-4000">$3000 - $4000</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="4000-6000" />
                          <Label htmlFor="4000-6000">$4000 - $6000</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="6000-8000" checked />
                          <Label htmlFor="6000-8000">$6000 - $8000</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="8000-10000" />
                          <Label htmlFor="8000-10000">$8000 - $10000</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="10000-15000" />
                          <Label htmlFor="10000-15000">$10000 - $15000</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="15000+" />
                          <Label htmlFor="15000+">$15000+</Label>
                        </div>
                      </div>
                    </div>

                    {/* Job Type Column */}
                    <div className="p-4">
                      <h3 className="font-medium mb-4">Loại công việc</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="all-types" />
                          <Label htmlFor="all-types">Tất cả</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="full-time" checked />
                          <Label htmlFor="full-time">Toàn thời gian</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="part-time" />
                          <Label htmlFor="part-time">Bán thời gian</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="internship" />
                          <Label htmlFor="internship">Thực tập</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="remote" />
                          <Label htmlFor="remote">Từ xa</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="temporary" />
                          <Label htmlFor="temporary">Tạm thời</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="contract-base" />
                          <Label htmlFor="contract-base">Theo hợp đồng</Label>
                        </div>
                      </div>
                    </div>

                    {/* Education Column */}
                    <div className="p-4">
                      <h3 className="font-medium mb-4">Học vấn</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="all-education" />
                          <Label htmlFor="all-education">Tất cả</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="high-school" />
                          <Label htmlFor="high-school">Trung học</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="intermediate" />
                          <Label htmlFor="intermediate">Trung cấp</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="graduation" checked />
                          <Label htmlFor="graduation">Đại học</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="master-degree" />
                          <Label htmlFor="master-degree">Thạc sĩ</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="bachelor-degree" />
                          <Label htmlFor="bachelor-degree">Cử nhân</Label>
                        </div>
                      </div>
                    </div>

                    {/* Job Level Column */}
                    <div className="p-4">
                      <h3 className="font-medium mb-4">Cấp bậc</h3>
                      <div className="space-y-3">
                        <RadioGroup defaultValue="mid-level">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="entry-level" id="entry-level" />
                            <Label htmlFor="entry-level">Mới vào nghề</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="mid-level" id="mid-level" />
                            <Label htmlFor="mid-level">Cấp trung</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="expert-level" id="expert-level" />
                            <Label htmlFor="expert-level">Chuyên gia</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </>
      )}
      
      <div className="flex-1 min-w-[120px] max-w-[120px]">
        <Button 
          className="rounded-[6px] bg-blue-600 h-full hover:bg-blue-700 text-white w-full"
          onClick={handleSubmit}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
