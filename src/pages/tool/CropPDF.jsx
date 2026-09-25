import ToolShell from "@/components/pdf/ToolShell";
import { cropPdf, pageCount } from "@/lib/pdfEngine";
import { baseName } from "@/lib/fileUtils";

export default function CropPDF() {
  return (
    <ToolShell
      title="Crop PDF"
      description="Trim margins from every page. Values are in points (72pt ≈ 1 inch)."
      accept="application/pdf"
      defaultConfig={{ top: 36, bottom: 36, left: 36, right: 36 }}
      outputName={(files) => `${(files[0] && baseName(files[0].name)) || "document"}-cropped.pdf`}
      renderConfig={(config, set) => (
        <div className="grid grid-cols-2 gap-3">
          {["top", "bottom", "left", "right"].map((side) => (
            <div key={side}>
              <label className="text-xs font-medium text-muted-foreground capitalize">{side} (pt)</label>
              <input type="number" min={0} value={config[side]}
                onChange={(e) => set({ ...config, [side]: parseInt(e.target.value, 10) || 0 })}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
            </div>
          ))}
        </div>
      )}
      run={async (files, config) => {
        const bytes = await cropPdf(files[0], config);
        return { bytes, mime: "application/pdf", pages: await pageCount(files[0]) };
      }}
    />
  );
}