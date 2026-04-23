import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ListFilter,
  GitBranch,
  Grid3X3,
  FileText,
  FolderOpen,
  ClipboardList,
  Building2,
  CreditCard,
  FilePlus,
  Send,
  Upload,
  UserPlus,
  Building,
  Users,
  Calendar,
} from "lucide-react";

import { IconSidebar, IconSidebarItem } from "@/components/workflow/IconSidebar";
import { TopBar } from "@/components/workflow/TopBar";
import { StatCard } from "@/components/workflow/StatCard";
import { WorkflowTabs, WorkflowTab } from "@/components/workflow/WorkflowTabs";
import { FilterPanel, FilterConfig } from "@/components/workflow/FilterPanel";
import { DataTable, DataColumn } from "@/components/workflow/DataTable";
import { QuickActions, QuickActionItem } from "@/components/workflow/QuickActions";
import { ViewToggle } from "@/components/workflow/ViewToggle";
import { StatusBadge } from "@/components/workflow/StatusBadge";

// --- Sample data ---
const sidebarItems: IconSidebarItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: ListFilter, label: "Requests", id: "requests" },
  { icon: GitBranch, label: "Workflows", id: "workflows" },
  { icon: Grid3X3, label: "Forms", id: "forms" },
  { icon: FileText, label: "Reports", id: "reports" },
  { icon: FolderOpen, label: "Documents", id: "documents" },
  { icon: ClipboardList, label: "Audit", id: "audit" },
  { icon: Building2, label: "Organization", id: "org" },
];

const tabs: WorkflowTab[] = [
  { id: "my", label: "My Requests", count: 12 },
  { id: "all", label: "All Requests", count: 118 },
  { id: "admin", label: "Admin Forms", count: 5 },
  { id: "report", label: "Request Forms Report" },
  { id: "email", label: "Email Audit" },
];

const filters: FilterConfig[] = [
  {
    id: "status", label: "Status", type: "select", placeholder: "All Status",
    options: [
      { value: "all", label: "All Status" },
      { value: "new", label: "New" },
      { value: "pending", label: "Pending" },
      { value: "completed", label: "Completed" },
      { value: "in-progress", label: "In Progress" },
    ],
  },
  {
    id: "type", label: "Instruction Types", type: "select", placeholder: "All Types",
    options: [
      { value: "all", label: "All Types" },
      { value: "payment", label: "Payment" },
      { value: "refunding", label: "Refunding Fee" },
      { value: "sbi", label: "SBI Request" },
    ],
  },
  {
    id: "department", label: "Departments", type: "select", placeholder: "All Departments",
    options: [
      { value: "all", label: "All Departments" },
      { value: "itsd", label: "ITSD - Development" },
      { value: "jre", label: "JRE - Development 3" },
    ],
  },
  {
    id: "team", label: "Teams", type: "select", placeholder: "All Teams",
    options: [
      { value: "all", label: "All Teams" },
      { value: "ops", label: "Operations Support" },
      { value: "data", label: "Data Control" },
      { value: "remit", label: "Remittances and Expenses" },
    ],
  },
  { id: "dateFrom", label: "Date From", type: "date", placeholder: "DD-MM-YYYY" },
  { id: "dateTo", label: "Date To", type: "date", placeholder: "DD-MM-YYYY" },
  { id: "reference", label: "Reference / SUN", type: "search", placeholder: "OAD / W0001..." },
];

interface RequestRow {
  id: string;
  statusType: "new" | "pending" | "completed" | "in-progress";
  statusLabel: string;
  reference: string;
  sun: string;
  instructionType: string;
  department: string;
  team: string;
  created: string;
  updated: string;
}

