import React from "react";
import { cn } from "@/lib/utils";

/**
 * Icon registry — loads SVG files from src/assets/icons as raw strings
 * and exposes them as React components that respect `className` and
 * inherit color via `currentColor` (just like lucide-react icons).
 *
 * Usage:
 *   const Icon = getIcon("dashboard");
 *   <Icon className="w-5 h-5 text-primary" />
 *
 * Add a new icon by dropping `my-icon.svg` into src/assets/icons/
 * and adding an alias below if you want a friendly name.
 */

// Eagerly load every svg in the icons folder as raw markup
const svgModules = import.meta.glob("@/assets/icons/*.svg", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

// Map: filename (without ext) -> raw <svg>...</svg> string
const rawByName: Record<string, string> = {};
for (const [path, raw] of Object.entries(svgModules)) {
  const name = path.split("/").pop()!.replace(/\.svg$/, "");
  rawByName[name] = raw;
}

// Friendly aliases so callers can use semantic names instead of file names
const aliases: Record<string, string> = {
  dashboard: "layout-dashboard",
  requests: "list-filter",
  workflows: "git-branch",
  forms: "grid",
  reports: "file-text",
  documents: "folder-open",
  audit: "clipboard-list",
  organization: "building-2",
  payment: "credit-card",
  "new-request": "file-plus",
  ssi: "send",
  upload: "upload",
  customer: "user-plus",
  back: "arrow-left",
  close: "x",
  notifications: "bell",
  settings: "settings",
  search: "search",
  view: "eye",
  filter: "filter",
  more: "more-vertical",
  sort: "arrow-up",
  "trend-up": "trending-up",
  "trend-down": "trending-down",
  "view-grid": "layout-grid",
  "view-table": "table",
  "view-calendar": "calendar-days",
  building: "building",
  users: "users",
  calendar: "calendar",
  "file-up": "file-up",
};

export type IconName = keyof typeof aliases | string;

export interface IconProps extends React.SVGAttributes<SVGElement> {
  className?: string;
}

export type IconComponent = React.FC<IconProps>;

/**
 * Resolve a name (alias or filename) to its raw SVG markup.
 */
function resolveRaw(name: string): string | undefined {
  const key = aliases[name] ?? name;
  return rawByName[key];
}

/**
 * Strip the outer <svg ...> wrapper so we can re-render with our own
 * sizing/color props while keeping the inner shapes.
 */
function extractInner(raw: string): { inner: string; viewBox: string } {
  const viewBoxMatch = raw.match(/viewBox="([^"]+)"/);
  const innerMatch = raw.match(/<svg[^>]*>([\s\S]*)<\/svg>/);
  return {
    viewBox: viewBoxMatch?.[1] ?? "0 0 24 24",
    inner: innerMatch?.[1] ?? "",
  };
}

const cache = new Map<string, IconComponent>();

/**
 * getIcon — returns a React component for the given icon name.
 * Falls back to a hidden span if the icon is missing (logged in dev).
 */
export function getIcon(name: string): IconComponent {
  if (cache.has(name)) return cache.get(name)!;

  const raw = resolveRaw(name);
  if (!raw) {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.warn(`[icons] Unknown icon "${name}"`);
    }
    const Missing: IconComponent = () => null;
    cache.set(name, Missing);
    return Missing;
  }

  const { inner, viewBox } = extractInner(raw);

  const Component: IconComponent = ({ className, ...rest }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("inline-block shrink-0", className)}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: inner }}
      {...rest}
    />
  );
  Component.displayName = `Icon(${name})`;

  cache.set(name, Component);
  return Component;
}

/**
 * Convenience wrapper component if you'd rather pass the name as a prop.
 *   <Icon name="dashboard" className="w-5 h-5" />
 */
export const Icon: React.FC<{ name: string } & IconProps> = ({ name, ...props }) => {
  const Cmp = getIcon(name);
  return <Cmp {...props} />;
};
