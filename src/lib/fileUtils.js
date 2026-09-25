// Local file output helpers — download + native share sheet. No uploads.

export function formatBytes(bytes) {
  if (bytes == null) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function downloadBytes(bytes, filename, mime = "application/pdf") {
  const blob = new Blob([bytes], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export async function shareBytes(bytes, filename, mime = "application/pdf") {
  const file = new File([bytes], filename, { type: mime });
  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title: filename });
      return true;
    } catch (e) {
      if (e.name === "AbortError") return false; // user cancelled share — not an error
    }
  }
  downloadBytes(bytes, filename, mime);
  return false;
}

export function baseName(filename) {
  return filename.replace(/\.[^/.]+$/, "");
}

export function humanizeError(e) {
  const msg = e?.message || String(e);
  if (/encrypted|password/i.test(msg)) return "This PDF is encrypted. VeloPDF can't open encrypted files in this build.";
  if (/Invalid PDF|Structure|parse/i.test(msg)) return "VeloPDF couldn't read this PDF. The file may be damaged or use an unsupported feature.";
  return "VeloPDF couldn't process this file. Try another file or adjust your settings.";
}