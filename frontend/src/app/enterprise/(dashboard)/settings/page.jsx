"use client";

import { useState } from "react";
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
import { Switch } from "@/components/ui/switch";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Bell,
  Mail,
  Shield,
  Users,
  Globe,
  FileText,
  AlertCircle,
  Info,
  Trash2,
  Download,
  Upload,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";

export default function SettingsPage() {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

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
    timezone: "Asia/Ho_Chi_Minh"
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
    toast.success("Cài đặt đã được lưu thành công!");
  };

  // Xử lý xuất dữ liệu
  const handleExportData = () => {
    setIsExporting(true);
    
    // Giả lập quá trình xuất dữ liệu
    setTimeout(() => {
      setIsExporting(false);
      setShowExportDialog(false);
      toast.success("Dữ liệu đã được xuất thành công!");
    }, 2000);
  };

  // Xử lý xóa tài khoản
  const handleDeleteAccount = () => {
    setShowDeleteDialog(false);
    toast.success("Yêu cầu xóa tài khoản đã được gửi đi. Chúng tôi sẽ liên hệ để xác nhận.");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Cài đặt</h1>
        <Button onClick={handleSaveSettings}>Lưu thay đổi</Button>
      </div>

      <Tabs defaultValue="notifications">
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="notifications">Thông báo</TabsTrigger>
          <TabsTrigger value="privacy">Quyền riêng tư</TabsTrigger>
          <TabsTrigger value="security">Bảo mật</TabsTrigger>
          <TabsTrigger value="preferences">Tùy chọn</TabsTrigger>
          <TabsTrigger value="data">Dữ liệu & Tài khoản</TabsTrigger>
        </TabsList>

        {/* Tab Thông báo */}
        <TabsContent value="notifications" className="space-y-6">
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
                    Nhận thông báo về lịch phỏng vấn sắp tới
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
                    Nhận báo cáo tổng hợp hoạt động hàng tuần
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
                  <Label>Thông tin marketing</Label>
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
                    Hiển thị thông báo về lịch phỏng vấn sắp tới
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
        </TabsContent>

        {/* Tab Quyền riêng tư */}
        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Cài đặt quyền riêng tư
              </CardTitle>
              <CardDescription>
                Quản lý quyền riêng tư và hiển thị thông tin công ty
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Hiển thị hồ sơ công ty</Label>
                <Select
                  value={settings.privacy.profileVisibility}
                  onValueChange={(value) => handleSettingChange('privacy', null, 'profileVisibility', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn tùy chọn hiển thị" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Công khai</SelectItem>
                    <SelectItem value="registered">Chỉ người dùng đã đăng ký</SelectItem>
                    <SelectItem value="private">Riêng tư</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500">
                  Kiểm soát ai có thể xem hồ sơ công ty của bạn
                </p>
              </div>
              
              <div className="space-y-2">
                <Label>Hiển thị thông tin liên hệ</Label>
                <Select
                  value={settings.privacy.contactInfoVisibility}
                  onValueChange={(value) => handleSettingChange('privacy', null, 'contactInfoVisibility', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn tùy chọn hiển thị" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Công khai</SelectItem>
                    <SelectItem value="registered">Chỉ người dùng đã đăng ký</SelectItem>
                    <SelectItem value="applicants">Chỉ ứng viên đã ứng tuyển</SelectItem>
                    <SelectItem value="private">Riêng tư</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500">
                  Kiểm soát ai có thể xem thông tin liên hệ của công ty
                </p>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Thu thập dữ liệu sử dụng</Label>
                  <p className="text-sm text-gray-500">
                    Cho phép thu thập dữ liệu sử dụng để cải thiện dịch vụ
                  </p>
                </div>
                <Switch
                  checked={settings.privacy.allowDataCollection}
                  onCheckedChange={(value) => handleSettingChange('privacy', null, 'allowDataCollection', value)}
                />
              </div>
              
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
        </TabsContent>

        {/* Tab Bảo mật */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Cài đặt bảo mật
              </CardTitle>
              <CardDescription>
                Quản lý các cài đặt bảo mật cho tài khoản doanh nghiệp
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Xác thực hai yếu tố</Label>
                  <p className="text-sm text-gray-500">
                    Bảo vệ tài khoản bằng xác thực hai yếu tố
                  </p>
                </div>
                <Switch
                  checked={settings.security.twoFactorAuth}
                  onCheckedChange={(value) => handleSettingChange('security', null, 'twoFactorAuth', value)}
                />
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label>Thời gian hết hạn phiên đăng nhập (phút)</Label>
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
              
              <div className="space-y-2">
                <Label>Thời gian hết hạn mật khẩu (ngày)</Label>
                <Select
                  value={settings.security.passwordExpiry}
                  onValueChange={(value) => handleSettingChange('security', null, 'passwordExpiry', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn thời gian" />
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
                  Thời gian trước khi yêu cầu thay đổi mật khẩu
                </p>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Giới hạn địa chỉ IP</Label>
                    <p className="text-sm text-gray-500">
                      Chỉ cho phép đăng nhập từ các địa chỉ IP cụ thể
                    </p>
                  </div>
                  <Switch
                    checked={settings.security.ipRestriction}
                    onCheckedChange={(value) => handleSettingChange('security', null, 'ipRestriction', value)}
                  />
                </div>
                
                {settings.security.ipRestriction && (
                  <div className="mt-2">
                    <Label>Danh sách IP được phép</Label>
                    <Textarea
                      placeholder="Nhập các địa chỉ IP, mỗi IP một dòng"
                      value={settings.security.allowedIPs}
                      onChange={(e) => handleSettingChange('security', null, 'allowedIPs', e.target.value)}
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Ví dụ: 192.168.1.1, 10.0.0.1
                    </p>
                  </div>
                )}
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-md flex items-start">
                <Info className="h-5 w-5 text-yellow-600 mr-2 shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-700">
                  Các thay đổi về bảo mật sẽ được áp dụng cho tất cả người dùng trong tổ chức của bạn. Đảm bảo thông báo cho nhân viên về các thay đổi này.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Tùy chọn */}
        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="mr-2 h-5 w-5" />
                Ngôn ngữ và múi giờ
              </CardTitle>
              <CardDescription>
                Cài đặt ngôn ngữ và múi giờ cho tài khoản của bạn
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Ngôn ngữ</Label>
                <Select
                  value={settings.language}
                  onValueChange={(value) => handleSettingChange('language', null, null, value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn ngôn ngữ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vi">Tiếng Việt</SelectItem>
                    <SelectItem value="en">Tiếng Anh</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Múi giờ</Label>
                <Select
                  value={settings.timezone}
                  onValueChange={(value) => handleSettingChange('timezone', null, null, value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn múi giờ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Asia/Ho_Chi_Minh">Hồ Chí Minh (GMT+7)</SelectItem>
                    <SelectItem value="Asia/Bangkok">Bangkok (GMT+7)</SelectItem>
                    <SelectItem value="Asia/Singapore">Singapore (GMT+8)</SelectItem>
                    <SelectItem value="Asia/Tokyo">Tokyo (GMT+9)</SelectItem>
                    <SelectItem value="America/New_York">New York (GMT-4)</SelectItem>
                    <SelectItem value="Europe/London">London (GMT+1)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Định dạng hiển thị
              </CardTitle>
              <CardDescription>
                Tùy chỉnh cách hiển thị thông tin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
        </TabsContent>

        {/* Tab Dữ liệu & Tài khoản */}
        <TabsContent value="data" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Download className="mr-2 h-5 w-5" />
                Xuất dữ liệu
              </CardTitle>
              <CardDescription>
                Tải xuống dữ liệu của doanh nghiệp
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Bạn có thể xuất dữ liệu của doanh nghiệp để sao lưu hoặc phân tích. Dữ liệu sẽ được xuất dưới dạng tệp CSV hoặc Excel.
              </p>
              
              <div className="flex flex-col space-y-2">
                <Button variant="outline" onClick={() => setShowExportDialog(true)}>
                  <Download className="mr-2 h-4 w-4" />
                  Xuất dữ liệu
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-red-600">
                <Trash2 className="mr-2 h-5 w-5" />
                Xóa tài khoản
              </CardTitle>
              <CardDescription>
                Xóa vĩnh viễn tài khoản doanh nghiệp và tất cả dữ liệu
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-red-50 p-4 rounded-md flex items-start">
                <AlertCircle className="h-5 w-5 text-red-600 mr-2 shrink-0 mt-0.5" />
                <div className="text-sm text-red-700">
                  <p className="font-medium">Cảnh báo: Hành động không thể hoàn tác</p>
                  <p className="mt-1">
                    Việc xóa tài khoản sẽ xóa vĩnh viễn tất cả dữ liệu của doanh nghiệp bạn, bao gồm hồ sơ công ty, tin tuyển dụng, dữ liệu ứng viên và lịch sử thanh toán. Hành động này không thể hoàn tác.
                  </p>
                </div>
              </div>
              
              <Button variant="destructive" onClick={() => setShowDeleteDialog(true)}>
                Yêu cầu xóa tài khoản
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog xác nhận xuất dữ liệu */}
      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Xuất dữ liệu</DialogTitle>
            <DialogDescription>
              Chọn loại dữ liệu bạn muốn xuất
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Định dạng tệp</Label>
              <Select defaultValue="excel">
                <SelectTrigger>
                  <SelectValue placeholder="Chọn định dạng tệp" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                  <SelectItem value="csv">CSV (.csv)</SelectItem>
                  <SelectItem value="json">JSON (.json)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Loại dữ liệu</Label>
              <div className="grid grid-cols-1 gap-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="jobs" className="rounded border-gray-300" defaultChecked />
                  <label htmlFor="jobs" className="text-sm">Tin tuyển dụng</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="applicants" className="rounded border-gray-300" defaultChecked />
                  <label htmlFor="applicants" className="text-sm">Dữ liệu ứng viên</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="interviews" className="rounded border-gray-300" defaultChecked />
                  <label htmlFor="interviews" className="text-sm">Lịch phỏng vấn</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="billing" className="rounded border-gray-300" defaultChecked />
                  <label htmlFor="billing" className="text-sm">Lịch sử thanh toán</label>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Phạm vi thời gian</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Chọn phạm vi thời gian" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả dữ liệu</SelectItem>
                  <SelectItem value="last30">30 ngày gần đây</SelectItem>
                  <SelectItem value="last90">90 ngày gần đây</SelectItem>
                  <SelectItem value="last365">365 ngày gần đây</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowExportDialog(false)}>
              Hủy
            </Button>
            <Button onClick={handleExportData} disabled={isExporting}>
              {isExporting ? (
                <>
                  <span className="animate-spin mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                  </span>
                  Đang xuất...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Xuất dữ liệu
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog xác nhận xóa tài khoản */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa tài khoản</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa tài khoản doanh nghiệp? Hành động này sẽ xóa vĩnh viễn tất cả dữ liệu và không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="confirm">Nhập "XÓA TÀI KHOẢN" để xác nhận</Label>
              <Input id="confirm" placeholder="XÓA TÀI KHOẢN" />
            </div>
            <div className="bg-yellow-50 p-4 rounded-md flex items-start">
              <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-700">
                <p className="font-medium">Lưu ý quan trọng:</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Tất cả tin tuyển dụng sẽ bị xóa và không còn hiển thị trên hệ thống</li>
                  <li>Dữ liệu ứng viên và lịch sử tuyển dụng sẽ bị mất</li>
                  <li>Bạn sẽ không thể truy cập vào tài khoản này nữa</li>
                  <li>Quá trình xóa tài khoản có thể mất đến 30 ngày</li>
                </ul>
              </div>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteAccount}
              className="bg-red-600 hover:bg-red-700"
            >
              Xóa tài khoản
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
} 
