import ToolShell from "@/components/pdf/ToolShell";
import { imagesToPdf } from "@/lib/pdfEngine";
import { baseName } from "@/lib/fileUtils";

export default function JpgToPdf() {
  return (
    <ToolShell
      title="JPG to PDF"
      description="Turn JPG, JPEG or PNG images into a single PDF. One image per page."
      accept="image/jpeg,image/png"
      multiple
      outputName={(files) => `${(files[0] && baseName(files[0].name)) || "images"}.pdf`}
      run={async (files) => {
        if (!files.length) throw new Error("Choose at least one image.");
        const bytes = await imagesToPdf(files);
        return { bytes, mime: "application/pdf", pages: files.length };
      }}
    />
  );
}