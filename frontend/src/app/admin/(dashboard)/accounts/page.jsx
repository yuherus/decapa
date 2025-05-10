"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Edit,
  Lock,
  Plus,
  Search,
  Trash2,
  UserCog,
  UserPlus,
} from "lucide-react";
import PaginationBar from "@/components/shared/PaginationBar";

export default function AccountManagementPage() {
  // Dữ liệu mẫu cho danh sách tài khoản
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "nguyenvana@admin.com",
      role: "admin",
      department: "Quản trị hệ thống",
      status: "active",
      lastLogin: "2024-05-15 08:30:22"
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "tranthib@admin.com",
      role: "moderator",
      department: "Kiểm duyệt nội dung",
      status: "active",
      lastLogin: "2024-05-14 15:45:10"
    },
    {
      id: 3,
      name: "Lê Văn C",
      email: "levanc@admin.com",
      role: "support",
      department: "Hỗ trợ khách hàng",
      status: "active",
      lastLogin: "2024-05-13 10:20:05"
    },
    {
      id: 4,
      name: "Phạm Thị D",
      email: "phamthid@admin.com",
      role: "finance",
      department: "Tài chính",
      status: "inactive",
      lastLogin: "2024-05-10 09:15:30"
    },
    {
      id: 5,
      name: "Hoàng Văn E",
      email: "hoangvane@admin.com",
      role: "moderator",
      department: "Kiểm duyệt nội dung",
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
    role: "moderator",
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

  // State cho dialog khóa/mở khóa tài khoản
  const [showLockDialog, setShowLockDialog] = useState(false);
  const [accountToLock, setAccountToLock] = useState(null);

  // Xử lý tìm kiếm
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  // Lọc tài khoản theo tìm kiếm
  const filteredAccounts = accounts.filter(account => 
    account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    account.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    account.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAccounts = filteredAccounts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAccounts.length / itemsPerPage);

  // Xử lý mở dialog thêm tài khoản
  const handleAddAccount = () => {
    setAccountForm({
      id: null,
      name: "",
      email: "",
      role: "moderator",
      department: "",
      password: "",
      confirmPassword: ""
    });
    setIsEditing(false);
    setShowAccountDialog(true);
  };

  // Xử lý mở dialog sửa tài khoản
  const handleEditAccount = (account) => {
    setAccountForm({
      id: account.id,
      name: account.name,
      email: account.email,
      role: account.role,
      department: account.department,
      password: "",
      confirmPassword: ""
    });
    setIsEditing(true);
    setShowAccountDialog(true);
  };

  // Xử lý lưu tài khoản
  const handleSaveAccount = () => {
    if (accountForm.password !== accountForm.confirmPassword) {
      alert("Mật khẩu không khớp!");
      return;
    }

    if (isEditing) {
      // Cập nhật tài khoản hiện có
      setAccounts(accounts.map(account => 
        account.id === accountForm.id ? { 
          ...account, 
          name: accountForm.name,
          email: accountForm.email,
          role: accountForm.role,
          department: accountForm.department
        } : account
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

  // Xử lý xóa tài khoản
  const handleDeleteAccount = (account) => {
    setAccountToDelete(account);
    setShowDeleteDialog(true);
  };

  // Xác nhận xóa tài khoản
  const confirmDeleteAccount = () => {
    setAccounts(accounts.filter(account => account.id !== accountToDelete.id));
    setShowDeleteDialog(false);
  };

  // Xử lý thay đổi vai trò
  const handleChangeRole = (account) => {
    setAccountToChangeRole(account);
    setNewRole(account.role);
    setShowRoleDialog(true);
  };

  // Xác nhận thay đổi vai trò
  const confirmChangeRole = () => {
    setAccounts(accounts.map(account => 
      account.id === accountToChangeRole.id ? { ...account, role: newRole } : account
    ));
    setShowRoleDialog(false);
  };

  // Xử lý khóa/mở khóa tài khoản
  const handleLockAccount = (account) => {
    setAccountToLock(account);
    setShowLockDialog(true);
  };

  // Xác nhận khóa/mở khóa tài khoản
  const confirmLockAccount = () => {
    setAccounts(accounts.map(account => 
      account.id === accountToLock.id ? { 
        ...account, 
        status: account.status === "active" ? "inactive" : "active" 
      } : account
    ));
    setShowLockDialog(false);
  };

  // Hiển thị badge trạng thái
  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">Hoạt động</Badge>;
      case "inactive":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">Bị khóa</Badge>;
      default:
        return null;
    }
  };

  // Hiển thị tên vai trò
  const getRoleName = (role) => {
    switch (role) {
      case "admin":
        return "Quản trị viên";
      case "moderator":
        return "Kiểm duyệt viên";
      case "support":
        return "Hỗ trợ viên";
      case "finance":
        return "Nhân viên tài chính";
      default:
        return role;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý tài khoản</h1>
        <Button onClick={handleAddAccount}>
          <UserPlus className="mr-2 h-4 w-4" />
          Thêm tài khoản
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Danh sách tài khoản</CardTitle>
              <CardDescription>Quản lý tài khoản người dùng trong hệ thống</CardDescription>
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
                    <TableCell>{getRoleName(account.role)}</TableCell>
                    <TableCell>{account.department}</TableCell>
                    <TableCell>{getStatusBadge(account.status)}</TableCell>
                    <TableCell>{account.lastLogin}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon" onClick={() => handleEditAccount(account)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => handleChangeRole(account)}>
                          <UserCog className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => handleLockAccount(account)}
                          className={account.status === "inactive" ? "text-green-600" : "text-amber-600"}
                        >
                          <Lock className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => handleDeleteAccount(account)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <UserCog className="h-10 w-10 mb-2" />
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
                onPageChange={(page) => setCurrentPage(page)}
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
                : "Tạo tài khoản mới cho nhân viên trong hệ thống"}
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
                placeholder="example@admin.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Phòng ban</Label>
              <Input
                id="department"
                value={accountForm.department}
                onChange={(e) => setAccountForm({...accountForm, department: e.target.value})}
                placeholder="Quản trị hệ thống, Kiểm duyệt nội dung, ..."
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
                  <SelectItem value="moderator">Kiểm duyệt viên</SelectItem>
                  <SelectItem value="support">Hỗ trợ viên</SelectItem>
                  <SelectItem value="finance">Nhân viên tài chính</SelectItem>
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
                  <SelectItem value="moderator">Kiểm duyệt viên</SelectItem>
                  <SelectItem value="support">Hỗ trợ viên</SelectItem>
                  <SelectItem value="finance">Nhân viên tài chính</SelectItem>
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

      {/* Dialog khóa/mở khóa tài khoản */}
      <AlertDialog open={showLockDialog} onOpenChange={setShowLockDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {accountToLock?.status === "active" ? "Khóa tài khoản" : "Mở khóa tài khoản"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {accountToLock?.status === "active" 
                ? `Bạn có chắc chắn muốn khóa tài khoản của ${accountToLock?.name}? Người dùng này sẽ không thể đăng nhập vào hệ thống.`
                : `Bạn có chắc chắn muốn mở khóa tài khoản của ${accountToLock?.name}? Người dùng này sẽ có thể đăng nhập lại vào hệ thống.`
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmLockAccount}
              className={accountToLock?.status === "active" ? "bg-amber-600 hover:bg-amber-700" : "bg-green-600 hover:bg-green-700"}
            >
              {accountToLock?.status === "active" ? "Khóa tài khoản" : "Mở khóa tài khoản"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
        