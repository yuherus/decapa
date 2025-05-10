"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

// Tạo loading component
const LoadingComponent = () => (
  <div className="flex items-center justify-center h-full w-full border rounded-md bg-gray-50">
    <div className="text-gray-400">Đang tải tài liệu...</div>
  </div>
);

// Sử dụng dynamic import với ssr: false
const DocViewerComponent = dynamic(
  () => import("@cyntler/react-doc-viewer").then((mod) => {
    return mod.default
  }),
  { ssr: false, loading: LoadingComponent }
);

export default function PdfPreview({ fileUrl, fileName }) {
  const [mounted, setMounted] = useState(false);
  
  // Sử dụng useEffect để tránh lỗi hydration
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Nếu chưa mount, hiển thị loading
  if (!mounted) {
    return <LoadingComponent />;
  }
  
  // Các cấu hình cho DocViewer
  const config = {
    header: {
      disableHeader: true,
      disableFileName: true,
      retainURLParams: true
    },
    pdfZoom: {
      defaultZoom: 1.1,
      zoomJump: 0.2
    }
  };
  
  // Document cần xem
  const documents = [
    { uri: fileUrl, fileName: fileName || "document.pdf" }
  ];
  
  // Chỉ hiển thị DocViewer khi đã mount
  return (
    <div className="h-full w-full rounded-md">
      <DocViewerComponent
        documents={documents}
        style={{ height: "100%", width: "100%" }}
        config={config}
      />
    </div>
  );
} 
