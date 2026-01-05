import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDown, ChevronUp, Filter, RotateCcw, Search } from "lucide-react";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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
  "Civil",
  "Constitutional Petition",
  "Criminal",
  "Family",
];

interface FilterPanelProps {
  onApplyFilters?: () => void;
  onClearFilters?: () => void;
}

export function FilterPanel({ onApplyFilters, onClearFilters }: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Card>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="py-3">
          <CollapsibleTrigger asChild>
            <div className="flex cursor-pointer items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base">
                <Filter className="h-4 w-4" />
                Filters
              </CardTitle>
              {isOpen ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
          </CollapsibleTrigger>
        </CardHeader>
        <CollapsibleContent>
          <CardContent className="space-y-4 pt-0">
            {/* First Row */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              <div className="space-y-1.5">
                <Label className="text-xs">Program Name</Label>
                <Select defaultValue="All Programs">
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Select Program" />
                  </SelectTrigger>
                  <SelectContent>
                    {programs.map((program) => (
                      <SelectItem key={program} value={program}>
                        {program}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs">District</Label>
                <Select defaultValue="All Districts">
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Select District" />
                  </SelectTrigger>
                  <SelectContent>
                    {districts.map((district) => (
                      <SelectItem key={district} value={district}>
                        {district}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs">Lawyer Name</Label>
                <Select defaultValue="All Lawyers">
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Select Lawyer" />
                  </SelectTrigger>
                  <SelectContent>
                    {lawyers.map((lawyer) => (
                      <SelectItem key={lawyer} value={lawyer}>
                        {lawyer}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs">Case Referred</Label>
                <Select defaultValue="All Sources">
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Select Source" />
                  </SelectTrigger>
                  <SelectContent>
                    {caseReferred.map((source) => (
                      <SelectItem key={source} value={source}>
                        {source}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs">Case Type</Label>
                <Select defaultValue="All Types">
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {caseTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Second Row - Date Ranges */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-1.5">
                <Label className="text-xs">Case File Date - Start</Label>
                <Input type="date" className="h-9" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Case File Date - End</Label>
                <Input type="date" className="h-9" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Disposal Date - Start</Label>
                <Input type="date" className="h-9" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Disposal Date - End</Label>
                <Input type="date" className="h-9" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onClearFilters}
                className="gap-1"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Clear All
              </Button>
              <Button size="sm" onClick={onApplyFilters} className="gap-1">
                <Search className="h-3.5 w-3.5" />
                Apply Filters
              </Button>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
