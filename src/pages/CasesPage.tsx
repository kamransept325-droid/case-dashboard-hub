import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Download,
  Edit,
  Eye,
  Calendar,
  MoreHorizontal,
  Search,
  LayoutGrid,
  List,
  Filter,
  ArrowLeft,
  FileText,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

interface Case {
  id: number;
  fileNumber: string;
  clientName: string;
  caseNumber: string;
  courtName: string;
  district: string;
  interviewer: string;
  status: "Approved" | "Pending" | "Rejected";
  caseStatus: "Pending" | "Disposed" | "Active";
  lastUpdated: string;
}

const allCases: Case[] = [
  {
    id: 463,
    fileNumber: "2024-HRD-2863",
    clientName: "Mehtab",
    caseNumber: "1234/2024",
    courtName: "Family Court",
    district: "Karachi West",
    interviewer: "Nafees Khattak",
    status: "Approved",
    caseStatus: "Active",
    lastUpdated: "2024-12-28",
  },
  {
    id: 462,
    fileNumber: "2024-HRD-2862",
    clientName: "Seema",
    caseNumber: "2999/2024",
    courtName: "XXIII-JM (W)",
    district: "Karachi West",
    interviewer: "Nafees Khattak",
    status: "Approved",
    caseStatus: "Disposed",
    lastUpdated: "2024-12-25",
  },
  {
    id: 461,
    fileNumber: "2024-HRD-2514",
    clientName: "Shaman Ali",
    caseNumber: "829-K/2022",
    courtName: "Supreme Court of Pakistan",
    district: "Karachi South",
    interviewer: "Habib ur Rahman",
    status: "Approved",
    caseStatus: "Pending",
    lastUpdated: "2024-11-15",
  },
  {
    id: 460,
    fileNumber: "2024-HRD-2510",
    clientName: "Muhammad Faisal",
    caseNumber: "1234/2024",
    courtName: "High Court",
    district: "Hyderabad",
    interviewer: "Amanullah",
    status: "Pending",
    caseStatus: "Active",
    lastUpdated: "2024-10-20",
  },
  {
    id: 459,
    fileNumber: "2024-HRD-2505",
    clientName: "Sufiya Begum",
    caseNumber: "567/2024",
    courtName: "Family Court",
    district: "Karachi East",
    interviewer: "Abida Bibi",
    status: "Approved",
    caseStatus: "Pending",
    lastUpdated: "2024-09-10",
  },
  {
    id: 458,
    fileNumber: "2024-HRD-2498",
    clientName: "Ahmed Khan",
    caseNumber: "890/2024",
    courtName: "Sessions Court",
    district: "Larkana",
    interviewer: "Nafees Khattak",
    status: "Approved",
    caseStatus: "Active",
    lastUpdated: "2024-08-05",
  },
];

const statusStyles = {
  Approved: "bg-success/10 text-success border-success/20",
  Pending: "bg-accent/10 text-accent border-accent/20",
  Rejected: "bg-destructive/10 text-destructive border-destructive/20",
};

const caseStatusStyles = {
  Pending: "bg-accent/10 text-accent",
  Disposed: "bg-muted text-muted-foreground",
  Active: "bg-primary/10 text-primary",
};

export default function CasesPage() {
  const [searchParams] = useSearchParams();
  const filterType = searchParams.get("filter") || "all";
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [searchQuery, setSearchQuery] = useState("");

  const title = filterType === "notUpdated" ? "Cases Not Updated" : "All Cases";

  // Filter cases based on type
  const cases = filterType === "notUpdated"
    ? allCases.filter((c) => {
        const lastUpdate = new Date(c.lastUpdated);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return lastUpdate < thirtyDaysAgo;
      })
    : allCases;

  const filteredCases = cases.filter(
    (c) =>
      c.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.fileNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.district.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              {title}
            </h1>
            <p className="text-muted-foreground">
              {filterType === "notUpdated"
                ? "Cases not updated in the last 30 days"
                : "Browse and manage all case records"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by client, file number, or district..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm" className="gap-1">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>

        {viewMode === "list" ? (
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>File Number</TableHead>
                  <TableHead>Client Name</TableHead>
                  <TableHead>Case Number</TableHead>
                  <TableHead>Court</TableHead>
                  <TableHead>District</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Case Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCases.map((caseItem) => (
                  <TableRow key={caseItem.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium">{caseItem.id}</TableCell>
                    <TableCell className="font-mono text-xs">{caseItem.fileNumber}</TableCell>
                    <TableCell>{caseItem.clientName}</TableCell>
                    <TableCell className="font-mono text-xs">{caseItem.caseNumber}</TableCell>
                    <TableCell className="max-w-[120px] truncate">{caseItem.courtName}</TableCell>
                    <TableCell>{caseItem.district}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusStyles[caseItem.status]}>
                        {caseItem.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={caseStatusStyles[caseItem.caseStatus]}>
                        {caseItem.caseStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {caseItem.lastUpdated}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2">
                            <Eye className="h-4 w-4" /> View
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Edit className="h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Calendar className="h-4 w-4" /> Hearings
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCases.map((caseItem) => (
              <Card key={caseItem.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-mono text-xs text-muted-foreground">
                        {caseItem.fileNumber}
                      </p>
                      <h3 className="font-semibold text-foreground">{caseItem.clientName}</h3>
                    </div>
                    <Badge variant="outline" className={statusStyles[caseItem.status]}>
                      {caseItem.status}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Case #:</span>
                      <span className="font-mono">{caseItem.caseNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Court:</span>
                      <span className="truncate max-w-[150px]">{caseItem.courtName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">District:</span>
                      <span>{caseItem.district}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last Updated:</span>
                      <span>{caseItem.lastUpdated}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t">
                    <Badge variant="secondary" className={caseStatusStyles[caseItem.caseStatus]}>
                      {caseItem.caseStatus}
                    </Badge>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
