import ToolShell from "@/components/pdf/ToolShell";
import { extractPages, parseRanges, pageCount } from "@/lib/pdfEngine";
import { baseName } from "@/lib/fileUtils";

export default function ExtractPages() {
  return (
    <ToolShell
      title="Extract Pages"
      description="Create a new PDF containing only the pages you select."
      accept="application/pdf"
      defaultConfig={{ ranges: "" }}
      outputName={(files) => `${(files[0] && baseName(files[0].name)) || "document"}-extracted.pdf`}
      renderConfig={(config, set) => (
        <div>
          <label className="text-xs font-medium text-muted-foreground">Pages to keep (e.g. 1-3, 8)</label>
          <input
            value={config.ranges}
            onChange={(e) => set({ ...config, ranges: e.target.value })}
            placeholder="1-3, 8"
            className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      )}
      run={async (files, config) => {
        const total = await pageCount(files[0]);
        const pages = parseRanges(config.ranges, total);
        if (!pages.length) throw new Error("Enter at least one page to extract.");
        const bytes = await extractPages(files[0], pages);
        return { bytes, mime: "application/pdf", pages: pages.length };
      }}
    />
  );
}