import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  { name: "Other", value: 77 },
];

const natureOfCaseData = [
  { name: "Family", value: 1200 },
  { name: "Criminal", value: 890 },
  { name: "Civil", value: 620 },
  { name: "Constitutional", value: 267 },
];

const districtData = [
  { name: "Hyderabad", count: 400 },
  { name: "Karachi Central", count: 350 },
  { name: "Karachi East", count: 320 },
  { name: "Karachi South", count: 290 },
  { name: "Karachi West", count: 260 },
  { name: "Larkana", count: 380 },
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

const COLORS = [
  "hsl(221, 83%, 53%)",
  "hsl(38, 92%, 50%)",
  "hsl(142, 71%, 45%)",
  "hsl(262, 83%, 58%)",
  "hsl(0, 84%, 60%)",
  "hsl(199, 89%, 48%)",
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

export function InfographicsModal({ open, onOpenChange }: InfographicsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Analytics & Infographics</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[75vh] pr-4">
          <div className="space-y-6">
            {/* Pie Charts Row */}
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
              <MiniPieChart title="Programs" data={programData} />
              <MiniPieChart title="Case Referred" data={caseReferredData} />
              <MiniPieChart title="Gender" data={genderData} />
              <MiniPieChart title="Religion" data={religionData} />
              <MiniPieChart title="Nature of Case" data={natureOfCaseData} />
            </div>

            {/* Bar & Line Charts */}
            <div className="grid gap-4 lg:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Cases by District</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[220px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={districtData} layout="vertical" margin={{ left: 10 }}>
                        <XAxis type="number" tick={{ fontSize: 10 }} />
                        <YAxis dataKey="name" type="category" width={90} tick={{ fontSize: 10 }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "var(--radius)",
                            fontSize: "12px",
                          }}
                        />
                        <Bar dataKey="count" fill="hsl(221, 83%, 53%)" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Case Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[220px]">
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
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
