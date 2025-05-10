"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import apiClient from "@/lib/apiClient";
import { useAuthStore } from "@/store/authStore";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { AlertCircle, User, FileText, FileUp, MessageSquare, Check } from "lucide-react";
import { applicationService } from "@/services/applications";
import { profileService } from "@/services/profile";

export default function ApplyJobDialog({ jobId, jobTitle, children }) {
  const { toast } = useToast();
  const router = useRouter();
  const { isAuthenticated, user: authUser } = useAuthStore();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [userCvs, setUserCvs] = useState([]);
  const [isLoadingCVs, setIsLoadingCVs] = useState(false);
  const [isLoadingUserProfile, setIsLoadingUserProfile] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [selectedCvType, setSelectedCvType] = useState("existing");
  const [selectedCvId, setSelectedCvId] = useState(null);
  const [newCvFile, setNewCvFile] = useState(null);
  const [saveNewCv, setSaveNewCv] = useState(true);
  
  const { register, handleSubmit, reset, setValue, trigger, formState: { errors, isValid } } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      coverLetter: ""
    },
    mode: "onChange" // Validate on change instead of on submit
  });

  // Lấy thông tin profile chi tiết khi dialog mở và user đã đăng nhập
  useEffect(() => {
    if (open && isAuthenticated) {
      fetchUserProfile();
    }
  }, [open, isAuthenticated]);

  // Lấy profile đầy đủ từ API
  const fetchUserProfile = async () => {
    try {
      setIsLoadingUserProfile(true);
      const profileData = await profileService.getProfile();
      setUserProfile(profileData.user);
      
      // Điền thông tin vào form từ profile đầy đủ
      setValue("fullName", profileData.user.fullname || "");
      setValue("email", profileData.user.email || "");
      setValue("phone", profileData.user.phonenum || "");
      
      // Lấy danh sách CV của người dùng
      fetchUserCVs();
    } catch (error) {
      console.error("Lỗi khi tải thông tin người dùng:", error);
      // Sử dụng dữ liệu từ authStore làm backup nếu không lấy được profile
      if (authUser) {
        setValue("fullName", authUser.fullname || "");
        setValue("email", authUser.email || "");
      }
    } finally {
      setIsLoadingUserProfile(false);
    }
  };

  // Lấy danh sách CV của người dùng
  const fetchUserCVs = async () => {
    if (!isAuthenticated) return;
    
    try {
      setIsLoadingCVs(true);
      const response = await apiClient.get('/api/v1/user_cvs');
      setUserCvs(response.data);
      
      // Tự động chọn CV mặc định nếu có
      const defaultCv = response.data.find(cv => cv.is_default);
      if (defaultCv) {
        setSelectedCvId(defaultCv.id);
      } else if (response.data.length > 0) {
        setSelectedCvId(response.data[0].id);
      }
    } catch (error) {
      console.error("Lỗi khi tải danh sách CV:", error);
      toast({
        title: "Lỗi",
        description: "Không thể tải danh sách CV. Vui lòng thử lại sau.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingCVs(false);
    }
  };

  // Kiểm tra CV đã được chọn chưa
  const isCvSelected = () => {
    if (selectedCvType === "existing") {
      return !!selectedCvId;
    } else {
      return !!newCvFile;
    }
  };

  // Chuyển đến bước tiếp theo sau khi validate
  const goToNextStep = async () => {
    if (step === 1) {
      // Validate form trước khi chuyển sang bước tiếp theo
      const isFormValid = await trigger(["fullName", "email", "phone"]);
      if (!isFormValid) {
        toast({
          title: "Thông tin chưa đầy đủ",
          description: "Vui lòng điền đầy đủ thông tin trước khi tiếp tục.",
          variant: "destructive",
        });
        return;
      }
    } else if (step === 2) {
      // Kiểm tra CV có được chọn hay không
      if (!isCvSelected()) {
        toast({
          title: "Chưa có CV",
          description: "Vui lòng chọn CV hoặc tải lên CV mới trước khi tiếp tục.",
          variant: "destructive",
        });
        return;
      }
    }
    
    setStep(step + 1);
  };

  // Quay lại bước trước
  const goToPrevStep = () => {
    setStep(step - 1);
  };

  // Xử lý khi chọn file CV mới
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewCvFile(e.target.files[0]);
    }
  };

  // Xử lý khi gửi đơn ứng tuyển
  const onSubmit = async (data) => {
    if (!isAuthenticated) {
      toast({
        title: "Cần đăng nhập",
        description: "Vui lòng đăng nhập để nộp đơn ứng tuyển.",
        variant: "destructive",
      });
      return;
    }

    // Kiểm tra CV
    if (selectedCvType === "existing" && !selectedCvId) {
      toast({
        title: "Chưa chọn CV",
        description: "Vui lòng chọn CV để ứng tuyển.",
        variant: "destructive",
      });
      return;
    }

    if (selectedCvType === "new" && !newCvFile) {
      toast({
        title: "Chưa chọn file CV",
        description: "Vui lòng chọn file CV để ứng tuyển.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Tạo FormData
      const formData = new FormData();
      formData.append('application[job_id]', jobId);
      formData.append('application[full_name]', data.fullName);
      formData.append('application[email]', data.email);
      formData.append('application[phone]', data.phone);
      formData.append('application[cover_letter]', data.coverLetter || "");
      
      // Thêm CV vào form data
      if (selectedCvType === "existing") {
        formData.append('application[user_cv_id]', selectedCvId);
      } else if (selectedCvType === "new") {
        formData.append('application[cv]', newCvFile);
        formData.append('application[save_cv]', saveNewCv);
        if (saveNewCv) {
          formData.append('application[cv_name]', newCvFile.name.replace(/\.[^/.]+$/, "") || "CV mới");
        }
      }
      
      // Gửi đơn ứng tuyển
      await applicationService.createApplication(formData);
      
      // Hiển thị thông báo thành công
      toast({
        title: "Nộp đơn thành công",
        description: "Đơn ứng tuyển của bạn đã được gửi thành công.",
        variant: "success",
      });
      
      // Đóng dialog và reset form
      setOpen(false);
      reset();
      setStep(1);
      setNewCvFile(null);
      setSelectedCvId(null);
      
      // Chuyển hướng đến trang đơn ứng tuyển
      router.push('/dashboard/applied-jobs');
      
    } catch (error) {
      console.error("Lỗi khi nộp đơn ứng tuyển:", error);
      toast({
        title: "Lỗi",
        description: "Không thể nộp đơn ứng tuyển. Vui lòng thử lại sau.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render nội dung theo bước
  const renderStepContent = () => {
    if (!isAuthenticated) {
      return (
        <div className="flex flex-col items-center py-6">
          <AlertCircle className="h-16 w-16 text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Vui lòng đăng nhập</h3>
          <p className="text-gray-500 mb-6 text-center">
            Bạn cần đăng nhập để nộp đơn ứng tuyển vào vị trí này.
          </p>
          <Button 
            className="w-full" 
            onClick={() => router.push(`/login?returnUrl=/jobs`)}
          >
            Đăng nhập ngay
          </Button>
        </div>
      );
    }

    if (isLoadingUserProfile) {
      return (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2">Đang tải thông tin...</span>
        </div>
      );
    }

    switch (step) {
      case 1:
        return (
          <form className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">
                Họ và tên <span className="text-red-500">*</span>
              </Label>
              <Input
                id="fullName"
                placeholder="Nguyễn Văn A"
                {...register("fullName", { required: "Họ và tên là bắt buộc" })}
                className={errors.fullName ? "border-red-500" : ""}
              />
              {errors.fullName && (
                <p className="text-sm text-red-500">{errors.fullName.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="example@mail.com"
                {...register("email", { 
                  required: "Email là bắt buộc",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email không hợp lệ"
                  }
                })}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">
                Số điện thoại <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                placeholder="0912345678"
                {...register("phone", { 
                  required: "Số điện thoại là bắt buộc",
                  pattern: {
                    value: /^(0|\+84)\d{9,10}$/,
                    message: "Số điện thoại không hợp lệ"
                  }
                })}
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>
          </form>
        );
      
      case 2:
        return (
          <div className="py-4">
            <Tabs defaultValue="existing" onValueChange={setSelectedCvType}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="existing">CV có sẵn</TabsTrigger>
                <TabsTrigger value="new">Tải lên CV mới</TabsTrigger>
              </TabsList>
              
              <TabsContent value="existing" className="pt-4">
                {isLoadingCVs ? (
                  <div className="text-center py-4">Đang tải danh sách CV...</div>
                ) : userCvs.length === 0 ? (
                  <div className="text-center py-4">
                    <p className="mb-4">Bạn chưa có CV nào. Vui lòng tải lên CV mới.</p>
                    <Button onClick={() => setSelectedCvType("new")}>
                      Tải lên CV mới
                    </Button>
                  </div>
                ) : (
                  <RadioGroup 
                    value={selectedCvId?.toString()} 
                    onValueChange={setSelectedCvId}
                    className="space-y-2"
                  >
                    {userCvs.map((cv) => (
                      <div 
                        key={cv.id} 
                        className={`border rounded-md p-3 cursor-pointer flex items-center ${
                          selectedCvId === cv.id ? 'border-blue-500 bg-blue-50' : ''
                        }`}
                        onClick={() => setSelectedCvId(cv.id)}
                      >
                        <RadioGroupItem 
                          value={cv.id.toString()} 
                          id={`cv-${cv.id}`}
                          className="mr-2"
                        />
                        <div className="flex-1">
                          <div className="font-medium flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-blue-500" />
                            {cv.name}
                            {cv.is_default && (
                              <span className="ml-2 bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded">
                                Mặc định
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-500">
                            Cập nhật: {new Date(cv.updated_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                )}

                {userCvs.length === 0 && !isLoadingCVs && (
                  <div className="mt-4 p-3 border border-yellow-200 bg-yellow-50 rounded text-yellow-800 text-sm">
                    <AlertCircle className="h-4 w-4 inline-block mr-2" />
                    Bạn cần ít nhất một CV để nộp đơn ứng tuyển.
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="new" className="pt-4">
                <div className="space-y-4">
                  <div 
                    className={`border-2 border-dashed ${newCvFile ? 'border-blue-300' : 'border-gray-300'} rounded-md p-6 text-center`}
                  >
                    <FileUp className={`h-10 w-10 mx-auto mb-2 ${newCvFile ? 'text-blue-500' : 'text-gray-400'}`} />
                    <div className="text-sm">
                      <label htmlFor="cv-upload" className="cursor-pointer text-blue-500 hover:text-blue-700">
                        Chọn file
                      </label>{" "}
                      hoặc kéo thả file vào đây
                    </div>
                    <input
                      id="cv-upload"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Chấp nhận file PDF, DOC, DOCX. Tối đa 5MB
                    </p>
                  </div>
                  
                  {newCvFile && (
                    <div className="bg-blue-50 p-3 rounded-md flex items-center">
                      <FileText className="h-5 w-5 text-blue-500 mr-2" />
                      <div className="flex-1 truncate">{newCvFile.name}</div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setNewCvFile(null)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Xóa
                      </Button>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="save-cv"
                      checked={saveNewCv}
                      onCheckedChange={setSaveNewCv}
                    />
                    <Label htmlFor="save-cv">Lưu CV này vào hệ thống</Label>
                  </div>

                  {!newCvFile && (
                    <div className="mt-2 p-3 border border-yellow-200 bg-yellow-50 rounded text-yellow-800 text-sm">
                      <AlertCircle className="h-4 w-4 inline-block mr-2" />
                      Vui lòng tải lên CV của bạn để tiếp tục.
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        );
      
      case 3:
        return (
          <div className="py-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="coverLetter">Thư xin việc (Tùy chọn)</Label>
                <Textarea
                  id="coverLetter"
                  placeholder="Viết thư giới thiệu về bản thân và lý do bạn muốn ứng tuyển vào vị trí này..."
                  rows={8}
                  className="mt-1"
                  {...register("coverLetter")}
                />
              </div>
              <p className="text-sm text-gray-500">
                Thư xin việc là cơ hội để bạn thể hiện sự quan tâm đến vị trí này và giải thích tại sao bạn là ứng viên phù hợp.
              </p>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const renderDialogFooter = () => {
    if (!isAuthenticated) {
      return null;
    }

    return (
      <DialogFooter>
        {step > 1 && (
          <Button
            type="button"
            variant="outline"
            onClick={goToPrevStep}
            disabled={isSubmitting || isLoadingUserProfile}
          >
            Quay lại
          </Button>
        )}
        
        {step < 3 ? (
          <Button 
            type="button" 
            onClick={goToNextStep}
            disabled={isSubmitting || isLoadingUserProfile || (step === 2 && !isCvSelected())}
          >
            Tiếp tục
          </Button>
        ) : (
          <Button 
            type="button" 
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin mr-2">●</span>
                Đang gửi...
              </>
            ) : (
              <>Nộp đơn ứng tuyển</>
            )}
          </Button>
        )}
      </DialogFooter>
    );
  };

  const renderStepIndicator = () => {
    if (!isAuthenticated) return null;
    
    return (
      <div className="flex items-center justify-center mb-6">
        <div className="w-full max-w-xs">
          <div className="relative">
            <div className="flex justify-between mb-1">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                  step >= 1 ? 'bg-blue-500 border-blue-500 text-white' : 'border-gray-300'
                }`}>
                  {step > 1 ? <Check className="h-4 w-4" /> : <User className="h-4 w-4" />}
                </div>
                <span className="text-xs mt-1">Thông tin</span>
              </div>
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                  step >= 2 ? 'bg-blue-500 border-blue-500 text-white' : 'border-gray-300'
                }`}>
                  {step > 2 ? <Check className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
                </div>
                <span className="text-xs mt-1">CV</span>
              </div>
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                  step >= 3 ? 'bg-blue-500 border-blue-500 text-white' : 'border-gray-300'
                }`}>
                  <MessageSquare className="h-4 w-4" />
                </div>
                <span className="text-xs mt-1">Thư xin việc</span>
              </div>
            </div>
            <div className="relative flex items-center justify-between">
              <div className="absolute left-[calc(16.67%)] right-[calc(16.67%)] h-0.5 bg-gray-200">
                <div 
                  className="absolute left-0 h-0.5 bg-blue-500"
                  style={{ width: `${(step - 1) * 50}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle>Ứng tuyển vào vị trí {jobTitle}</DialogTitle>
          <DialogDescription>
            Hoàn thành thông tin dưới đây để nộp đơn ứng tuyển
          </DialogDescription>
        </DialogHeader>
        
        {renderStepIndicator()}
        {renderStepContent()}
        {renderDialogFooter()}
      </DialogContent>
    </Dialog>
  );
} 
