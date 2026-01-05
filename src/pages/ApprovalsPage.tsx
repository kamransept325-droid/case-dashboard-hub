import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileCheck, Calendar, User, CheckCircle, XCircle, Eye, ArrowLeft, Search, Download, Filter } from "lucide-react";
import { Link } from "react-router-dom";

interface Approval {
  id: number;
  fileNumber: string;
  clientName: string;
  program: string;
  submittedBy: string;
  submittedDate: string;
  caseType: string;
  priority: "High" | "Medium" | "Low";
}

const approvals: Approval[] = [
  {
    id: 1,
    fileNumber: "2024-HRD-2870",
    clientName: "Nadia Hussain",
    program: "HRD",
    submittedBy: "Nafees Khattak",
    submittedDate: "2026-01-03",
    caseType: "Family",
    priority: "High",
  },
  {
    id: 2,
    fileNumber: "2024-100C-1234",
    clientName: "Tariq Mehmood",
    program: "100 Case",
    submittedBy: "Amanullah",
    submittedDate: "2026-01-02",
    caseType: "Criminal",
    priority: "High",
  },
  {
    id: 3,
    fileNumber: "2024-WRLMP-567",
    clientName: "Zainab Ali",
    program: "WRLMP",
    submittedBy: "Abida Bibi",
    submittedDate: "2026-01-04",
    caseType: "Family",
    priority: "Medium",
  },
  {
    id: 4,
    fileNumber: "2024-BA-890",
    clientName: "Imran Shah",
    program: "Bank Alfalah",
    submittedBy: "Habib ur Rahman",
    submittedDate: "2026-01-01",
    caseType: "Civil",
    priority: "Low",
  },
];

const priorityStyles = {
  High: "bg-destructive/10 text-destructive",
  Medium: "bg-accent/10 text-accent",
  Low: "bg-muted text-muted-foreground",
};

export default function ApprovalsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <FileCheck className="h-6 w-6 text-primary" />
              Pending Approvals
            </h1>
            <p className="text-muted-foreground">Review and manage case approvals</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search approvals..." className="pl-8" />
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

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {approvals.map((approval) => (
            <Card key={approval.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm text-muted-foreground">
                      {approval.fileNumber}
                    </span>
                    <Badge variant="secondary" className={priorityStyles[approval.priority]}>
                      {approval.priority} Priority
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-foreground text-lg">{approval.clientName}</h3>
                  <div className="grid gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Submitted by: {approval.submittedBy}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {new Date(approval.submittedDate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline">{approval.program}</Badge>
                    <Badge variant="outline">{approval.caseType}</Badge>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Eye className="h-4 w-4" />
                      Review
                    </Button>
                    <Button variant="default" size="sm" className="gap-1">
                      <CheckCircle className="h-4 w-4" />
                      Approve
                    </Button>
                    <Button variant="destructive" size="sm" className="gap-1">
                      <XCircle className="h-4 w-4" />
                      Reject
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
