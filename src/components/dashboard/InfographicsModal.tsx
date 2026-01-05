import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface InfographicsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const programData = [
  { name: "Non-Program", value: 350 },
  { name: "HRD", value: 463 },
  { name: "WRLMP", value: 280 },
  { name: "100 Case", value: 420 },
  { name: "Bank Alfalah", value: 200 },
  { name: "Other", value: 380 },
];

const caseReferredData = [
  { name: "Walk-In", value: 850 },
  { name: "Govt. Institutions", value: 420 },
  { name: "CSOs", value: 380 },
  { name: "Paralegal", value: 310 },
  { name: "Other", value: 280 },
];

const genderData = [
  { name: "Female", value: 1650 },
  { name: "Male", value: 1280 },
  { name: "Transgender", value: 47 },
];

const religionData = [
  { name: "Muslim", value: 2100 },
  { name: "Christian", value: 520 },
  { name: "Hindu", value: 280 },
  { name: "Sikh", value: 40 },
  { name: "Other", value: 37 },
];

const natureOfCaseData = [
  { name: "Family", value: 1200 },
  { name: "Criminal", value: 890 },
  { name: "Civil", value: 620 },
  { name: "Constitutional", value: 267 },
];

const districtData = [
  { name: "Larkana", count: 400 },
  { name: "Malyari", count: 350 },
  { name: "Hyderabad", count: 300 },
  { name: "Karachi Central", count: 250 },
  { name: "Karachi East", count: 200 },
  { name: "Karachi South", count: 150 },
  { name: "Karachi West", count: 100 },
  { name: "Sukkur", count: 50 },
  { name: "Malir", count: 45 },
  { name: "Qambar", count: 40 },
  { name: "Shahdadkot", count: 35 },
  { name: "Shikarpur", count: 30 },
];

const levelOfCourtData = [
  { name: "Family & Sessions", count: 1000 },
  { name: "Family Court", count: 900 },
  { name: "District & Sessions", count: 800 },
  { name: "Judicial Magistrate", count: 700 },
  { name: "High Court", count: 600 },
  { name: "High Civil Judge", count: 500 },
  { name: "Chief Judge Court", count: 400 },
  { name: "Additional Judge", count: 300 },
];

const typeOfCaseData = [
  { name: "Custody", value: 420 },
  { name: "Maintenance", value: 380 },
  { name: "Divorce", value: 350 },
  { name: "Suit Recovery", value: 280 },
  { name: "Civil Suit", value: 250 },
  { name: "Trial", value: 220 },
  { name: "Inheritance", value: 180 },
  { name: "Family Petition", value: 150 },
  { name: "Other", value: 120 },
];

const caseCategoryData = [
  { name: "Suit", count: 450 },
  { name: "Cr. Misc", count: 380 },
  { name: "Execution", count: 320 },
  { name: "Suit/Application", count: 280 },
  { name: "Bail", count: 250 },
  { name: "Application", count: 220 },
  { name: "Trial", count: 190 },
  { name: "Appeal/Revision", count: 160 },
  { name: "Constitutional Petition", count: 130 },
  { name: "Appeal", count: 100 },
];

const caseStageData = [
  { name: "Hearing", count: 520 },
  { name: "Pending", count: 450 },
  { name: "Trial", count: 380 },
  { name: "Orders", count: 320 },
  { name: "Evidence", count: 280 },
  { name: "Arguments", count: 240 },
  { name: "Service", count: 200 },
  { name: "Disposal", count: 160 },
  { name: "Initial", count: 120 },
];

const trendData = [
  { month: "Jan", cases: 45 },
  { month: "Feb", cases: 52 },
  { month: "Mar", cases: 48 },
  { month: "Apr", cases: 61 },
  { month: "May", cases: 55 },
  { month: "Jun", cases: 67 },
  { month: "Jul", cases: 78 },
  { month: "Aug", cases: 84 },
  { month: "Sep", cases: 91 },
  { month: "Oct", cases: 88 },
  { month: "Nov", cases: 102 },
  { month: "Dec", cases: 115 },
];

const quarterlyCourtData = [
  { court: "Family Court", Q1: 120, Q2: 140, Q3: 130, Q4: 150 },
  { court: "Sessions Court", Q1: 80, Q2: 95, Q3: 100, Q4: 110 },
  { court: "High Court", Q1: 60, Q2: 70, Q3: 65, Q4: 75 },
  { court: "District Court", Q1: 90, Q2: 85, Q3: 95, Q4: 100 },
];

