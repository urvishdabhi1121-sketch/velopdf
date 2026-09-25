import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Play } from "lucide-react";
import FileSelect from "./FileSelect";
import ProcessingOverlay from "./ProcessingOverlay";
import ResultView from "./ResultView";
import { humanizeError } from "@/lib/fileUtils";

// Shared workflow: choose files → configure → process → save/share.
// `run(files, config, onProgress)` returns { name, bytes, mime, pages? } or { multiple: [...] }
export default function ToolShell({ title, description, accept, multiple, defaultConfig, renderConfig, run, outputName }) {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [config, setConfig] = useState(defaultConfig || {});
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [label, setLabel] = useState("Processing...");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const canRun = files.length > 0;

  async function handleRun() {
    setProcessing(true);
    setError(null);
    setResult(null);
    setProgress(0);
    setLabel(`${title}...`);
    try {
      const out = await run(files, config, (p, l) => {
        if (typeof p === "number") setProgress(p);
        if (l) setLabel(l);
      });
      const finalResult = outputName && !out.multiple
        ? { ...out, name: typeof outputName === "function" ? outputName(files, config) : outputName }
        : out;
      setResult(finalResult);
    } catch (e) {
      setError(humanizeError(e));
    } finally {
      setProcessing(false);
    }
  }

  function reset() {
    setFiles([]);
    setResult(null);
    setError(null);
    setConfig(defaultConfig || {});
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-5 md:px-6 md:py-8">
      <button onClick={() => navigate(-1)} className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <h2 className="font-heading text-2xl font-bold tracking-tight">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>

      {!result && (
        <div className="mt-5 space-y-5">
          <FileSelect
            accept={accept}
            multiple={multiple}
            files={files}
            onChange={setFiles}
            label={multiple ? "Choose files" : "Choose a PDF"}
            hint={multiple ? "Add one or more files" : undefined}
          />

          {renderConfig && files.length > 0 && (
            <div className="space-y-4 rounded-2xl border border-border bg-card p-4">
              {renderConfig(config, setConfig)}
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <button
            onClick={handleRun}
            disabled={!canRun}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[hsl(var(--primary))] px-5 py-3.5 font-heading text-[15px] font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Play className="h-4 w-4" /> Run
          </button>
        </div>
      )}

      {result && <ResultView result={result} onReset={reset} />}

      {processing && <ProcessingOverlay label={label} progress={progress} />}
    </div>
  );
}