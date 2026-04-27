import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getIcon } from "@/lib/icons";

type ViewMode = "grid" | "table" | "calendar";

interface ViewToggleProps {
  activeView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  viewLabel?: string;
  viewCount?: number;
}

const views: { id: ViewMode; iconName: string }[] = [
  { id: "grid", iconName: "view-grid" },
  { id: "table", iconName: "view-table" },
  { id: "calendar", iconName: "view-calendar" },
];

export const ViewToggle = ({ activeView, onViewChange, viewLabel, viewCount }: ViewToggleProps) => {
  const Eye = getIcon("view");
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
        {views.map(({ id, iconName }) => {
          const Icon = getIcon(iconName);
          return (
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
          );
        })}
      </div>
    </div>
  );
};
