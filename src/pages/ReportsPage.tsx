import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart3,
  Download,
  FileText,
  PieChart,
  TrendingUp,
  ArrowLeft,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const reportTypes = [
  {
    id: "summary",
    title: "Case Summary Report",
    description: "Overview of all cases with status breakdown",
    icon: FileText,
  },
  {
    id: "program",
    title: "Program-wise Report",
    description: "Cases categorized by program",
    icon: PieChart,
  },
  {
    id: "district",
    title: "District-wise Report",
    description: "Cases distributed across districts",
    icon: BarChart3,
  },
  {
    id: "trend",
    title: "Monthly Trend Report",
    description: "Case filing and disposal trends",
    icon: TrendingUp,
  },
];

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [exportFormat, setExportFormat] = useState("pdf");

  const handleGenerate = () => {
    alert(`Generating ${selectedReport} report in ${exportFormat.toUpperCase()} format`);
  };

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
              <BarChart3 className="h-6 w-6 text-primary" />
              Generate Reports
            </h1>
            <p className="text-muted-foreground">Create and download various case reports</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Report Type Selection */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold">Select Report Type</Label>
            <div className="grid gap-4 sm:grid-cols-2">
              {reportTypes.map((report) => (
                <Card
                  key={report.id}
                  className={cn(
                    "cursor-pointer transition-all",
                    selectedReport === report.id
                      ? "border-primary bg-primary/5"
                      : "hover:border-primary/50"
                  )}
                  onClick={() => setSelectedReport(report.id)}
                >
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="rounded-lg bg-primary/10 p-3">
                      <report.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-lg">{report.title}</h4>
                      <p className="text-sm text-muted-foreground">{report.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold">Date Range</Label>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-sm">Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-card z-50" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label className="text-sm">End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-card z-50" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* Export Format */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold">Export Format</Label>
            <Select value={exportFormat} onValueChange={setExportFormat}>
              <SelectTrigger className="w-full max-w-xs bg-card">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card z-50">
                <SelectItem value="pdf">PDF Document</SelectItem>
                <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                <SelectItem value="csv">CSV File</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Generate Button */}
          <Button
            className="w-full max-w-xs gap-2"
            size="lg"
            disabled={!selectedReport}
            onClick={handleGenerate}
          >
            <Download className="h-5 w-5" />
            Download Data
          </Button>
        </div>
      </div>
    </div>
  );
}
