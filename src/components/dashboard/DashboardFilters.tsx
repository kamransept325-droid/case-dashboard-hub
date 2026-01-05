import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const programs = [
  "All Programs",
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
  "All Districts",
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
  "All Lawyers",
  "ABid Ali Jatoi",
  "Abida Bibi",
  "Afifa Iqbal",
  "Amanullah",
  "Habib ur Rahman",
  "Nafees Khattak",
];

const caseReferred = [
  "All Sources",
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
  "All Types",
  "Child Custody / G & W",
  "Civil Appeal",
  "Civil Suit",
  "Constitutional Petition",
  "Criminal",
  "Family",
];

export interface FilterValues {
  program: string;
  district: string;
  lawyer: string;
  caseReferred: string;
  caseType: string;
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
            "w-full justify-start text-left font-normal h-9",
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
    program: "All Programs",
    district: "All Districts",
    lawyer: "All Lawyers",
    caseReferred: "All Sources",
    caseType: "All Types",
    fileStartDate: undefined,
    fileEndDate: undefined,
    disposalStartDate: undefined,
    disposalEndDate: undefined,
  });

  const handleClear = () => {
    setFilters({
      program: "All Programs",
      district: "All Districts",
      lawyer: "All Lawyers",
      caseReferred: "All Sources",
      caseType: "All Types",
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
                <Select
                  value={filters.program}
                  onValueChange={(value) =>
                    setFilters({ ...filters, program: value })
                  }
                >
                  <SelectTrigger className="h-9 bg-card">
                    <SelectValue placeholder="Select Program Name" />
                  </SelectTrigger>
                  <SelectContent className="bg-card z-50">
                    {programs.map((program) => (
                      <SelectItem key={program} value={program}>
                        {program}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-medium">District</Label>
                <Select
                  value={filters.district}
                  onValueChange={(value) =>
                    setFilters({ ...filters, district: value })
                  }
                >
                  <SelectTrigger className="h-9 bg-card">
                    <SelectValue placeholder="Select District" />
                  </SelectTrigger>
                  <SelectContent className="bg-card z-50">
                    {districts.map((district) => (
                      <SelectItem key={district} value={district}>
                        {district}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Lawyer Name</Label>
                <Select
                  value={filters.lawyer}
                  onValueChange={(value) =>
                    setFilters({ ...filters, lawyer: value })
                  }
                >
                  <SelectTrigger className="h-9 bg-card">
                    <SelectValue placeholder="Select Lawyer" />
                  </SelectTrigger>
                  <SelectContent className="bg-card z-50">
                    {lawyers.map((lawyer) => (
                      <SelectItem key={lawyer} value={lawyer}>
                        {lawyer}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Case Referred</Label>
                <Select
                  value={filters.caseReferred}
                  onValueChange={(value) =>
                    setFilters({ ...filters, caseReferred: value })
                  }
                >
                  <SelectTrigger className="h-9 bg-card">
                    <SelectValue placeholder="Select Case Referred" />
                  </SelectTrigger>
                  <SelectContent className="bg-card z-50">
                    {caseReferred.map((source) => (
                      <SelectItem key={source} value={source}>
                        {source}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Second Row - Case Type */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Case Type</Label>
                <Select
                  value={filters.caseType}
                  onValueChange={(value) =>
                    setFilters({ ...filters, caseType: value })
                  }
                >
                  <SelectTrigger className="h-9 bg-card">
                    <SelectValue placeholder="Select Case Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-card z-50">
                    {caseTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                    variant="secondary"
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
