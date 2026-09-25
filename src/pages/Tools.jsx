import ToolCard from "@/components/ToolCard";
import { CATEGORIES } from "@/lib/tools";

export default function Tools() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-5 md:px-6 md:py-8">
      <h1 className="font-heading text-2xl font-bold tracking-tight">All Tools</h1>
      <p className="mt-1 text-sm text-muted-foreground">Every tool runs locally on your device.</p>
      {CATEGORIES.map((cat) => (
        <section key={cat.id} className="mt-6">
          <h2 className="mb-3 font-heading text-lg font-semibold">{cat.title}</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {cat.tools.map((t) => (
              <ToolCard key={t.id} tool={t} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}