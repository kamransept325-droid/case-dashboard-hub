import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  FolderOpen,
  FileText,
  CheckCircle,
  XCircle,
  ArrowRightLeft,
  History,
  Users,
  UserPlus,
  Search,
  ExternalLink,
} from "lucide-react";
import { Link } from "react-router-dom";

interface CaseManagementModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const caseManagementOptions = [
  { title: "All Cases", icon: FileText },
  { title: "Cases for Approval", icon: FileText },
  { title: "Approved Cases", icon: CheckCircle },
  { title: "Rejected Cases", icon: XCircle },
];

const programTransferOptions = [
  { title: "Transfer Program", icon: ArrowRightLeft },
  { title: "Transfer History", icon: History },
];

const userManagementOptions = [
  { title: "View Users", icon: Users },
  { title: "Add User", icon: UserPlus },
];

const caseTransferOptions = [
  { title: "Case Transfer", icon: ArrowRightLeft },
  { title: "Case Transfer History", icon: History },
  { title: "Search Userwise", icon: Search },
];

export function CaseManagementModal({ open, onOpenChange }: CaseManagementModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5 text-primary" />
            Program & User Management
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-6 py-4 pr-4">
            {/* Case Management Section */}
            <div>
              <h3 className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">
                Cases
              </h3>
              <div className="space-y-1">
                {caseManagementOptions.map((option) => (
                  <button
                    key={option.title}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-accent rounded-md transition-colors text-left"
                  >
                    <option.icon className="h-4 w-4 text-muted-foreground" />
                    {option.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Program Name Transfer Section */}
            <div>
              <h3 className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">
                Program Name Transfer
              </h3>
              <div className="space-y-1">
                {programTransferOptions.map((option) => (
                  <button
                    key={option.title}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-accent rounded-md transition-colors text-left"
                  >
                    <option.icon className="h-4 w-4 text-muted-foreground" />
                    {option.title}
                  </button>
                ))}
              </div>
            </div>

            {/* User Management Section */}
            <div>
              <h3 className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">
                User Management
              </h3>
              <div className="space-y-1">
                {userManagementOptions.map((option) => (
                  <button
                    key={option.title}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-accent rounded-md transition-colors text-left"
                  >
                    <option.icon className="h-4 w-4 text-muted-foreground" />
                    {option.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Case Transfer Section */}
            <div>
              <h3 className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">
                Case Transfer
              </h3>
              <div className="space-y-1">
                {caseTransferOptions.map((option) => (
                  <button
                    key={option.title}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-accent rounded-md transition-colors text-left"
                  >
                    <option.icon className="h-4 w-4 text-muted-foreground" />
                    {option.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
        <div className="pt-4 border-t">
          <Link to="/management" onClick={() => onOpenChange(false)}>
            <Button variant="outline" className="w-full gap-2">
              <ExternalLink className="h-4 w-4" />
              View Detailed Page
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
