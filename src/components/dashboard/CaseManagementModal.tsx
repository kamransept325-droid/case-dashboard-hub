import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FolderOpen,
  FileText,
  Users,
  Calendar,
  Upload,
  Settings,
  Database,
  Archive,
} from "lucide-react";

interface CaseManagementModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const managementOptions = [
  {
    title: "View All Cases",
    description: "Browse and search all case records",
    icon: FileText,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Add New Case",
    description: "Register a new case in the system",
    icon: FolderOpen,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    title: "Client Directory",
    description: "Manage client information",
    icon: Users,
    color: "text-info",
    bgColor: "bg-info/10",
  },
  {
    title: "Hearing Schedule",
    description: "Manage court hearing dates",
    icon: Calendar,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    title: "Upload Documents",
    description: "Upload case-related documents",
    icon: Upload,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Case Settings",
    description: "Configure case categories & types",
    icon: Settings,
    color: "text-muted-foreground",
    bgColor: "bg-muted",
  },
  {
    title: "Database Backup",
    description: "Backup and restore case data",
    icon: Database,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    title: "Archived Cases",
    description: "View closed and archived cases",
    icon: Archive,
    color: "text-muted-foreground",
    bgColor: "bg-muted",
  },
];

export function CaseManagementModal({ open, onOpenChange }: CaseManagementModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5 text-primary" />
            Case Management
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 py-4">
          {managementOptions.map((option) => (
            <Card
              key={option.title}
              className="cursor-pointer hover:shadow-md transition-all hover:border-primary/50"
            >
              <CardContent className="p-4 text-center">
                <div
                  className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl ${option.bgColor}`}
                >
                  <option.icon className={`h-6 w-6 ${option.color}`} />
                </div>
                <h3 className="font-medium text-sm text-foreground">{option.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{option.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
