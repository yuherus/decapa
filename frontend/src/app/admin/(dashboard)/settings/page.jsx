"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Mail, 
  Bell, 
  User, 
  Settings, 
  Shield, 
  Lock, 
  FileText, 
  Download, 
  Trash2, 
  AlertTriangle,
  Globe,
  Clock,
  Eye,
  Key
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function SettingsPage() {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  // Dữ liệu mẫu cho cài đặt
  const [settings, setSettings] = useState({
    notifications: {
      email: {
        newApplicants: true,
        interviews: true,
        jobExpiry: true,
        weeklyReport: true,
        marketing: false
      },
      inApp: {
        newApplicants: true,
        interviews: true,
        jobExpiry: true,
        weeklyReport: true,
        systemUpdates: true
      }
    },
    privacy: {
      profileVisibility: "public",
      contactInfoVisibility: "registered",
      allowDataCollection: true,
      allowDataSharing: false
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: "30",
      passwordExpiry: "90",
      ipRestriction: false,
      allowedIPs: ""
    },
    language: "vi",
    timezone: "Asia/Ho_Chi_Minh",
    system: {
      autoLogout: true,
      darkMode: false,
      compactView: false,
      autoSave: true,
      notificationSound: true
    },
    personal: {
      defaultView: "list",
      emailDigest: "daily",
      showProfileCompleteness: true,
      showRecommendations: true,
      defaultTab: "applicants"
    }
  });

  // Xử lý thay đổi cài đặt
  const handleSettingChange = (category, subcategory, setting, value) => {
    if (subcategory) {
      setSettings({
        ...settings,
        [category]: {
          ...settings[category],
          [subcategory]: {
            ...settings[category][subcategory],
            [setting]: value
          }
        }
      });
    } else {
      setSettings({
        ...settings,
        [category]: {
          ...settings[category],
          [setting]: value
        }
      });
    }
  };

  // Xử lý lưu cài đặt
  const handleSaveSettings = () => {
    toast({
      variant: "success",
      title: "Cài đặt đã được lưu",
      description: "Tất cả thay đổi đã được lưu thành công."
    });
  };

  // Xử lý xuất dữ liệu
  const handleExportData = () => {
    setIsExporting(true);
    
    // Giả lập quá trình xuất dữ liệu
    setTimeout(() => {
      setIsExporting(false);
      setShowExportDialog(false);
      toast({
        variant: "success",
        title: "Xuất dữ liệu thành công",
        description: "Dữ liệu đã được xuất thành công!"
      });
    }, 2000);
  };

  // Xử lý xóa tài khoản
  const handleDeleteAccount = () => {
    setShowDeleteDialog(false);
    toast({
      variant: "success",
      title: "Yêu cầu đã được gửi",
      description: "Yêu cầu xóa tài khoản đã được gửi đi. Chúng tôi sẽ liên hệ để xác nhận."
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Cài đặt</h1>
        <Button onClick={handleSaveSettings}>Lưu thay đổi</Button>
      </div>

      {/* Tab chính: Hệ thống và Cá nhân */}
      <Tabs defaultValue="system" className="space-y-6">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="system">Hệ thống</TabsTrigger>
          <TabsTrigger value="personal">Cá nhân</TabsTrigger>
        </TabsList>

        {/* Tab Hệ thống */}
        <TabsContent value="system" className="space-y-6">
          {/* Phần Thông báo */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold flex items-center">
              <Bell className="mr-2 h-5 w-5" />
              Thông báo
            </h2>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="mr-2 h-5 w-5" />
                  Thông báo qua email
                </CardTitle>
                <CardDescription>
                  Quản lý các thông báo được gửi đến email của bạn
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Ứng viên mới</Label>
                    <p className="text-sm text-gray-500">
                      Nhận thông báo khi có ứng viên mới ứng tuyển
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.email.newApplicants}
                    onCheckedChange={(value) => handleSettingChange('notifications', 'email', 'newApplicants', value)}
                  />
                </div>
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Lịch phỏng vấn</Label>
                    <p className="text-sm text-gray-500">
                      Nhận thông báo về lịch phỏng vấn mới hoặc thay đổi
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.email.interviews}
                    onCheckedChange={(value) => handleSettingChange('notifications', 'email', 'interviews', value)}
                  />
                </div>
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Tin tuyển dụng sắp hết hạn</Label>
                    <p className="text-sm text-gray-500">
                      Nhận thông báo khi tin tuyển dụng sắp hết hạn
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.email.jobExpiry}
                    onCheckedChange={(value) => handleSettingChange('notifications', 'email', 'jobExpiry', value)}
                  />
                </div>
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Báo cáo hàng tuần</Label>
                    <p className="text-sm text-gray-500">
                      Nhận báo cáo tổng hợp hàng tuần qua email
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.email.weeklyReport}
                    onCheckedChange={(value) => handleSettingChange('notifications', 'email', 'weeklyReport', value)}
                  />
                </div>
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Thông tin tiếp thị</Label>
                    <p className="text-sm text-gray-500">
                      Nhận thông tin về tính năng mới và khuyến mãi
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.email.marketing}
                    onCheckedChange={(value) => handleSettingChange('notifications', 'email', 'marketing', value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="mr-2 h-5 w-5" />
                  Thông báo trong ứng dụng
                </CardTitle>
                <CardDescription>
                  Quản lý các thông báo hiển thị trong ứng dụng
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Ứng viên mới</Label>
                    <p className="text-sm text-gray-500">
                      Hiển thị thông báo khi có ứng viên mới ứng tuyển
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.inApp.newApplicants}
                    onCheckedChange={(value) => handleSettingChange('notifications', 'inApp', 'newApplicants', value)}
                  />
                </div>
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Lịch phỏng vấn</Label>
                    <p className="text-sm text-gray-500">
                      Hiển thị thông báo về lịch phỏng vấn mới hoặc thay đổi
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.inApp.interviews}
                    onCheckedChange={(value) => handleSettingChange('notifications', 'inApp', 'interviews', value)}
                  />
                </div>
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Tin tuyển dụng sắp hết hạn</Label>
                    <p className="text-sm text-gray-500">
                      Hiển thị thông báo khi tin tuyển dụng sắp hết hạn
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.inApp.jobExpiry}
                    onCheckedChange={(value) => handleSettingChange('notifications', 'inApp', 'jobExpiry', value)}
                  />
                </div>
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Báo cáo hàng tuần</Label>
                    <p className="text-sm text-gray-500">
                      Hiển thị thông báo khi có báo cáo mới
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.inApp.weeklyReport}
                    onCheckedChange={(value) => handleSettingChange('notifications', 'inApp', 'weeklyReport', value)}
                  />
                </div>
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Cập nhật hệ thống</Label>
                    <p className="text-sm text-gray-500">
                      Hiển thị thông báo về các cập nhật hệ thống
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.inApp.systemUpdates}
                    onCheckedChange={(value) => handleSettingChange('notifications', 'inApp', 'systemUpdates', value)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Phần Quyền riêng tư */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold flex items-center">
              <Eye className="mr-2 h-5 w-5" />
              Quyền riêng tư
            </h2>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="mr-2 h-5 w-5" />
                  Quyền riêng tư và hiển thị
                </CardTitle>
                <CardDescription>
                  Kiểm soát thông tin của bạn được hiển thị như thế nào
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Hiển thị hồ sơ</Label>
                  <RadioGroup 
                    value={settings.privacy.profileVisibility}
                    onValueChange={(value) => handleSettingChange('privacy', null, 'profileVisibility', value)}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="public" id="profile-public" />
                      <Label htmlFor="profile-public">Công khai</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="registered" id="profile-registered" />
                      <Label htmlFor="profile-registered">Chỉ người dùng đã đăng ký</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="private" id="profile-private" />
                      <Label htmlFor="profile-private">Riêng tư</Label>
                    </div>
                  </RadioGroup>
                </div>
                <Separator />
                
                <div className="space-y-2">
                  <Label>Hiển thị thông tin liên hệ</Label>
                  <RadioGroup 
                    value={settings.privacy.contactInfoVisibility}
                    onValueChange={(value) => handleSettingChange('privacy', null, 'contactInfoVisibility', value)}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="public" id="contact-public" />
                      <Label htmlFor="contact-public">Công khai</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="registered" id="contact-registered" />
                      <Label htmlFor="contact-registered">Chỉ người dùng đã đăng ký</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="private" id="contact-private" />
                      <Label htmlFor="contact-private">Riêng tư</Label>
                    </div>
                  </RadioGroup>
                </div>
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Thu thập dữ liệu sử dụng</Label>
                    <p className="text-sm text-gray-500">
                      Cho phép thu thập dữ liệu để cải thiện trải nghiệm người dùng
                    </p>
                  </div>
                  <Switch
                    checked={settings.privacy.allowDataCollection}
                    onCheckedChange={(value) => handleSettingChange('privacy', null, 'allowDataCollection', value)}
                  />
                </div>
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Chia sẻ dữ liệu với đối tác</Label>
                    <p className="text-sm text-gray-500">
                      Cho phép chia sẻ dữ liệu với các đối tác của chúng tôi
                    </p>
                  </div>
                  <Switch
                    checked={settings.privacy.allowDataSharing}
                    onCheckedChange={(value) => handleSettingChange('privacy', null, 'allowDataSharing', value)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Phần Bảo mật */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold flex items-center">
              <Lock className="mr-2 h-5 w-5" />
              Bảo mật
            </h2>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Key className="mr-2 h-5 w-5" />
                  Cài đặt bảo mật tài khoản
                </CardTitle>
                <CardDescription>
                  Quản lý các tùy chọn bảo mật cho tài khoản của bạn
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Xác thực hai yếu tố</Label>
                    <p className="text-sm text-gray-500">
                      Bảo vệ tài khoản của bạn với xác thực hai yếu tố
                    </p>
                  </div>
                  <Switch
                    checked={settings.security.twoFactorAuth}
                    onCheckedChange={(value) => handleSettingChange('security', null, 'twoFactorAuth', value)}
                  />
                </div>
                <Separator />
                
                <div className="space-y-2">
                  <Label>Thời gian hết phiên đăng nhập (phút)</Label>
                  <Select
                    value={settings.security.sessionTimeout}
                    onValueChange={(value) => handleSettingChange('security', null, 'sessionTimeout', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn thời gian" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 phút</SelectItem>
                      <SelectItem value="30">30 phút</SelectItem>
                      <SelectItem value="60">60 phút</SelectItem>
                      <SelectItem value="120">120 phút</SelectItem>
                      <SelectItem value="never">Không bao giờ</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-500">
                    Thời gian không hoạt động trước khi phiên đăng nhập hết hạn
                  </p>
                </div>
                <Separator />
                
                <div className="space-y-2">
                  <Label>Thời hạn mật khẩu (ngày)</Label>
                  <Select
                    value={settings.security.passwordExpiry}
                    onValueChange={(value) => handleSettingChange('security', null, 'passwordExpiry', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn thời hạn" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 ngày</SelectItem>
                      <SelectItem value="60">60 ngày</SelectItem>
                      <SelectItem value="90">90 ngày</SelectItem>
                      <SelectItem value="180">180 ngày</SelectItem>
                      <SelectItem value="never">Không bao giờ</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-500">
                    Thời gian trước khi bạn cần thay đổi mật khẩu
                  </p>
                </div>
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Giới hạn địa chỉ IP</Label>
                    <p className="text-sm text-gray-500">
                      Chỉ cho phép đăng nhập từ các địa chỉ IP được chỉ định
                    </p>
                  </div>
                  <Switch
                    checked={settings.security.ipRestriction}
                    onCheckedChange={(value) => handleSettingChange('security', null, 'ipRestriction', value)}
                  />
                </div>
                
                {settings.security.ipRestriction && (
                  <div className="space-y-2 mt-2">
                    <Label htmlFor="allowed-ips">Địa chỉ IP được phép (mỗi IP một dòng)</Label>
                    <Textarea
                      id="allowed-ips"
                      value={settings.security.allowedIPs}
                      onChange={(e) => handleSettingChange('security', null, 'allowedIPs', e.target.value)}
                      placeholder="192.168.1.1&#10;10.0.0.1"
                      className="h-24"
                    />
                    <p className="text-sm text-gray-500">
                      Nhập các địa chỉ IP được phép đăng nhập, mỗi IP một dòng
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Phần Tùy chọn */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold flex items-center">
              <Settings className="mr-2 h-5 w-5" />
              Tùy chọn
            </h2>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="mr-2 h-5 w-5" />
                  Ngôn ngữ và khu vực
                </CardTitle>
                <CardDescription>
                  Cài đặt ngôn ngữ và múi giờ
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Ngôn ngữ</Label>
                  <Select
                    value={settings.language}
                    onValueChange={(value) => handleSettingChange(null, null, 'language', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn ngôn ngữ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vi">Tiếng Việt</SelectItem>
                      <SelectItem value="en">Tiếng Anh</SelectItem>
                      <SelectItem value="ja">Tiếng Nhật</SelectItem>
                      <SelectItem value="ko">Tiếng Hàn</SelectItem>
                      <SelectItem value="zh">Tiếng Trung</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                
                <div className="space-y-2">
                  <Label>Múi giờ</Label>
                  <Select
                    value={settings.timezone}
                    onValueChange={(value) => handleSettingChange(null, null, 'timezone', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn múi giờ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Ho_Chi_Minh">Hồ Chí Minh (GMT+7)</SelectItem>
                      <SelectItem value="Asia/Bangkok">Bangkok (GMT+7)</SelectItem>
                      <SelectItem value="Asia/Singapore">Singapore (GMT+8)</SelectItem>
                      <SelectItem value="Asia/Tokyo">Tokyo (GMT+9)</SelectItem>
                      <SelectItem value="America/New_York">New York (GMT-5)</SelectItem>
                      <SelectItem value="Europe/London">London (GMT+0)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                
                <div className="space-y-2">
                  <Label>Định dạng ngày</Label>
                  <Select defaultValue="dd/MM/yyyy">
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn định dạng ngày" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dd/MM/yyyy">DD/MM/YYYY (31/12/2024)</SelectItem>
                      <SelectItem value="MM/dd/yyyy">MM/DD/YYYY (12/31/2024)</SelectItem>
                      <SelectItem value="yyyy-MM-dd">YYYY-MM-DD (2024-12-31)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                
                <div className="space-y-2">
                  <Label>Định dạng tiền tệ</Label>
                  <Select defaultValue="VND">
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn định dạng tiền tệ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="VND">VND (₫)</SelectItem>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  Tự động hóa
                </CardTitle>
                <CardDescription>
                  Cài đặt tự động hóa và hành vi hệ thống
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Tự động đăng xuất</Label>
                    <p className="text-sm text-gray-500">
                      Tự động đăng xuất sau thời gian không hoạt động
                    </p>
                  </div>
                  <Switch
                    checked={settings.system.autoLogout}
                    onCheckedChange={(value) => handleSettingChange('system', null, 'autoLogout', value)}
                  />
                </div>
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Tự động lưu</Label>
                    <p className="text-sm text-gray-500">
                      Tự động lưu các thay đổi khi chỉnh sửa
                    </p>
                  </div>
                  <Switch
                    checked={settings.system.autoSave}
                    onCheckedChange={(value) => handleSettingChange('system', null, 'autoSave', value)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Phần Dữ liệu & Tài khoản */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Dữ liệu & Tài khoản
            </h2>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trash2 className="mr-2 h-5 w-5" />
                  Xóa tài khoản
                </CardTitle>
                <CardDescription>
                  Xóa tài khoản của bạn và xóa tất cả dữ liệu liên quan
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Bạn có chắc chắn muốn xóa tài khoản?</Label>
                    <p className="text-sm text-gray-500">
                      Hành động này không thể hoàn tác. Tất cả dữ liệu của bạn sẽ bị xóa vĩnh viễn.
                    </p>
                  </div>
                  <Switch
                    checked={showDeleteDialog}
                    onCheckedChange={(value) => setShowDeleteDialog(value)}
                  />
                </div>
                <Separator />
                
                {showDeleteDialog && (
                  <div className="space-y-2">
                    <Label htmlFor="delete-reason">Lý do xóa tài khoản</Label>
                    <Textarea
                      id="delete-reason"
                      value={deleteReason}
                      onChange={(e) => setDeleteReason(e.target.value)}
                      placeholder="Nhập lý do xóa tài khoản"
                      className="h-24"
                    />
                    <p className="text-sm text-gray-500">
                      Lý do xóa tài khoản giúp chúng tôi cải thiện dịch vụ
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab Cá nhân */}
        <TabsContent value="personal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Tùy chọn hiển thị
              </CardTitle>
              <CardDescription>
                Tùy chỉnh giao diện và trải nghiệm cá nhân
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Chế độ tối</Label>
                  <p className="text-sm text-gray-500">
                    Bật chế độ tối cho giao diện
                  </p>
                </div>
                <Switch
                  checked={settings.system.darkMode}
                  onCheckedChange={(value) => handleSettingChange('system', null, 'darkMode', value)}
                />
              </div>
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Giao diện thu gọn</Label>
                  <p className="text-sm text-gray-500">
                    Hiển thị giao diện thu gọn để xem nhiều thông tin hơn
                  </p>
                </div>
                <Switch
                  checked={settings.system.compactView}
                  onCheckedChange={(value) => handleSettingChange('system', null, 'compactView', value)}
                />
              </div>
              <Separator />
              
              <div className="space-y-2">
                <Label>Kiểu hiển thị mặc định</Label>
                <Select
                  value={settings.personal.defaultView}
                  onValueChange={(value) => handleSettingChange('personal', null, 'defaultView', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn kiểu hiển thị" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="list">Danh sách</SelectItem>
                    <SelectItem value="grid">Lưới</SelectItem>
                    <SelectItem value="kanban">Kanban</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500">
                  Kiểu hiển thị mặc định cho danh sách ứng viên và tin tuyển dụng
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="mr-2 h-5 w-5" />
                Tùy chọn làm việc
              </CardTitle>
              <CardDescription>
                Tùy chỉnh trải nghiệm làm việc của bạn
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Hiển thị mức độ hoàn thiện hồ sơ</Label>
                  <p className="text-sm text-gray-500">
                    Hiển thị thanh tiến trình hoàn thiện hồ sơ
                  </p>
                </div>
                <Switch
                  checked={settings.personal.showProfileCompleteness}
                  onCheckedChange={(value) => handleSettingChange('personal', null, 'showProfileCompleteness', value)}
                />
              </div>
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Hiển thị gợi ý</Label>
                  <p className="text-sm text-gray-500">
                    Hiển thị gợi ý và đề xuất phù hợp
                  </p>
                </div>
                <Switch
                  checked={settings.personal.showRecommendations}
                  onCheckedChange={(value) => handleSettingChange('personal', null, 'showRecommendations', value)}
                />
              </div>
              <Separator />
              
              <div className="space-y-2">
                <Label>Tab mặc định khi đăng nhập</Label>
                <Select
                  value={settings.personal.defaultTab}
                  onValueChange={(value) => handleSettingChange('personal', null, 'defaultTab', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn tab mặc định" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dashboard">Tổng quan</SelectItem>
                    <SelectItem value="jobs">Tin tuyển dụng</SelectItem>
                    <SelectItem value="applicants">Ứng viên</SelectItem>
                    <SelectItem value="interviews">Phỏng vấn</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500">
                  Tab sẽ được hiển thị đầu tiên khi bạn đăng nhập
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Tùy chọn thông báo cá nhân
              </CardTitle>
              <CardDescription>
                Tùy chỉnh cách bạn nhận thông báo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Âm thanh thông báo</Label>
                  <p className="text-sm text-gray-500">
                    Phát âm thanh khi có thông báo mới
                  </p>
                </div>
                <Switch
                  checked={settings.system.notificationSound}
                  onCheckedChange={(value) => handleSettingChange('system', null, 'notificationSound', value)}
                />
              </div>
              <Separator />
              
              <div className="space-y-2">
                <Label>Tóm tắt email</Label>
                <Select
                  value={settings.personal.emailDigest}
                  onValueChange={(value) => handleSettingChange('personal', null, 'emailDigest', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn tần suất" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Hàng ngày</SelectItem>
                    <SelectItem value="weekly">Hàng tuần</SelectItem>
                    <SelectItem value="never">Không nhận</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500">
                  Tần suất nhận email tóm tắt hoạt động
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
