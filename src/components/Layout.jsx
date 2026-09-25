import { Outlet } from "react-router-dom";
import BottomNav from "./BottomNav";
import SideNav, { VeloMark } from "./SideNav";
import OfflineBadge from "./OfflineBadge";

export default function Layout() {
  return (
    <div className="flex min-h-dvh bg-background">
      <SideNav />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-card/90 px-4 py-3 backdrop-blur md:px-6">
          <div className="md:hidden">
            <VeloMark />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="truncate font-heading text-base font-bold tracking-tight md:text-lg">VeloPDF</h1>
            <p className="hidden truncate text-xs text-muted-foreground sm:block">
              Your PDFs. Your Device. Your Privacy.
            </p>
          </div>
          <OfflineBadge compact />
        </header>
        <main className="flex-1 overflow-x-hidden pb-20 md:pb-8">
          <Outlet />
        </main>
      </div>
      <BottomNav />
    </div>
  );
}