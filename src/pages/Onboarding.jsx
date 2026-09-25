import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, WifiOff, Zap } from "lucide-react";

const SLIDES = [
  { icon: Zap, title: "Meet VeloPDF", body: "Powerful PDF tools that work directly on your device." },
  { icon: ShieldCheck, title: "Private by design", body: "Your files stay on your device. Nothing is uploaded." },
  { icon: WifiOff, title: "Ready to work offline", body: "No account. No cloud. No internet required." },
];

export default function Onboarding() {
  const [i, setI] = useState(0);
  const navigate = useNavigate();
  const last = i === SLIDES.length - 1;
  const slide = SLIDES[i];

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col px-6 py-10">
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]">
          <slide.icon className="h-10 w-10" />
        </span>
        <h1 className="mt-8 font-heading text-2xl font-bold tracking-tight">{slide.title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">{slide.body}</p>
      </div>

      <div className="flex items-center justify-center gap-1.5 pb-6">
        {SLIDES.map((_, idx) => (
          <span key={idx} className={`h-1.5 rounded-full transition-all ${idx === i ? "w-6 bg-[hsl(var(--primary))]" : "w-1.5 bg-border"}`} />
        ))}
      </div>

      <button
        onClick={() => (last ? navigate("/") : setI(i + 1))}
        className="w-full rounded-xl bg-[hsl(var(--primary))] px-5 py-3.5 font-heading text-[15px] font-semibold text-primary-foreground hover:opacity-90"
      >
        {last ? "Start Using VeloPDF" : "Next"}
      </button>
      {!last && (
        <button onClick={() => navigate("/")} className="mt-2 w-full py-2 text-sm font-medium text-muted-foreground">
          Skip
        </button>
      )}
    </div>
  );
}