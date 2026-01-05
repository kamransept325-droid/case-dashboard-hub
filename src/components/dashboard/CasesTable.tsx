import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
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
  FileText,
} from "lucide-react";

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
}

const cases: Case[] = [
  {
    id: 463,
    fileNumber: "2024-HRD-2863",
    clientName: "Mehtab",
    caseNumber: "",
    courtName: "",
    district: "Karachi West",
    interviewer: "Nafees Khattak",
    status: "Approved",
    caseStatus: "Active",
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
  },
];

const statusStyles = {
  Approved: "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))] border-[hsl(var(--success))]/20",
  Pending: "bg-accent/10 text-accent border-accent/20",
  Rejected: "bg-destructive/10 text-destructive border-destructive/20",
};

const caseStatusStyles = {
  Pending: "bg-accent/10 text-accent",
  Disposed: "bg-muted text-muted-foreground",
  Active: "bg-primary/10 text-primary",
};

export function CasesTable() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <FileText className="h-4 w-4" />
            Recent Cases
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search cases..."
                className="h-9 w-64 pl-8"
              />
            </div>
            <Button variant="outline" size="sm" className="gap-1">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-12">#</TableHead>
                <TableHead>File Number</TableHead>
                <TableHead>Client Name</TableHead>
                <TableHead>Case Number</TableHead>
                <TableHead>Court Name</TableHead>
                <TableHead>District</TableHead>
                <TableHead>Interviewer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Case Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cases.map((caseItem) => (
                <TableRow key={caseItem.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium">{caseItem.id}</TableCell>
                  <TableCell className="font-mono text-xs">
                    {caseItem.fileNumber}
                  </TableCell>
                  <TableCell>{caseItem.clientName}</TableCell>
                  <TableCell className="font-mono text-xs">
                    {caseItem.caseNumber || "-"}
                  </TableCell>
                  <TableCell className="max-w-[150px] truncate">
                    {caseItem.courtName || "-"}
                  </TableCell>
                  <TableCell>{caseItem.district}</TableCell>
                  <TableCell>{caseItem.interviewer}</TableCell>
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
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2">
                          <Eye className="h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Edit className="h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Calendar className="h-4 w-4" />
                          Hearings
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
