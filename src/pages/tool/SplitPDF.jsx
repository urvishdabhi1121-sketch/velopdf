import ToolShell from "@/components/pdf/ToolShell";
import { splitToIndividual, splitByRanges, parseRanges, pageCount } from "@/lib/pdfEngine";
import { baseName } from "@/lib/fileUtils";

export default function SplitPDF() {
  return (
    <ToolShell
      title="Split PDF"
      description="Split a PDF into individual pages or by page ranges."
      accept="application/pdf"
      defaultConfig={{ mode: "individual", ranges: "" }}
      outputName={(files) => `${(files[0] && baseName(files[0].name)) || "split"}`}
      renderConfig={(config, set) => (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {[["individual", "Individual pages"], ["ranges", "By ranges"]].map(([id, label]) => (
              <button
                key={id}
                onClick={() => set({ ...config, mode: id })}
                className={`rounded-xl border p-3 text-sm font-medium ${config.mode === id ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary))]/5 text-[hsl(var(--primary))]" : "border-border bg-card text-muted-foreground"}`}
              >
                {label}
              </button>
            ))}
          </div>
          {config.mode === "ranges" && (
            <div>
              <label className="text-xs font-medium text-muted-foreground">Ranges (e.g. 1-3, 4-6, 7-10)</label>
              <input
                value={config.ranges}
                onChange={(e) => set({ ...config, ranges: e.target.value })}
                placeholder="1-3, 4-6, 7-10"
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
              <p className="mt-1 text-[11px] text-muted-foreground">Each comma-separated group becomes one PDF.</p>
            </div>
          )}
        </div>
      )}
      run={async (files, config, onProgress) => {
        const file = files[0];
        const total = await pageCount(file);
        if (config.mode === "individual") {
          const parts = await splitToIndividual(file, onProgress);
          return { multiple: parts.map((p) => ({ ...p, mime: "application/pdf" })) };
        }
        const groups = String(config.ranges).split(",").map((g) => parseRanges(g, total)).filter((g) => g.length);
        if (!groups.length) throw new Error("Enter at least one valid page range.");
        const parts = await splitByRanges(file, groups, onProgress);
        return { multiple: parts.map((p) => ({ ...p, mime: "application/pdf" })) };
      }}
    />
  );
}