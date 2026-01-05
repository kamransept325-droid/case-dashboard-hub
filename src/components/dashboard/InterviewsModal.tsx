import { useState } from "react";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Users, Calendar, Phone, Eye, Edit, Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

interface InterviewsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

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

const programs = ["HRD", "100 Case", "WRLMP", "Bank Alfalah", "BISP", "EOBI"];
const interviewers = ["Nafees Khattak", "Amanullah", "Abida Bibi", "Habib ur Rahman"];

export function InterviewsModal({ open, onOpenChange }: InterviewsModalProps) {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    clientName: "",
    phone: "",
    date: "",
    interviewer: "",
    program: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Interview Created",
      description: `New interview scheduled for ${formData.clientName}`,
    });
    setFormData({ clientName: "", phone: "", date: "", interviewer: "", program: "" });
    setShowForm(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            New Interviews
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-3">
            {interviews.map((interview) => (
              <Card key={interview.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">
                          {interview.clientName}
                        </h3>
                        <Badge variant="secondary" className={statusStyles[interview.status]}>
                          {interview.status}
                        </Badge>
                      </div>
                      <div className="grid gap-1.5 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Phone className="h-3.5 w-3.5" />
                          {interview.phone}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-3.5 w-3.5" />
                          Interviewer: {interview.interviewer}
                        </div>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <Badge variant="outline">{interview.program}</Badge>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {new Date(interview.date).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                      <div className="flex gap-1 mt-2">
                        <Button variant="outline" size="sm" className="gap-1">
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="outline" size="sm" className="gap-1">
                          <Edit className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>

        {/* Create New Interview Form */}
        {showForm ? (
          <div className="pt-4 border-t space-y-4">
            <h4 className="font-semibold text-foreground">Create New Interview</h4>
            <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="clientName">Client Name</Label>
                <Input
                  id="clientName"
                  placeholder="Enter client name"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="+92 3XX XXXXXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Interview Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="interviewer">Interviewer</Label>
                <Select
                  value={formData.interviewer}
                  onValueChange={(value) => setFormData({ ...formData, interviewer: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select interviewer" />
                  </SelectTrigger>
                  <SelectContent>
                    {interviewers.map((interviewer) => (
                      <SelectItem key={interviewer} value={interviewer}>
                        {interviewer}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="program">Program</Label>
                <Select
                  value={formData.program}
                  onValueChange={(value) => setFormData({ ...formData, program: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select program" />
                  </SelectTrigger>
                  <SelectContent>
                    {programs.map((program) => (
                      <SelectItem key={program} value={program}>
                        {program}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="sm:col-span-2 flex gap-2">
                <Button type="submit" className="flex-1">
                  Create Interview
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        ) : (
          <div className="pt-4 border-t">
            <Button className="w-full gap-2" onClick={() => setShowForm(true)}>
              <Plus className="h-4 w-4" />
              Create New Interview
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
