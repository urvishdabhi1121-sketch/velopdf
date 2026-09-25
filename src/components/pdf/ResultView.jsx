import { CheckCircle2, Download, Share2, RotateCcw } from "lucide-react";
import { formatBytes } from "@/lib/fileUtils";

export default function ResultView({ result, onReset }) {
  // result: { name, bytes, mime, pages? }  OR  { multiple: [{name,bytes}] }
  const multiple = result.multiple;

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[hsl(var(--offline-surface))] text-[hsl(var(--offline-text))]">
          <CheckCircle2 className="h-6 w-6" />
        </span>
        <div>
          <p className="font-heading text-[15px] font-semibold">Done</p>
          <p className="text-xs text-muted-foreground">Saved successfully on your device.</p>
        </div>
      </div>

      <div className="mt-4 space-y-2 text-sm">
        {multiple ? (
          multiple.map((m, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2">
              <span className="truncate font-medium">{m.name}</span>
              <span className="ml-2 shrink-0 text-xs text-muted-foreground">{formatBytes(m.bytes.byteLength || m.bytes.length)}</span>
            </div>
          ))
        ) : (
          <div className="rounded-lg bg-muted/50 px-3 py-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">{result.name}</span>
              <span className="text-xs text-muted-foreground">{formatBytes(result.bytes.byteLength || result.bytes.length)}</span>
            </div>
            {result.pages != null && <p className="mt-0.5 text-xs text-muted-foreground">{result.pages} pages</p>}
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {!multiple && (
          <>
            <button onClick={() => download(result)} className="inline-flex items-center gap-2 rounded-xl bg-[hsl(var(--primary))] px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">
              <Download className="h-4 w-4" /> Save
            </button>
            <button onClick={() => share(result)} className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold hover:bg-muted">
              <Share2 className="h-4 w-4" /> Share
            </button>
          </>
        )}
        {multiple && (
          <button onClick={() => multiple.forEach(download)} className="inline-flex items-center gap-2 rounded-xl bg-[hsl(var(--primary))] px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">
            <Download className="h-4 w-4" /> Save all
          </button>
        )}
        <button onClick={onReset} className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold hover:bg-muted">
          <RotateCcw className="h-4 w-4" /> Start over
        </button>
      </div>
    </div>
  );
}

function download(item) {
  import("@/lib/fileUtils").then(({ downloadBytes }) =>
    downloadBytes(item.bytes, item.name, item.mime || "application/pdf")
  );
}
function share(item) {
  import("@/lib/fileUtils").then(({ shareBytes }) =>
    shareBytes(item.bytes, item.name, item.mime || "application/pdf")
  );
}