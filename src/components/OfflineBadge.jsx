import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export default function OfflineBadge({ className, compact }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium",
        compact ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-xs",
        "bg-[hsl(var(--offline-surface))] text-[hsl(var(--offline-text))]"
      )}
    >
      <ShieldCheck className="h-3.5 w-3.5" />
      100% Offline
    </span>
  );
}