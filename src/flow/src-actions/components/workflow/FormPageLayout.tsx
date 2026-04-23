import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormPageLayoutProps {
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
}

export const FormPageLayout = ({
  title,
  subtitle,
  icon: Icon,
  iconColor = "bg-primary",
  children,
  onSubmit,
}: FormPageLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-primary-foreground", iconColor)}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">{title}</h1>
            {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
          </div>
        </div>
      </header>
      <main className="max-w-3xl mx-auto p-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit?.(e);
          }}
          className="space-y-6"
        >
          {children}
        </form>
      </main>
    </div>
  );
};
