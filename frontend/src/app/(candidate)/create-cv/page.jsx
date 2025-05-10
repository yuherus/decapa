"use client";

import { useState } from "react";
import CVEditor from "./components/CVEditor";
import CVPreview from "./components/CVPreview";
import CVControls from "./components/CVControls";

export default function CreateCVPage() {
  const [cvData, setCvData] = useState({
    personalInfo: {
      name: "Nguyễn Văn A",
      title: "Kỹ sư phần mềm",
      email: "nguyenvana@example.com",
      phone: "0912345678",
      address: "Hà Nội, Việt Nam",
      summary: "Kỹ sư phần mềm với 5 năm kinh nghiệm phát triển ứng dụng web.",
    },
    sections: [
      {
        id: "education",
        title: "Học vấn",
        items: [
          {
            id: "edu-1",
            title: "Đại học Bách Khoa Hà Nội",
            subtitle: "Kỹ sư Công nghệ thông tin",
            date: "2015 - 2019",
            description: "Tốt nghiệp loại giỏi, điểm trung bình 8.5/10",
          },
        ],
      },
      {
        id: "experience",
        title: "Kinh nghiệm làm việc",
        items: [
          {
            id: "exp-1",
            title: "Công ty ABC",
            subtitle: "Kỹ sư phần mềm",
            date: "2019 - Hiện tại",
            description: "Phát triển và bảo trì các ứng dụng web sử dụng React, Node.js và MongoDB.",
          },
          {
            id: "exp-2",
            title: "Công ty XYZ",
            subtitle: "Thực tập sinh",
            date: "2018 - 2019",
            description: "Hỗ trợ team phát triển các tính năng mới cho ứng dụng di động.",
          },
        ],
      },
      {
        id: "skills",
        title: "Kỹ năng",
        items: [
          {
            id: "skill-1",
            title: "Ngôn ngữ lập trình",
            description: "JavaScript, TypeScript, Python, Java",
          },
          {
            id: "skill-2",
            title: "Công nghệ",
            description: "React, Node.js, Express, MongoDB, PostgreSQL",
          },
          {
            id: "skill-3",
            title: "Công cụ",
            description: "Git, Docker, AWS, CI/CD",
          },
        ],
      },
    ],
  });

  const [activeTemplate, setActiveTemplate] = useState("modern");

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Tạo CV Online</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/3">
          <CVEditor cvData={cvData} setCvData={setCvData} />
          <CVControls 
            cvData={cvData} 
            activeTemplate={activeTemplate}
            setActiveTemplate={setActiveTemplate}
          />
        </div>
        
        <div className="w-full lg:w-2/3">
          <CVPreview cvData={cvData} template={activeTemplate} />
        </div>
      </div>
    </div>
  );
}
