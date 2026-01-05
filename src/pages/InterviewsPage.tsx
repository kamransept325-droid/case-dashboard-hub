import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Calendar, Phone, Eye, Edit, ArrowLeft, Search, Download, Filter } from "lucide-react";
import { Link } from "react-router-dom";

interface Interview {
  id: number;
  clientName: string;
  phone: string;
  date: string;
  interviewer: string;
  program: string;
  status: "Completed" | "Scheduled" | "Pending Review";
}

const interviews: Interview[] = [
  {
    id: 1,
    clientName: "Rashida Bibi",
    phone: "+92 321 1234567",
    date: "2026-01-04",
    interviewer: "Nafees Khattak",
    program: "HRD",
    status: "Pending Review",
  },
  {
    id: 2,
    clientName: "Ahmed Hassan",
    phone: "+92 333 9876543",
    date: "2026-01-03",
    interviewer: "Amanullah",
    program: "100 Case",
    status: "Completed",
  },
  {
    id: 3,
    clientName: "Fatima Zahra",
    phone: "+92 300 5551234",
    date: "2026-01-06",
    interviewer: "Abida Bibi",
    program: "WRLMP",
    status: "Scheduled",
  },
  {
    id: 4,
    clientName: "Muhammad Akram",
    phone: "+92 312 7778899",
    date: "2026-01-02",
    interviewer: "Habib ur Rahman",
    program: "Bank Alfalah",
    status: "Completed",
  },
  {
    id: 5,
    clientName: "Saima Akhtar",
    phone: "+92 345 2223344",
    date: "2026-01-05",
    interviewer: "Nafees Khattak",
    program: "HRD",
    status: "Pending Review",
  },
];

const statusStyles = {
  Completed: "bg-success/10 text-success",
  Scheduled: "bg-primary/10 text-primary",
  "Pending Review": "bg-accent/10 text-accent",
};

export default function InterviewsPage() {
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
              <Users className="h-6 w-6 text-primary" />
              All Interviews
            </h1>
            <p className="text-muted-foreground">Manage and view all client interviews</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search interviews..." className="pl-8" />
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
          {interviews.map((interview) => (
            <Card key={interview.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground text-lg">
                      {interview.clientName}
                    </h3>
                    <Badge variant="secondary" className={statusStyles[interview.status]}>
                      {interview.status}
                    </Badge>
                  </div>
                  <div className="grid gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {interview.phone}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Interviewer: {interview.interviewer}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {new Date(interview.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                  <Badge variant="outline">{interview.program}</Badge>
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm" className="flex-1 gap-1">
                      <Eye className="h-4 w-4" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 gap-1">
                      <Edit className="h-4 w-4" />
                      Edit
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
