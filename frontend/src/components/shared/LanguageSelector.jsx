"use client";

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Command, CommandList, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const languages = [
  { label: "English", code: "en", flag: "🇬🇧" },
  { label: "Tiếng Việt", code: "vi", flag: "🇻🇳" },
  { label: "日本語", code: "ja", flag: "🇯🇵" },
];

export default function LanguageSelector() {
  const [selectedLang, setSelectedLang] = useState(languages[0]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="w-[120px] bg-transparent shadow-none justify-between">
          <span className="mr-2">{selectedLang.flag}</span> {selectedLang.label}
          <ChevronDown className="ml-auto h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[150px] p-0 bg-white">
        <Command>
          <CommandList>
            {languages.map((lang) => (
              <CommandItem
                key={lang.code}
                onSelect={() => setSelectedLang(lang)}
                className="flex items-center"
              >
                <span className="mr-2">{lang.flag}</span> {lang.label}
                {selectedLang.code === lang.code && (
                  <Check className="ml-auto h-4 w-4 text-green-500" />
                )}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
