import ToolShell from "@/components/pdf/ToolShell";
import { protectPdf, pageCount } from "@/lib/pdfEngine";
import { baseName } from "@/lib/fileUtils";

export default function ProtectPDF() {
  return (
    <ToolShell
      title="Protect PDF"
      description="Add a password to open your PDF. The password never leaves your device."
      accept="application/pdf"
      defaultConfig={{ password: "", confirm: "" }}
      outputName={(files) => `${(files[0] && baseName(files[0].name)) || "document"}-protected.pdf`}
      renderConfig={(config, set) => (
        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-muted-foreground">Password</label>
            <input type="password" value={config.password}
              onChange={(e) => set({ ...config, password: e.target.value })}
              className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Confirm password</label>
            <input type="password" value={config.confirm}
              onChange={(e) => set({ ...config, confirm: e.target.value })}
              className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
          </div>
        </div>
      )}
      run={async (files, config) => {
        if (!config.password) throw new Error("Enter a password.");
        if (config.password !== config.confirm) throw new Error("Passwords don't match.");
        const bytes = await protectPdf(files[0], config.password);
        return { bytes, mime: "application/pdf", pages: await pageCount(files[0]) };
      }}
    />
  );
}