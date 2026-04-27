import { Input } from "@/components/ui/input";
import { getIcon } from "@/lib/icons";

interface TopBarProps {
  searchPlaceholder?: string;
  userName?: string;
  userRole?: string;
  userInitials?: string;
}

export const TopBar = ({
  searchPlaceholder = "Search requests, users, or departments...",
  userName = "User",
  userRole = "User",
  userInitials = "U",
}: TopBarProps) => {
  const Search = getIcon("search");
  const Bell = getIcon("notifications");
  const Settings = getIcon("settings");
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-card border-b border-border">
      <div className="relative w-full max-w-lg">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder={searchPlaceholder}
          className="pl-10 bg-secondary border-none"
        />
      </div>
      <div className="flex items-center gap-4 ml-4">
        <button className="relative text-muted-foreground hover:text-foreground transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
        </button>
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <Settings className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 ml-2">
          <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
            {userInitials}
          </div>
          <div className="hidden md:block text-right">
            <p className="text-sm font-medium leading-none">{userName}</p>
            <p className="text-xs text-muted-foreground">{userRole}</p>
          </div>
        </div>
      </div>
    </header>
  );
};
