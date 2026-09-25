import { useRef } from "react";
import { Upload, X, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatBytes } from "@/lib/fileUtils";

export default function FileSelect({ accept = "application/pdf", multiple = false, files, onChange, label = "Choose a file", hint }) {
  const inputRef = useRef(null);

  function handlePick(e) {
    const picked = Array.from(e.target.files || []);
    if (multiple) onChange([...files, ...picked]);
    else onChange(picked);
    e.target.value = "";
  }

  function removeAt(i) {
    onChange(files.filter((_, idx) => idx !== i));
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-muted/40 px-6 py-8 text-center transition-colors hover:border-[hsl(var(--primary))]/40 hover:bg-muted"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]">
          <Upload className="h-6 w-6" />
        </span>
        <span className="font-heading text-[15px] font-semibold">{label}</span>
        {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
      </button>
      <input ref={inputRef} type="file" accept={accept} multiple={multiple} onChange={handlePick} className="hidden" />

      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map((f, i) => (
            <li key={i} className="flex items-center gap-3 rounded-xl border border-border bg-card p-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]">
                <FileText className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{f.name}</p>
                <p className="text-xs text-muted-foreground">{formatBytes(f.size)}</p>
              </div>
              {multiple && (
                <button onClick={() => removeAt(i)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}