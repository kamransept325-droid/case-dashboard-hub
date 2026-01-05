import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LayoutGrid, List, Download, FileText, Eye, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ChartCasesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  filterValue: string;
}

interface Case {
  id: number;
  caseNumber: string;
  clientName: string;
  type: string;
  status: string;
  date: string;
  lawyer: string;
  court: string;
}

// Generate mock cases based on filter
const generateCases = (filterValue: string): Case[] => {
  const baseNames = [
    "Rashida Bibi", "Ahmed Hassan", "Fatima Zahra", "Muhammad Akram", 
    "Saima Akhtar", "Ali Raza", "Zainab Khan", "Imran Shah",
    "Nadia Malik", "Usman Ahmed", "Ayesha Siddiqui", "Hassan Ali"
  ];
  const lawyers = ["Nafees Khattak", "Amanullah", "Abida Bibi", "Habib ur Rahman"];
  const courts = ["Family Court", "Sessions Court", "High Court", "District Court"];
  const statuses = ["Pending", "In Progress", "Disposed", "Adjourned"];

  return baseNames.map((name, idx) => ({
    id: idx + 1,
    caseNumber: `2024-${filterValue.substring(0, 3).toUpperCase()}-${1000 + idx}`,
    clientName: name,
    type: filterValue,
    status: statuses[idx % statuses.length],
    date: `2026-01-${String(idx + 1).padStart(2, "0")}`,
    lawyer: lawyers[idx % lawyers.length],
    court: courts[idx % courts.length],
  }));
};

const statusStyles: Record<string, string> = {
  Pending: "bg-accent/10 text-accent",
  "In Progress": "bg-primary/10 text-primary",
  Disposed: "bg-success/10 text-success",
  Adjourned: "bg-muted text-muted-foreground",
};

// Highlight matching text
function HighlightText({ text, keyword }: { text: string; keyword: string }) {
  if (!keyword.trim()) {
    return <>{text}</>;
  }

  const regex = new RegExp(`(${keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) =>
        regex.test(part) ? (
          <mark key={index} className="bg-primary/30 text-foreground rounded px-0.5">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

export function ChartCasesModal({ open, onOpenChange, title, filterValue }: ChartCasesModalProps) {
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [searchKeyword, setSearchKeyword] = useState("");
  const allCases = generateCases(filterValue);

  // Filter cases based on search keyword
  const filteredCases = useMemo(() => {
    if (!searchKeyword.trim()) return allCases;
    
    const keyword = searchKeyword.toLowerCase();
    return allCases.filter((c) =>
      c.caseNumber.toLowerCase().includes(keyword) ||
      c.clientName.toLowerCase().includes(keyword) ||
      c.type.toLowerCase().includes(keyword) ||
      c.status.toLowerCase().includes(keyword) ||
      c.lawyer.toLowerCase().includes(keyword) ||
      c.court.toLowerCase().includes(keyword)
    );
  }, [allCases, searchKeyword]);

  const handleDownload = () => {
    const csvContent = [
      ["Case Number", "Client Name", "Type", "Status", "Date", "Lawyer", "Court"],
      ...filteredCases.map((c) => [c.caseNumber, c.clientName, c.type, c.status, c.date, c.lawyer, c.court]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filterValue.replace(/\s+/g, "_")}_cases.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Download Started",
      description: `${filteredCases.length} cases exported to CSV`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[85vh]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              {title}: {filterValue}
            </DialogTitle>
            <div className="flex items-center gap-2">
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="sm"
                  className="rounded-r-none"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="sm"
                  className="rounded-l-none"
                  onClick={() => setViewMode("grid")}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
              </div>
              <Button variant="outline" size="sm" className="gap-2" onClick={handleDownload}>
                <Download className="h-4 w-4" />
                Download CSV
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* Search Box */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by keyword (name, case number, lawyer, court...)"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="text-sm text-muted-foreground">
          Showing {filteredCases.length} of {allCases.length} cases
          {searchKeyword && (
            <span className="ml-2">
              for keyword: <span className="font-medium text-primary">&quot;{searchKeyword}&quot;</span>
            </span>
          )}
        </div>

        <ScrollArea className="h-[55vh]">
          {filteredCases.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
              <Search className="h-10 w-10 mb-2 opacity-50" />
              <p>No cases found matching &quot;{searchKeyword}&quot;</p>
            </div>
          ) : viewMode === "list" ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Case Number</TableHead>
                  <TableHead>Client Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Lawyer</TableHead>
                  <TableHead>Court</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCases.map((caseItem) => (
                  <TableRow key={caseItem.id}>
                    <TableCell className="font-mono text-sm">
                      <HighlightText text={caseItem.caseNumber} keyword={searchKeyword} />
                    </TableCell>
                    <TableCell className="font-medium">
                      <HighlightText text={caseItem.clientName} keyword={searchKeyword} />
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={statusStyles[caseItem.status]}>
                        <HighlightText text={caseItem.status} keyword={searchKeyword} />
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(caseItem.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell>
                      <HighlightText text={caseItem.lawyer} keyword={searchKeyword} />
                    </TableCell>
                    <TableCell>
                      <HighlightText text={caseItem.court} keyword={searchKeyword} />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 pr-4">
              {filteredCases.map((caseItem) => (
                <Card key={caseItem.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <span className="font-mono text-xs text-muted-foreground">
                        <HighlightText text={caseItem.caseNumber} keyword={searchKeyword} />
                      </span>
                      <Badge variant="secondary" className={statusStyles[caseItem.status]}>
                        <HighlightText text={caseItem.status} keyword={searchKeyword} />
                      </Badge>
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">
                      <HighlightText text={caseItem.clientName} keyword={searchKeyword} />
                    </h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Type:</span>
                        <span className="font-medium text-foreground">
                          <HighlightText text={caseItem.type} keyword={searchKeyword} />
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Lawyer:</span>
                        <span>
                          <HighlightText text={caseItem.lawyer} keyword={searchKeyword} />
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Court:</span>
                        <span>
                          <HighlightText text={caseItem.court} keyword={searchKeyword} />
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Date:</span>
                        <span>
                          {new Date(caseItem.date).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-3 gap-2">
                      <Eye className="h-4 w-4" />
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}