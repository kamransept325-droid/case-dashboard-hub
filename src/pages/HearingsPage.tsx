import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, MapPin, User, Eye, ArrowLeft, Search, Download, Filter } from "lucide-react";
import { Link } from "react-router-dom";

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

export default function HearingsPage() {
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
              <Calendar className="h-6 w-6 text-primary" />
              Upcoming Hearings
            </h1>
            <p className="text-muted-foreground">Manage and view all scheduled court hearings</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search hearings..." className="pl-8" />
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
          {hearings.map((hearing) => (
            <Card key={hearing.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm text-muted-foreground">
                      {hearing.caseNumber}
                    </span>
                    <Badge variant="secondary" className={typeStyles[hearing.type]}>
                      {hearing.type}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-foreground text-lg">{hearing.clientName}</h3>
                  <div className="grid gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {hearing.courtName}
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {hearing.lawyer}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="text-primary font-medium">
                        {new Date(hearing.date).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {hearing.time}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full gap-1 mt-2">
                    <Eye className="h-4 w-4" />
                    View Case
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
