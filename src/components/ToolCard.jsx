import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ToolCard({ tool }) {
  const navigate = useNavigate();
  const Icon = tool.icon;
  const ready = tool.status === "ready";
  return (
    <button
      onClick={() => navigate(`/tool/${tool.id}`)}
      className={cn(
        "group flex flex-col gap-2 rounded-2xl border border-border bg-card p-4 text-left transition-all hover:border-[hsl(var(--primary))]/30 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      )}
    >
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-xl",
            ready ? "bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]" : "bg-muted text-muted-foreground"
          )}
        >
          <Icon className="h-5 w-5" />
        </span>
        {!ready && (
          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
            Soon
          </span>
        )}
      </div>
      <div>
        <div className="flex items-center gap-1 font-heading text-[15px] font-semibold leading-5">
          {tool.name}
          <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
        <p className="mt-0.5 text-[12px] leading-4 text-muted-foreground">{tool.desc}</p>
      </div>
    </button>
  );
}