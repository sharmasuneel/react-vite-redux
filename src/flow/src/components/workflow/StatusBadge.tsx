import { cn } from "@/lib/utils";

type StatusType = "new" | "pending" | "completed" | "in-progress";

interface StatusBadgeProps {
  status: StatusType;
  label: string;
  sublabel?: string;
}

const statusColors: Record<StatusType, string> = {
  new: "bg-status-new",
  pending: "bg-status-pending",
  completed: "bg-status-completed",
  "in-progress": "bg-status-in-progress",
};

export const StatusBadge = ({ status, label, sublabel }: StatusBadgeProps) => {
  return (
    <div className="flex items-start gap-2">
      <div className={cn("w-1 rounded-full self-stretch min-h-[2rem]", statusColors[status])} />
      <div>
        <p className="text-sm font-medium text-primary">{label}</p>
        {sublabel && <p className="text-xs text-muted-foreground">{sublabel}</p>}
      </div>
    </div>
  );
};
