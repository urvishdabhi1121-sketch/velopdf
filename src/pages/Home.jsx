import { useNavigate } from "react-router-dom";
import { ShieldCheck, Zap, WifiOff, Lock } from "lucide-react";
import ToolCard from "@/components/ToolCard";
import OfflineBadge from "@/components/OfflineBadge";
import { QUICK_ACTIONS, CATEGORIES } from "@/lib/tools";

const PILLARS = [
  { icon: Zap, label: "Fast" },
  { icon: Lock, label: "Private" },
  { icon: WifiOff, label: "Offline" },
];

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="mx-auto max-w-5xl px-4 py-5 md:px-6 md:py-8">
      {/* Hero */}
      <section className="overflow-hidden rounded-3xl bg-[hsl(var(--primary))] px-6 py-8 text-primary-foreground md:px-10 md:py-10">
        <div className="flex flex-wrap items-center gap-2">
          <OfflineBadge />
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium">
            <ShieldCheck className="h-3.5 w-3.5" /> Files stay on your device
          </span>
        </div>
        <h1 className="mt-5 font-heading text-3xl font-bold leading-tight tracking-tight md:text-4xl">
          Your PDFs.<br />Your Device. Your Privacy.
        </h1>
        <p className="mt-3 max-w-md text-sm text-primary-foreground/80">
          A focused PDF toolkit that works entirely offline. No account, no cloud, no uploads.
        </p>
        <div className="mt-5 flex gap-4">
          {PILLARS.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-1.5 text-xs font-medium text-primary-foreground/85">
              <Icon className="h-4 w-4" /> {label}
            </div>
          ))}
        </div>
      </section>

      {/* Quick actions */}
      <section className="mt-6">
        <h2 className="mb-3 font-heading text-lg font-semibold">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {QUICK_ACTIONS.map((t) => (
            <ToolCard key={t.id} tool={t} />
          ))}
        </div>
      </section>

      {/* Categories */}
      {CATEGORIES.map((cat) => (
        <section key={cat.id} className="mt-7">
          <h2 className="mb-3 font-heading text-lg font-semibold">{cat.title}</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {cat.tools.map((t) => (
              <ToolCard key={t.id} tool={t} />
            ))}
          </div>
        </section>
      ))}

      <p className="mt-8 text-center text-xs text-muted-foreground">
        VeloPDF processes everything on your device. No internet connection required.
      </p>
    </div>
  );
}