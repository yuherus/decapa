"use client";

import { useState } from "react";
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
import { 
  Badge 
} from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Bell,
  Plus,
  Trash2,
  Edit,
  Mail,
  Building,
  MapPin,
  Code,
  Briefcase,
  Save,
  X
} from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EmailSubscriptionsPage() {
  // Dữ liệu mẫu cho các đăng ký email
  const [subscriptions, setSubscriptions] = useState([
    {
      id: 1,
      name: "Việc làm Frontend",
      type: "technology",
      criteria: ["React", "Vue.js", "Angular"],
      locations: ["Hà Nội", "TP. Hồ Chí Minh"],
      createdAt: "2023-09-15"
    },
    {
      id: 2,
      name: "Công ty công nghệ lớn",
      type: "company",
      criteria: ["Google", "Microsoft", "Amazon"],
      locations: ["Tất cả"],
      createdAt: "2023-08-20"
    },
    {
      id: 3,
      name: "Việc làm tại Đà Nẵng",
      type: "location",
      criteria: ["Đà Nẵng"],
      locations: ["Đà Nẵng"],
      createdAt: "2023-07-10"
    }
  ]);

  // State cho dialog tạo/chỉnh sửa đăng ký
  const [showSubscriptionDialog, setShowSubscriptionDialog] = useState(false);
  const [showCompanyDialog, setShowCompanyDialog] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState(null);
  const [newSubscription, setNewSubscription] = useState({
    name: "",
    type: "technology",
    criteria: [],
    locations: []
  });
  
  // State cho đăng ký theo công ty
  const [newCompanySubscription, setNewCompanySubscription] = useState({
    name: "",
    type: "company",
    criteria: [],
    locations: []
  });
  
  // State cho input tạm thời
  const [tempCriterion, setTempCriterion] = useState("");
  const [tempLocation, setTempLocation] = useState("");
  const [tempCompany, setTempCompany] = useState("");
  
  // State cho tab hiện tại
  const [activeTab, setActiveTab] = useState("all");

  // Danh sách các công nghệ phổ biến
  const popularTechnologies = [
    "JavaScript", "React", "Vue.js", "Angular", "Node.js", 
    "Python", "Django", "Flask", "Java", "Spring Boot",
    "PHP", "Laravel", "Ruby", "Ruby on Rails", ".NET",
    "C#", "Go", "Rust", "Swift", "Kotlin"
  ];
  
  // Danh sách các công ty phổ biến
  const popularCompanies = [
    "Google", "Microsoft", "Amazon", "Facebook", "Apple",
    "VNG", "FPT", "Viettel", "VinGroup", "MoMo",
    "Tiki", "Sendo", "Shopee", "Lazada", "Grab"
  ];
  
  // Danh sách các địa điểm phổ biến
  const popularLocations = [
    "Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng", "Hải Phòng", "Cần Thơ",
    "Nha Trang", "Huế", "Bình Dương", "Đồng Nai", "Vũng Tàu"
  ];

  // Lọc đăng ký theo tab
  const filteredSubscriptions = subscriptions.filter(subscription => {
    if (activeTab === "all") return true;
    if (activeTab === "technology") return subscription.type === "technology";
    if (activeTab === "company") return subscription.type === "company";
    if (activeTab === "location") return subscription.type === "location";
    return true;
  });

  const handleAddSubscription = () => {
    setEditingSubscription(null);
    setNewSubscription({
      name: "",
      type: "technology",
      criteria: [],
      locations: []
    });
    setShowSubscriptionDialog(true);
  };
  
  const handleAddCompanySubscription = () => {
    setNewCompanySubscription({
      name: "",
      type: "company",
      criteria: [],
      locations: []
    });
    setShowCompanyDialog(true);
  };

  const handleEditSubscription = (subscription) => {
    setEditingSubscription(subscription);
    setNewSubscription({
      ...subscription
    });
    setShowSubscriptionDialog(true);
  };

  const handleDeleteSubscription = (id) => {
    setSubscriptions(subscriptions.filter(sub => sub.id !== id));
  };

  const handleAddCriterion = () => {
    if (tempCriterion.trim() && !newSubscription.criteria.includes(tempCriterion.trim())) {
      setNewSubscription({
        ...newSubscription,
        criteria: [...newSubscription.criteria, tempCriterion.trim()]
      });
      setTempCriterion("");
    }
  };

  const handleRemoveCriterion = (criterion) => {
    setNewSubscription({
      ...newSubscription,
      criteria: newSubscription.criteria.filter(c => c !== criterion)
    });
  };

  const handleAddLocation = () => {
    if (tempLocation.trim() && !newSubscription.locations.includes(tempLocation.trim())) {
      setNewSubscription({
        ...newSubscription,
        locations: [...newSubscription.locations, tempLocation.trim()]
      });
      setTempLocation("");
    }
  };

  const handleRemoveLocation = (location) => {
    setNewSubscription({
      ...newSubscription,
      locations: newSubscription.locations.filter(l => l !== location)
    });
  };
  
  // Xử lý cho đăng ký theo công ty
  const handleAddCompany = () => {
    if (tempCompany.trim() && !newCompanySubscription.criteria.includes(tempCompany.trim())) {
      setNewCompanySubscription({
        ...newCompanySubscription,
        criteria: [...newCompanySubscription.criteria, tempCompany.trim()]
      });
      setTempCompany("");
    }
  };
  
  const handleRemoveCompany = (company) => {
    setNewCompanySubscription({
      ...newCompanySubscription,
      criteria: newCompanySubscription.criteria.filter(c => c !== company)
    });
  };
  
  const handleAddCompanyLocation = () => {
    if (tempLocation.trim() && !newCompanySubscription.locations.includes(tempLocation.trim())) {
      setNewCompanySubscription({
        ...newCompanySubscription,
        locations: [...newCompanySubscription.locations, tempLocation.trim()]
      });
      setTempLocation("");
    }
  };
  
  const handleRemoveCompanyLocation = (location) => {
    setNewCompanySubscription({
      ...newCompanySubscription,
      locations: newCompanySubscription.locations.filter(l => l !== location)
    });
  };

  const handleSaveSubscription = () => {
    if (newSubscription.name.trim() === "" || newSubscription.criteria.length === 0) {
      alert("Vui lòng nhập tên và ít nhất một tiêu chí");
      return;
    }

    if (editingSubscription) {
      // Cập nhật đăng ký hiện có
      setSubscriptions(subscriptions.map(sub => 
        sub.id === editingSubscription.id ? { ...newSubscription, id: sub.id } : sub
      ));
    } else {
      // Tạo đăng ký mới
      setSubscriptions([
        ...subscriptions,
        {
          ...newSubscription,
          id: Date.now(),
          createdAt: new Date().toISOString().split('T')[0]
        }
      ]);
    }
    
    setShowSubscriptionDialog(false);
  };
  
  const handleSaveCompanySubscription = () => {
    if (newCompanySubscription.name.trim() === "" || newCompanySubscription.criteria.length === 0) {
      alert("Vui lòng nhập tên và ít nhất một công ty");
      return;
    }
    
    // Tạo đăng ký mới
    setSubscriptions([
      ...subscriptions,
      {
        ...newCompanySubscription,
        id: Date.now(),
        createdAt: new Date().toISOString().split('T')[0]
      }
    ]);
    
    setShowCompanyDialog(false);
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "technology":
        return <Code className="h-5 w-5 text-blue-500" />;
      case "company":
        return <Building className="h-5 w-5 text-purple-500" />;
      case "location":
        return <MapPin className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case "technology":
        return "Công nghệ";
      case "company":
        return "Công ty";
      case "location":
        return "Địa điểm";
      default:
        return "Khác";
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Đăng ký nhận thông báo việc làm</h1>
        <div className="flex gap-2">
          <Button onClick={handleAddCompanySubscription} className="bg-purple-600 hover:bg-purple-700">
            <Building className="h-4 w-4 mr-2" />
            Theo dõi công ty
          </Button>
          <Button onClick={handleAddSubscription}>
            <Plus className="h-4 w-4 mr-2" />
            Thêm đăng ký mới
          </Button>
        </div>
      </div>
      
      <div className="mb-6">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">Tất cả</TabsTrigger>
            <TabsTrigger value="technology">Công nghệ</TabsTrigger>
            <TabsTrigger value="company">Công ty</TabsTrigger>
            <TabsTrigger value="location">Địa điểm</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSubscriptions.map((subscription) => (
          <Card key={subscription.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  {getTypeIcon(subscription.type)}
                  <CardTitle className="ml-2 text-lg">{subscription.name}</CardTitle>
                </div>
                <div className="flex gap-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleEditSubscription(subscription)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteSubscription(subscription.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardDescription>
                <Badge variant="outline" className="mt-1">
                  {getTypeLabel(subscription.type)}
                </Badge>
                <span className="text-xs text-gray-500 ml-2">
                  Tạo ngày {new Date(subscription.createdAt).toLocaleDateString('vi-VN')}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium mb-1">
                    {subscription.type === "technology" ? "Công nghệ:" : 
                     subscription.type === "company" ? "Công ty:" : "Địa điểm:"}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {subscription.criteria.map((criterion, index) => (
                      <Badge key={index} variant="secondary">
                        {criterion}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {subscription.locations.length > 0 && subscription.locations[0] !== "Tất cả" && (
                  <div>
                    <p className="text-sm font-medium mb-1">Địa điểm:</p>
                    <div className="flex flex-wrap gap-1">
                      {subscription.locations.map((location, index) => (
                        <Badge key={index} variant="outline">
                          <MapPin className="h-3 w-3 mr-1" />
                          {location}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Dialog đăng ký thông báo theo công nghệ/địa điểm */}
      <Dialog open={showSubscriptionDialog} onOpenChange={setShowSubscriptionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingSubscription ? "Chỉnh sửa đăng ký" : "Tạo đăng ký mới"}
            </DialogTitle>
            <DialogDescription>
              Nhận thông báo khi có việc làm mới phù hợp với tiêu chí của bạn
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="subscription-name">Tên đăng ký</Label>
              <Input 
                id="subscription-name" 
                value={newSubscription.name}
                onChange={(e) => setNewSubscription({...newSubscription, name: e.target.value})}
                placeholder="Ví dụ: Việc làm Frontend tại Hà Nội"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="subscription-type">Loại đăng ký</Label>
              <Select 
                value={newSubscription.type}
                onValueChange={(value) => setNewSubscription({...newSubscription, type: value})}
                disabled={editingSubscription}
              >
                <SelectTrigger id="subscription-type" className="mt-1">
                  <SelectValue placeholder="Chọn loại đăng ký" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Theo công nghệ</SelectItem>
                  <SelectItem value="location">Theo địa điểm</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>
                {newSubscription.type === "technology" ? "Công nghệ" : "Địa điểm"}
              </Label>
              <div className="flex mt-1">
                <Input 
                  value={tempCriterion}
                  onChange={(e) => setTempCriterion(e.target.value)}
                  placeholder={`Nhập ${newSubscription.type === "technology" ? "công nghệ" : "địa điểm"}`}
                  className="flex-1"
                />
                <Button 
                  type="button" 
                  onClick={handleAddCriterion}
                  className="ml-2"
                >
                  Thêm
                </Button>
              </div>
              
              {/* Gợi ý các tiêu chí phổ biến */}
              <div className="mt-2">
                <p className="text-sm text-gray-500 mb-1">Gợi ý:</p>
                <div className="flex flex-wrap gap-2">
                  {(newSubscription.type === "technology" ? popularTechnologies : popularLocations).slice(0, 8).map((item, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        if (!newSubscription.criteria.includes(item)) {
                          setNewSubscription({
                            ...newSubscription,
                            criteria: [...newSubscription.criteria, item]
                          });
                        }
                      }}
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {/* Hiển thị các tiêu chí đã chọn */}
              {newSubscription.criteria.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-gray-500 mb-1">Đã chọn:</p>
                  <div className="flex flex-wrap gap-2">
                    {newSubscription.criteria.map((criterion, index) => (
                      <Badge key={index} variant="secondary" className="pr-1">
                        {criterion}
                        <button 
                          type="button" 
                          className="ml-1 hover:bg-gray-200 rounded-full p-1"
                          onClick={() => handleRemoveCriterion(criterion)}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {newSubscription.type === "technology" && (
              <div>
                <Label>Địa điểm</Label>
                <div className="flex mt-1">
                  <Input 
                    value={tempLocation}
                    onChange={(e) => setTempLocation(e.target.value)}
                    placeholder="Nhập địa điểm"
                    className="flex-1"
                  />
                  <Button 
                    type="button" 
                    onClick={handleAddLocation}
                    className="ml-2"
                  >
                    Thêm
                  </Button>
                </div>
                
                {/* Gợi ý các địa điểm phổ biến */}
                <div className="mt-2">
                  <p className="text-sm text-gray-500 mb-1">Gợi ý:</p>
                  <div className="flex flex-wrap gap-2">
                    {popularLocations.slice(0, 8).map((location, index) => (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className="cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                          if (!newSubscription.locations.includes(location)) {
                            setNewSubscription({
                              ...newSubscription,
                              locations: [...newSubscription.locations, location]
                            });
                          }
                        }}
                      >
                        <MapPin className="h-3 w-3 mr-1" />
                        {location}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Hiển thị các địa điểm đã chọn */}
                {newSubscription.locations.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 mb-1">Đã chọn:</p>
                    <div className="flex flex-wrap gap-2">
                      {newSubscription.locations.map((location, index) => (
                        <Badge key={index} variant="secondary" className="pr-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {location}
                          <button 
                            type="button" 
                            className="ml-1 hover:bg-gray-200 rounded-full p-1"
                            onClick={() => handleRemoveLocation(location)}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSubscriptionDialog(false)}>
              Hủy
            </Button>
            <Button onClick={handleSaveSubscription}>
              <Save className="h-4 w-4 mr-2" />
              {editingSubscription ? "Cập nhật" : "Tạo đăng ký"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Dialog đăng ký theo dõi công ty */}
      <Dialog open={showCompanyDialog} onOpenChange={setShowCompanyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Theo dõi công ty</DialogTitle>
            <DialogDescription>
              Nhận thông báo khi có việc làm mới từ các công ty bạn quan tâm
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="company-subscription-name">Tên đăng ký</Label>
              <Input 
                id="company-subscription-name" 
                value={newCompanySubscription.name}
                onChange={(e) => setNewCompanySubscription({...newCompanySubscription, name: e.target.value})}
                placeholder="Ví dụ: Công ty công nghệ lớn"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label>Công ty</Label>
              <div className="flex mt-1">
                <Input 
                  value={tempCompany}
                  onChange={(e) => setTempCompany(e.target.value)}
                  placeholder="Nhập tên công ty"
                  className="flex-1"
                />
                <Button 
                  type="button" 
                  onClick={handleAddCompany}
                  className="ml-2"
                >
                  Thêm
                </Button>
              </div>
              
              {/* Gợi ý các công ty phổ biến */}
              <div className="mt-2">
                <p className="text-sm text-gray-500 mb-1">Gợi ý:</p>
                <div className="flex flex-wrap gap-2">
                  {popularCompanies.slice(0, 8).map((company, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        if (!newCompanySubscription.criteria.includes(company)) {
                          setNewCompanySubscription({
                            ...newCompanySubscription,
                            criteria: [...newCompanySubscription.criteria, company]
                          });
                        }
                      }}
                    >
                      <Building className="h-3 w-3 mr-1" />
                      {company}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {/* Hiển thị các công ty đã chọn */}
              {newCompanySubscription.criteria.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-gray-500 mb-1">Đã chọn:</p>
                  <div className="flex flex-wrap gap-2">
                    {newCompanySubscription.criteria.map((company, index) => (
                      <Badge key={index} variant="secondary" className="pr-1">
                        <Building className="h-3 w-3 mr-1" />
                        {company}
                        <button 
                          type="button" 
                          className="ml-1 hover:bg-gray-200 rounded-full p-1"
                          onClick={() => handleRemoveCompany(company)}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div>
              <Label>Địa điểm (tùy chọn)</Label>
              <div className="flex mt-1">
                <Input 
                  value={tempLocation}
                  onChange={(e) => setTempLocation(e.target.value)}
                  placeholder="Nhập địa điểm"
                  className="flex-1"
                />
                <Button 
                  type="button" 
                  onClick={handleAddCompanyLocation}
                  className="ml-2"
                >
                  Thêm
                </Button>
              </div>
              
              {/* Gợi ý các địa điểm phổ biến */}
              <div className="mt-2">
                <p className="text-sm text-gray-500 mb-1">Gợi ý:</p>
                <div className="flex flex-wrap gap-2">
                  {popularLocations.slice(0, 8).map((location, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        if (!newCompanySubscription.locations.includes(location)) {
                          setNewCompanySubscription({
                            ...newCompanySubscription,
                            locations: [...newCompanySubscription.locations, location]
                          });
                        }
                      }}
                    >
                      <MapPin className="h-3 w-3 mr-1" />
                      {location}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {/* Hiển thị các địa điểm đã chọn */}
              {newCompanySubscription.locations.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-gray-500 mb-1">Đã chọn:</p>
                  <div className="flex flex-wrap gap-2">
                    {newCompanySubscription.locations.map((location, index) => (
                      <Badge key={index} variant="secondary" className="pr-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {location}
                        <button 
                          type="button" 
                          className="ml-1 hover:bg-gray-200 rounded-full p-1"
                          onClick={() => handleRemoveCompanyLocation(location)}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCompanyDialog(false)}>
              Hủy
            </Button>
            <Button onClick={handleSaveCompanySubscription} className="bg-purple-600 hover:bg-purple-700">
              <Save className="h-4 w-4 mr-2" />
              Theo dõi công ty
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 
