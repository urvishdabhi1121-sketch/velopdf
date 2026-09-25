import { useEffect, useState } from "react";
import { Moon, Sun, Monitor, Info, Shield, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const THEME_KEY = "velo-theme";

export default function Settings() {
  const [theme, setTheme] = useState("system");

  useEffect(() => {
    const saved = localStorage.getItem(THEME_KEY) || "system";
    setTheme(saved);
    applyTheme(saved);
  }, []);

  function applyTheme(t) {
    const isDark = t === "dark" || (t === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", isDark);
  }

  function chooseTheme(t) {
    setTheme(t);
    localStorage.setItem(THEME_KEY, t);
    applyTheme(t);
  }

  const themeOptions = [
    { id: "light", label: "Light", icon: Sun },
    { id: "dark", label: "Dark", icon: Moon },
    { id: "system", label: "System", icon: Monitor },
  ];

  return (
    <div className="mx-auto max-w-2xl px-4 py-5 md:px-6 md:py-8">
      <h1 className="font-heading text-2xl font-bold tracking-tight">Settings</h1>

      <section className="mt-6">
        <h2 className="mb-2 font-heading text-[15px] font-semibold">Appearance</h2>
        <div className="grid grid-cols-3 gap-2">
          {themeOptions.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => chooseTheme(id)}
              className={cn(
                "flex flex-col items-center gap-2 rounded-xl border p-4 text-sm font-medium transition-colors",
                theme === id ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary))]/5 text-[hsl(var(--primary))]" : "border-border bg-card text-muted-foreground hover:bg-muted"
              )}
            >
              <Icon className="h-5 w-5" />
              {label}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="mb-2 font-heading text-[15px] font-semibold">About</h2>
        <div className="divide-y divide-border rounded-2xl border border-border bg-card">
          <Row icon={Info} title="VeloPDF" value="Version 0.1.0" />
          <Row icon={Shield} title="Privacy" value="100% offline. No accounts, no uploads." />
          <Row icon={FileText} title="Licenses" value="pdf-lib (MIT)" />
        </div>
      </section>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Your PDFs. Your Device. Your Privacy.
      </p>
    </div>
  );
}

function Row({ icon: Icon, title, value }) {
  return (
    <div className="flex items-center gap-3 p-4">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="truncate text-xs text-muted-foreground">{value}</p>
      </div>
    </div>
  );
}