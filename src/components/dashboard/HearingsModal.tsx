import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface HearingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface CalendarEvent {
  id: number;
  caseNumber: string;
  clientName: string;
  court: string;
  date: string;
  startTime: string;
  endTime: string;
}

const calendarEvents: CalendarEvent[] = [
  {
    id: 1,
    caseNumber: "2913/23",
    clientName: "Saima",
    court: "Additional District",
    date: "2026-01-05",
    startTime: "14:00",
    endTime: "15:00",
  },
  {
    id: 2,
    caseNumber: "2065",
    clientName: "Shanza",
    court: "Additional District",
    date: "2026-01-06",
    startTime: "14:00",
    endTime: "15:00",
  },
  {
    id: 3,
    caseNumber: "4819",
    clientName: "Aqeela",
    court: "Additional District",
    date: "2026-01-10",
    startTime: "14:00",
    endTime: "15:00",
  },
  {
    id: 4,
    caseNumber: "750/23",
    clientName: "Pamela",
    court: "Additional District",
    date: "2026-01-10",
    startTime: "14:00",
    endTime: "15:00",
  },
];

const users = ["bahzad akbar", "Nafees Khattak", "Amanullah", "Abida Bibi"];
const programs = ["All Programs", "HRD", "100 Case", "WRLMP", "Bank Alfalah"];
const statuses = ["All Status", "Scheduled", "Completed", "Adjourned"];
const courts = ["All Courts", "Additional District", "Family Court", "High Court", "Supreme Court"];

const timeSlots = [
  "all-day", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm"
];

export function HearingsModal({ open, onOpenChange }: HearingsModalProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 5)); // Jan 5, 2026
  const [viewMode, setViewMode] = useState<"month" | "week" | "day" | "list">("week");
  const [filters, setFilters] = useState({
    user: "bahzad akbar",
    program: "All Programs",
    status: "All Status",
    court: "All Courts",
  });

  const getWeekDays = (date: Date) => {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    startOfWeek.setDate(startOfWeek.getDate() - day);
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      days.push(d);
    }
    return days;
  };

  const weekDays = getWeekDays(currentDate);
  const startDate = weekDays[0];
  const endDate = weekDays[6];

  const formatDateRange = () => {
    const startMonth = startDate.toLocaleDateString("en-US", { month: "short" });
    const endMonth = endDate.toLocaleDateString("en-US", { month: "short" });
    const year = startDate.getFullYear();
    
    if (startMonth === endMonth) {
      return `${startMonth} ${startDate.getDate()} – ${endDate.getDate()}, ${year}`;
    }
    return `${startMonth} ${startDate.getDate()} – ${endMonth} ${endDate.getDate()}, ${year}`;
  };

  const goToPreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date(2026, 0, 5)); // Mock today
  };

  const getEventsForDay = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return calendarEvents.filter((event) => event.date === dateStr);
  };

  const isToday = (date: Date) => {
    const today = new Date(2026, 0, 5); // Mock today
    return date.toDateString() === today.toDateString();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] max-h-[90vh] w-full">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-primary" />
            Upcoming Hearings
          </DialogTitle>
        </DialogHeader>

        {/* Filter Options */}
        <Card className="border-primary/20">
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium text-primary flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter Options
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-3">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Filter by User:</label>
                <Select value={filters.user} onValueChange={(v) => setFilters({ ...filters, user: v })}>
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user} value={user}>{user}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Program:</label>
                <Select value={filters.program} onValueChange={(v) => setFilters({ ...filters, program: v })}>
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {programs.map((p) => (
                      <SelectItem key={p} value={p}>{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Status:</label>
                <Select value={filters.status} onValueChange={(v) => setFilters({ ...filters, status: v })}>
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Court:</label>
                <Select value={filters.court} onValueChange={(v) => setFilters({ ...filters, court: v })}>
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {courts.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Calendar View */}
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium text-primary flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              Calendar View
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {/* Calendar Navigation */}
            <div className="flex items-center justify-between px-4 py-2 border-b">
              <div className="flex items-center gap-2">
                <div className="flex">
                  <Button variant="outline" size="sm" className="rounded-r-none" onClick={goToPreviousWeek}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-l-none" onClick={goToNextWeek}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant="outline" size="sm" onClick={goToToday}>
                  today
                </Button>
              </div>
              <h3 className="text-lg font-semibold text-foreground">{formatDateRange()}</h3>
              <div className="flex">
                {(["month", "week", "day", "list"] as const).map((mode) => (
                  <Button
                    key={mode}
                    variant={viewMode === mode ? "default" : "outline"}
                    size="sm"
                    className={cn(
                      "rounded-none first:rounded-l-md last:rounded-r-md",
                      mode !== "month" && mode !== "list" && "-ml-px"
                    )}
                    onClick={() => setViewMode(mode)}
                  >
                    {mode}
                  </Button>
                ))}
              </div>
            </div>

            {/* Calendar Grid */}
            <ScrollArea className="h-[400px]">
              <div className="min-w-[800px]">
                {/* Header Row */}
                <div className="grid grid-cols-8 border-b sticky top-0 bg-background z-10">
                  <div className="p-2 text-xs text-muted-foreground border-r"></div>
                  {weekDays.map((day, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "p-2 text-center border-r last:border-r-0",
                        isToday(day) && "bg-accent/10"
                      )}
                    >
                      <div className="text-xs text-muted-foreground">
                        {day.toLocaleDateString("en-US", { weekday: "short" })} {day.getMonth() + 1}/{day.getDate()}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Time Slots */}
                {timeSlots.map((time, timeIdx) => (
                  <div key={time} className="grid grid-cols-8 border-b min-h-[50px]">
                    <div className="p-2 text-xs text-muted-foreground border-r flex items-start justify-end pr-3">
                      {time}
                    </div>
                    {weekDays.map((day, dayIdx) => {
                      const events = getEventsForDay(day);
                      const slotEvents = events.filter((e) => {
                        const hour = parseInt(e.startTime.split(":")[0]);
                        const slotHour = time === "all-day" ? -1 : parseInt(time.replace("am", "").replace("pm", "")) + (time.includes("pm") && time !== "12pm" ? 12 : 0);
                        return hour === slotHour;
                      });

                      return (
                        <div
                          key={dayIdx}
                          className={cn(
                            "p-1 border-r last:border-r-0 relative",
                            isToday(day) && "bg-accent/5"
                          )}
                        >
                          {slotEvents.map((event) => (
                            <div
                              key={event.id}
                              className="bg-destructive text-destructive-foreground text-[10px] p-1 rounded mb-1 cursor-pointer hover:opacity-90"
                            >
                              <div className="font-medium">
                                {event.startTime.replace(":", ":")} - {event.endTime.replace(":", ":")}
                              </div>
                              <div className="truncate">
                                {event.caseNumber} {event.clientName} @ {event.court}...
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
