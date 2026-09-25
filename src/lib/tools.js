import {
  Combine, Scissors, Trash2, FileOutput, Layers, Camera, Minimize, Wrench,
  ScanLine, Image as ImageIcon, FileText, Presentation, Sheet, Code2,
  FileImage, FileDown, RotateCw, Hash, Droplet, Crop, PencilLine,
  FormInput, Lock, Unlock, ShieldCheck, Pen, EyeOff, GitCompare
} from "lucide-react";

// status: "ready" = implemented locally in this build
//         "unavailable" = cannot be done locally in this environment (see reason)
export const CATEGORIES = [
  {
    id: "organize",
    title: "Organize",
    tools: [
      { id: "merge", name: "Merge PDF", icon: Combine, desc: "Combine multiple PDFs into one.", status: "ready" },
      { id: "split", name: "Split PDF", icon: Scissors, desc: "Separate pages into individual PDFs.", status: "ready" },
      { id: "remove", name: "Remove Pages", icon: Trash2, desc: "Delete pages you don't need.", status: "ready" },
      { id: "extract", name: "Extract Pages", icon: FileOutput, desc: "Pull selected pages into a new PDF.", status: "ready" },
      { id: "organize", name: "Organize PDF", icon: Layers, desc: "Reorder, rotate and delete pages.", status: "unavailable", reason: "Drag-and-drop page organizer with live thumbnails requires a PDF renderer (pdf.js) wired in. Planned for the next build stage." },
      { id: "scan", name: "Scan to PDF", icon: Camera, desc: "Scan documents with your camera.", status: "unavailable", reason: "Requires native Android camera APIs plus on-device edge detection and perspective correction. Not implementable as a reliable local web flow; belongs in the native Android build." },
    ],
  },
  {
    id: "optimize",
    title: "Optimize",
    tools: [
      { id: "compress", name: "Compress PDF", icon: Minimize, desc: "Reduce file size while keeping quality.", status: "unavailable", reason: "True PDF compression (image downsampling, stream recompression) needs a dedicated engine. pdf-lib re-saves but does not meaningfully compress. A native compression engine is required." },
      { id: "repair", name: "Repair PDF", icon: Wrench, desc: "Recover damaged PDF structures.", status: "unavailable", reason: "PDF repair (cross-reference rebuild, page recovery) requires a low-level PDF parser. Not available as a local web library; planned for the native build." },
      { id: "ocr", name: "OCR PDF", icon: ScanLine, desc: "Recognize text in scanned PDFs.", status: "unavailable", reason: "On-device OCR needs a bundled engine (e.g. Tesseract). It can run locally but is heavy and must be integrated carefully; scheduled for a later stage." },
    ],
  },
  {
    id: "to-pdf",
    title: "Convert to PDF",
    tools: [
      { id: "jpg-to-pdf", name: "JPG to PDF", icon: ImageIcon, desc: "Turn images into a PDF.", status: "ready" },
      { id: "word-to-pdf", name: "Word to PDF", icon: FileText, desc: "Convert DOC/DOCX to PDF.", status: "unavailable", reason: "Local DOCX rendering requires a native document engine (no reliable browser-only library). Planned for the native Android build." },
      { id: "ppt-to-pdf", name: "PowerPoint to PDF", icon: Presentation, desc: "Convert PPT/PPTX to PDF.", status: "unavailable", reason: "Local PPTX rendering requires a native presentation engine. Not available client-side." },
      { id: "excel-to-pdf", name: "Excel to PDF", icon: Sheet, desc: "Convert XLS/XLSX to PDF.", status: "unavailable", reason: "Local XLSX rendering requires a native spreadsheet engine. Not available client-side." },
      { id: "html-to-pdf", name: "HTML to PDF", icon: Code2, desc: "Convert local HTML to PDF.", status: "unavailable", reason: "Faithful local HTML→PDF needs a headless rendering engine; browser print-to-PDF is inconsistent. Planned for native build." },
    ],
  },
  {
    id: "from-pdf",
    title: "Convert from PDF",
    tools: [
      { id: "pdf-to-jpg", name: "PDF to JPG", icon: FileImage, desc: "Export pages as images.", status: "unavailable", reason: "Requires a PDF renderer (pdf.js) to rasterize pages. Scheduled for the next build stage alongside the renderer." },
      { id: "pdf-to-word", name: "PDF to Word", icon: FileDown, desc: "Convert PDF to DOCX.", status: "unavailable", reason: "Local PDF→DOCX conversion needs a dedicated layout-aware engine. Not available as a browser-only library." },
      { id: "pdf-to-ppt", name: "PDF to PowerPoint", icon: Presentation, desc: "Convert PDF to PPTX.", status: "unavailable", reason: "Local PDF→PPTX needs a dedicated engine. Not available client-side." },
      { id: "pdf-to-excel", name: "PDF to Excel", icon: Sheet, desc: "Extract tables to XLSX.", status: "unavailable", reason: "Table extraction to XLSX needs a dedicated analysis engine. Not available client-side." },
      { id: "pdf-to-pdfa", name: "PDF to PDF/A", icon: FileText, desc: "Convert to archival PDF/A.", status: "unavailable", reason: "PDF/A conversion and validation requires a specialized engine. Not available client-side." },
    ],
  },
  {
    id: "edit",
    title: "Edit PDF",
    tools: [
      { id: "rotate", name: "Rotate PDF", icon: RotateCw, desc: "Rotate pages 90°, 180°, 270°.", status: "ready" },
      { id: "page-numbers", name: "Add Page Numbers", icon: Hash, desc: "Number pages anywhere on the page.", status: "ready" },
      { id: "watermark", name: "Add Watermark", icon: Droplet, desc: "Stamp text across your PDF.", status: "ready" },
      { id: "crop", name: "Crop PDF", icon: Crop, desc: "Trim margins from pages.", status: "ready" },
      { id: "edit-tool", name: "Edit PDF", icon: PencilLine, desc: "Add text, shapes and drawings.", status: "unavailable", reason: "A full PDF editor (text, shapes, draw, erase, undo/redo) is a large canvas-based effort. Planned for a later stage." },
      { id: "forms", name: "PDF Forms", icon: FormInput, desc: "Fill and save PDF forms.", status: "unavailable", reason: "AcroForm reading/filling support is limited in browser libraries; planned for the native build." },
    ],
  },
  {
    id: "security",
    title: "PDF Security",
    tools: [
      { id: "unlock", name: "Unlock PDF", icon: Unlock, desc: "Remove a password you know.", status: "unavailable", reason: "pdf-lib cannot decrypt password-protected PDFs. Decryption requires a native crypto-capable engine; planned for the native build." },
      { id: "protect", name: "Protect PDF", icon: Lock, desc: "Add a password to a PDF.", status: "ready" },
      { id: "sign", name: "Sign PDF", icon: Pen, desc: "Draw and place your signature.", status: "unavailable", reason: "Signature drawing + placement is buildable locally but not yet implemented; scheduled for a later stage." },
      { id: "redact", name: "Redact PDF", icon: EyeOff, desc: "Permanently remove content.", status: "unavailable", reason: "True redaction (content removal/flattening, not just covering) needs a low-level engine. Not available client-side." },
      { id: "compare", name: "Compare PDF", icon: GitCompare, desc: "Spot differences between two PDFs.", status: "unavailable", reason: "Visual diff requires a renderer plus image comparison. Planned for a later stage." },
    ],
  },
];

export const QUICK_ACTIONS = [
  { id: "merge", name: "Merge PDF", icon: Combine, desc: "Combine multiple PDFs into one.", status: "ready" },
  { id: "split", name: "Split PDF", icon: Scissors, desc: "Separate pages into individual PDFs.", status: "ready" },
  { id: "compress", name: "Compress PDF", icon: Minimize, desc: "Reduce file size while keeping quality.", status: "unavailable", reason: "True PDF compression needs a dedicated engine." },
  { id: "scan", name: "Scan to PDF", icon: Camera, desc: "Scan documents with your camera.", status: "unavailable", reason: "Requires native Android camera APIs." },
];

export const ALL_TOOLS = [...CATEGORIES.flatMap(c => c.tools), ...QUICK_ACTIONS];
export const TOOL_MAP = Object.fromEntries(ALL_TOOLS.map(t => [t.id, t]));

export function getTool(id) {
  return TOOL_MAP[id];
}