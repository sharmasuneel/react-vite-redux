import { cn } from "@/lib/utils";
import { getIcon } from "@/lib/icons";

export interface IconSidebarItem {
  icon: string;
  label: string;
  id: string;
}

interface IconSidebarProps {
  items: IconSidebarItem[];
  activeId: string;
  onSelect: (id: string) => void;
  logo?: React.ReactNode;
}

export const IconSidebar = ({ items, activeId, onSelect, logo }: IconSidebarProps) => {
  return (
    <aside className="flex flex-col items-center w-14 bg-nav-bg border-r border-border py-4 gap-1 shrink-0">
      {logo && <div className="mb-4">{logo}</div>}
      {items.map((item) => {
        const isActive = item.id === activeId;
        const Icon = getIcon(item.icon);
        return (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            title={item.label}
            className={cn(
              "w-10 h-10 flex items-center justify-center rounded-lg transition-colors",
              isActive
                ? "bg-nav-active text-primary-foreground"
                : "text-nav-icon hover:bg-accent"
            )}
          >
            <Icon className="w-5 h-5" />
          </button>
        );
      })}
    </aside>
  );
};
