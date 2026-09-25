import ToolShell from "@/components/pdf/ToolShell";
import { addPageNumbers, pageCount } from "@/lib/pdfEngine";
import { baseName } from "@/lib/fileUtils";

const POSITIONS = [
  ["top-left", "Top left"], ["top-center", "Top center"], ["top-right", "Top right"],
  ["bottom-left", "Bottom left"], ["bottom-center", "Bottom center"], ["bottom-right", "Bottom right"],
];

export default function PageNumbers() {
  return (
    <ToolShell
      title="Add Page Numbers"
      description="Add page numbers to every page, where you want them."
      accept="application/pdf"
      defaultConfig={{ position: "bottom-center", start: 1, size: 12, prefix: "", suffix: "" }}
      outputName={(files) => `${(files[0] && baseName(files[0].name)) || "document"}-numbered.pdf`}
      renderConfig={(config, set) => (
        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-muted-foreground">Position</label>
            <div className="mt-1 grid grid-cols-3 gap-1.5">
              {POSITIONS.map(([id, label]) => (
                <button key={id} onClick={() => set({ ...config, position: id })}
                  className={`rounded-lg border px-2 py-2 text-[11px] font-medium ${config.position === id ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary))]/5 text-[hsl(var(--primary))]" : "border-border bg-card text-muted-foreground"}`}>
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Start at" value={config.start} onChange={(v) => set({ ...config, start: v })} type="number" />
            <Field label="Font size" value={config.size} onChange={(v) => set({ ...config, size: v })} type="number" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Prefix" value={config.prefix} onChange={(v) => set({ ...config, prefix: v })} />
            <Field label="Suffix" value={config.suffix} onChange={(v) => set({ ...config, suffix: v })} />
          </div>
        </div>
      )}
      run={async (files, config) => {
        const bytes = await addPageNumbers(files[0], config);
        return { bytes, mime: "application/pdf", pages: await pageCount(files[0]) };
      }}
    />
  );
}

function Field({ label, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(type === "number" ? parseInt(e.target.value, 10) || 0 : e.target.value)}
        className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}