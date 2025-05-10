"use client";

import { useRef } from "react";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";

export default function CVControls({ cvData, activeTemplate, setActiveTemplate }) {
  const templates = [
    { id: "modern", name: "Hiện đại" },
    { id: "minimalist", name: "Tối giản" },
    { id: "creative", name: "Sáng tạo" },
  ];

  const handleExportPDF = async () => {
    try {
      const cvElement = document.querySelector(".cv-preview > div");
      if (!cvElement) return;

      const canvas = await toPng(cvElement, { quality: 1 });
      
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      
      const imgProps = pdf.getImageProperties(canvas);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(canvas, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`CV-${cvData.personalInfo.name}.pdf`);
    } catch (error) {
      console.error("Lỗi khi xuất PDF:", error);
      alert("Có lỗi xảy ra khi xuất PDF. Vui lòng thử lại sau.");
    }
  };

  const handleExportImage = async () => {
    try {
      const cvElement = document.querySelector(".cv-preview > div");
      if (!cvElement) return;

      const dataUrl = await toPng(cvElement, { quality: 1 });
      
      const link = document.createElement("a");
      link.download = `CV-${cvData.personalInfo.name}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Lỗi khi xuất ảnh:", error);
      alert("Có lỗi xảy ra khi xuất ảnh. Vui lòng thử lại sau.");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4">Tùy chọn</h2>
      
      <div className="mb-6">
        <h3 className="font-medium mb-2">Chọn mẫu CV</h3>
        <div className="grid grid-cols-3 gap-2">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => setActiveTemplate(template.id)}
              className={`p-2 text-sm rounded-md transition-colors ${
                activeTemplate === template.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {template.name}
            </button>
          ))}
        </div>
      </div>
      
      <div className="space-y-2">
        <button
          onClick={handleExportPDF}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
          </svg>
          Tải xuống PDF
        </button>
        
        <button
          onClick={handleExportImage}
          className="w-full bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
          Tải xuống ảnh PNG
        </button>
      </div>
    </div>
  );
}      
