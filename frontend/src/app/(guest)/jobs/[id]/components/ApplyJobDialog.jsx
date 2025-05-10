import { useState } from "react";
import { useForm } from "react-hook-form";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import apiClient from "@/lib/apiClient";

export default function ApplyJobDialog({ open, onOpenChange, job }) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      coverLetter: ""
    }
  });
  
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append("application[job_id]", job.id);
      formData.append("application[full_name]", data.fullName);
      formData.append("application[email]", data.email);
      formData.append("application[phone]", data.phone);
      formData.append("application[cover_letter]", data.coverLetter);
      
      if (selectedFile) {
        formData.append("application[cv]", selectedFile);
      }
      
      // Gọi API để nộp đơn ứng tuyển
      // await apiClient.post("/api/v1/applications", formData);
      
      toast({
        title: "Ứng tuyển thành công",
        description: "Đơn ứng tuyển của bạn đã được gửi đến nhà tuyển dụng.",
        variant: "success"
      });
      
      reset();
      setSelectedFile(null);
      onOpenChange(false);
    } catch (error) {
      console.error("Lỗi khi ứng tuyển:", error);
      toast({
        title: "Ứng tuyển thất bại",
        description: "Có lỗi xảy ra khi gửi đơn ứng tuyển. Vui lòng thử lại sau.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File quá lớn",
          description: "Kích thước file không được vượt quá 5MB",
          variant: "destructive"
        });
        e.target.value = "";
        return;
      }
      
      if (!["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(file.type)) {
        toast({
          title: "Định dạng file không hỗ trợ",
          description: "Chỉ hỗ trợ file PDF, DOC, DOCX",
          variant: "destructive"
        });
        e.target.value = "";
        return;
      }
      
      setSelectedFile(file);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Ứng tuyển vị trí {job?.title}</DialogTitle>
          <DialogDescription>
            Điền thông tin của bạn để ứng tuyển vào vị trí này tại {job?.company}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="fullName">Họ và tên <span className="text-red-500">*</span></Label>
              <Input
                id="fullName"
                {...register("fullName", { required: "Vui lòng nhập họ tên" })}
              />
              {errors.fullName && (
                <p className="text-sm text-red-500">{errors.fullName.message}</p>
              )}
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
              <Input
                id="email"
                type="email"
                {...register("email", { 
                  required: "Vui lòng nhập email",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email không hợp lệ"
                  }
                })}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="phone">Số điện thoại <span className="text-red-500">*</span></Label>
              <Input
                id="phone"
                {...register("phone", { 
                  required: "Vui lòng nhập số điện thoại",
                  pattern: {
                    value: /^[0-9]{10,11}$/,
                    message: "Số điện thoại không hợp lệ"
                  }
                })}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="cv">CV của bạn <span className="text-red-500">*</span></Label>
              <Input
                id="cv"
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                required
              />
              <p className="text-xs text-gray-500">Hỗ trợ định dạng PDF, DOC, DOCX. Tối đa 5MB.</p>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="coverLetter">Thư giới thiệu</Label>
              <Textarea
                id="coverLetter"
                placeholder="Giới thiệu ngắn gọn về bản thân và lý do bạn muốn ứng tuyển vị trí này"
                {...register("coverLetter")}
                rows={4}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Hủy
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Đang gửi..." : "Gửi đơn ứng tuyển"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 
