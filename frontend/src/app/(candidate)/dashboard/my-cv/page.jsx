"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Upload, 
  Eye, 
  Trash2, 
  Plus, 
  Download,
  Calendar,
  CheckCircle
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/utils";
import apiClient from '@/lib/apiClient';
import { Checkbox } from "@/components/ui/checkbox";
import PdfPreview from "./components/PdfPreview";

export default function MyCVDashboard() {
  const [cvList, setCvList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // State cho dialog xem trước CV
  const [previewCV, setPreviewCV] = useState(null);
  const [showPreviewDialog, setShowPreviewDialog] = useState(false);
  
  // State cho dialog upload CV
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [cvTitle, setCvTitle] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [setAsDefault, setSetAsDefault] = useState(false);

  const fileInputRef = useRef(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  // Hàm để lấy URL đầy đủ
  const getFullUrl = (path) => {
    if (!path) return '';
    
    // Nếu path đã là URL đầy đủ, trả về nguyên bản
    if (path.startsWith('http')) {
      return path;
    }
    
    // Nếu không, thêm API base URL vào trước
    return `${API_BASE_URL}${path}`;
  };

  // Fetch CV list
  useEffect(() => {
    const fetchCVs = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get('/api/v1/user_cvs');
        setCvList(response.data);
      } catch (err) {
        console.error("Lỗi khi tải danh sách CV:", err);
        setError("Không thể tải danh sách CV. Vui lòng thử lại sau.");
        toast({
          title: "Lỗi",
          description: "Không thể tải danh sách CV. Vui lòng thử lại sau.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCVs();
  }, []);

  const handlePreview = (cv) => {
    setPreviewCV(cv);
    setShowPreviewDialog(true);
  };

  const handleDelete = async (cvId) => {
    if (confirm("Bạn có chắc chắn muốn xóa CV này không?")) {
      try {
        await apiClient.delete(`/api/v1/user_cvs/${cvId}`);
        setCvList(cvList.filter(cv => cv.id !== cvId));
        toast({
          title: "Thành công",
          description: "Đã xóa CV thành công",
          variant: "success",
        });
      } catch (err) {
        console.error("Lỗi khi xóa CV:", err);
        toast({
          title: "Lỗi",
          description: "Không thể xóa CV. Vui lòng thử lại sau.",
          variant: "destructive",
        });
      }
    }
  };

  const handleSetDefault = async (cvId) => {
    try {
      await apiClient.put(`/api/v1/user_cvs/${cvId}/set_default`);
      
      // Cập nhật state
      setCvList(cvList.map(cv => ({
        ...cv,
        is_default: cv.id === cvId
      })));
      
      toast({
        title: "Thành công",
        description: "Đã đặt CV mặc định thành công",
        variant: "success",
      });
    } catch (err) {
      console.error("Lỗi khi đặt CV mặc định:", err);
      toast({
        title: "Lỗi",
        description: "Không thể đặt CV mặc định. Vui lòng thử lại sau.",
        variant: "destructive",
      });
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!uploadFile || !cvTitle.trim()) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập tiêu đề CV và chọn file để tải lên",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsUploading(true);
      
      // Tạo FormData
      const formData = new FormData();
      formData.append('user_cv[name]', cvTitle);
      formData.append('user_cv[file]', uploadFile);
      
      // Đặt làm mặc định nếu được chọn hoặc không có CV nào
      const shouldSetDefault = setAsDefault || cvList.length === 0;
      if (shouldSetDefault) {
        formData.append('user_cv[is_default]', true);
      }
      
      const response = await apiClient.post('/api/v1/user_cvs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Nếu CV mới được đặt làm mặc định, cập nhật state tất cả CV khác
      if (shouldSetDefault) {
        setCvList(cvList.map(cv => ({
          ...cv,
          is_default: false
        })));
      }
      
      // Thêm CV mới vào danh sách
      setCvList([...cvList.map(cv => ({
        ...cv,
        is_default: shouldSetDefault ? false : cv.is_default
      })), response.data]);
      
      // Đóng dialog và reset form
      setShowUploadDialog(false);
      setCvTitle("");
      setUploadFile(null);
      setSetAsDefault(false);
      
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      
      toast({
        title: "Thành công",
        description: "Đã tải lên CV thành công",
        variant: "success",
      });
      
    } catch (err) {
      console.error("Lỗi khi tải lên CV:", err);
      toast({
        title: "Lỗi",
        description: "Không thể tải lên CV. Vui lòng thử lại sau.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownload = async (cv) => {
    try {
      window.open(getFullUrl(cv.file_url), '_blank');
    } catch (err) {
      console.error("Lỗi khi tải xuống CV:", err);
      toast({
        title: "Lỗi",
        description: "Không thể tải xuống CV. Vui lòng thử lại sau.",
        variant: "destructive",
      });
    }
  };

  // Hiển thị skeleton loading
  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Quản lý CV của tôi</h1>
          <div className="flex gap-3">
            <Skeleton className="h-9 w-32" />
            <Skeleton className="h-9 w-32" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4 mb-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="border shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Skeleton className="w-12 h-12 rounded-md mr-4" />
                  <div className="flex-1">
                    <Skeleton className="h-6 w-64 mb-2" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Skeleton className="h-9 w-32" />
                    <Skeleton className="h-9 w-9 rounded-full" />
                    <Skeleton className="h-9 w-9 rounded-full" />
                    <Skeleton className="h-9 w-9 rounded-full" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Hiển thị lỗi
  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-12">
          <div className="text-red-500 text-xl mb-4">
            {error}
          </div>
          <Button onClick={() => window.location.reload()}>
            Thử lại
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý CV của tôi</h1>
        <div className="flex gap-3">
          <Button 
            onClick={() => setShowUploadDialog(true)}
            variant="outline"
          >
            <Upload className="mr-2 h-4 w-4" />
            Tải lên CV
          </Button>
          <Button asChild>
            <Link href="/create-cv">
              <Plus className="mr-2 h-4 w-4" />
              Tạo CV mới
            </Link>
          </Button>
        </div>
      </div>

      {cvList.length === 0 ? (
        <Card className="text-center p-10">
          <CardContent className="pt-10">
            <FileText className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-medium mb-2">Bạn chưa có CV nào</h3>
            <p className="text-gray-500 mb-6">Tạo CV mới hoặc tải lên CV hiện có để bắt đầu</p>
            <div className="flex justify-center gap-4">
              <Button 
                onClick={() => setShowUploadDialog(true)}
                variant="outline"
              >
                <Upload className="mr-2 h-4 w-4" />
                Tải lên CV
              </Button>
              <Button asChild>
                <Link href="/create-cv">
                  <Plus className="mr-2 h-4 w-4" />
                  Tạo CV mới
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 mb-6">
            {cvList.map((cv) => (
              <Card key={cv.id} className="border shadow-sm">
                <CardContent className="p-0">
                  <div className="flex items-center p-4">
                    <div className="w-12 h-12 rounded-md bg-blue-100 flex items-center justify-center mr-4">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-medium">{cv.name}</h3>
                            {cv.is_default && (
                              <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full flex items-center">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Mặc định
                              </span>
                            )}
                          </div>
                          <div className="mt-1 flex items-center text-gray-500 text-sm">
                            <span className="inline-block mr-4">Tên file: {cv.file_name}</span>
                            <div className="flex items-center">
                              <Calendar className="h-3.5 w-3.5 mr-1" />
                              <span>Tạo ngày: {formatDate(cv.created_at)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {!cv.is_default && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleSetDefault(cv.id)}
                          className="text-xs"
                        >
                          Đặt làm CV chính
                        </Button>
                      )}
                      
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handlePreview(cv)}
                        className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                      >
                        <Eye className="h-5 w-5" />
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDownload(cv)}
                        className="text-green-600 hover:text-green-800 hover:bg-green-50"
                      >
                        <Download className="h-5 w-5" />
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDelete(cv.id)}
                        className="text-red-600 hover:text-red-800 hover:bg-red-50"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* Dialog xem trước CV */}
      {showPreviewDialog && (
        <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
          <DialogContent className="max-w-4xl h-[80vh]">
            <DialogHeader>
              <DialogTitle>{previewCV?.name}</DialogTitle>
            </DialogHeader>
            {previewCV && (
              <div className="flex-1 overflow-auto h-full">
                <PdfPreview 
                  fileUrl={getFullUrl(previewCV.file_url)}
                  fileName={previewCV.file_name}
                />
              </div>
            )}
            <DialogFooter>
              <Button onClick={() => setShowPreviewDialog(false)}>Đóng</Button>
              {previewCV && (
                <Button variant="outline" onClick={() => handleDownload(previewCV)}>
                  <Download className="mr-2 h-4 w-4" />
                  Tải xuống
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Dialog upload CV */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tải lên CV mới</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpload}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="cv-title">Tiêu đề CV</Label>
                <Input 
                  id="cv-title" 
                  placeholder="Nhập tiêu đề CV" 
                  value={cvTitle}
                  onChange={(e) => setCvTitle(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cv-file">File CV (PDF)</Label>
                <Input 
                  id="cv-file" 
                  type="file" 
                  accept=".pdf"
                  ref={fileInputRef}
                  onChange={(e) => setUploadFile(e.target.files[0])}
                  required
                />
                <p className="text-xs text-gray-500">Chỉ chấp nhận file PDF, kích thước tối đa 5MB</p>
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <Checkbox 
                  id="set-as-default" 
                  checked={setAsDefault}
                  onCheckedChange={setSetAsDefault} 
                />
                <Label 
                  htmlFor="set-as-default" 
                  className="cursor-pointer text-sm font-normal"
                >
                  Đặt làm CV mặc định
                </Label>
              </div>
            </div>
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowUploadDialog(false)}
                disabled={isUploading}
              >
                Huỷ
              </Button>
              <Button type="submit" disabled={isUploading}>
                {isUploading ? "Đang tải lên..." : "Tải lên"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
} 
