"use client";

import { Draggable } from "@hello-pangea/dnd";
import { GripVertical, Trash } from "lucide-react";

export default function SectionItem({
  item,
  index,
  sectionId,
  onItemChange,
  onDeleteItem,
}) {
  const handleChange = (field, value) => {
    onItemChange(sectionId, item.id, field, value);
  };

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="bg-white rounded-md p-3 border border-gray-200"
        >
          <div className="flex items-start gap-2">
            <div
              {...provided.dragHandleProps}
              className="cursor-grab mt-1"
            >
              <GripVertical className="h-5 w-5 text-gray-400" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex justify-between">
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  className="font-medium border-none bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 w-full"
                  placeholder="Tiêu đề"
                />
                <button
                  onClick={() => onDeleteItem(sectionId, item.id)}
                  className="p-1 text-red-600 hover:bg-red-100 rounded"
                  title="Xóa mục"
                >
                  <Trash className="h-4 w-4" />
                </button>
              </div>
              
              <input
                type="text"
                value={item.subtitle || ""}
                onChange={(e) => handleChange("subtitle", e.target.value)}
                className="border-none bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 w-full text-sm"
                placeholder="Phụ đề"
              />
              
              <input
                type="text"
                value={item.date || ""}
                onChange={(e) => handleChange("date", e.target.value)}
                className="border-none bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 w-full text-sm text-gray-600"
                placeholder="Thời gian"
              />
              
              <textarea
                value={item.description || ""}
                onChange={(e) => handleChange("description", e.target.value)}
                className="border-none bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 w-full text-sm min-h-[60px]"
                placeholder="Mô tả chi tiết"
              />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}