const sampleData: RequestRow[] = [
  { id: "1", statusType: "new", statusLabel: "Instruction Creation", reference: "OAD/W00014437", sun: "100000467", instructionType: "Refunding Fee", department: "ITSD - Development", team: "Operations Support", created: "03/03/2026 11:50", updated: "04/03/2026 15:35" },
  { id: "2", statusType: "pending", statusLabel: "Approve Request", reference: "OAD/W00025467", sun: "100000003", instructionType: "Payment", department: "ITSD - Development", team: "Data Control", created: "04/03/2026 12:53", updated: "04/03/2026 14:40" },
  { id: "3", statusType: "new", statusLabel: "Instruction Creation", reference: "OAD/W00012234", sun: "100000467", instructionType: "Refunding Fee", department: "ITSD - Development", team: "Operations Support", created: "03/03/2026 11:50", updated: "04/03/2026 15:35" },
  { id: "4", statusType: "in-progress", statusLabel: "Team Processing", reference: "OAD/W00013777", sun: "100000004", instructionType: "SBI Request", department: "JRE- Development 3", team: "Remittances and Expenses", created: "06/03/2026 03:40", updated: "07/03/2026 10:15" },
  { id: "5", statusType: "completed", statusLabel: "Completed", reference: "OAD/W00014437", sun: "100000467", instructionType: "Refunding Fee", department: "ITSD - Development", team: "Operations Support", created: "03/03/2026 11:50", updated: "04/03/2026 15:35" },
];

const columns: DataColumn<RequestRow>[] = [
  {
    id: "status", header: "Status", accessorKey: "statusLabel",
    cell: (row) => <StatusBadge status={row.statusType} label={row.statusLabel} sublabel={row.reference} />,
  },
  { id: "sun", header: "SUN", accessorKey: "sun" },
  { id: "type", header: "Instruction Type", accessorKey: "instructionType" },
  { id: "department", header: "Department", accessorKey: "department", icon: <Building className="w-3.5 h-3.5" /> },
  { id: "team", header: "Team", accessorKey: "team", icon: <Users className="w-3.5 h-3.5" /> },
  { id: "created", header: "Created", accessorKey: "created", sortable: true, icon: <Calendar className="w-3.5 h-3.5" /> },
  { id: "updated", header: "Updated", accessorKey: "updated", icon: <Calendar className="w-3.5 h-3.5" /> },
];

const quickActions: QuickActionItem[] = [
  { id: "payment", icon: CreditCard, label: "New Payment", description: "Create a payment request", color: "bg-quick-action-payment" },
  { id: "request", icon: FilePlus, label: "New Request", description: "Submit request form", color: "bg-quick-action-request" },
  { id: "ssi", icon: Send, label: "SSI Request", description: "Standing settlement", color: "bg-quick-action-ssi" },
  { id: "upload", icon: Upload, label: "Upload Document", description: "Add to filing", color: "bg-quick-action-upload" },
  { id: "customer", icon: UserPlus, label: "Add Customer", description: "New customer entry", color: "bg-quick-action-customer" },
];

const actionRoutes: Record<string, string> = {
  payment: "/new-payment",
  request: "/new-request",
  ssi: "/ssi-request",
  upload: "/upload-document",
  customer: "/add-customer",
};

const Index = () => {
  const navigate = useNavigate();
  const [activeSidebar, setActiveSidebar] = useState("workflows");
  const [activeTab, setActiveTab] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "table" | "calendar">("grid");
  const [showQuickActions, setShowQuickActions] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <IconSidebar
        items={sidebarItems}
        activeId={activeSidebar}
        onSelect={setActiveSidebar}
        logo={<LayoutDashboard className="w-6 h-6 text-primary" />}
      />

      <div className="flex flex-col flex-1 min-w-0">
        <TopBar
          userName="Mathew Hilton"
          userRole="Administrator"
          userInitials="MH"
        />

        <div className="flex flex-1 min-h-0">
          <main className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard icon={FileText} value={118} label="Total Requests" trend={12} variant="blue" />
              <StatCard icon={ListFilter} value={23} label="Pending Approvals" trend={5} variant="orange" />
              <StatCard icon={ClipboardList} value={87} label="Completed" trend={8} variant="green" />
              <StatCard icon={GitBranch} value={8} label="In Progress" trend={-3} variant="pink" />
            </div>

            {/* Tabs + View Controls */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <WorkflowTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
              <ViewToggle
                activeView={viewMode}
                onViewChange={setViewMode}
                viewLabel="Awaiting My Approval"
                viewCount={12}
              />
            </div>

            {/* Filters */}
            <FilterPanel filters={filters} />

            {/* Data Table */}
            <DataTable
              columns={columns}
              data={sampleData}
              sortColumn="created"
              sortDirection="asc"
            />
          </main>

          {/* Quick Actions Sidebar */}
          {showQuickActions && (
            <QuickActions
              actions={quickActions}
              onAction={(id) => {
                const route = actionRoutes[id];
                if (route) navigate(route);
              }}
              onClose={() => setShowQuickActions(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
