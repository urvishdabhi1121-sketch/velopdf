import { NavLink } from "react-router-dom";
import { Home, Wrench, Folder, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/tools", label: "Tools", icon: Wrench },
  { to: "/files", label: "Files", icon: Folder },
  { to: "/settings", label: "Settings", icon: Settings },
];

export default function SideNav() {
  return (
    <aside className="hidden md:flex w-60 shrink-0 flex-col gap-1 border-r border-border bg-card p-4">
      <div className="mb-6 flex items-center gap-2 px-2">
        <VeloMark />
        <span className="font-heading text-lg font-bold tracking-tight">VeloPDF</span>
      </div>
      {items.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              isActive ? "bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]" : "text-muted-foreground hover:bg-muted"
            )
          }
        >
          <Icon className="h-5 w-5" />
          {label}
        </NavLink>
      ))}
    </aside>
  );
}

export function VeloMark() {
  return (
    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[hsl(var(--primary))]">
      <svg viewBox="0 0 64 64" className="h-6 w-6">
        <path d="M20 18h16l10 10v22a2 2 0 0 1-2 2H20a2 2 0 0 1-2-2V20a2 2 0 0 1 2-2z" fill="#fff" />
        <path d="M36 18l10 10h-8a2 2 0 0 1-2-2v-8z" fill="#0284C7" />
        <path d="M26 34l5 5 9-9" stroke="#0284C7" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    </span>
  );
}