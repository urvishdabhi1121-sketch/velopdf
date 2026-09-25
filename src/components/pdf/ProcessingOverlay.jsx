import { Loader2 } from "lucide-react";

export default function ProcessingOverlay({ label = "Processing...", progress }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="mx-6 w-full max-w-sm rounded-2xl border border-border bg-card p-6 text-center shadow-lg">
        <Loader2 className="mx-auto h-8 w-8 animate-spin text-[hsl(var(--primary))]" />
        <p className="mt-4 font-heading text-[15px] font-semibold">{label}</p>
        {typeof progress === "number" && (
          <div className="mt-3">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-[hsl(var(--primary))] transition-all" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-1.5 text-xs text-muted-foreground">{progress}%</p>
          </div>
        )}
        <p className="mt-2 text-[11px] text-muted-foreground">Running locally on your device — no files are uploaded.</p>
      </div>
    </div>
  );
}