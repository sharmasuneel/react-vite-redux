import { cn } from "@/lib/utils";

export interface WorkflowTab {
  id: string;
  label: string;
  count?: number;
}

interface WorkflowTabsProps {
  tabs: WorkflowTab[];
  activeTab: string;
  onTabChange: (id: string) => void;
}

export const WorkflowTabs = ({ tabs, activeTab, onTabChange }: WorkflowTabsProps) => {
  return (
    <div className="flex items-center gap-1 border-b border-border">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "px-4 py-2.5 text-sm font-medium transition-colors relative flex items-center gap-2",
              isActive
                ? "text-foreground border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span
                className={cn(
                  "text-xs px-2 py-0.5 rounded-full",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
