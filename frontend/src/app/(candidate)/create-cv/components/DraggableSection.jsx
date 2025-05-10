"use client";

import { Draggable, Droppable } from "@hello-pangea/dnd";
import SectionItem from "./SectionItem";
import { GripVertical, Trash, Plus } from "lucide-react";

export default function DraggableSection({
  section,
  index,
  onTitleChange,
  onDeleteSection,
  onAddItem,
  onItemChange,
  onDeleteItem,
}) {
  return (
    <Draggable draggableId={section.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="bg-gray-50 rounded-lg p-4 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div {...provided.dragHandleProps} className="cursor-grab">
                <GripVertical className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={section.title}
                onChange={(e) => onTitleChange(section.id, e.target.value)}
                className="font-bold text-lg border-none bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onAddItem(section.id)}
                className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                title="Thêm mục"
              >
                <Plus className="h-5 w-5" />
              </button>
              <button
                onClick={() => onDeleteSection(section.id)}
                className="p-1 text-red-600 hover:bg-red-100 rounded"
                title="Xóa mục"
              >
                <Trash className="h-5 w-5" />
              </button>
            </div>
          </div>

          <Droppable droppableId={section.id} type="item">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="space-y-3"
              >
                {section.items.map((item, itemIndex) => (
                  <SectionItem
                    key={item.id}
                    item={item}
                    index={itemIndex}
                    sectionId={section.id}
                    onItemChange={onItemChange}
                    onDeleteItem={onDeleteItem}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {section.items.length === 0 && (
            <button
              onClick={() => onAddItem(section.id)}
              className="mt-2 w-full py-2 border border-dashed border-gray-300 rounded-md text-gray-500 hover:bg-gray-100 transition-colors"
            >
              + Thêm nội dung
            </button>
          )}
        </div>
      )}
    </Draggable>
  );
}
