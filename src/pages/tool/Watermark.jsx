import ToolShell from "@/components/pdf/ToolShell";
import { addWatermark, pageCount } from "@/lib/pdfEngine";
import { baseName } from "@/lib/fileUtils";

export default function Watermark() {
  return (
    <ToolShell
      title="Add Watermark"
      description="Stamp a text watermark across every page of your PDF."
      accept="application/pdf"
      defaultConfig={{ text: "CONFIDENTIAL", opacity: 0.18, size: 48, rotation: 45 }}
      outputName={(files) => `${(files[0] && baseName(files[0].name)) || "document"}-watermarked.pdf`}
      renderConfig={(config, set) => (
        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-muted-foreground">Watermark text</label>
            <input value={config.text} onChange={(e) => set({ ...config, text: e.target.value })}
              className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <NumField label="Opacity (0-1)" value={config.opacity} step={0.02} min={0} max={1} onChange={(v) => set({ ...config, opacity: v })} />
            <NumField label="Size" value={config.size} step={2} onChange={(v) => set({ ...config, size: v })} />
            <NumField label="Rotation°" value={config.rotation} step={5} onChange={(v) => set({ ...config, rotation: v })} />
          </div>
        </div>
      )}
      run={async (files, config) => {
        const bytes = await addWatermark(files[0], config);
        return { bytes, mime: "application/pdf", pages: await pageCount(files[0]) };
      }}
    />
  );
}

function NumField({ label, value, onChange, step = 1, min, max }) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <input type="number" step={step} min={min} max={max} value={value}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
    </div>
  );
}