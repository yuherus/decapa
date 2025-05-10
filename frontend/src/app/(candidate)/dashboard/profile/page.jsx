'use client';

import { useState, useEffect, useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Users, Globe, Upload, Plus, Link, CircleX, X, CirclePlus, Search, Pencil, ChevronDown, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import ProfileSection from "./components/ProfileSection";
import { profileService } from "@/services/profile";
import { toast } from "@/hooks/use-toast";
import { te } from 'date-fns/locale';

export default function Profile() {
  const [activeTab, setActiveTab] = useState("personal");
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    fullname: '',
    headline: '',
    email: '',
    phonenum: '',
    country_code: '+84',
    dob: '',
    gender: '',
    address: '',
    about: '',
    avatar: null
  });
  const [socialLinks, setSocialLinks] = useState([
    { id: 1, platform: 'facebook', url: '', showClear: false }
  ]);
  const [nextLinkId, setNextLinkId] = useState(5);
  
  const [skills, setSkills] = useState([]);
  const [availableSkills, setAvailableSkills] = useState([]);
  const [searchSkill, setSearchSkill] = useState('');
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [skillInputValue, setSkillInputValue] = useState(''); // State cho input skill
  const [selectedLevel, setSelectedLevel] = useState('intermediate'); // Default level
  const [showSkillDropdown, setShowSkillDropdown] = useState(false); // State để hiển thị dropdown
  const skillInputRef = useRef(null); // Ref cho input skill
  const MAX_SKILLS = 20; // Giới hạn số kỹ năng tối đa
  
  // Dialog States
  const [activeDialog, setActiveDialog] = useState(null);
  const [formData, setFormData] = useState({
    aboutMe: "",
    education: {
      school: '',
      major: '',
      isCurrentlyStudying: false,
      fromMonth: '',
      fromYear: '',
      toMonth: '',
      toYear: '',
      additionalDetails: ''
    },
    workExperience: {
      company: '',
      position: '',
      isCurrentlyWorking: false,
      fromMonth: '',
      fromYear: '',
      toMonth: '',
      toYear: '',
      description: ''
    },
    project: {
      title: '',
      description: '',
      link: ''
    },
    certificate: {
      name: '',
      issuer: '',
      dateMonth: '',
      dateYear: '',
      description: ''
    },
    award: {
      title: '',
      issuer: '',
      dateMonth: '',
      dateYear: '',
      description: ''
    },
    skill: {
      skill_id: null,
      name: '',
      level: ''
    }
  });
  
  // List of available social platforms
  const availablePlatforms = [
    { value: 'facebook', label: 'Facebook' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'github', label: 'GitHub' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'youtube', label: 'Youtube' }
  ];

  const monthOptions = [
    { value: '1', label: 'January' },
    { value: '2', label: 'February' },
    { value: '3', label: 'March' },
    { value: '4', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
  ];

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear; i >= currentYear - 50; i--) {
      years.push({ value: i.toString(), label: i.toString() });
    }
    return years;
  };

  const yearOptions = generateYearOptions();

  // Thêm BASE_API_URL để sử dụng cho avatar
  const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  // Các hàm xử lý social link
  const addNewSocialLink = () => {
    setSocialLinks([...socialLinks, { id: nextLinkId, platform: 'linkedin', url: '', showClear: false }]);
    setNextLinkId(nextLinkId + 1);
  };

  const updateSocialLinkUrl = (id, url) => {
    setSocialLinks(socialLinks.map(link => 
      link.id === id ? { ...link, url, showClear: url.length > 0 } : link
    ));
  };

  const updateSocialPlatform = (id, platform) => {
    setSocialLinks(socialLinks.map(link => 
      link.id === id ? { ...link, platform } : link
    ));
  };

  const clearInput = (id) => {
    setSocialLinks(socialLinks.map(link => 
      link.id === id ? { ...link, url: '', showClear: false } : link
    ));
  };

  const removeSocialLink = (id) => {
    // Nếu link có apiId, gọi API để xóa
    const linkToDelete = socialLinks.find(link => link.id === id);
    if (linkToDelete && linkToDelete.apiId) {
      profileService.socialLink.delete(linkToDelete.apiId)
        .then(() => {
          setSocialLinks(socialLinks.filter(link => link.id !== id));
          toast({
            title: "Thành công",
            description: "Đã xóa liên kết mạng xã hội",
            variant: "success"
          });
        })
        .catch(error => {
          console.error('Error deleting social link:', error);
          toast({
            title: "Lỗi",
            description: "Không thể xóa liên kết mạng xã hội",
            variant: "destructive"
          });
        });
    } else {
      // Nếu không có apiId, chỉ xóa ở frontend
      setSocialLinks(socialLinks.filter(link => link.id !== id));
    }
  };

  // Hàm lưu social links
  const saveSocialLinks = async () => {
    setIsLoading(true);
    try {
      // Xử lý từng social link
      const promises = socialLinks.map(async (link) => {
        // Nếu link có apiId, đó là update
        if (link.apiId) {
          // Nếu url rỗng, xóa link
          if (!link.url) {
            return profileService.socialLink.delete(link.apiId);
          } else {
            return profileService.socialLink.update(link.apiId, {
              link_type: link.platform,
              url: link.url
            });
          }
        } 
        // Nếu không có apiId và có url, tạo mới
        else if (link.url) {
          return profileService.socialLink.create({
            link_type: link.platform,
            url: link.url
          });
        }
        // Nếu không có apiId và không có url, bỏ qua
        return Promise.resolve();
      });
      
      await Promise.all(promises);
      
      // Cập nhật lại danh sách từ API
      await fetchSocialLinks();
      
      toast({
        title: "Thành công",
        description: "Đã cập nhật liên kết mạng xã hội",
        variant: "success"
      });
    } catch (error) {
      console.error('Error saving social links:', error);
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật liên kết mạng xã hội",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (section, field, value) => {
    if (section === 'aboutMe') {
      setFormData({
        ...formData,
        aboutMe: value
      });
    } else {
      setFormData({
        ...formData,
        [section]: {
          ...formData[section],
          [field]: value
        }
      });
    }
  };

  // Function to handle form submission
  const handleFormSubmit = async () => {
    if (activeDialog === 'aboutMe') {
      await handleUpdateAbout();
      return;
    }
    
    if (activeDialog === 'skills') {
      setIsLoading(true);
      try {
        // Lấy danh sách skill hiện tại từ API
        const currentSkills = await profileService.skill.getAll();
        const currentSkillIds = currentSkills.map(s => s.id);

        // Xóa các skill không còn trong tempSkills
        const skillsToDelete = currentSkills.filter(s => 
          !tempSkills.some(temp => temp.id === s.id)
        );
        await Promise.all(skillsToDelete.map(skill => 
          profileService.skill.delete(skill.id)
        ));

        // Thêm các skill mới
        const skillsToAdd = tempSkills.filter(s => 
          !currentSkills.some(cs => cs.skill.id === s.skill_id)
        );
        await Promise.all(skillsToAdd.map(skill => 
          profileService.skill.create({
            level: skill.level,
            skill_id: skill.skill_id
          })
        ));

        // Cập nhật state
        setSkills(tempSkills);
        
        toast({
          title: "Thành công",
          description: "Đã cập nhật kỹ năng",
          variant: "success"
        });
      } catch (error) {
        console.error('Error updating skills:', error);
        toast({
          title: "Lỗi",
          description: "Không thể cập nhật kỹ năng",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
        setActiveDialog(null);
      }
      return;
    }
    
    if (editIndex === -1) {
      // Thêm mới
      await handleAddItem(activeDialog);
    } else {
      // Cập nhật
      await handleUpdateItem(activeDialog);
    }
  };

  // Function to open dialog
  const openDialog = (dialogName, data = null, index = -1) => {
    if (data) {
      if (dialogName === 'skills') {
        // Khi chỉnh sửa kỹ năng, chỉ cho phép sửa cấp độ
        setFormData({
          ...formData,
          [dialogName]: { 
            skill_id: data.skill_id,
            name: data.name,
            level: data.level
          }
        });
        // Copy danh sách skill hiện tại vào tempSkills
        setTempSkills([...skills]);
      } else {
        setFormData({
          ...formData,
          [dialogName]: { ...data }
        });
      }
      setOriginalData(data);
      setEditIndex(index);
    } else {
      // Reset form data khi thêm mới
      setFormData({
        ...formData,
        [dialogName]: getEmptyFormData(dialogName)
      });
      // Copy danh sách skill hiện tại vào tempSkills
      if (dialogName === 'skills') {
        setTempSkills([...skills]);
      }
      setEditIndex(-1);
    }
    setActiveDialog(dialogName);
  };

  // Function to close dialog
  const closeDialog = () => {
    setActiveDialog(null);
    setEditIndex(-1);
    setOriginalData(null);
  };

  // Function to get platform icon
  const getPlatformIcon = (platform) => {
    switch(platform) {
      case 'facebook':
        return <div className="flex items-center justify-center text-blue-600"><span className="font-bold text-lg">f</span></div>;
      case 'linkedin':
        return <div className="flex items-center text-blue-700"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>;
      case 'github':
        return <div className="flex items-center text-gray-800"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>;
      case 'instagram':
        return <div className="flex items-center text-pink-500"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>;
      case 'youtube':
        return <div className="flex items-center text-red-600"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" stroke="currentColor" fill="currentColor"/></svg></div>;
      default:
        return <Link className="h-4 w-4 text-gray-500" />;
    }
  };

  const renderDialogContent = () => {
    const isEditing = editIndex !== -1;
    const dialogTitle = isEditing ? "Chỉnh sửa" : "Thêm mới";
    
    switch (activeDialog) {
      case 'aboutMe':
        return (
          <>
            <DialogHeader>
              <DialogTitle>About Me</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <label className="block text-sm font-medium mb-2">Introduce your strengths and years of experience</label>
              <Textarea 
                className="w-full min-h-32" 
                placeholder="Write a brief introduction about yourself..."
                value={formData.aboutMe.aboutMe}
                onChange={(e) => handleInputChange('aboutMe', 'aboutMe', e.target.value)}
              />
            </div>
          </>
        );
      
      case 'education':
        return (
          <>
            <DialogHeader>
              <DialogTitle>Education</DialogTitle>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">School <span className="text-red-500">*</span></label>
                <Input 
                  className="w-full" 
                  placeholder="Enter school name"
                  value={formData.education.school}
                  onChange={(e) => handleInputChange('education', 'school', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Major <span className="text-red-500">*</span></label>
                <Input 
                  className="w-full" 
                  placeholder="Enter your major"
                  value={formData.education.major}
                  onChange={(e) => handleInputChange('education', 'major', e.target.value)}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="currently-studying" 
                  checked={formData.education.isCurrentlyStudying}
                  onCheckedChange={(checked) => handleInputChange('education', 'isCurrentlyStudying', checked)}
                />
                <label htmlFor="currently-studying" className="text-sm">I am currently studying here</label>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">From <span className="text-red-500">*</span></label>
                  <div className="grid grid-cols-2 gap-2">
                    <Select 
                      value={formData.education.fromMonth}
                      onValueChange={(value) => handleInputChange('education', 'fromMonth', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent>
                        {monthOptions.map(month => (
                          <SelectItem key={month.value} value={month.value}>{month.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Select 
                      value={formData.education.fromYear}
                      onValueChange={(value) => handleInputChange('education', 'fromYear', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {yearOptions.map(year => (
                          <SelectItem key={year.value} value={year.value}>{year.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">To <span className="text-red-500">*</span></label>
                  <div className="grid grid-cols-2 gap-2">
                    <Select 
                      value={formData.education.toMonth}
                      onValueChange={(value) => handleInputChange('education', 'toMonth', value)}
                      disabled={formData.education.isCurrentlyStudying}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent>
                        {monthOptions.map(month => (
                          <SelectItem key={month.value} value={month.value}>{month.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Select 
                      value={formData.education.toYear}
                      onValueChange={(value) => handleInputChange('education', 'toYear', value)}
                      disabled={formData.education.isCurrentlyStudying}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {yearOptions.map(year => (
                          <SelectItem key={year.value} value={year.value}>{year.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Additional details</label>
                <Textarea 
                  className="w-full" 
                  placeholder="Add any additional information..."
                  value={formData.education.additionalDetails}
                  onChange={(e) => handleInputChange('education', 'additionalDetails', e.target.value)}
                />
              </div>
            </div>
          </>
        );
      
      case 'workExperience':
        return (
          <>
            <DialogHeader>
              <DialogTitle>Work Experience</DialogTitle>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Company <span className="text-red-500">*</span></label>
                <Input 
                  className="w-full" 
                  placeholder="Enter company name"
                  value={formData.workExperience.company}
                  onChange={(e) => handleInputChange('workExperience', 'company', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Position <span className="text-red-500">*</span></label>
                <Input 
                  className="w-full" 
                  placeholder="Enter your position"
                  value={formData.workExperience.position}
                  onChange={(e) => handleInputChange('workExperience', 'position', e.target.value)}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="currently-working" 
                  checked={formData.workExperience.isCurrentlyWorking}
                  onCheckedChange={(checked) => handleInputChange('workExperience', 'isCurrentlyWorking', checked)}
                />
                <label htmlFor="currently-working" className="text-sm">I am currently working here</label>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">From <span className="text-red-500">*</span></label>
                  <div className="grid grid-cols-2 gap-2">
                    <Select 
                      value={formData.workExperience.fromMonth}
                      onValueChange={(value) => handleInputChange('workExperience', 'fromMonth', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent>
                        {monthOptions.map(month => (
                          <SelectItem key={month.value} value={month.value}>{month.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Select 
                      value={formData.workExperience.fromYear}
                      onValueChange={(value) => handleInputChange('workExperience', 'fromYear', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {yearOptions.map(year => (
                          <SelectItem key={year.value} value={year.value}>{year.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">To <span className="text-red-500">*</span></label>
                  <div className="grid grid-cols-2 gap-2">
                    <Select 
                      value={formData.workExperience.toMonth}
                      onValueChange={(value) => handleInputChange('workExperience', 'toMonth', value)}
                      disabled={formData.workExperience.isCurrentlyWorking}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent>
                        {monthOptions.map(month => (
                          <SelectItem key={month.value} value={month.value}>{month.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Select 
                      value={formData.workExperience.toYear}
                      onValueChange={(value) => handleInputChange('workExperience', 'toYear', value)}
                      disabled={formData.workExperience.isCurrentlyWorking}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {yearOptions.map(year => (
                          <SelectItem key={year.value} value={year.value}>{year.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea 
                  className="w-full" 
                  placeholder="Describe your responsibilities and achievements..."
                  value={formData.workExperience.description}
                  onChange={(e) => handleInputChange('workExperience', 'description', e.target.value)}
                />
              </div>
            </div>
          </>
        );
      
      case 'project':
        return (
          <>
            <DialogHeader>
              <DialogTitle>Personal Project</DialogTitle>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Project Title <span className="text-red-500">*</span></label>
                <Input 
                  className="w-full" 
                  placeholder="Enter project title"
                  value={formData.project.title}
                  onChange={(e) => handleInputChange('project', 'title', e.target.value)}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="currently-working-project" 
                  checked={formData.project.isCurrentlyWorking}
                  onCheckedChange={(checked) => handleInputChange('project', 'isCurrentlyWorking', checked)}
                />
                <label htmlFor="currently-working-project" className="text-sm">I am currently working on this project</label>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">From <span className="text-red-500">*</span></label>
                  <div className="grid grid-cols-2 gap-2">
                    <Select 
                      value={formData.project.fromMonth}
                      onValueChange={(value) => handleInputChange('project', 'fromMonth', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent>
                        {monthOptions.map(month => (
                          <SelectItem key={month.value} value={month.value}>{month.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Select 
                      value={formData.project.fromYear}
                      onValueChange={(value) => handleInputChange('project', 'fromYear', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {yearOptions.map(year => (
                          <SelectItem key={year.value} value={year.value}>{year.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">To <span className="text-red-500">*</span></label>
                  <div className="grid grid-cols-2 gap-2">
                    <Select 
                      value={formData.project.toMonth}
                      onValueChange={(value) => handleInputChange('project', 'toMonth', value)}
                      disabled={formData.project.isCurrentlyWorking}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent>
                        {monthOptions.map(month => (
                          <SelectItem key={month.value} value={month.value}>{month.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Select 
                      value={formData.project.toYear}
                      onValueChange={(value) => handleInputChange('project', 'toYear', value)}
                      disabled={formData.project.isCurrentlyWorking}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {yearOptions.map(year => (
                          <SelectItem key={year.value} value={year.value}>{year.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Project Description</label>
                <Textarea 
                  className="w-full" 
                  placeholder="Describe your project..."
                  value={formData.project.description}
                  onChange={(e) => handleInputChange('project', 'description', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Project Link</label>
                <Input 
                  className="w-full" 
                  placeholder="Enter project URL"
                  value={formData.project.link}
                  onChange={(e) => handleInputChange('project', 'link', e.target.value)}
                />
              </div>
            </div>
          </>
        );
      
      case 'certificate':
        return (
          <>
            <DialogHeader>
              <DialogTitle>Certificate</DialogTitle>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Certificate Name <span className="text-red-500">*</span></label>
                <Input 
                  className="w-full" 
                  placeholder="Enter certificate name"
                  value={formData.certificate.name}
                  onChange={(e) => handleInputChange('certificate', 'name', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Issuing Organization</label>
                <Input 
                  className="w-full" 
                  placeholder="Enter issuing organization"
                  value={formData.certificate.issuer}
                  onChange={(e) => handleInputChange('certificate', 'issuer', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Issue Date</label>
                <div className="grid grid-cols-2 gap-2">
                  <Select 
                    value={formData.certificate.dateMonth}
                    onValueChange={(value) => handleInputChange('certificate', 'dateMonth', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                      {monthOptions.map(month => (
                        <SelectItem key={month.value} value={month.value}>{month.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select 
                    value={formData.certificate.dateYear}
                    onValueChange={(value) => handleInputChange('certificate', 'dateYear', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {yearOptions.map(year => (
                        <SelectItem key={year.value} value={year.value}>{year.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea 
                  className="w-full" 
                  placeholder="Describe the certificate and skills it validates..."
                  value={formData.certificate.description}
                  onChange={(e) => handleInputChange('certificate', 'description', e.target.value)}
                />
              </div>
            </div>
          </>
        );
      
      case 'award':
        return (
          <>
            <DialogHeader>
              <DialogTitle>Award</DialogTitle>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Award Title <span className="text-red-500">*</span></label>
                <Input 
                  className="w-full" 
                  placeholder="Enter award title"
                  value={formData.award.title}
                  onChange={(e) => handleInputChange('award', 'title', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Issuing Organization</label>
                <Input 
                  className="w-full" 
                  placeholder="Enter issuing organization"
                  value={formData.award.issuer}
                  onChange={(e) => handleInputChange('award', 'issuer', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Date Received</label>
                <div className="grid grid-cols-2 gap-2">
                  <Select 
                    value={formData.award.dateMonth}
                    onValueChange={(value) => handleInputChange('award', 'dateMonth', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                      {monthOptions.map(month => (
                        <SelectItem key={month.value} value={month.value}>{month.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select 
                    value={formData.award.dateYear}
                    onValueChange={(value) => handleInputChange('award', 'dateYear', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {yearOptions.map(year => (
                        <SelectItem key={year.value} value={year.value}>{year.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea 
                  className="w-full" 
                  placeholder="Describe your award and its significance..."
                  value={formData.award.description}
                  onChange={(e) => handleInputChange('award', 'description', e.target.value)}
                />
              </div>
            </div>
          </>
        );
      case 'skills':
        return (
          <>
            <DialogHeader>
              <DialogTitle>Kỹ năng</DialogTitle>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <div className="relative" ref={skillInputRef}>
                    <Input
                      type="text"
                      placeholder="Nhập kỹ năng"
                      className="w-full"
                      value={isEditing ? formData.skill.name : skillInputValue}
                      onChange={(e) => {
                        if (!isEditing) {
                          setSkillInputValue(e.target.value);
                          setShowSkillDropdown(true);
                        }
                      }}
                      onFocus={() => {
                        if (!isEditing) {
                          setShowSkillDropdown(true);
                        }
                      }}
                      disabled={isEditing}
                    />
                    {!isEditing && (
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                        <Button
                          variant="ghost"
                          className="h-4 w-4 p-0"
                          onClick={() => setShowSkillDropdown(!showSkillDropdown)}
                        >
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                    
                    {showSkillDropdown && !isEditing && (
                      <div className="absolute z-10 mt-1 w-full max-h-60 overflow-auto bg-white rounded-md shadow-lg">
                        {filteredSkills.length > 0 ? (
                          <ul className="py-1">
                            {filteredSkills.map(skill => (
                              <li
                                key={skill.id}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                                onClick={() => {
                                  setSkillInputValue(skill.skill_name);
                                  setSelectedSkillFromDropdown(skill);
                                  setShowSkillDropdown(false);
                                }}
                              >
                                {skill.skill_name}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          skillInputValue.trim() !== '' && (
                            <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center" onClick={() => {
                              setSelectedSkillFromDropdown(null);
                              setShowSkillDropdown(false);
                            }}>
                              <Plus className="h-4 w-4 mr-2" />
                              <span>Thêm "{skillInputValue}"</span>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <Select 
                    value={isEditing ? formData.skill.level : selectedLevel} 
                    onValueChange={(value) => isEditing ? handleInputChange('skill', 'level', value) : setSelectedLevel(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Chọn mức độ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Sơ cấp</SelectItem>
                      <SelectItem value="intermediate">Trung cấp</SelectItem>
                      <SelectItem value="advanced">Nâng cao</SelectItem>
                      <SelectItem value="expert">Thành thạo</SelectItem>
                      <SelectItem value="master">Chuyên gia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Button 
                    className="w-full bg-red-500 hover:bg-red-600 text-white"
                    onClick={async () => {
                      if (!skillInputValue || !selectedLevel) {
                        toast({
                          title: "Thiếu thông tin",
                          description: "Vui lòng nhập tên kỹ năng và chọn cấp độ",
                          variant: "destructive"
                        });
                        return;
                      }

                      try {
                        let skillToAdd;
                        
                        // Nếu là skill mới (không có trong dropdown)
                        if (!selectedSkillFromDropdown) {
                          // Tạo skill mới
                          const newSkillResponse = await profileService.skill.createSkill({
                            skill_name: skillInputValue
                          });
                          
                          skillToAdd = {
                            name: skillInputValue,
                            level: selectedLevel,
                            skill_id: newSkillResponse.id
                          };
                        } else {
                          // Nếu là skill có sẵn
                          skillToAdd = {
                            name: selectedSkillFromDropdown.skill_name,
                            level: selectedLevel,
                            skill_id: selectedSkillFromDropdown.id
                          };
                        }

                        // Thêm vào tempSkills
                        setTempSkills([...tempSkills, skillToAdd]);
                        
                        // Reset form
                        setSkillInputValue('');
                        setSelectedLevel('intermediate');
                        setSelectedSkillFromDropdown(null);
                      } catch (error) {
                        console.error('Error adding skill:', error);
                        toast({
                          title: "Lỗi",
                          description: "Không thể thêm kỹ năng",
                          variant: "destructive"
                        });
                      }
                    }}
                  >
                    Thêm
                  </Button>
                </div>
              </div>
              
              <div className="text-sm text-gray-500">
                {tempSkills.length}/{MAX_SKILLS} kỹ năng
              </div>
              
              {isEditing ? null : (
                <div className="space-y-6">
                  {renderSkillsByLevel(true, tempSkills)}
                </div>
              )}
            </div>
          </>
        );
    }
  };
          
  // Thêm state cho ảnh đại diện
  const [profileImage, setProfileImage] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageFile, setImageFile] = useState(null);  // Lưu trữ file ảnh để upload

  // Hàm xử lý khi upload ảnh
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
        setImageFile(file);  // Lưu file để upload sau này
      };
      reader.readAsDataURL(file);
    }
  };

  // Hàm xử lý cập nhật thông tin cá nhân
  const handleUpdatePersonalInfo = async () => {
    setIsLoading(true);
    try {
      const formData = {
        account_attributes: {
          fullname: userData.fullname
        },
        headline: userData.headline,
        phonenum: userData.phonenum,
        dob: userData.dob,
        gender: userData.gender,
        address: userData.address,
      };

      // Thêm ảnh đại diện nếu có
      if (imageFile) {
        formData.avatar = imageFile;
      }

      const updatedUser = await profileService.updateProfile(formData);
      
      // Cập nhật state với thông tin mới
      setUserData(prev => ({
        ...prev,
        ...updatedUser,
        avatar: updatedUser.avatar_url || prev.avatar
      }));

      toast({
        title: "Thành công",
        description: "Thông tin cá nhân đã được cập nhật",
        variant: "success"
      });
    } catch (error) {
      console.error('Error updating personal info:', error);
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật thông tin cá nhân",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Hàm cập nhật dữ liệu trong form
  const handleUserDataChange = (field, value) => {
    setUserData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };

  // Hàm xử lý cập nhật About Me
  const handleUpdateAbout = async () => {
    setIsLoading(true);
    try {
      await profileService.updateProfile({ bio: formData.aboutMe });
      setUserData(prev => ({
        ...prev,
        about: formData.aboutMe
      }));
      
      toast({
        title: "Thành công",
        description: "Giới thiệu đã được cập nhật",
        variant: "success"
      });
      
      closeDialog();
    } catch (error) {
      console.error('Error updating about me:', error);
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật phần giới thiệu",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // State cho các mục profile
  const [workExperiences, setWorkExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [awards, setAwards] = useState([]);
  const [editIndex, setEditIndex] = useState(-1); // Để biết đang edit mục nào
  const [originalData, setOriginalData] = useState(null); // Lưu dữ liệu gốc khi edit
  
  // Hàm để lấy form data trống cho mỗi loại
  const getEmptyFormData = (type) => {
    switch (type) {
      case 'workExperience':
        return {
          company: '',
          position: '',
          isCurrentlyWorking: false,
          fromMonth: '',
          fromYear: '',
          toMonth: '',
          toYear: '',
          description: ''
        };
      case 'education':
        return {
          school: '',
          major: '',
          isCurrentlyStudying: false,
          fromMonth: '',
          fromYear: '',
          toMonth: '',
          toYear: '',
          additionalDetails: ''
        };
      case 'project':
        return {
          title: '',
          description: '',
          link: '',
          isCurrentlyWorking: false,
          fromMonth: '',
          fromYear: '',
          toMonth: '',
          toYear: ''
        };
      case 'certificate':
        return {
          name: '',
          issuer: '',
          dateMonth: '',
          dateYear: '',
          description: ''
        };
      case 'award':
        return {
          title: '',
          issuer: '',
          dateMonth: '',
          dateYear: '',
          description: ''
        };
      case 'skills':
        return {
          skill_id: null,
          name: '',
          level: ''
        };
      default:
        return {};
    }
  };

  // Effect để fetch dữ liệu khi component mount
  useEffect(() => {
    const fetchProfileData = async () => {
      setIsLoading(true);
      try {
        // Lấy thông tin profile
        const profileData = await profileService.getProfile();
        if (profileData.user) {
          setUserData({
            fullname: profileData.user.fullname || '',
            headline: profileData.user.headline || '',
            email: profileData.user.email || '',
            phonenum: profileData.user.phonenum || '',
            country_code: profileData.user.country_code || '+84',
            dob: profileData.user.dob || '',
            gender: profileData.user.gender || '',
            address: profileData.user.address || '',
            about: profileData.user.bio || '',
            avatar: profileData.user.avatar_url || null
          });
          
          // Cập nhật formData.aboutMe
          setFormData(prev => ({
            ...prev,
            aboutMe: profileData.user.bio || ''
          }));
        }
        
        // Lấy các thông tin khác
        fetchEducations();
        fetchExperiences();
        fetchProjects();
        fetchCertificates();
        fetchAwards();
        fetchSkills();
        fetchSocialLinks();
        fetchAvailableSkills();
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast({
          title: "Lỗi",
          description: "Không thể tải thông tin người dùng",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProfileData();
  }, []);

  // Effect để lọc kỹ năng khi người dùng tìm kiếm
  useEffect(() => {
    if (skillInputValue.trim() === '') {
      setFilteredSkills(availableSkills); // Hiển thị tất cả skill khi chưa nhập gì
    } else {
      const filtered = availableSkills.filter(skill => 
        skill.skill_name.toLowerCase().includes(skillInputValue.toLowerCase())
      );
      setFilteredSkills(filtered);
    }
  }, [skillInputValue, availableSkills]);

  // Effect để xử lý việc đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (skillInputRef.current && !skillInputRef.current.contains(event.target)) {
        setShowSkillDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Các hàm fetch dữ liệu riêng biệt
  const fetchEducations = async () => {
    try {
      const data = await profileService.education.getAll();
      if (data && Array.isArray(data)) {
        const formattedEducations = data.map(edu => ({
          id: edu.id,
          school: edu.school,
          major: edu.major,
          isCurrentlyStudying: edu.is_studying || false,
          fromMonth: edu.from_date ? new Date(edu.from_date).getMonth() + 1 + '' : '',
          fromYear: edu.from_date ? new Date(edu.from_date).getFullYear() + '' : '',
          toMonth: edu.to_date ? new Date(edu.to_date).getMonth() + 1 + '' : '',
          toYear: edu.to_date ? new Date(edu.to_date).getFullYear() + '' : '',
          additionalDetails: edu.additional_details || ''
        }));
        setEducations(formattedEducations);
      }
    } catch (error) {
      console.error('Error fetching educations:', error);
    }
  };

  const fetchExperiences = async () => {
    try {
      const data = await profileService.experience.getAll();
      if (data && Array.isArray(data)) {
        const formattedExperiences = data.map(exp => ({
          id: exp.id,
          company: exp.company,
          position: exp.position,
          isCurrentlyWorking: exp.is_working || false,
          fromMonth: exp.from_date ? new Date(exp.from_date).getMonth() + 1 + '' : '',
          fromYear: exp.from_date ? new Date(exp.from_date).getFullYear() + '' : '',
          toMonth: exp.to_date ? new Date(exp.to_date).getMonth() + 1 + '' : '',
          toYear: exp.to_date ? new Date(exp.to_date).getFullYear() + '' : '',
          description: exp.additional_details || ''
        }));
        setWorkExperiences(formattedExperiences);
      }
    } catch (error) {
      console.error('Error fetching experiences:', error);
    }
  };

  const fetchProjects = async () => {
    try {
      const data = await profileService.project.getAll();
      if (data && Array.isArray(data)) {
        const formattedProjects = data.map(proj => ({
          id: proj.id,
          title: proj.project_name,
          description: proj.description || '',
          isCurrentlyWorking: proj.is_working || false,
          fromMonth: proj.from_date ? new Date(proj.from_date).getMonth() + 1 + '' : '',
          fromYear: proj.from_date ? new Date(proj.from_date).getFullYear() + '' : '',
          toMonth: proj.to_date ? new Date(proj.to_date).getMonth() + 1 + '' : '',
          toYear: proj.to_date ? new Date(proj.to_date).getFullYear() + '' : '',
          link: proj.url || ''
        }));
        setProjects(formattedProjects);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchCertificates = async () => {
    try {
      const data = await profileService.certificate.getAll();
      if (data && Array.isArray(data)) {
        const formattedCertificates = data.map(cert => ({
          id: cert.id,
          name: cert.certificate_name,
          issuer: cert.organization || '',
          dateMonth: cert.issue_date ? new Date(cert.issue_date).getMonth() + 1 + '' : '',
          dateYear: cert.issue_date ? new Date(cert.issue_date).getFullYear() + '' : '',
          description: cert.description || ''
        }));
        setCertificates(formattedCertificates);
      }
    } catch (error) {
      console.error('Error fetching certificates:', error);
    }
  };

  const fetchAwards = async () => {
    try {
      const data = await profileService.award.getAll();
      if (data && Array.isArray(data)) {
        const formattedAwards = data.map(award => ({
          id: award.id,
          title: award.award_name,
          issuer: award.organization || '',
          dateMonth: award.issue_date ? new Date(award.issue_date).getMonth() + 1 + '' : '',
          dateYear: award.issue_date ? new Date(award.issue_date).getFullYear() + '' : '',
          description: award.description || ''
        }));
        setAwards(formattedAwards);
      }
    } catch (error) {
      console.error('Error fetching awards:', error);
    }
  };

  const fetchSkills = async () => {
    try {
      const data = await profileService.skill.getAll();
      if (data && Array.isArray(data)) {
        const formattedSkills = data.map(skill => ({
          id: skill.id,
          name: skill.skill ? skill.skill.skill_name : '',
          level: skill.level,
          skill_id: skill.skill ? skill.skill.id : null
        }));
        setSkills(formattedSkills);
      }
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };

  const fetchAvailableSkills = async () => {
    try {
      const data = await profileService.skill.getAllSkills();
      if (data && Array.isArray(data)) {
        setAvailableSkills(data);
        setFilteredSkills(data);
      }
    } catch (error) {
      console.error('Error fetching available skills:', error);
    }
  };

  const fetchSocialLinks = async () => {
    try {
      const data = await profileService.socialLink.getAll();
      if (data && Array.isArray(data)) {
        const formattedLinks = data.map((link, index) => ({
          id: index + 1,
          platform: link.link_type,
          url: link.url,
          showClear: !!link.url,
          apiId: link.id // Giữ ID từ API
        }));
        setSocialLinks(formattedLinks);
        setNextLinkId(formattedLinks.length + 1);
      }
    } catch (error) {
      console.error('Error fetching social links:', error);
    }
  };

  // Hàm xử lý thêm mới
  const handleAddItem = async (type) => {
    setIsLoading(true);
    try {
      let result;
      switch (type) {
        case 'workExperience':
          const expData = {
            company: formData.workExperience.company,
            position: formData.workExperience.position,
            is_working: formData.workExperience.isCurrentlyWorking,
            from_date: `${formData.workExperience.fromYear}-${formData.workExperience.fromMonth}-01`,
            to_date: formData.workExperience.isCurrentlyWorking ? null : 
                    `${formData.workExperience.toYear}-${formData.workExperience.toMonth}-01`,
            additional_details: formData.workExperience.description
          };
          result = await profileService.experience.create(expData);
          
          // Cập nhật state
          const newExp = {
            ...formData.workExperience,
            id: result.id
          };
          setWorkExperiences([...workExperiences, newExp]);
          break;
          
        case 'education':
          const eduData = {
            school: formData.education.school,
            major: formData.education.major,
            is_studying: formData.education.isCurrentlyStudying,
            from_date: `${formData.education.fromYear}-${formData.education.fromMonth}-01`,
            to_date: formData.education.isCurrentlyStudying ? null : 
                    `${formData.education.toYear}-${formData.education.toMonth}-01`,
            additional_details: formData.education.additionalDetails
          };
          result = await profileService.education.create(eduData);
          
          // Cập nhật state
          const newEdu = {
            ...formData.education,
            id: result.id
          };
          setEducations([...educations, newEdu]);
          break;
          
        case 'project':
          const projData = {
            project_name: formData.project.project_name,
            description: formData.project.description,
            is_working: formData.project.isCurrentlyWorking,
            from_date: `${formData.project.fromYear}-${formData.project.fromMonth}-01`,
            to_date: formData.project.isCurrentlyWorking ? null : 
                    `${formData.project.toYear}-${formData.project.toMonth}-01`,
            url: formData.project.link
          };
          result = await profileService.project.create(projData);
          
          // Cập nhật state
          const newProj = {
            ...formData.project,
            id: result.id
          };
          setProjects([...projects, newProj]);
          break;
          
        case 'certificate':
          const certData = {
            certificate_name: formData.certificate.name,
            organization: formData.certificate.issuer,
            issue_date: formData.certificate.dateMonth && formData.certificate.dateYear 
                      ? `${formData.certificate.dateYear}-${formData.certificate.dateMonth}-01` 
                      : null,
            description: formData.certificate.description
          };
          result = await profileService.certificate.create(certData);
          
          // Cập nhật state
          const newCert = {
            ...formData.certificate,
            id: result.id
          };
          setCertificates([...certificates, newCert]);
          break;
          
        case 'award':
          const awardData = {
            award_name: formData.award.title,
            organization: formData.award.issuer,
            issue_date: formData.award.dateMonth && formData.award.dateYear 
                         ? `${formData.award.dateYear}-${formData.award.dateMonth}-01` 
                         : null,
            description: formData.award.description
          };
          result = await profileService.award.create(awardData);
          
          // Cập nhật state
          const newAward = {
            ...formData.award,
            id: result.id
          };
          setAwards([...awards, newAward]);
          break;
          
        case 'skills':
          const skillData = {
            level: formData.skill.level
          };
          
          if (formData.skill.skill_id) {
            skillData.skill_id = formData.skill.skill_id;
          } else if (formData.skill.name) {
            skillData.skill_name = formData.skill.name;
          }
          
          result = await profileService.skill.create(skillData);
          
          // Cập nhật state
          const newSkill = {
            id: result.id,
            name: result.skill.skill_name,
            level: result.level,
            skill_id: result.skill.id
          };
          setSkills([...skills, newSkill]);
          break;
      }
      
      // Reset form data
      setFormData({
        ...formData,
        [type]: getEmptyFormData(type)
      });
      
      toast({
        title: "Thành công",
        description: "Thêm mới thành công",
        variant: "success"
      });
      
      setActiveDialog(null);
    } catch (error) {
      console.error(`Error adding ${type}:`, error);
      toast({
        title: "Lỗi",
        description: `Không thể thêm mới: ${error.message || 'Đã xảy ra lỗi'}`,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Hàm xử lý cập nhật
  const handleUpdateItem = async (type) => {
    setIsLoading(true);
    try {
      let itemId;
      
      switch (type) {
        case 'workExperience':
          itemId = workExperiences[editIndex].id;
          const expData = {
            company: formData.workExperience.company,
            position: formData.workExperience.position,
            is_working: formData.workExperience.isCurrentlyWorking,
            from_date: `${formData.workExperience.fromYear}-${formData.workExperience.fromMonth}-01`,
            to_date: formData.workExperience.isCurrentlyWorking ? null : 
                    `${formData.workExperience.toYear}-${formData.workExperience.toMonth}-01`,
            additional_details: formData.workExperience.description
          };
          await profileService.experience.update(itemId, expData);
          
          // Cập nhật state
          const updatedExperiences = [...workExperiences];
          updatedExperiences[editIndex] = {
            ...formData.workExperience,
            id: itemId
          };
          setWorkExperiences(updatedExperiences);
          break;
          
        case 'education':
          itemId = educations[editIndex].id;
          const eduData = {
            school: formData.education.school,
            major: formData.education.major,
            is_studying: formData.education.isCurrentlyStudying,
            from_date: `${formData.education.fromYear}-${formData.education.fromMonth}-01`,
            to_date: formData.education.isCurrentlyStudying ? null : 
                    `${formData.education.toYear}-${formData.education.toMonth}-01`,
            additional_details: formData.education.additionalDetails
          };
          await profileService.education.update(itemId, eduData);
          
          // Cập nhật state
          const updatedEducations = [...educations];
          updatedEducations[editIndex] = {
            ...formData.education,
            id: itemId
          };
          setEducations(updatedEducations);
          break;
          
        case 'project':
          itemId = projects[editIndex].id;
          const projData = {
            project_name: formData.project.title,
            description: formData.project.description,
            is_working: formData.project.isCurrentlyWorking,
            from_date: `${formData.project.fromYear}-${formData.project.fromMonth}-01`,
            to_date: formData.project.isCurrentlyWorking ? null : 
                    `${formData.project.toYear}-${formData.project.toMonth}-01`,
            url: formData.project.link
          };
          await profileService.project.update(itemId, projData);
          
          // Cập nhật state
          const updatedProjects = [...projects];
          updatedProjects[editIndex] = {
            ...formData.project,
            id: itemId
          };
          setProjects(updatedProjects);
          break;
          
        case 'certificate':
          itemId = certificates[editIndex].id;
          const certData = {
            certificate_name: formData.certificate.name,
            organization: formData.certificate.issuer,
            issue_date: formData.certificate.dateMonth && formData.certificate.dateYear 
                      ? `${formData.certificate.dateYear}-${formData.certificate.dateMonth}-01` 
                      : null,
            description: formData.certificate.description
          };
          await profileService.certificate.update(itemId, certData);
          
          // Cập nhật state
          const updatedCertificates = [...certificates];
          updatedCertificates[editIndex] = {
            ...formData.certificate,
            id: itemId
          };
          setCertificates(updatedCertificates);
          break;
          
        case 'award':
          itemId = awards[editIndex].id;
          const awardData = {
            award_name: formData.award.title,
            organization: formData.award.issuer,
            issue_date: formData.award.dateMonth && formData.award.dateYear 
                         ? `${formData.award.dateYear}-${formData.award.dateMonth}-01` 
                         : null,
            description: formData.award.description
          };
          await profileService.award.update(itemId, awardData);
          
          // Cập nhật state
          const updatedAwards = [...awards];
          updatedAwards[editIndex] = {
            ...formData.award,
            id: itemId
          };
          setAwards(updatedAwards);
          break;
          
        case 'skills':
          itemId = skills[editIndex].id;
          const skillData = {
            level: formData.skill.level
          };
          
          await profileService.skill.update(itemId, skillData);
          
          // Cập nhật state
          const updatedSkills = [...skills];
          updatedSkills[editIndex] = {
            ...skills[editIndex],
            level: formData.skill.level
          };
          setSkills(updatedSkills);
          break;
      }
      
      toast({
        title: "Thành công",
        description: "Cập nhật thành công",
        variant: "success"
      });
      
      setEditIndex(-1);
      setActiveDialog(null);
    } catch (error) {
      console.error(`Error updating ${type}:`, error);
      toast({
        title: "Lỗi",
        description: `Không thể cập nhật: ${error.message || 'Đã xảy ra lỗi'}`,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Hàm xóa item
  const handleDeleteItem = async (type, id, index) => {
    if (type === 'skills') {
      // Chỉ xóa trong tempSkills khi đang edit
      setTempSkills(tempSkills.filter((_, i) => i !== index));
      return;
    }
    
    if (!confirm('Bạn có chắc chắn muốn xóa?')) {
      return;
    }
    
    setIsLoading(true);
    try {
      let isSuccess = false;
      switch (type) {
        case 'workExperience':
          isSuccess = await profileService.experience.delete(id);
          if (isSuccess) {
            setWorkExperiences(workExperiences.filter((_, i) => i !== index));
          }
          break;
          
        case 'education':
          isSuccess = await profileService.education.delete(id);
          if (isSuccess) {
            setEducations(educations.filter((_, i) => i !== index));
          }
          break;
          
        case 'project':
          isSuccess = await profileService.project.delete(id);
          if (isSuccess) {
            setProjects(projects.filter((_, i) => i !== index));
          }
          break;
          
        case 'certificate':
          isSuccess = await profileService.certificate.delete(id);
          if (isSuccess) {
            setCertificates(certificates.filter((_, i) => i !== index));
          }
          break;
          
        case 'award':
          isSuccess = await profileService.award.delete(id);
          if (isSuccess) {
            setAwards(awards.filter((_, i) => i !== index));
          }
          break;
      }
      
      if (isSuccess) {
        toast({
          title: "Thành công", 
          description: "Đã xóa thành công",
          variant: "success"
        });
      }
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
      toast({
        title: "Lỗi",
        description: `Không thể xóa: ${error.message || 'Đã xảy ra lỗi'}`,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function để chuyển đổi avatar URL
  const getFullAvatarUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    return `${BASE_API_URL}${url}`;
  };

  // Hàm lọc kỹ năng theo cấp độ
  const filterSkillsByLevel = (level) => {
    return skills.filter(skill => {
      if (level === 'master') {
        return skill.level === 'master';
      } else if (level === 'expert') {
        return skill.level === 'expert';
      } else if (level === 'advanced') {
        return skill.level === 'advanced';
      } else if (level === 'intermediate') {
        return skill.level === 'intermediate';
      } else if (level === 'beginner') {
        return skill.level === 'beginner';
      }
      return true;
    });
  };

  // Hàm render danh sách kỹ năng theo level
  const renderSkillsByLevel = (isEditing = false, skillsList = skills) => {
    const levels = [
      { key: 'master', label: 'Chuyên gia', color: 'amber-400' },
      { key: 'expert', label: 'Thành thạo', color: 'orange-400' },
      { key: 'advanced', label: 'Nâng cao', color: 'violet-900' },
      { key: 'intermediate', label: 'Trung bình', color: 'blue-500' },
      { key: 'beginner', label: 'Mới bắt đầu', color: 'green-600' }
    ];

    return (
      <div className="space-y-6">
        {levels.map((level) => {
          const skillsInLevel = skillsList.filter(skill => skill.level === level.key);
          return (
            <div key={level.key}>
              <h3 className="text-lg font-medium mb-3 flex items-center">
                <span className={`w-3 h-3 bg-${level.color} rounded-full mr-2`}></span>
                {level.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillsInLevel.length > 0 ? (
                  skillsInLevel.map((skill) => (
                    <div key={skill.id} className="bg-gray-100 px-8 py-1 rounded-full flex items-center group relative">
                      <span>{skill.name}</span>
                      {isEditing && (
                        <div className="absolute right-1 top-1 flex space-x-1 pl-2 rounded-r-full">
                          <Button 
                            variant="ghost" 
                            className="h-6 w-6 p-0 rounded-full text-red-500" 
                            onClick={() => handleDeleteItem('skills', skill.id, skillsList.findIndex(s => s.id === skill.id))}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">Chưa thêm kỹ năng nào</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Thêm state để lưu danh sách skill tạm thời khi edit
  const [tempSkills, setTempSkills] = useState([]);

  // Thêm state để lưu skill được chọn từ dropdown
  const [selectedSkillFromDropdown, setSelectedSkillFromDropdown] = useState(null);

  return (
    <div className="p-6 w-full">
      <Tabs defaultValue="personal" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="z-10 mb-6 h-[48px] bg-white sticky top-[102px] border-b w-full justify-start rounded-none p-0">
          <TabsTrigger 
            value="personal" 
            className={`bg-gray-200 rounded-none px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none h-full`}
          >
            <User className="h-4 w-4 mr-2" />
            Personal
          </TabsTrigger>
          <TabsTrigger 
            value="profile" 
            className="bg-gray-200 rounded-none px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none h-full"
          >
            <Users className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger 
            value="social" 
            className="bg-gray-200 rounded-none px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none h-full"
          >
            <Globe className="h-4 w-4 mr-2" />
            Social Links
          </TabsTrigger>
        </TabsList>

        {/* Personal Tab Content */}
        <TabsContent value="personal" className="mt-0">
          <div className="space-y-8">
            <section>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Profile Picture */}
                <div className="flex flex-col h-full justify-center items-center">
                  <div className="relative group">
                    <div className="w-48 h-48 rounded-full overflow-hidden">
                      {profileImage ? (
                        <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                      ) : userData.avatar ? (
                        <img src={getFullAvatarUrl(userData.avatar)} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <User className="h-20 w-20 text-gray-400" />
                        </div>
                      )}
                    </div>
                    
                    {/* Overlay khi hover */}
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
                      <div className="flex space-x-4">
                        <label htmlFor="profile-upload" className="cursor-pointer">
                          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                            <Upload className="h-5 w-5 text-gray-700" />
                          </div>
                        </label>
                        <input 
                          id="profile-upload" 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={handleImageUpload}
                        />
                        {(profileImage || userData.avatar) && (
                          <button 
                            className="w-10 h-10 rounded-full bg-white flex items-center justify-center"
                            onClick={() => setShowImageModal(true)}
                          >
                            <Search className="h-5 w-5 text-gray-700" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form bên phải */}
                <div className="col-span-2">
                  <div className="space-y-4 text-gray-700">
                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name</label>
                      <Input 
                        className="w-full border-gray-300 rounded shadow-none"
                        value={userData.fullname}
                        onChange={(e) => handleUserDataChange('fullname', e.target.value)}
                      />
                    </div>

                    {/* Title/headline */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Title/Headline</label>
                      <Input 
                        className="w-full border-gray-300 rounded shadow-none" 
                        value={userData.headline}
                        onChange={(e) => handleUserDataChange('headline', e.target.value)}
                      />
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <Input 
                          className="w-full border-gray-300 rounded shadow-none" 
                          value={userData.email} 
                          disabled 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone Number</label>
                        <div className="flex border border-gray-300 rounded">
                          <Select
                            value={userData.country_code}
                            onValueChange={(value) => handleUserDataChange('country_code', value)}
                          >
                            <SelectTrigger className="w-24 border-none shadow-none">
                              <SelectValue placeholder="🇻🇳 +84 " />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                              <SelectItem value="+1">🇺🇸 +1 </SelectItem>
                              <SelectItem value="+44">🇬🇧 +44 </SelectItem>
                              <SelectItem value="+84">🇻🇳 +84 </SelectItem>
                              <SelectItem value="+91">🇮🇳 +91 </SelectItem>
                            </SelectContent>
                          </Select>
                          <div className="w-0.5 h-9 bg-gray-300"></div>
                          <Input 
                            className="w-full border-none rounded shadow-none"  
                            value={userData.phonenum}
                            onChange={(e) => handleUserDataChange('phonenum', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Date of Birth & Gender */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Date of birth</label>
                        <Input 
                          type="date" 
                          className="w-full border-gray-300 rounded shadow-none" 
                          value={userData.dob}
                          onChange={(e) => handleUserDataChange('dob', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Gender</label>
                        <Select
                          value={userData.gender}
                          onValueChange={(value) => handleUserDataChange('gender', value)}
                        >
                          <SelectTrigger className="border-gray-300 rounded shadow-none">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            <SelectGroup>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Address */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Address</label>
                      <Input 
                        className="w-full border-gray-300 rounded shadow-none"
                        value={userData.address}
                        onChange={(e) => handleUserDataChange('address', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 text-white text-md py-5 px-6 rounded"
                  onClick={handleUpdatePersonalInfo}
                  disabled={isLoading}
                >
                  {isLoading ? "Đang lưu..." : "Lưu thay đổi"}
                </Button>
              </div>
            </section>
          </div>
        </TabsContent>

        {/* Modal xem ảnh phóng to */}
        {showImageModal && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="relative bg-white p-2 rounded-lg max-w-3xl max-h-[90vh]">
              <button 
                className="absolute top-2 right-2 bg-gray-200 rounded-full p-1"
                onClick={() => setShowImageModal(false)}
              >
                <X className="h-6 w-6" />
              </button>
              <div className="mt-8 mb-4 overflow-auto">
                <img 
                  src={profileImage || (userData.avatar ? getFullAvatarUrl(userData.avatar) : '/default-avatar.png')} 
                  alt="Profile" 
                  className="max-w-full max-h-[70vh] object-contain"
                />
              </div>
            </div>
          </div>
        )}

        {/* Profile Tab Content */}
        <TabsContent value="profile" className="mt-0">
          <div className="space-y-6">
            {/* About Me Section */}
            <ProfileSection
              title="Giới thiệu"
              content={userData.about}
              placeholder="Thêm giới thiệu về bản thân để nhà tuyển dụng hiểu rõ hơn về bạn."
              onEdit={(dialogKey) => openDialog(dialogKey, { aboutMe: userData.about })}
              dialogKey="aboutMe"
            />

            {/* Work Experience Section */}
            <ProfileSection
              title="Kinh nghiệm làm việc"
              onEdit={(dialogKey) => openDialog(dialogKey)}
              dialogKey="workExperience"
            >
              {workExperiences.length > 0 ? (
                <div className="space-y-4">
                  {workExperiences.map((exp, index) => (
                    <div key={index} className="border-b pb-3 relative group">
                      <h3 className="font-medium">{exp.position}</h3>
                      <p className="text-sm text-gray-600">{exp.company}</p>
                      <p className="text-xs text-gray-500">{exp.fromMonth}/{exp.fromYear} - {exp.isCurrentlyWorking ? "Hiện tại" : `${exp.toMonth}/${exp.toYear}`}</p>
                      <p className="text-sm mt-2">{exp.description}</p>
                      <div className="absolute right-0 top-0 hidden group-hover:flex space-x-2">
                        <Button 
                          variant="ghost" 
                          className="h-8 w-8 p-0 rounded-full" 
                          onClick={() => openDialog('workExperience', exp, index)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          className="h-8 w-8 p-0 rounded-full text-red-500" 
                          onClick={() => handleDeleteItem('workExperience', exp.id, index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">
                  Thêm kinh nghiệm làm việc để nhà tuyển dụng biết về quá trình công tác của bạn.
                </p>
              )}
            </ProfileSection>

            {/* Education Section */}
            <ProfileSection
              title="Học vấn"
              onEdit={(dialogKey) => openDialog(dialogKey)}
              dialogKey="education"
            >
              {educations.length > 0 ? (
                <div className="space-y-4">
                  {educations.map((edu, index) => (
                    <div key={index} className="border-b pb-3 relative group">
                      <h3 className="font-medium">{edu.school}</h3>
                      <p className="text-sm text-gray-700">{edu.major}</p>
                      <p className="text-xs text-gray-500">{edu.fromMonth}/{edu.fromYear} - {edu.isCurrentlyStudying ? "Hiện tại" : `${edu.toMonth}/${edu.toYear}`}</p>
                      <p className="text-xs text-gray-700">{edu.additionalDetails}</p>
                      <div className="absolute right-0 top-0 hidden group-hover:flex space-x-2">
                        <Button 
                          variant="ghost" 
                          className="h-8 w-8 p-0 rounded-full" 
                          onClick={() => openDialog('education', edu, index)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          className="h-8 w-8 p-0 rounded-full text-red-500" 
                          onClick={() => handleDeleteItem('education', edu.id, index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">
                  Thêm thông tin học vấn để nhà tuyển dụng biết về quá trình học tập của bạn.
                </p>
              )}
            </ProfileSection>

            {/* Skills Section */}
            <ProfileSection
              title="Kỹ năng"
              onEdit={(dialogKey) => openDialog(dialogKey)}
              dialogKey="skills"
              actionIcon={skills.length > 0 ? <Pencil className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            >
              {skills.length > 0 ? (
                renderSkillsByLevel(false)
              ) : (
                <p className="text-gray-600">
                  Thêm kỹ năng để nổi bật hồ sơ của bạn.
                </p>
              )}
            </ProfileSection>

            {/* Projects Section */}
            <ProfileSection
              title="Dự án cá nhân"
              onEdit={(dialogKey) => openDialog(dialogKey)}
              dialogKey="project"
            >
              {projects.length > 0 ? (
                <div className="space-y-4">
                  {projects.map((project, index) => (
                    <div key={index} className="border-b pb-3 relative group">
                      <h3 className="font-medium">{project.title}</h3>
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm flex items-center">
                          <Link className="h-3 w-3 mr-1" />
                          {project.link}
                        </a>
                      )}
                      <p className="text-xs text-gray-500">{project.fromMonth}/{project.fromYear} - {project.isCurrentlyStudying ? "Hiện tại" : `${project.toMonth}/${project.toYear}`}</p>
                      <p className="mt-2 text-gray-600">{project.description}</p>
                      <div className="absolute right-0 top-0 hidden group-hover:flex space-x-2">
                        <Button 
                          variant="ghost" 
                          className="h-8 w-8 p-0 rounded-full" 
                          onClick={() => openDialog('project', project, index)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          className="h-8 w-8 p-0 rounded-full text-red-500" 
                          onClick={() => handleDeleteItem('project', project.id, index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">
                  Thêm dự án cá nhân để thể hiện năng lực của bạn.
                </p>
              )}
            </ProfileSection>

            {/* Certificates Section */}
            <ProfileSection
              title="Chứng chỉ"
              onEdit={(dialogKey) => openDialog(dialogKey)}
              dialogKey="certificate"
            >
              {certificates.length > 0 ? (
                <div className="space-y-4">
                  {certificates.map((cert, index) => (
                    <div key={index} className="border-b pb-3 relative group">
                      <h3 className="font-medium">{cert.name}</h3>
                      <p className="text-sm text-gray-600">{cert.issuer}</p>
                      <p className="text-xs text-gray-500">{cert.dateMonth}/{cert.dateYear}</p>
                      <p className="text-xs text-gray-700">{cert.description}</p>
                      <div className="absolute right-0 top-0 hidden group-hover:flex space-x-2">
                        <Button 
                          variant="ghost" 
                          className="h-8 w-8 p-0 rounded-full" 
                          onClick={() => openDialog('certificate', cert, index)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          className="h-8 w-8 p-0 rounded-full text-red-500" 
                          onClick={() => handleDeleteItem('certificate', cert.id, index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">
                  Thêm chứng chỉ để tăng giá trị hồ sơ của bạn.
                </p>
              )}
            </ProfileSection>

            {/* Awards Section */}
            <ProfileSection
              title="Giải thưởng"
              onEdit={(dialogKey) => openDialog(dialogKey)}
              dialogKey="award"
            >
              {awards.length > 0 ? (
                <div className="space-y-4">
                  {awards.map((award, index) => (
                    <div key={index} className="border-b pb-3 relative group">
                      <h3 className="font-medium">{award.title}</h3>
                      <p className="text-sm text-gray-600">{award.issuer}</p>
                      <p className="text-xs text-gray-500">{award.dateMonth}/{award.dateYear}</p>
                      <p className="text-xs text-gray-700">{award.description}</p>
                      <div className="absolute right-0 top-0 hidden group-hover:flex space-x-2">
                        <Button 
                          variant="ghost" 
                          className="h-8 w-8 p-0 rounded-full" 
                          onClick={() => openDialog('award', award, index)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          className="h-8 w-8 p-0 rounded-full text-red-500" 
                          onClick={() => handleDeleteItem('award', award.id, index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">
                  Thêm giải thưởng để làm nổi bật thành tích của bạn.
                </p>
              )}
            </ProfileSection>
          </div>
        </TabsContent>

        {/* Social Links Tab Content */}
        <TabsContent value="social" className="mt-0">
          <div className="space-y-6">
            {socialLinks.map((link, index) => (
              <div key={link.id} className="flex items-center space-x-3">
                <div className="w-48">
                  <Select value={link.platform} onValueChange={(value) => updateSocialPlatform(link.id, value)}>
                    <SelectTrigger className="w-full border-gray-300 shadow-none">
                      <SelectValue>
                        <div className="flex items-center gap-2">
                          {getPlatformIcon(link.platform)}
                          <span>{link.platform}</span>
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectGroup>
                        {availablePlatforms.map(platform => (
                          <SelectItem key={platform.value} value={platform.value}>
                            <div className="flex items-center gap-2">
                              {getPlatformIcon(platform.value)}
                              <span>{platform.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex-1 relative">
                  <Input 
                    placeholder={`Profile link/url...`}
                    value={link.url}
                    onChange={(e) => updateSocialLinkUrl(link.id, e.target.value)}
                    className="pr-10 border-gray-300 shadow-none rounded placeholder:text-gray-500"
                  />
                  {link.showClear && (
                    <button 
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={() => clearInput(link.id)}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
                
                {socialLinks.length > 1 && (
                  <button 
                    className="p-2 rounded-[6px] bg-gray-100 hover:bg-gray-200" 
                    onClick={() => removeSocialLink(link.id)}
                  >
                    <CircleX className="h-5 w-5 text-dark-400" />
                  </button>
                )}
              </div>
            ))}
            
            <div className='w-full'>
              <Button 
                onClick={addNewSocialLink}
                className="flex items-center rounded shadow-none w-full bg-gray-200 hover:bg-gray-300 text-md"
              >
                <CirclePlus className="h-4 w-4 mr-2" />
                Add New Social Link
              </Button>
            </div>

            <div className="mt-6 flex justify-end">
              <Button onClick={saveSocialLinks} className="bg-blue-600 hover:bg-blue-700 text-white text-md py-5 px-6 rounded">
                Save Changes
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Dialog cho việc thêm/sửa thông tin */}
      <Dialog open={activeDialog !== null} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className="sm:max-w-[600px] bg-white">
          {renderDialogContent()}
          <DialogFooter>
            <Button onClick={closeDialog} className="mr-2 bg-white hover:bg-gray-100 text-black border border-gray-10 rounded-[4px]">Cancel</Button>
            <Button onClick={handleFormSubmit} className="bg-blue-500 hover:bg-blue-600  shadow-none rounded-[4px] text-white px-5">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
