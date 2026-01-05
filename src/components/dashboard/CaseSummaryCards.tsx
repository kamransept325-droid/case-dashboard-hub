import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface SummaryMetric {
  label: string;
  value: number;
  percentage: number;
  color: "primary" | "warning" | "success" | "destructive" | "muted";
}

const colorMap = {
  primary: "bg-primary",
  warning: "bg-accent",
  success: "bg-[hsl(var(--success))]",
  destructive: "bg-destructive",
  muted: "bg-muted-foreground",
};

const textColorMap = {
  primary: "text-primary",
  warning: "text-accent",
  success: "text-[hsl(var(--success))]",
  destructive: "text-destructive",
  muted: "text-muted-foreground",
};

export function CaseSummaryCards() {
  const caseStatus: SummaryMetric[] = [
    { label: "Total Cases", value: 2977, percentage: 100, color: "primary" },
    { label: "Pending in Court", value: 448, percentage: 16, color: "warning" },
    { label: "Disposed of", value: 2323, percentage: 84, color: "success" },
    { label: "Other Status", value: 206, percentage: 7, color: "muted" },
  ];

  const disposalStats: SummaryMetric[] = [
    { label: "Total Disposed", value: 2260, percentage: 100, color: "primary" },
    { label: "In Favor of LAS", value: 1851, percentage: 82, color: "success" },
    { label: "Against LAS", value: 409, percentage: 18, color: "destructive" },
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {/* Case Status Overview */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Case Status Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {caseStatus.map((metric) => (
            <div key={metric.label} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{metric.label}</span>
                <span className="font-semibold">
                  <span className={textColorMap[metric.color]}>{metric.percentage}%</span>
                  <span className="ml-2 text-muted-foreground">({metric.value.toLocaleString()})</span>
                </span>
              </div>
              <Progress value={metric.percentage} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Disposal Outcome */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Disposal Outcome</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {disposalStats.map((metric) => (
            <div key={metric.label} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{metric.label}</span>
                <span className="font-semibold">
                  <span className={textColorMap[metric.color]}>{metric.percentage}%</span>
                  <span className="ml-2 text-muted-foreground">({metric.value.toLocaleString()})</span>
                </span>
              </div>
              <Progress value={metric.percentage} className="h-2" />
            </div>
          ))}
          <div className="mt-4 rounded-lg bg-muted/50 p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Avg. Days For Case</span>
              <span className="text-2xl font-bold text-primary">134 <span className="text-sm font-normal text-muted-foreground">Days</span></span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
