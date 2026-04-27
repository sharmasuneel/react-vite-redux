import { cn } from "@/lib/utils";
import { getIcon } from "@/lib/icons";

export interface QuickActionItem {
  id: string;
  icon: string;
  label: string;
  description: string;
  color: string; // Tailwind bg class
}

interface QuickActionsProps {
  title?: string;
  subtitle?: string;
  actions: QuickActionItem[];
  onAction?: (id: string) => void;
  onClose?: () => void;
}

export const QuickActions = ({
  title = "Quick Actions",
  subtitle = "Common tasks and shortcuts",
  actions,
  onAction,
  onClose,
}: QuickActionsProps) => {
  const Close = getIcon("close");
  return (
    <aside className="w-72 bg-card border-l border-border p-5 shrink-0 animate-slide-in-right">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-semibold text-foreground">{title}</h3>
        {onClose && (
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <Close className="w-4 h-4" />
          </button>
        )}
      </div>
      <p className="text-xs text-muted-foreground mb-5">{subtitle}</p>
      <div className="flex flex-col gap-3">
        {actions.map((action) => {
          const Icon = getIcon(action.icon);
          return (
            <button
              key={action.id}
              onClick={() => onAction?.(action.id)}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors text-left"
            >
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-primary-foreground", action.color)}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{action.label}</p>
                <p className="text-xs text-muted-foreground">{action.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
};
