"use client";

import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import DraggableSection from "./DraggableSection";

export default function CVEditor({ cvData, setCvData }) {
  const handleDragEnd = (result) => {
    const { destination, source, type } = result;

    // Nếu không có điểm đến hoặc điểm đến trùng với điểm đi
    if (!destination || 
        (destination.droppableId === source.droppableId && 
         destination.index === source.index)) {
      return;
    }

    // Kéo thả các section
    if (type === "section") {
      const newSections = Array.from(cvData.sections);
      const [removed] = newSections.splice(source.index, 1);
      newSections.splice(destination.index, 0, removed);

      setCvData({
        ...cvData,
        sections: newSections,
      });
      return;
    }

    // Kéo thả các item trong section
    const sourceSection = cvData.sections.find(
      (section) => section.id === source.droppableId
    );
    const destSection = cvData.sections.find(
      (section) => section.id === destination.droppableId
    );

    // Kéo thả trong cùng một section
    if (sourceSection.id === destSection.id) {
      const newItems = Array.from(sourceSection.items);
      const [removed] = newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, removed);

      const newSections = cvData.sections.map((section) => {
        if (section.id === sourceSection.id) {
          return { ...section, items: newItems };
        }
        return section;
      });

      setCvData({
        ...cvData,
        sections: newSections,
      });
    } else {
      // Kéo thả giữa các section khác nhau
      const sourceItems = Array.from(sourceSection.items);
      const destItems = Array.from(destSection.items);
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      const newSections = cvData.sections.map((section) => {
        if (section.id === sourceSection.id) {
          return { ...section, items: sourceItems };
        }
        if (section.id === destSection.id) {
          return { ...section, items: destItems };
        }
        return section;
      });

      setCvData({
        ...cvData,
        sections: newSections,
      });
    }
  };

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setCvData({
      ...cvData,
      personalInfo: {
        ...cvData.personalInfo,
        [name]: value,
      },
    });
  };

  const handleAddSection = () => {
    const newSectionId = `section-${Date.now()}`;
    setCvData({
      ...cvData,
      sections: [
        ...cvData.sections,
        {
          id: newSectionId,
          title: "Mục mới",
          items: [],
        },
      ],
    });
  };

  const handleSectionTitleChange = (sectionId, newTitle) => {
    setCvData({
      ...cvData,
      sections: cvData.sections.map((section) =>
        section.id === sectionId ? { ...section, title: newTitle } : section
      ),
    });
  };

  const handleDeleteSection = (sectionId) => {
    setCvData({
      ...cvData,
      sections: cvData.sections.filter((section) => section.id !== sectionId),
    });
  };

  const handleAddItem = (sectionId) => {
    const newItemId = `item-${Date.now()}`;
    setCvData({
      ...cvData,
      sections: cvData.sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            items: [
              ...section.items,
              {
                id: newItemId,
                title: "Tiêu đề mới",
                subtitle: "Phụ đề",
                date: "Thời gian",
                description: "Mô tả chi tiết",
              },
            ],
          };
        }
        return section;
      }),
    });
  };

  const handleItemChange = (sectionId, itemId, field, value) => {
    setCvData({
      ...cvData,
      sections: cvData.sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            items: section.items.map((item) => {
              if (item.id === itemId) {
                return { ...item, [field]: value };
              }
              return item;
            }),
          };
        }
        return section;
      }),
    });
  };

  const handleDeleteItem = (sectionId, itemId) => {
    setCvData({
      ...cvData,
      sections: cvData.sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            items: section.items.filter((item) => item.id !== itemId),
          };
        }
        return section;
      }),
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Thông tin cá nhân</h2>
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Họ và tên</label>
          <input
            type="text"
            name="name"
            value={cvData.personalInfo.name}
            onChange={handlePersonalInfoChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Chức danh</label>
          <input
            type="text"
            name="title"
            value={cvData.personalInfo.title}
            onChange={handlePersonalInfoChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={cvData.personalInfo.email}
            onChange={handlePersonalInfoChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Số điện thoại</label>
          <input
            type="text"
            name="phone"
            value={cvData.personalInfo.phone}
            onChange={handlePersonalInfoChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Địa chỉ</label>
          <input
            type="text"
            name="address"
            value={cvData.personalInfo.address}
            onChange={handlePersonalInfoChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tóm tắt</label>
          <textarea
            name="summary"
            value={cvData.personalInfo.summary}
            onChange={handlePersonalInfoChange}
            className="w-full border border-gray-300 rounded-md p-2 min-h-[100px]"
          />
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">Các mục CV</h2>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="sections" type="section">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-6"
            >
              {cvData.sections.map((section, index) => (
                <DraggableSection
                  key={section.id}
                  section={section}
                  index={index}
                  onTitleChange={handleSectionTitleChange}
                  onDeleteSection={handleDeleteSection}
                  onAddItem={handleAddItem}
                  onItemChange={handleItemChange}
                  onDeleteItem={handleDeleteItem}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <button
        onClick={handleAddSection}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors w-full"
      >
        + Thêm mục mới
      </button>
    </div>
  );
}
