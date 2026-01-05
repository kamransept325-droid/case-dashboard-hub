import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  count?: number;
  variant?: "default" | "primary" | "warning" | "success";
  onClick?: () => void;
  className?: string;
}

const variantStyles = {
  default: "hover:border-primary/50 hover:bg-muted/50",
  primary: "border-primary/30 bg-primary/5 hover:bg-primary/10",
  warning: "border-accent/30 bg-accent/5 hover:bg-accent/10",
  success: "border-success/30 bg-success/5 hover:bg-success/10",
};

const iconStyles = {
  default: "bg-muted text-muted-foreground",
  primary: "bg-primary/10 text-primary",
  warning: "bg-accent/10 text-accent",
  success: "bg-success/10 text-success",
};

export function QuickActionCard({
  title,
  description,
  icon: Icon,
  count,
  variant = "default",
  onClick,
  className,
}: QuickActionCardProps) {
  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-md",
        variantStyles[variant],
        className
      )}
      onClick={onClick}
    >
      <CardContent className="flex items-center gap-4 p-4">
        <div className={cn("rounded-xl p-3", iconStyles[variant])}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">{title}</h3>
            {count !== undefined && (
              <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-medium text-primary-foreground">
                {count}
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
