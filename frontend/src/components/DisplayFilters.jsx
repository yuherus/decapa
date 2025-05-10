"use client";

import { Grid, List } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

export default function DisplayFilters({ 
  activeView, 
  setActiveView, 
  sortOptions = [
    { value: "latest", label: "Latest" },
    { value: "oldest", label: "Oldest" },
    { value: "highest-paid", label: "Highest Paid" }
  ],
  perPageOptions = [
    { value: "12", label: "12 per page" },
    { value: "24", label: "24 per page" },
    { value: "36", label: "36 per page" }
  ],
  defaultSort = "latest",
  defaultPerPage = "12",
  onSortChange,
  onPerPageChange
}) {
  return (
    <div className="flex gap-4 items-center">
      <div className="flex items-center">
        <Select 
          defaultValue={defaultSort}
          onValueChange={(value) => onSortChange && onSortChange(value)}
        >
          <SelectTrigger className="bg-white border border-gray-300 rounded h-8 text-sm text-gray-500">
            <SelectValue placeholder={sortOptions[0].label} />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {sortOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center">
        <Select 
          defaultValue={defaultPerPage}
          onValueChange={(value) => onPerPageChange && onPerPageChange(value)}
        >
          <SelectTrigger className="bg-white border border-gray-300 rounded h-8 text-sm text-gray-500">
            <SelectValue placeholder={`${defaultPerPage} per page`} />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {perPageOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex bg-white border rounded h-full">
        <button 
          className={`p-1 ${activeView === 'grid' ? 'bg-gray-100' : 'bg-white'}`}
          onClick={() => setActiveView('grid')}
        >
          <Grid size={20} className="text-gray-500" />
        </button>
        <button 
          className={`p-1 ${activeView === 'list' ? 'bg-gray-100' : 'bg-white'}`}
          onClick={() => setActiveView('list')}
        >
          <List size={20} className="text-gray-500" />
        </button>
      </div>
    </div>
  );
} 
