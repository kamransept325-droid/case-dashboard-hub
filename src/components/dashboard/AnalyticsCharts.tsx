import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Legend,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

// Program distribution data
const programData = [
  { name: "Non-Program", value: 350 },
  { name: "HRD", value: 463 },
  { name: "WRLMP", value: 280 },
  { name: "IG", value: 190 },
  { name: "100 Case", value: 420 },
  { name: "MFL", value: 150 },
  { name: "Bank Alfalah", value: 200 },
  { name: "Other", value: 380 },
];

const caseReferredData = [
  { name: "Walk-In", value: 850 },
  { name: "Govt. Institutions", value: 420 },
  { name: "CSOs", value: 380 },
  { name: "Paralegal", value: 310 },
  { name: "SLACC", value: 190 },
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
  { name: "Sukkur", count: 180 },
  { name: "Malir", count: 150 },
];

const courtLevelData = [
  { name: "Family Court", count: 980 },
  { name: "Sessions", count: 650 },
  { name: "High Court", count: 420 },
  { name: "Magistrate", count: 380 },
  { name: "Civil Judge", count: 320 },
  { name: "Supreme Court", count: 120 },
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
  "hsl(221, 83%, 53%)",  // primary blue
  "hsl(38, 92%, 50%)",   // accent orange
  "hsl(142, 71%, 45%)",  // green
  "hsl(262, 83%, 58%)",  // purple
  "hsl(0, 84%, 60%)",    // red
  "hsl(199, 89%, 48%)",  // cyan
  "hsl(315, 70%, 50%)",  // pink
  "hsl(45, 93%, 47%)",   // yellow
];

interface MiniPieChartProps {
  title: string;
  data: { name: string; value: number }[];
}

function MiniPieChart({ title, data }: MiniPieChartProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={35}
                outerRadius={65}
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

export function AnalyticsCharts() {
  return (
    <div className="space-y-4">
      {/* Pie Charts Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <MiniPieChart title="Programs" data={programData} />
        <MiniPieChart title="Case Referred" data={caseReferredData} />
        <MiniPieChart title="Gender" data={genderData} />
        <MiniPieChart title="Religion" data={religionData} />
        <MiniPieChart title="Nature of Case" data={natureOfCaseData} />
      </div>

      {/* Bar Charts and Trend */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* District Distribution */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Cases by District</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={districtData} layout="vertical" margin={{ left: 20 }}>
                  <XAxis type="number" tick={{ fontSize: 10 }} />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={80}
                    tick={{ fontSize: 10 }}
                  />
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

        {/* Level of Court */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Cases by Court Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={courtLevelData} layout="vertical" margin={{ left: 20 }}>
                  <XAxis type="number" tick={{ fontSize: 10 }} />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={80}
                    tick={{ fontSize: 10 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="count" fill="hsl(38, 92%, 50%)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Trend */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Monthly Case Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
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
  );
}
