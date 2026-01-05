import * as React from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MultiSelectDropdownProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  allOptionLabel?: string;
  className?: string;
}

export function MultiSelectDropdown({
  options,
  selected,
  onChange,
  placeholder = "Select...",
  allOptionLabel = "All",
  className,
}: MultiSelectDropdownProps) {
  const [open, setOpen] = React.useState(false);

  const isAllSelected = selected.length === 0 || selected.includes(allOptionLabel);

  const handleSelect = (option: string) => {
    if (option === allOptionLabel) {
      onChange([]);
      return;
    }

    const newSelected = selected.filter((s) => s !== allOptionLabel);
    
    if (newSelected.includes(option)) {
      const filtered = newSelected.filter((s) => s !== option);
      onChange(filtered.length === 0 ? [] : filtered);
    } else {
      onChange([...newSelected, option]);
    }
  };

  const removeItem = (option: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSelected = selected.filter((s) => s !== option && s !== allOptionLabel);
    onChange(newSelected);
  };

  const displayValue = () => {
    if (isAllSelected) {
      return <span className="text-muted-foreground">{allOptionLabel}</span>;
    }
    if (selected.length === 1) {
      return selected[0];
    }
    return (
      <div className="flex items-center gap-1">
        <span>{selected.length} selected</span>
      </div>
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between h-9 bg-card font-normal", className)}
        >
          <div className="flex items-center gap-1 truncate">
            {displayValue()}
          </div>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full min-w-[200px] p-0 bg-card z-50" align="start">
        <ScrollArea className="h-[200px]">
          <div className="p-1">
            {/* All option */}
            <div
              className={cn(
                "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-muted",
                isAllSelected && "bg-muted"
              )}
              onClick={() => handleSelect(allOptionLabel)}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  isAllSelected ? "opacity-100" : "opacity-0"
                )}
              />
              {allOptionLabel}
            </div>

            {/* Individual options */}
            {options.map((option) => (
              <div
                key={option}
                className={cn(
                  "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-muted",
                  selected.includes(option) && !isAllSelected && "bg-muted"
                )}
                onClick={() => handleSelect(option)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selected.includes(option) && !isAllSelected
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {option}
              </div>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
