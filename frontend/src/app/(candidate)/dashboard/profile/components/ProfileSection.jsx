"use client";

import { Button } from "@/components/ui/button";
import { CirclePlus, Pencil } from "lucide-react";

export default function ProfileSection({
  title,
  content,
  placeholder,
  onEdit,
  dialogKey,
  showEditButton = true,
  children,
}) {
  const contentText = typeof content === 'string' ? content : '';
  
  return (
    <section className="bg-white border rounded-[8px] py-4 px-6 mb-4">
      <div className="flex justify-between items-center mb-1">
        <h2 className="text-lg font-bold">{title}</h2>
        {showEditButton && (
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 rounded-full"
            onClick={() => onEdit(dialogKey)}
          >
            {contentText ? <Pencil className="h-5 w-5" /> : <CirclePlus className="h-5 w-5" />}
          </Button>
        )}
      </div>

      <div className="border-b-[1px] w-full mb-2"></div>
      
      {children ? (
        children
      ) : (
        <p className="text-gray-600">
          {contentText || placeholder}
        </p>
      )}
    </section>
  );
}
