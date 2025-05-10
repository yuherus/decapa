"use client";

import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { 
  Search, 
  Plus, 
  MoreVertical, 
  Edit, 
  Trash2, 
  UserCog, 
  Mail, 
  User, 
  Building, 
  ShieldCheck, 
  ShieldAlert,
  CheckCircle
} from "lucide-react";
import PaginationBar from "@/components/shared/PaginationBar";

export default function AccountManagementPage() {
  // Dữ liệu mẫu cho danh sách tài khoản
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "nguyenvana@company.com",
      role: "admin",
      department: "Quản lý",
      status: "active",
      lastLogin: "2024-05-15 08:30:22"
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "tranthib@company.com",
      role: "hr_manager",
      department: "Nhân sự",
      status: "active",
      lastLogin: "2024-05-14 15:45:10"
    },
    {
      id: 3,
      name: "Lê Văn C",
      email: "levanc@company.com",
      role: "hr",
      department: "Nhân sự",
      status: "active",
      lastLogin: "2024-05-13 10:20:05"
    },
    {
      id: 4,
      name: "Phạm Thị D",
      email: "phamthid@company.com",
      role: "hr",
      department: "Nhân sự",
      status: "inactive",
      lastLogin: "2024-05-10 09:15:30"
    },
    {
      id: 5,
      name: "Hoàng Văn E",
      email: "hoangvane@company.com",
      role: "hr",
      department: "Tuyển dụng",
      status: "active",
      lastLogin: "2024-05-12 14:25:18"
    }
  ]);

  // State cho tìm kiếm và phân trang
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // State cho dialog thêm/sửa tài khoản
  const [showAccountDialog, setShowAccountDialog] = useState(false);
  const [accountForm, setAccountForm] = useState({
    id: null,
    name: "",
    email: "",
    role: "hr",
    department: "",
    password: "",
    confirmPassword: ""
  });
  const [isEditing, setIsEditing] = useState(false);

  // State cho dialog xác nhận xóa
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState(null);

  // State cho dialog thay đổi vai trò
  const [showRoleDialog, setShowRoleDialog] = useState(false);
  const [accountToChangeRole, setAccountToChangeRole] = useState(null);
  const [newRole, setNewRole] = useState("");

  // Lọc tài khoản theo từ khóa tìm kiếm
  const filteredAccounts = accounts.filter(account => 
    account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    account.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    account.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Phân trang
  const totalPages = Math.ceil(filteredAccounts.length / itemsPerPage);
  const currentAccounts = filteredAccounts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Xử lý thay đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Xử lý thêm tài khoản mới
  const handleAddAccount = () => {
    setIsEditing(false);
    setAccountForm({
      id: null,
      name: "",
      email: "",
      role: "hr",
      department: "",
      password: "",
      confirmPassword: ""
    });
    setShowAccountDialog(true);
  };

  // Xử lý chỉnh sửa tài khoản
  const handleEditAccount = (account) => {
    setIsEditing(true);
    setAccountForm({
      id: account.id,
      name: account.name,
      email: account.email,
      role: account.role,
      department: account.department,
      password: "",
      confirmPassword: ""
    });
    setShowAccountDialog(true);
  };

  // Xử lý xóa tài khoản
  const handleDeleteAccount = (account) => {
    setAccountToDelete(account);
    setShowDeleteDialog(true);
  };

  // Xử lý thay đổi vai trò
  const handleChangeRole = (account) => {
    setAccountToChangeRole(account);
    setNewRole(account.role);
    setShowRoleDialog(true);
  };

  // Xử lý lưu tài khoản (thêm mới hoặc cập nhật)
  const handleSaveAccount = () => {
    // Kiểm tra dữ liệu đầu vào
    if (!accountForm.name || !accountForm.email || !accountForm.department) {
      alert("Vui lòng điền đầy đủ thông tin tài khoản");
      return;
    }

    if (!isEditing && (!accountForm.password || accountForm.password !== accountForm.confirmPassword)) {
      alert("Mật khẩu không khớp hoặc chưa được nhập");
      return;
    }

    if (isEditing) {
      // Cập nhật tài khoản hiện có
      setAccounts(accounts.map(acc => 
        acc.id === accountForm.id ? { 
          ...acc, 
          name: accountForm.name,
          email: accountForm.email,
          role: accountForm.role,
          department: accountForm.department
        } : acc
      ));
    } else {
      // Thêm tài khoản mới
      setAccounts([
        ...accounts,
        {
          id: Date.now(),
          name: accountForm.name,
          email: accountForm.email,
          role: accountForm.role,
          department: accountForm.department,
          status: "active",
          lastLogin: "Chưa đăng nhập"
        }
      ]);
    }

    setShowAccountDialog(false);
  };

  // Xử lý xác nhận xóa tài khoản
  const confirmDeleteAccount = () => {
    setAccounts(accounts.filter(acc => acc.id !== accountToDelete.id));
    setShowDeleteDialog(false);
  };

  // Xử lý xác nhận thay đổi vai trò
  const confirmChangeRole = () => {
    setAccounts(accounts.map(acc => 
      acc.id === accountToChangeRole.id ? { ...acc, role: newRole } : acc
    ));
    setShowRoleDialog(false);
  };

  // Hiển thị badge trạng thái
  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">Hoạt động</Badge>;
      case "inactive":
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-300">Không hoạt động</Badge>;
      default:
        return null;
    }
  };

  // Hiển thị tên vai trò
  const getRoleName = (role) => {
    switch (role) {
      case "admin":
        return "Quản trị viên";
      case "hr_manager":
        return "Quản lý HR";
      case "hr":
        return "Nhân viên HR";
      default:
        return role;
    }
  };

  // Hiển thị icon vai trò
  const getRoleIcon = (role) => {
    switch (role) {
      case "admin":
        return <ShieldAlert className="h-4 w-4 text-red-500" />;
      case "hr_manager":
        return <ShieldCheck className="h-4 w-4 text-blue-500" />;
      case "hr":
        return <User className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý tài khoản</h1>
        <Button onClick={handleAddAccount}>
          <Plus className="mr-2 h-4 w-4" />
          Thêm tài khoản
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Danh sách tài khoản</CardTitle>
              <CardDescription>Quản lý tài khoản người dùng trong công ty của bạn</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Tìm kiếm tài khoản..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Vai trò</TableHead>
                <TableHead>Phòng ban</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Đăng nhập gần nhất</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentAccounts.length > 0 ? (
                currentAccounts.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell className="font-medium">{account.name}</TableCell>
                    <TableCell>{account.email}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {getRoleIcon(account.role)}
                        <span>{getRoleName(account.role)}</span>
                      </div>
                    </TableCell>
                    <TableCell>{account.department}</TableCell>
                    <TableCell>{getStatusBadge(account.status)}</TableCell>
                    <TableCell>{account.lastLogin}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditAccount(account)}>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Chỉnh sửa</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleChangeRole(account)}>
                            <UserCog className="mr-2 h-4 w-4" />
                            <span>Thay đổi vai trò</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleDeleteAccount(account)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Xóa tài khoản</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <User className="h-10 w-10 mb-2" />
                      <p>Không tìm thấy tài khoản nào</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {totalPages > 1 && (
            <div className="mt-6">
              <PaginationBar 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog thêm/sửa tài khoản */}
      <Dialog open={showAccountDialog} onOpenChange={setShowAccountDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Chỉnh sửa tài khoản" : "Thêm tài khoản mới"}</DialogTitle>
            <DialogDescription>
              {isEditing 
                ? "Cập nhật thông tin tài khoản người dùng" 
                : "Tạo tài khoản mới cho nhân viên trong công ty của bạn"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="name">Họ và tên</Label>
              <Input
                id="name"
                value={accountForm.name}
                onChange={(e) => setAccountForm({...accountForm, name: e.target.value})}
                placeholder="Nguyễn Văn A"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={accountForm.email}
                onChange={(e) => setAccountForm({...accountForm, email: e.target.value})}
                placeholder="example@company.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Phòng ban</Label>
              <Input
                id="department"
                value={accountForm.department}
                onChange={(e) => setAccountForm({...accountForm, department: e.target.value})}
                placeholder="Nhân sự, Tuyển dụng, ..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Vai trò</Label>
              <Select
                value={accountForm.role}
                onValueChange={(value) => setAccountForm({...accountForm, role: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn vai trò" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Quản trị viên</SelectItem>
                  <SelectItem value="hr_manager">Quản lý HR</SelectItem>
                  <SelectItem value="hr">Nhân viên HR</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {!isEditing && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="password">Mật khẩu</Label>
                  <Input
                    id="password"
                    type="password"
                    value={accountForm.password}
                    onChange={(e) => setAccountForm({...accountForm, password: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={accountForm.confirmPassword}
                    onChange={(e) => setAccountForm({...accountForm, confirmPassword: e.target.value})}
                  />
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAccountDialog(false)}>
              Hủy
            </Button>
            <Button onClick={handleSaveAccount}>
              {isEditing ? "Cập nhật" : "Tạo tài khoản"}
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
              Bạn có chắc chắn muốn xóa tài khoản của {accountToDelete?.name}? 
              Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteAccount}
              className="bg-red-600 hover:bg-red-700"
            >
              Xóa tài khoản
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Dialog thay đổi vai trò */}
      <Dialog open={showRoleDialog} onOpenChange={setShowRoleDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Thay đổi vai trò</DialogTitle>
            <DialogDescription>
              Thay đổi vai trò cho tài khoản {accountToChangeRole?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="newRole">Vai trò mới</Label>
              <Select
                value={newRole}
                onValueChange={setNewRole}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn vai trò" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Quản trị viên</SelectItem>
                  <SelectItem value="hr_manager">Quản lý HR</SelectItem>
                  <SelectItem value="hr">Nhân viên HR</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRoleDialog(false)}>
              Hủy
            </Button>
            <Button onClick={confirmChangeRole}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Xác nhận
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 
