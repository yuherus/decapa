"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Lock,
  Upload,
  Camera,
  Building,
  Briefcase,
  GraduationCap,
  Languages,
  Award,
  AlertCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { toast } from "sonner";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [profileImage, setProfileImage] = useState("/avatars/staff-avatar.jpg");
  const [isUploading, setIsUploading] = useState(false);

  // Dữ liệu mẫu cho hồ sơ
  const [profileData, setProfileData] = useState({
    fullName: "Nguyễn Văn A",
    email: "nguyenvana@company.com",
    phone: "0912345678",
    position: "Chuyên viên tuyển dụng",
    department: "Phòng Nhân sự",
    dateOfBirth: "1990-05-15",
    address: "123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh",
    bio: "Chuyên viên tuyển dụng với hơn 5 năm kinh nghiệm trong lĩnh vực công nghệ. Tôi đam mê kết nối người tài với cơ hội phù hợp và xây dựng đội ngũ nhân sự chất lượng cao.",
    education: [
      {
        id: 1,
        school: "Đại học Kinh tế TP.HCM",
        degree: "Cử nhân Quản trị Nhân sự",
        fieldOfStudy: "Quản trị nhân sự",
        from: "2008",
        to: "2012",
      },
    ],
    experience: [
      {
        id: 1,
        company: "Công ty XYZ",
        position: "Chuyên viên tuyển dụng",
        from: "2018",
        to: "Hiện tại",
        description: "Phụ trách tuyển dụng cho các vị trí IT, quản lý quy trình tuyển dụng từ đầu đến cuối.",
      },
      {
        id: 2,
        company: "Công ty ABC",
        position: "Nhân viên HR",
        from: "2015",
        to: "2018",
        description: "Hỗ trợ tuyển dụng và quản lý nhân sự, xử lý các vấn đề hành chính nhân sự.",
      },
    ],
    skills: [
      "Tuyển dụng",
      "Phỏng vấn",
      "Đánh giá ứng viên",
      "Quản lý nhân sự",
      "LinkedIn Recruiting",
      "MS Office",
    ],
    languages: [
      { language: "Tiếng Việt", level: "Bản ngữ" },
      { language: "Tiếng Anh", level: "Thành thạo" },
    ],
    certifications: [
      {
        id: 1,
        name: "Chứng chỉ Quản lý Nhân sự Chuyên nghiệp",
        issuer: "Hiệp hội Quản lý Nhân sự Việt Nam",
        date: "2019",
      },
    ],
  });

  // Form cho đổi mật khẩu
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }
  });

  // Xử lý cập nhật hồ sơ
  const handleUpdateProfile = () => {
    setIsEditing(false);
    toast.success("Cập nhật hồ sơ thành công!");
  };

  // Xử lý đổi mật khẩu
  const onChangePassword = (data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Mật khẩu mới và xác nhận mật khẩu không khớp!");
      return;
    }
    
    // Xử lý đổi mật khẩu
    toast.success("Đổi mật khẩu thành công!");
    setShowPasswordDialog(false);
    reset();
  };

  // Xử lý tải ảnh đại diện
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      
      // Giả lập việc tải lên
      setTimeout(() => {
        const reader = new FileReader();
        reader.onload = (event) => {
          setProfileImage(event.target.result);
          setIsUploading(false);
          toast.success("Cập nhật ảnh đại diện thành công!");
        };
        reader.readAsDataURL(file);
      }, 1500);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Hồ sơ cá nhân</h1>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Hủy
              </Button>
              <Button onClick={handleUpdateProfile}>
                Lưu thay đổi
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              Chỉnh sửa hồ sơ
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList>
          <TabsTrigger value="personal">Thông tin cá nhân</TabsTrigger>
          <TabsTrigger value="professional">Thông tin chuyên môn</TabsTrigger>
          <TabsTrigger value="security">Bảo mật</TabsTrigger>
        </TabsList>

        {/* Tab thông tin cá nhân */}
        <TabsContent value="personal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cơ bản</CardTitle>
              <CardDescription>
                Thông tin cá nhân của bạn sẽ được hiển thị trong hệ thống nội bộ
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Ảnh đại diện */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <Avatar className="h-32 w-32">
                      <AvatarImage src={profileImage} />
                      <AvatarFallback>
                        {profileData.fullName.split(" ").map(name => name[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <div className="absolute bottom-0 right-0">
                        <label htmlFor="avatar-upload" className="cursor-pointer">
                          <div className="bg-primary text-white p-2 rounded-full">
                            <Camera className="h-4 w-4" />
                          </div>
                          <input
                            id="avatar-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                            disabled={isUploading}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                  {isUploading && <p className="text-sm text-gray-500">Đang tải lên...</p>}
                </div>

                {/* Thông tin cá nhân */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Họ và tên</Label>
                    <Input
                      id="fullName"
                      value={profileData.fullName}
                      onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Ngày sinh</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={profileData.dateOfBirth}
                      onChange={(e) => setProfileData({...profileData, dateOfBirth: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Địa chỉ</Label>
                    <Input
                      id="address"
                      value={profileData.address}
                      onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Giới thiệu bản thân</Label>
                <Textarea
                  id="bio"
                  rows={4}
                  value={profileData.bio}
                  onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                  disabled={!isEditing}
                  placeholder="Giới thiệu ngắn gọn về bản thân..."
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Thông tin công việc</CardTitle>
              <CardDescription>
                Thông tin về vị trí và phòng ban của bạn trong công ty
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="position">Vị trí</Label>
                  <Input
                    id="position"
                    value={profileData.position}
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Phòng ban</Label>
                  <Input
                    id="department"
                    value={profileData.department}
                    disabled
                  />
                </div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-md flex items-start">
                <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-700">
                  Thông tin công việc chỉ có thể được thay đổi bởi quản trị viên hoặc quản lý HR.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab thông tin chuyên môn */}
        <TabsContent value="professional" className="space-y-6">
          {/* Học vấn */}
          <Card>
            <CardHeader>
              <CardTitle>Học vấn</CardTitle>
              <CardDescription>
                Thông tin về quá trình học tập của bạn
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {profileData.education.map((edu, index) => (
                <div key={edu.id} className="p-4 border rounded-md">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{edu.school}</h3>
                      <p className="text-gray-600">{edu.degree} - {edu.fieldOfStudy}</p>
                      <p className="text-sm text-gray-500">{edu.from} - {edu.to}</p>
                    </div>
                    {isEditing && (
                      <Button variant="ghost" size="sm">
                        Chỉnh sửa
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              {isEditing && (
                <Button variant="outline" className="w-full">
                  <GraduationCap className="mr-2 h-4 w-4" />
                  Thêm học vấn
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Kinh nghiệm làm việc */}
          <Card>
            <CardHeader>
              <CardTitle>Kinh nghiệm làm việc</CardTitle>
              <CardDescription>
                Thông tin về quá trình làm việc của bạn
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {profileData.experience.map((exp) => (
                <div key={exp.id} className="p-4 border rounded-md">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{exp.position}</h3>
                      <p className="text-gray-600">{exp.company}</p>
                      <p className="text-sm text-gray-500">{exp.from} - {exp.to}</p>
                      <p className="mt-2">{exp.description}</p>
                    </div>
                    {isEditing && (
                      <Button variant="ghost" size="sm">
                        Chỉnh sửa
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              {isEditing && (
                <Button variant="outline" className="w-full">
                  <Briefcase className="mr-2 h-4 w-4" />
                  Thêm kinh nghiệm
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Kỹ năng */}
          <Card>
            <CardHeader>
              <CardTitle>Kỹ năng</CardTitle>
              <CardDescription>
                Các kỹ năng chuyên môn của bạn
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {profileData.skills.map((skill, index) => (
                  <div key={index} className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
                    <span>{skill}</span>
                    {isEditing && (
                      <button className="ml-2 text-gray-500 hover:text-red-500">
                        &times;
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {isEditing && (
                <div className="flex gap-2 mt-4">
                  <Input placeholder="Thêm kỹ năng mới" />
                  <Button>Thêm</Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Ngôn ngữ */}
          <Card>
            <CardHeader>
              <CardTitle>Ngôn ngữ</CardTitle>
              <CardDescription>
                Các ngôn ngữ bạn có thể sử dụng
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {profileData.languages.map((lang, index) => (
                <div key={index} className="flex justify-between items-center p-3 border rounded-md">
                  <div className="flex items-center">
                    <Languages className="h-5 w-5 mr-3 text-gray-500" />
                    <div>
                      <p className="font-medium">{lang.language}</p>
                      <p className="text-sm text-gray-500">{lang.level}</p>
                    </div>
                  </div>
                  {isEditing && (
                    <Button variant="ghost" size="sm">
                      Chỉnh sửa
                    </Button>
                  )}
                </div>
              ))}
              {isEditing && (
                <Button variant="outline" className="w-full">
                  <Languages className="mr-2 h-4 w-4" />
                  Thêm ngôn ngữ
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Chứng chỉ */}
          <Card>
            <CardHeader>
              <CardTitle>Chứng chỉ</CardTitle>
              <CardDescription>
                Các chứng chỉ chuyên môn bạn đã đạt được
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {profileData.certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between items-center p-3 border rounded-md">
                  <div className="flex items-center">
                    <Award className="h-5 w-5 mr-3 text-gray-500" />
                    <div>
                      <p className="font-medium">{cert.name}</p>
                      <p className="text-sm text-gray-500">{cert.issuer} • {cert.date}</p>
                    </div>
                  </div>
                  {isEditing && (
                    <Button variant="ghost" size="sm">
                      Chỉnh sửa
                    </Button>
                  )}
                </div>
              ))}
              {isEditing && (
                <Button variant="outline" className="w-full">
                  <Award className="mr-2 h-4 w-4" />
                  Thêm chứng chỉ
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab bảo mật */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Bảo mật tài khoản</CardTitle>
              <CardDescription>
                Quản lý mật khẩu và bảo mật cho tài khoản của bạn
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-4 border rounded-md">
                <div className="flex items-center">
                  <Lock className="h-5 w-5 mr-3 text-gray-500" />
                  <div>
                    <p className="font-medium">Mật khẩu</p>
                    <p className="text-sm text-gray-500">Cập nhật lần cuối: 3 tháng trước</p>
                  </div>
                </div>
                <Button onClick={() => setShowPasswordDialog(true)}>
                  Đổi mật khẩu
                </Button>
              </div>

              <div className="flex justify-between items-center p-4 border rounded-md">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-gray-500" />
                  <div>
                    <p className="font-medium">Email đã xác minh</p>
                    <p className="text-sm text-gray-500">{profileData.email}</p>
                  </div>
                </div>
                <Button variant="outline">
                  Cập nhật
                </Button>
              </div>

              <div className="flex justify-between items-center p-4 border rounded-md">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-gray-500" />
                  <div>
                    <p className="font-medium">Số điện thoại đã xác minh</p>
                    <p className="text-sm text-gray-500">{profileData.phone}</p>
                  </div>
                </div>
                <Button variant="outline">
                  Cập nhật
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Lịch sử đăng nhập</CardTitle>
              <CardDescription>
                Các phiên đăng nhập gần đây của bạn
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 border rounded-md">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">Chrome trên Windows</p>
                      <p className="text-sm text-gray-500">TP. Hồ Chí Minh, Việt Nam</p>
                    </div>
                    <p className="text-sm text-gray-500">Hôm nay, 09:45</p>
                  </div>
                  <div className="mt-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">Hiện tại</Badge>
                  </div>
                </div>

                <div className="p-3 border rounded-md">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">Safari trên iPhone</p>
                      <p className="text-sm text-gray-500">TP. Hồ Chí Minh, Việt Nam</p>
                    </div>
                    <p className="text-sm text-gray-500">Hôm qua, 18:30</p>
                  </div>
                </div>

                <div className="p-3 border rounded-md">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">Chrome trên Windows</p>
                      <p className="text-sm text-gray-500">TP. Hồ Chí Minh, Việt Nam</p>
                    </div>
                    <p className="text-sm text-gray-500">22/06/2024, 14:15</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog đổi mật khẩu */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Đổi mật khẩu</DialogTitle>
            <DialogDescription>
              Vui lòng nhập mật khẩu hiện tại và mật khẩu mới để thay đổi
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onChangePassword)} className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
              <Input
                id="currentPassword"
                type="password"
                {...register("currentPassword", { required: "Vui lòng nhập mật khẩu hiện tại" })}
              />
              {errors.currentPassword && (
                <p className="text-sm text-red-500">{errors.currentPassword.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">Mật khẩu mới</Label>
              <Input
                id="newPassword"
                type="password"
                {...register("newPassword", { 
                  required: "Vui lòng nhập mật khẩu mới",
                  minLength: {
                    value: 8,
                    message: "Mật khẩu phải có ít nhất 8 ký tự"
                  }
                })}
              />
              {errors.newPassword && (
                <p className="text-sm text-red-500">{errors.newPassword.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword", { 
                  required: "Vui lòng xác nhận mật khẩu mới",
                  validate: (value, formValues) => 
                    value === formValues.newPassword || "Mật khẩu xác nhận không khớp"
                })}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setShowPasswordDialog(false)}>
                Hủy
              </Button>
              <Button type="submit">
                Xác nhận
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
} 
