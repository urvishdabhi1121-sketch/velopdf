import { useNavigate } from "react-router-dom";
import { ArrowLeft, Construction } from "lucide-react";

export default function UnavailableTool({ tool }) {
  const navigate = useNavigate();
  const Icon = tool.icon;
  return (
    <div className="mx-auto max-w-2xl px-4 py-5 md:px-6 md:py-8">
      <button onClick={() => navigate(-1)} className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <div className="rounded-2xl border border-border bg-card p-6">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-muted-foreground">
          <Icon className="h-6 w-6" />
        </span>
        <h2 className="mt-4 font-heading text-xl font-bold tracking-tight">{tool.name}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{tool.desc}</p>

        <div className="mt-5 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-500">
            <Construction className="h-4 w-4" />
            <span className="text-sm font-semibold">Not available in this build</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{tool.reason}</p>
          <p className="mt-2 text-xs text-muted-foreground">
            VeloPDF never replaces a local feature with a cloud API. This tool will be implemented with a local engine in a later build stage.
          </p>
        </div>

        <button onClick={() => navigate("/tools")} className="mt-5 inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold hover:bg-muted">
          Back to tools
        </button>
      </div>
    </div>
  );
}