const COLORS = [
  "hsl(221, 83%, 53%)",
  "hsl(38, 92%, 50%)",
  "hsl(142, 71%, 45%)",
  "hsl(262, 83%, 58%)",
  "hsl(0, 84%, 60%)",
  "hsl(199, 89%, 48%)",
  "hsl(340, 82%, 52%)",
  "hsl(45, 93%, 47%)",
  "hsl(180, 70%, 45%)",
];

function MiniPieChart({
  title,
  data,
}: {
  title: string;
  data: { name: string; value: number }[];
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[160px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={55}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                  fontSize: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-1">
          {data.slice(0, 4).map((item, index) => (
            <div key={item.name} className="flex items-center gap-1.5 text-xs">
              <div
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="truncate text-muted-foreground">{item.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function HorizontalBarChart({
  title,
  data,
  color = "hsl(221, 83%, 53%)",
}: {
  title: string;
  data: { name: string; count: number }[];
  color?: string;
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ left: 10 }}>
              <XAxis type="number" tick={{ fontSize: 10 }} />
              <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 9 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="count" fill={color} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export function InfographicsModal({ open, onOpenChange }: InfographicsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Analytics & Infographics</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[75vh] pr-4">
          <div className="space-y-6">
            {/* Pie Charts Row - Programs, Case Referred, Gender */}
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
              <MiniPieChart title="Programs" data={programData} />
              <MiniPieChart title="Case Referred" data={caseReferredData} />
              <MiniPieChart title="Gender" data={genderData} />
              <MiniPieChart title="Religion" data={religionData} />
              <MiniPieChart title="Nature of Case" data={natureOfCaseData} />
            </div>

            {/* District Name & Level of Court */}
            <div className="grid gap-4 lg:grid-cols-2">
              <HorizontalBarChart 
                title="District Name" 
                data={districtData} 
                color="hsl(221, 83%, 53%)" 
              />
              <HorizontalBarChart 
                title="Level of Court" 
                data={levelOfCourtData} 
                color="hsl(38, 92%, 50%)" 
              />
            </div>

            {/* Type of Case & Case Categories */}
            <div className="grid gap-4 lg:grid-cols-2">
              <MiniPieChart title="Type of Case" data={typeOfCaseData} />
              <HorizontalBarChart 
                title="Case Categories" 
                data={caseCategoryData} 
                color="hsl(142, 71%, 45%)" 
              />
            </div>

            {/* Case Stages & Monthly Trend */}
            <div className="grid gap-4 lg:grid-cols-2">
              <HorizontalBarChart 
                title="Case Stages" 
                data={caseStageData} 
                color="hsl(262, 83%, 58%)" 
              />
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Case Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trendData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "var(--radius)",
                            fontSize: "12px",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="cases"
                          stroke="hsl(221, 83%, 53%)"
                          strokeWidth={2}
                          dot={{ fill: "hsl(221, 83%, 53%)", strokeWidth: 2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quarterly Breakdown by Court */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Quarterly Breakdown - Number of Cases by Court</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={quarterlyCourtData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="court" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "var(--radius)",
                          fontSize: "12px",
                        }}
                      />
                      <Bar dataKey="Q1" fill="hsl(221, 83%, 53%)" name="Q1" />
                      <Bar dataKey="Q2" fill="hsl(38, 92%, 50%)" name="Q2" />
                      <Bar dataKey="Q3" fill="hsl(142, 71%, 45%)" name="Q3" />
                      <Bar dataKey="Q4" fill="hsl(262, 83%, 58%)" name="Q4" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-3 flex justify-center gap-6">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="h-3 w-3 rounded" style={{ backgroundColor: "hsl(221, 83%, 53%)" }} />
                    <span className="text-muted-foreground">Q1</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="h-3 w-3 rounded" style={{ backgroundColor: "hsl(38, 92%, 50%)" }} />
                    <span className="text-muted-foreground">Q2</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="h-3 w-3 rounded" style={{ backgroundColor: "hsl(142, 71%, 45%)" }} />
                    <span className="text-muted-foreground">Q3</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="h-3 w-3 rounded" style={{ backgroundColor: "hsl(262, 83%, 58%)" }} />
                    <span className="text-muted-foreground">Q4</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
        <div className="pt-4 border-t">
          <Link to="/infographics" onClick={() => onOpenChange(false)}>
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
