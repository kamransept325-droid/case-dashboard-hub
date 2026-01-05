import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ChevronDown, ChevronUp, Filter, RotateCcw, Search } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { MultiSelectDropdown } from "./MultiSelectDropdown";

const programs = [
  "100 Case",
  "100 Case 2.0",
  "Bank Alfalah",
  "HRD",
  "HRCP",
  "IG",
  "IG 2.0",
  "MFL",
  "Non-Program",
  "PPRF",
  "RM",
  "SV/GBV",
  "WRLMP",
];

const districts = [
  "Badin",
  "Dadu",
  "Ghotki",
  "Hyderabad",
  "Jamshoro",
  "Karachi Central",
  "Karachi East",
  "Karachi South",
  "Karachi West",
  "Khairpur",
  "Larkana",
  "Malir",
  "Sanghar",
  "Sukkur",
];

const lawyers = [
  "ABid Ali Jatoi",
  "Abida Bibi",
  "Afifa Iqbal",
  "Amanullah",
  "Habib ur Rahman",
  "Nafees Khattak",
];

const caseReferredOptions = [
  "CSOs",
  "Govt. Institutions",
  "HRCP",
  "IG",
  "Paralegal",
  "SLACC",
  "Walk-In",
  "Other",
];

const caseTypes = [
  "Child Custody / G & W",
  "Civil Appeal",
  "Civil Suit",
  "Constitutional Petition",
  "Criminal",
  "Family",
];

export interface FilterValues {
  programs: string[];
  districts: string[];
  lawyers: string[];
  caseReferred: string[];
  caseTypes: string[];
  fileStartDate: Date | undefined;
  fileEndDate: Date | undefined;
  disposalStartDate: Date | undefined;
  disposalEndDate: Date | undefined;
}

interface DashboardFiltersProps {
  onApplyFilters?: (filters: FilterValues) => void;
  onClearFilters?: () => void;
}

function DatePickerButton({
  date,
  onSelect,
  placeholder,
}: {
  date: Date | undefined;
  onSelect: (date: Date | undefined) => void;
  placeholder: string;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal h-9 bg-card",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "dd/MM/yyyy") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-card z-50" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onSelect}
          initialFocus
          className="p-3 pointer-events-auto"
        />
      </PopoverContent>
    </Popover>
  );
}

export function DashboardFilters({
  onApplyFilters,
  onClearFilters,
}: DashboardFiltersProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [filters, setFilters] = useState<FilterValues>({
    programs: [],
    districts: [],
    lawyers: [],
    caseReferred: [],
    caseTypes: [],
    fileStartDate: undefined,
    fileEndDate: undefined,
    disposalStartDate: undefined,
    disposalEndDate: undefined,
  });

  const handleClear = () => {
    setFilters({
      programs: [],
      districts: [],
      lawyers: [],
      caseReferred: [],
      caseTypes: [],
      fileStartDate: undefined,
      fileEndDate: undefined,
      disposalStartDate: undefined,
      disposalEndDate: undefined,
    });
    onClearFilters?.();
  };

  const handleApply = () => {
    onApplyFilters?.(filters);
  };

  return (
    <Card>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="py-3 px-4">
          <CollapsibleTrigger asChild>
            <div className="flex cursor-pointer items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base font-semibold text-primary">
                <Filter className="h-4 w-4" />
                Filters
              </CardTitle>
              {isOpen ? (
                <ChevronUp className="h-5 w-5 text-primary" />
              ) : (
                <ChevronDown className="h-5 w-5 text-primary" />
              )}
            </div>
          </CollapsibleTrigger>
        </CardHeader>
        <CollapsibleContent>
          <CardContent className="space-y-5 pt-0 px-4 pb-4">
            {/* First Row - Dropdowns */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Program Name</Label>
                <MultiSelectDropdown
                  options={programs}
                  selected={filters.programs}
                  onChange={(selected) =>
                    setFilters({ ...filters, programs: selected })
                  }
                  placeholder="Select Programs"
                  allOptionLabel="All Programs"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-medium">District</Label>
                <MultiSelectDropdown
                  options={districts}
                  selected={filters.districts}
                  onChange={(selected) =>
                    setFilters({ ...filters, districts: selected })
                  }
                  placeholder="Select Districts"
                  allOptionLabel="All Districts"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Lawyer Name</Label>
                <MultiSelectDropdown
                  options={lawyers}
                  selected={filters.lawyers}
                  onChange={(selected) =>
                    setFilters({ ...filters, lawyers: selected })
                  }
                  placeholder="Select Lawyers"
                  allOptionLabel="All Lawyers"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Case Referred</Label>
                <MultiSelectDropdown
                  options={caseReferredOptions}
                  selected={filters.caseReferred}
                  onChange={(selected) =>
                    setFilters({ ...filters, caseReferred: selected })
                  }
                  placeholder="Select Sources"
                  allOptionLabel="All Sources"
                />
              </div>
            </div>

            {/* Second Row - Case Type */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Case Type</Label>
                <MultiSelectDropdown
                  options={caseTypes}
                  selected={filters.caseTypes}
                  onChange={(selected) =>
                    setFilters({ ...filters, caseTypes: selected })
                  }
                  placeholder="Select Case Types"
                  allOptionLabel="All Types"
                />
              </div>
            </div>

            {/* Third Row - Date Ranges and Actions */}
            <div className="grid gap-4 lg:grid-cols-3">
              {/* Case File Date Range */}
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Case File Date Range</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground">Start Date</span>
                    <DatePickerButton
                      date={filters.fileStartDate}
                      onSelect={(date) =>
                        setFilters({ ...filters, fileStartDate: date })
                      }
                      placeholder="dd/mm/yyyy"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground">End Date</span>
                    <DatePickerButton
                      date={filters.fileEndDate}
                      onSelect={(date) =>
                        setFilters({ ...filters, fileEndDate: date })
                      }
                      placeholder="dd/mm/yyyy"
                    />
                  </div>
                </div>
              </div>

              {/* Case Disposal Date Range */}
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Case Disposal Date Range</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground">Start Date</span>
                    <DatePickerButton
                      date={filters.disposalStartDate}
                      onSelect={(date) =>
                        setFilters({ ...filters, disposalStartDate: date })
                      }
                      placeholder="dd/mm/yyyy"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground">End Date</span>
                    <DatePickerButton
                      date={filters.disposalEndDate}
                      onSelect={(date) =>
                        setFilters({ ...filters, disposalEndDate: date })
                      }
                      placeholder="dd/mm/yyyy"
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Actions</Label>
                <div className="flex gap-2 pt-5">
                  <Button
                    onClick={handleApply}
                    className="flex-1 gap-2"
                    size="sm"
                  >
                    <Search className="h-4 w-4" />
                    Apply Filters
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleClear}
                    className="flex-1 gap-2"
                    size="sm"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Clear All
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
