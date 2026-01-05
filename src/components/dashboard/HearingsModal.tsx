import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, User, Eye, ExternalLink } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";

interface HearingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Hearing {
  id: number;
  caseNumber: string;
  clientName: string;
  courtName: string;
  date: string;
  time: string;
  lawyer: string;
  type: "First Hearing" | "Adjournment" | "Final Arguments" | "Judgment";
}

const hearings: Hearing[] = [
  {
    id: 1,
    caseNumber: "2024-HRD-2863",
    clientName: "Mehtab",
    courtName: "Family Court, Karachi West",
    date: "2026-01-08",
    time: "10:00 AM",
    lawyer: "Nafees Khattak",
    type: "First Hearing",
  },
  {
    id: 2,
    caseNumber: "2024-HRD-2862",
    clientName: "Seema",
    courtName: "XXIII-JM (W)",
    date: "2026-01-09",
    time: "11:30 AM",
    lawyer: "Nafees Khattak",
    type: "Adjournment",
  },
  {
    id: 3,
    caseNumber: "2024-HRD-2514",
    clientName: "Shaman Ali",
    courtName: "Supreme Court of Pakistan",
    date: "2026-01-10",
    time: "09:00 AM",
    lawyer: "Habib ur Rahman",
    type: "Final Arguments",
  },
  {
    id: 4,
    caseNumber: "2024-HRD-2510",
    clientName: "Muhammad Faisal",
    courtName: "High Court, Hyderabad",
    date: "2026-01-12",
    time: "02:00 PM",
    lawyer: "Amanullah",
    type: "Judgment",
  },
  {
    id: 5,
    caseNumber: "2024-HRD-2505",
    clientName: "Sufiya Begum",
    courtName: "Family Court, Karachi East",
    date: "2026-01-14",
    time: "10:30 AM",
    lawyer: "Abida Bibi",
    type: "First Hearing",
  },
];

const typeStyles = {
  "First Hearing": "bg-primary/10 text-primary",
  Adjournment: "bg-accent/10 text-accent",
  "Final Arguments": "bg-info/10 text-info",
  Judgment: "bg-success/10 text-success",
};

export function HearingsModal({ open, onOpenChange }: HearingsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Upcoming Hearings
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-3">
            {hearings.map((hearing) => (
              <Card key={hearing.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm text-muted-foreground">
                          {hearing.caseNumber}
                        </span>
                        <Badge variant="secondary" className={typeStyles[hearing.type]}>
                          {hearing.type}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-foreground">{hearing.clientName}</h3>
                      <div className="grid gap-1.5 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3.5 w-3.5" />
                          {hearing.courtName}
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-3.5 w-3.5" />
                          {hearing.lawyer}
                        </div>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <div className="flex items-center gap-2 text-sm font-medium text-primary">
                        <Calendar className="h-4 w-4" />
                        {new Date(hearing.date).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {hearing.time}
                      </div>
                      <Button variant="outline" size="sm" className="mt-2 gap-1">
                        <Eye className="h-3.5 w-3.5" />
                        View Case
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
        <div className="pt-4 border-t">
          <Link to="/hearings" onClick={() => onOpenChange(false)}>
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
