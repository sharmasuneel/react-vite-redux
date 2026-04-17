import { LayoutGrid, Table2, CalendarDays, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type ViewMode = "grid" | "table" | "calendar";

interface ViewToggleProps {
  activeView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  viewLabel?: string;
  viewCount?: number;
}

const views: { id: ViewMode; icon: typeof LayoutGrid }[] = [
  { id: "grid", icon: LayoutGrid },
  { id: "table", icon: Table2 },
  { id: "calendar", icon: CalendarDays },
];

export const ViewToggle = ({ activeView, onViewChange, viewLabel, viewCount }: ViewToggleProps) => {
  return (
    <div className="flex items-center gap-3">
      {viewLabel && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Eye className="w-4 h-4" />
          <span>View:</span>
          <Select defaultValue="awaiting">
            <SelectTrigger className="h-8 w-auto gap-2 border-none bg-transparent px-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="awaiting">
                {viewLabel}
                {viewCount !== undefined && (
                  <span className="ml-2 text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full">
                    {viewCount}
                  </span>
                )}
              </SelectItem>
              <SelectItem value="all">All Requests</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
      <div className="flex bg-muted rounded-lg p-0.5">
        {views.map(({ id, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onViewChange(id)}
            className={cn(
              "p-1.5 rounded-md transition-colors",
              activeView === id
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className="w-4 h-4" />
          </button>
        ))}
      </div>
    </div>
  );
};
