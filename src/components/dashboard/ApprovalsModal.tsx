import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileCheck, Calendar, User, CheckCircle, XCircle, Eye } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ApprovalsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

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

export function ApprovalsModal({ open, onOpenChange }: ApprovalsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileCheck className="h-5 w-5 text-primary" />
            Pending Approvals
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[65vh] pr-4">
          <div className="space-y-3">
            {approvals.map((approval) => (
              <Card key={approval.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm text-muted-foreground">
                          {approval.fileNumber}
                        </span>
                        <Badge variant="secondary" className={priorityStyles[approval.priority]}>
                          {approval.priority} Priority
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-foreground">{approval.clientName}</h3>
                      <div className="grid gap-1.5 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <User className="h-3.5 w-3.5" />
                          Submitted by: {approval.submittedBy}
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge variant="outline">{approval.program}</Badge>
                          <Badge variant="outline">{approval.caseType}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {new Date(approval.submittedDate).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                      <div className="flex gap-1 mt-2">
                        <Button variant="outline" size="sm" className="gap-1">
                          <Eye className="h-3.5 w-3.5" />
                          Review
                        </Button>
                        <Button variant="default" size="sm" className="gap-1">
                          <CheckCircle className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="destructive" size="sm" className="gap-1">
                          <XCircle className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
