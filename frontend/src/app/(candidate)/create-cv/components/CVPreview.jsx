"use client";

import { useRef } from "react";

export default function CVPreview({ cvData, template }) {
  const cvRef = useRef(null);

  const renderModernTemplate = () => (
    <div className="bg-white shadow-lg p-8 min-h-[1056px] max-w-[816px] mx-auto">
      <div className="border-b-2 border-blue-600 pb-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{cvData.personalInfo.name}</h1>
        <p className="text-xl text-blue-600 mt-1">{cvData.personalInfo.title}</p>
        
        <div className="mt-4 text-gray-600 flex flex-wrap gap-x-4 gap-y-2">
          <div>{cvData.personalInfo.email}</div>
          <div>{cvData.personalInfo.phone}</div>
          <div>{cvData.personalInfo.address}</div>
        </div>
        
        <p className="mt-4 text-gray-700">{cvData.personalInfo.summary}</p>
      </div>
      
      <div className="space-y-6">
        {cvData.sections.map((section) => (
          <div key={section.id} className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 border-b border-gray-300 pb-2 mb-3">
              {section.title}
            </h2>
            <div className="space-y-4">
              {section.items.map((item) => (
                <div key={item.id} className="mb-3">
                  <div className="flex justify-between">
                    <h3 className="font-bold text-gray-800">{item.title}</h3>
                    <span className="text-gray-600">{item.date}</span>
                  </div>
                  <p className="text-blue-600">{item.subtitle}</p>
                  <p className="mt-1 text-gray-700">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMinimalistTemplate = () => (
    <div className="bg-white shadow-lg p-8 min-h-[1056px] max-w-[816px] mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{cvData.personalInfo.name}</h1>
        <p className="text-xl text-gray-600 mt-1">{cvData.personalInfo.title}</p>
        
        <div className="mt-4 text-gray-600 flex justify-center flex-wrap gap-x-4 gap-y-2">
          <div>{cvData.personalInfo.email}</div>
          <div>{cvData.personalInfo.phone}</div>
          <div>{cvData.personalInfo.address}</div>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-6 mb-6">
        <p className="text-gray-700">{cvData.personalInfo.summary}</p>
      </div>
      
      <div className="space-y-8">
        {cvData.sections.map((section) => (
          <div key={section.id} className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider mb-4">
              {section.title}
            </h2>
            <div className="space-y-6">
              {section.items.map((item) => (
                <div key={item.id} className="mb-3">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-gray-800">{item.title}</h3>
                    <span className="text-gray-600 text-sm">{item.date}</span>
                  </div>
                  <p className="text-gray-700 italic">{item.subtitle}</p>
                  <p className="mt-2 text-gray-700">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCreativeTemplate = () => (
    <div className="bg-white shadow-lg min-h-[1056px] max-w-[816px] mx-auto flex">
      <div className="w-1/3 bg-blue-800 text-white p-6">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold">{cvData.personalInfo.name}</h1>
          <p className="mt-1 text-blue-200">{cvData.personalInfo.title}</p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-lg font-bold border-b border-blue-600 pb-2 mb-3">Thông tin liên hệ</h2>
          <div className="space-y-2 text-sm">
            <p>{cvData.personalInfo.email}</p>
            <p>{cvData.personalInfo.phone}</p>
            <p>{cvData.personalInfo.address}</p>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-lg font-bold border-b border-blue-600 pb-2 mb-3">Tóm tắt</h2>
          <p className="text-sm">{cvData.personalInfo.summary}</p>
        </div>
        
        {cvData.sections
          .filter(section => section.id === "skills")
          .map((section) => (
            <div key={section.id} className="mb-6">
              <h2 className="text-lg font-bold border-b border-blue-600 pb-2 mb-3">
                {section.title}
              </h2>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <div key={item.id} className="mb-2">
                    <h3 className="font-bold text-sm">{item.title}</h3>
                    <p className="text-sm text-blue-200">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
      
      <div className="w-2/3 p-6">
        {cvData.sections
          .filter(section => section.id !== "skills")
          .map((section) => (
            <div key={section.id} className="mb-8">
              <h2 className="text-xl font-bold text-blue-800 border-b border-gray-300 pb-2 mb-4">
                {section.title}
              </h2>
              <div className="space-y-4">
                {section.items.map((item) => (
                  <div key={item.id} className="mb-3">
                    <div className="flex justify-between">
                      <h3 className="font-bold text-gray-800">{item.title}</h3>
                      <span className="text-gray-600 text-sm">{item.date}</span>
                    </div>
                    <p className="text-blue-700">{item.subtitle}</p>
                    <p className="mt-1 text-gray-700 text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );

  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return renderModernTemplate();
      case "minimalist":
        return renderMinimalistTemplate();
      case "creative":
        return renderCreativeTemplate();
      default:
        return renderModernTemplate();
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-inner">
      <div className="mb-4 text-center">
        <h2 className="text-xl font-bold">Xem trước CV</h2>
        <p className="text-gray-600 text-sm">Kéo thả các mục để sắp xếp lại CV của bạn</p>
      </div>
      
      <div 
        ref={cvRef}
        className="cv-preview scale-[0.8] origin-top transform mx-auto"
      >
        {renderTemplate()}
      </div>
    </div>
  );
}
