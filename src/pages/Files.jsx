import { FolderOpen } from "lucide-react";

export default function Files() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-5 md:px-6 md:py-8">
      <h1 className="font-heading text-2xl font-bold tracking-tight">Files</h1>
      <p className="mt-1 text-sm text-muted-foreground">Files you create with VeloPDF appear here.</p>
      <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30 px-6 py-14 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <FolderOpen className="h-7 w-7" />
        </span>
        <p className="mt-4 font-heading text-[15px] font-semibold">No PDFs here yet</p>
        <p className="mt-1 max-w-xs text-sm text-muted-foreground">
          Choose a tool above to get started. Anything you create is saved on your device.
        </p>
      </div>
    </div>
  );
}