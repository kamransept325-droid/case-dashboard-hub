import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface ScoreCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "primary" | "success" | "warning" | "destructive";
  className?: string;
}

const variantStyles = {
  default: "border-l-4 border-l-muted-foreground",
  primary: "border-l-4 border-l-primary",
  success: "border-l-4 border-l-success",
  warning: "border-l-4 border-l-accent",
  destructive: "border-l-4 border-l-destructive",
};

const iconBgStyles = {
  default: "bg-muted",
  primary: "bg-primary/10",
  success: "bg-success/10",
  warning: "bg-accent/10",
  destructive: "bg-destructive/10",
};

const iconColorStyles = {
  default: "text-muted-foreground",
  primary: "text-primary",
  success: "text-success",
  warning: "text-accent",
  destructive: "text-destructive",
};

export function ScoreCard({
  title,
  value,
  icon: Icon,
  trend,
  variant = "default",
  className,
}: ScoreCardProps) {
  return (
    <Card className={cn("transition-shadow hover:shadow-md", variantStyles[variant], className)}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold text-foreground">{value.toLocaleString()}</p>
            {trend && (
              <div className="flex items-center gap-1">
                {trend.isPositive ? (
                  <TrendingUp className="h-3.5 w-3.5 text-success" />
                ) : (
                  <TrendingDown className="h-3.5 w-3.5 text-destructive" />
                )}
                <span
                  className={cn(
                    "text-xs font-medium",
                    trend.isPositive ? "text-success" : "text-destructive"
                  )}
                >
                  {trend.value}% from last month
                </span>
              </div>
            )}
          </div>
          <div className={cn("rounded-lg p-2.5", iconBgStyles[variant])}>
            <Icon className={cn("h-5 w-5", iconColorStyles[variant])} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
