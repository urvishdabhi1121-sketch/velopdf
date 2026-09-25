import ToolShell from "@/components/pdf/ToolShell";
import { mergePdfs } from "@/lib/pdfEngine";
import { baseName } from "@/lib/fileUtils";

export default function MergePDF() {
  return (
    <ToolShell
      title="Merge PDF"
      description="Combine multiple PDFs into one. Reorder by adding files in the order you want them."
      accept="application/pdf"
      multiple
      outputName={(files) => `${(files[0] && baseName(files[0].name)) || "merged"}-merged.pdf`}
      run={async (files) => {
        if (files.length < 2) throw new Error("Add at least two PDFs to merge.");
        const bytes = await mergePdfs(files);
        return { bytes, mime: "application/pdf" };
      }}
    />
  );
}