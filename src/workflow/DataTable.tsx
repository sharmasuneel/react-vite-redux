import { cn } from "@/lib/utils";
import { ArrowUp, MoreVertical } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface DataColumn<T> {
  id: string;
  header: string;
  accessorKey: keyof T;
  cell?: (row: T) => React.ReactNode;
  sortable?: boolean;
  icon?: React.ReactNode;
}

interface DataTableProps<T extends { id: string }> {
  columns: DataColumn<T>[];
  data: T[];
  sortColumn?: string;
  sortDirection?: "asc" | "desc";
  onSort?: (columnId: string) => void;
  onRowAction?: (row: T) => void;
}

export function DataTable<T extends { id: string }>({
  columns,
  data,
  sortColumn,
  sortDirection = "asc",
  onSort,
  onRowAction,
}: DataTableProps<T>) {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-1" />
            {columns.map((col) => (
              <TableHead
                key={col.id}
                className={cn(
                  "text-xs font-semibold text-muted-foreground uppercase tracking-wide",
                  col.sortable && "cursor-pointer select-none"
                )}
                onClick={() => col.sortable && onSort?.(col.id)}
              >
                <span className="flex items-center gap-1.5">
                  {col.icon}
                  {col.header}
                  {sortColumn === col.id && (
                    <ArrowUp
                      className={cn(
                        "w-3.5 h-3.5 transition-transform",
                        sortDirection === "desc" && "rotate-180"
                      )}
                    />
                  )}
                </span>
              </TableHead>
            ))}
            <TableHead className="w-10" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id} className="group">
              <TableCell className="w-1 p-0">
                <div className="w-1 h-full" />
              </TableCell>
              {columns.map((col) => (
                <TableCell key={col.id} className="text-sm">
                  {col.cell ? col.cell(row) : String(row[col.accessorKey] ?? "")}
                </TableCell>
              ))}
              <TableCell>
                <button
                  onClick={() => onRowAction?.(row)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
