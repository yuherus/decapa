"use client";

import { useState } from "react";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Badge 
} from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Briefcase,
  Building,
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  CheckCircle,
  XCircle,
  Eye,
  Mail,
  MessageSquare,
  CheckCircle2
} from "lucide-react";
import PaginationBar from "@/components/shared/PaginationBar";

export default function JobInvitationPage() {
  // Dữ liệu mẫu cho danh sách lời mời
  const [invitations, setInvitations] = useState([
    {
      id: 1,
      jobTitle: "Senior Frontend Developer",
      companyName: "Tech Solutions Inc.",
      companyLogo: "/company-logos/tech-solutions.png",
      location: "Hà Nội",
      salary: "25-35 triệu VNĐ",
      receivedDate: "2023-10-15",
      status: "pending", // pending, accepted, rejected
      description: "Chúng tôi đang tìm kiếm một Senior Frontend Developer có kinh nghiệm làm việc với React và TypeScript để tham gia vào đội ngũ phát triển sản phẩm của chúng tôi.",
      requirements: [
        "Tối thiểu 3 năm kinh nghiệm với React",
        "Thành thạo TypeScript và JavaScript",
        "Kinh nghiệm với Redux, GraphQL là một lợi thế",
        "Có khả năng làm việc độc lập và theo nhóm"
      ],
      benefits: [
        "Lương cạnh tranh",
        "Bảo hiểm sức khỏe",
        "Thưởng cuối năm",
        "Môi trường làm việc năng động"
      ],
      deadline: "2023-11-15",
      matchingScore: 85,
      message: "Chúng tôi rất ấn tượng với kinh nghiệm của bạn trong lĩnh vực phát triển Frontend. Chúng tôi tin rằng bạn sẽ là một thành viên tuyệt vời trong đội ngũ của chúng tôi."
    },
    {
      id: 2,
      jobTitle: "Backend Developer",
      companyName: "Digital Innovations",
      companyLogo: "/company-logos/digital-innovations.png",
      location: "TP. Hồ Chí Minh",
      salary: "20-30 triệu VNĐ",
      receivedDate: "2023-10-10",
      status: "accepted",
      description: "Digital Innovations đang tìm kiếm một Backend Developer có kinh nghiệm với Node.js và MongoDB để tham gia vào dự án mới của chúng tôi.",
      requirements: [
        "Tối thiểu 2 năm kinh nghiệm với Node.js",
        "Kinh nghiệm với MongoDB và Express",
        "Hiểu biết về RESTful API và GraphQL",
        "Có khả năng làm việc trong môi trường Agile"
      ],
      benefits: [
        "Lương cạnh tranh",
        "Chế độ làm việc linh hoạt",
        "Cơ hội học tập và phát triển",
        "Môi trường làm việc quốc tế"
      ],
      deadline: "2023-11-10",
      matchingScore: 90,
      message: "Hồ sơ của bạn rất phù hợp với vị trí Kỹ sư Backend tại công ty chúng tôi. Chúng tôi đặc biệt ấn tượng với kinh nghiệm của bạn trong việc xây dựng các hệ thống có khả năng mở rộng cao."
    },
    {
      id: 3,
      jobTitle: "UX/UI Designer",
      companyName: "Creative Studio",
      companyLogo: "/company-logos/creative-studio.png",
      location: "Đà Nẵng",
      salary: "15-25 triệu VNĐ",
      receivedDate: "2023-10-05",
      status: "rejected",
      description: "Creative Studio đang tìm kiếm một UX/UI Designer tài năng để tham gia vào đội ngũ thiết kế của chúng tôi.",
      requirements: [
        "Tối thiểu 2 năm kinh nghiệm thiết kế UX/UI",
        "Thành thạo Figma, Adobe XD",
        "Portfolio thể hiện khả năng thiết kế",
        "Hiểu biết về quy trình thiết kế người dùng"
      ],
      benefits: [
        "Môi trường làm việc sáng tạo",
        "Cơ hội làm việc với các dự án đa dạng",
        "Chế độ đãi ngộ hấp dẫn",
        "Cơ hội phát triển nghề nghiệp"
      ],
      deadline: "2023-11-05",
      matchingScore: 75,
      message: "Chúng tôi rất ấn tượng với portfolio của bạn và muốn mời bạn tham gia vào đội ngũ thiết kế của chúng tôi. Chúng tôi tin rằng bạn sẽ mang đến những ý tưởng sáng tạo cho các sản phẩm của chúng tôi."
    },
    {
      id: 4,
      jobTitle: "DevOps Engineer",
      companyName: "Cloud Systems",
      companyLogo: "/company-logos/cloud-systems.png",
      location: "Hà Nội",
      salary: "30-40 triệu VNĐ",
      receivedDate: "2023-10-01",
      status: "pending",
      description: "Cloud Systems đang tìm kiếm một DevOps Engineer có kinh nghiệm với AWS và Docker để tham gia vào đội ngũ vận hành của chúng tôi.",
      requirements: [
        "Tối thiểu 3 năm kinh nghiệm với AWS",
        "Kinh nghiệm với Docker và Kubernetes",
        "Hiểu biết về CI/CD pipeline",
        "Kỹ năng giải quyết vấn đề tốt"
      ],
      benefits: [
        "Lương cạnh tranh",
        "Chế độ làm việc từ xa linh hoạt",
        "Cơ hội học tập và phát triển",
        "Môi trường làm việc quốc tế"
      ],
      deadline: "2023-11-01",
      matchingScore: 80,
      message: "Chúng tôi đang xây dựng một đội ngũ DevOps mạnh mẽ và tin rằng kinh nghiệm của bạn sẽ là một phần quan trọng trong việc nâng cao hệ thống của chúng tôi. Chúng tôi rất mong được làm việc với bạn."
    }
  ]);

  // State cho trang hiện tại
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedInvitation, setSelectedInvitation] = useState(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  // Lọc lời mời theo tab
  const filteredInvitations = invitations.filter(invitation => {
    if (activeTab === "all") return true;
    return invitation.status === activeTab;
  });

  // Phân trang
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredInvitations.length / itemsPerPage);
  const currentInvitations = filteredInvitations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewDetail = (invitation) => {
    setSelectedInvitation(invitation);
    setShowDetailDialog(true);
  };

  const handleAcceptInvitation = (id) => {
    setInvitations(invitations.map(inv => 
      inv.id === id ? { ...inv, status: 'accepted' } : inv
    ));
    setShowConfirmDialog(false);
  };

  const handleRejectInvitation = (id) => {
    setInvitations(invitations.map(inv => 
      inv.id === id ? { ...inv, status: 'rejected' } : inv
    ));
    setShowConfirmDialog(false);
  };

  const showConfirmationDialog = (action, invitation) => {
    setSelectedInvitation(invitation);
    setConfirmAction(action);
    setShowConfirmDialog(true);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">Đang chờ</Badge>;
      case "accepted":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">Đã chấp nhận</Badge>;
      case "rejected":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">Đã từ chối</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Lời mời tuyển dụng</h1>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="all">Tất cả</TabsTrigger>
          <TabsTrigger value="pending">Đang chờ</TabsTrigger>
          <TabsTrigger value="accepted">Đã chấp nhận</TabsTrigger>
        </TabsList>
      </Tabs>

      {currentInvitations.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Mail className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Không có lời mời nào</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Bạn chưa nhận được lời mời tuyển dụng nào trong danh mục này.
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {currentInvitations.map((invitation) => (
              <Card key={invitation.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="p-6 flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold mb-1">{invitation.jobTitle}</h3>
                          <div className="flex items-center text-gray-600 mb-2">
                            <Building className="h-4 w-4 mr-1" />
                            <span>{invitation.companyName}</span>
                          </div>
                        </div>
                        <div>
                          {getStatusBadge(invitation.status)}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4 text-sm">
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{invitation.location}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <DollarSign className="h-4 w-4 mr-2" />
                          <span>{invitation.salary}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>Nhận: {new Date(invitation.receivedDate).toLocaleDateString('vi-VN')}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>Hạn: {new Date(invitation.deadline).toLocaleDateString('vi-VN')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 flex flex-row md:flex-col justify-between items-center md:w-48">
                      <Button 
                        variant="outline" 
                        className="w-full mb-0 md:mb-2"
                        onClick={() => handleViewDetail(invitation)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Chi tiết
                      </Button>
                      
                      {invitation.status === "pending" && (
                        <div className="flex flex-col space-y-2 w-full mt-2">
                          <Button 
                            variant="default" 
                            className="w-full bg-green-600 hover:bg-green-700"
                            onClick={() => showConfirmationDialog('accept', invitation)}
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Chấp nhận
                          </Button>
                          <Button 
                            variant="outline" 
                            className="w-full text-red-600 border-red-200 hover:bg-red-50"
                            onClick={() => showConfirmationDialog('reject', invitation)}
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Từ chối
                          </Button>
                        </div>
                      )}
                      
                      {invitation.status === "accepted" && (
                        <Button 
                          variant="outline" 
                          className="w-full"
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Liên hệ
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <PaginationBar 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={handlePageChange} 
              />
            </div>
          )}
        </>
      )}

      {/* Dialog chi tiết lời mời */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-3xl">
          {selectedInvitation && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">{selectedInvitation.jobTitle}</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6 my-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full mr-4 flex items-center justify-center">
                      <Building className="h-6 w-6 text-gray-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">{selectedInvitation.companyName}</h3>
                      <p className="text-sm text-gray-600">{selectedInvitation.location}</p>
                    </div>
                  </div>
                  <div>
                    {getStatusBadge(selectedInvitation.status)}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-gray-500 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Mức lương</p>
                      <p className="font-medium">{selectedInvitation.salary}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Ngày nhận lời mời</p>
                      <p className="font-medium">{new Date(selectedInvitation.receivedDate).toLocaleDateString('vi-VN')}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-500 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Hạn phản hồi</p>
                      <p className="font-medium">{new Date(selectedInvitation.deadline).toLocaleDateString('vi-VN')}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-2">Mô tả công việc</h3>
                  <p className="text-gray-700">{selectedInvitation.description}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-2">Yêu cầu</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {selectedInvitation.requirements.map((req, index) => (
                      <li key={index} className="text-gray-700">{req}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-2">Quyền lợi</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {selectedInvitation.benefits.map((benefit, index) => (
                      <li key={index} className="text-gray-700">{benefit}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <DialogFooter>
                {selectedInvitation.status === "pending" ? (
                  <div className="flex space-x-2 w-full">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => setShowDetailDialog(false)}
                    >
                      Đóng
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
                      onClick={() => showConfirmationDialog('reject', selectedInvitation)}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Từ chối
                    </Button>
                    <Button 
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      onClick={() => showConfirmationDialog('accept', selectedInvitation)}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Chấp nhận
                    </Button>
                  </div>
                ) : (
                  <Button 
                    variant="outline" 
                    onClick={() => setShowDetailDialog(false)}
                  >
                    Đóng
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog xác nhận */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {confirmAction === 'accept' ? 'Chấp nhận lời mời' : 'Từ chối lời mời'}
            </DialogTitle>
            <DialogDescription>
              {confirmAction === 'accept' 
                ? 'Khi chấp nhận lời mời, thông tin cá nhân của bạn sẽ được chia sẻ với nhà tuyển dụng và họ có thể liên hệ với bạn trực tiếp.'
                : 'Bạn có chắc chắn muốn từ chối lời mời tuyển dụng này?'
              }
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              Hủy
            </Button>
            <Button 
              variant={confirmAction === 'accept' ? 'default' : 'outline'}
              className={confirmAction === 'accept' 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'text-red-600 border-red-600 hover:bg-red-50'
              }
              onClick={() => {
                if (confirmAction === 'accept') {
                  handleAcceptInvitation(selectedInvitation.id);
                } else {
                  handleRejectInvitation(selectedInvitation.id);
                }
              }}
            >
              {confirmAction === 'accept' ? 'Chấp nhận' : 'Từ chối'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 
