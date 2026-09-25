import ToolShell from "@/components/pdf/ToolShell";
import { rotatePdf } from "@/lib/pdfEngine";
import { baseName } from "@/lib/fileUtils";

export default function RotatePDF() {
  return (
    <ToolShell
      title="Rotate PDF"
      description="Rotate all pages by 90°, 180° or 270°."
      accept="application/pdf"
      defaultConfig={{ angle: 90 }}
      outputName={(files) => `${(files[0] && baseName(files[0].name)) || "document"}-rotated.pdf`}
      renderConfig={(config, set) => (
        <div className="grid grid-cols-3 gap-2">
          {[90, 180, 270].map((a) => (
            <button
              key={a}
              onClick={() => set({ ...config, angle: a })}
              className={`rounded-xl border p-3 text-sm font-semibold ${config.angle === a ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary))]/5 text-[hsl(var(--primary))]" : "border-border bg-card text-muted-foreground"}`}
            >
              {a}°
            </button>
          ))}
        </div>
      )}
      run={async (files, config) => {
        const bytes = await rotatePdf(files[0], config.angle);
        return { bytes, mime: "application/pdf" };
      }}
    />
  );
}