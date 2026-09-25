import ToolShell from "@/components/pdf/ToolShell";
import { removePages, parseRanges, pageCount } from "@/lib/pdfEngine";
import { baseName } from "@/lib/fileUtils";

export default function RemovePages() {
  return (
    <ToolShell
      title="Remove Pages"
      description="Delete the pages you don't need and keep the rest."
      accept="application/pdf"
      defaultConfig={{ ranges: "" }}
      outputName={(files) => `${(files[0] && baseName(files[0].name)) || "document"}-trimmed.pdf`}
      renderConfig={(config, set) => (
        <div>
          <label className="text-xs font-medium text-muted-foreground">Pages to remove (e.g. 3, 5-7)</label>
          <input
            value={config.ranges}
            onChange={(e) => set({ ...config, ranges: e.target.value })}
            placeholder="3, 5-7"
            className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      )}
      run={async (files, config) => {
        const total = await pageCount(files[0]);
        const pages = parseRanges(config.ranges, total);
        if (!pages.length) throw new Error("Enter at least one page to remove.");
        const bytes = await removePages(files[0], pages);
        return { bytes, mime: "application/pdf", pages: total - pages.length };
      }}
    />
  );
}