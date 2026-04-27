import { cn } from "@/lib/utils";
import { getIcon } from "@/lib/icons";

type StatVariant = "blue" | "orange" | "green" | "pink";

interface StatCardProps {
  icon: string;
  value: number | string;
  label: string;
  trend?: number;
  variant?: StatVariant;
}

const variantStyles: Record<StatVariant, { bg: string; icon: string }> = {
  blue: { bg: "bg-stat-blue", icon: "text-stat-blue-icon" },
  orange: { bg: "bg-stat-orange", icon: "text-stat-orange-icon" },
  green: { bg: "bg-stat-green", icon: "text-stat-green-icon" },
  pink: { bg: "bg-stat-pink", icon: "text-stat-pink-icon" },
};

export const StatCard = ({ icon, value, label, trend, variant = "blue" }: StatCardProps) => {
  const styles = variantStyles[variant];
  const isPositive = trend !== undefined && trend >= 0;
  const Icon = getIcon(icon);
  const TrendIcon = getIcon(isPositive ? "trend-up" : "trend-down");

  return (
    <div className="bg-card rounded-xl border border-border p-5 flex flex-col gap-3 min-w-[200px] flex-1">
      <div className="flex items-start justify-between">
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", styles.bg)}>
          <Icon className={cn("w-6 h-6", styles.icon)} />
        </div>
        {trend !== undefined && (
          <div className={cn("flex items-center gap-1 text-sm font-medium", isPositive ? "text-trend-up" : "text-trend-down")}>
            <TrendIcon className="w-4 h-4" />
            {isPositive ? "+" : ""}{trend}%
          </div>
        )}
      </div>
      <div>
        <p className="text-3xl font-bold text-foreground">{value}</p>
        <p className="text-sm text-muted-foreground mt-1">{label}</p>
      </div>
    </div>
  );
};
