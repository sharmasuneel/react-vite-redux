import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getIcon } from "@/lib/icons";

export interface FilterConfig {
  id: string;
  label: string;
  type: "select" | "date" | "search";
  placeholder?: string;
  options?: { value: string; label: string }[];
}

interface FilterPanelProps {
  filters: FilterConfig[];
  onApply?: (values: Record<string, string>) => void;
  onReset?: () => void;
}

export const FilterPanel = ({ filters, onApply, onReset }: FilterPanelProps) => {
  const [visible, setVisible] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});
  const Filter = getIcon("filter");
  const Search = getIcon("search");

  const handleChange = (id: string, value: string) => {
    setValues((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div>
      <Button
        variant={visible ? "default" : "outline"}
        size="sm"
        onClick={() => setVisible(!visible)}
        className="gap-2"
      >
        <Filter className="w-4 h-4" />
        {visible ? "Hide Filters" : "Show Filters"}
      </Button>

      {visible && (
        <div className="mt-4 p-5 bg-card rounded-xl border border-border">
          <div className="flex items-center gap-2 mb-4 text-sm font-medium text-foreground">
            <Filter className="w-4 h-4" />
            Filters
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filters.map((filter) => (
              <div key={filter.id}>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                  {filter.label}
                </label>
                {filter.type === "select" && filter.options ? (
                  <Select
                    value={values[filter.id] || ""}
                    onValueChange={(v) => handleChange(filter.id, v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={filter.placeholder || "Select..."} />
                    </SelectTrigger>
                    <SelectContent>
                      {filter.options.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : filter.type === "date" ? (
                  <Input
                    type="date"
                    placeholder={filter.placeholder || "DD-MM-YYYY"}
                    value={values[filter.id] || ""}
                    onChange={(e) => handleChange(filter.id, e.target.value)}
                  />
                ) : (
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder={filter.placeholder || "Search..."}
                      className="pl-10"
                      value={values[filter.id] || ""}
                      onChange={(e) => handleChange(filter.id, e.target.value)}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => { setValues({}); onReset?.(); }}>
              Reset
            </Button>
            <Button onClick={() => onApply?.(values)}>Apply</Button>
          </div>
        </div>
      )}
    </div>
  );
};
