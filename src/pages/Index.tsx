import { useState } from "react";
import { Sidebar, type ViewKey } from "@/components/scout/Sidebar";
import { DiscoverView } from "@/components/scout/views/DiscoverView";
import { SavedView } from "@/components/scout/views/SavedView";
import { CalculatorView } from "@/components/scout/views/CalculatorView";
import { ProviderProfile } from "@/components/scout/panels/ProviderProfile";
import { ShareDialog } from "@/components/scout/panels/ShareDialog";
import { TrustStrip } from "@/components/scout/TrustStrip";
import { Logo } from "@/components/scout/Logo";
import type { Provider } from "@/types/provider";
import { Menu, Heart, Bell } from "lucide-react";
import { useSaved, useCalculator } from "@/store/useScout";

const Index = () => {
  const [view, setView] = useState<ViewKey>("Classes");
  const [openProvider, setOpenProvider] = useState<Provider | null>(null);
  const [shareProvider, setShareProvider] = useState<Provider | null>(null);
  const [mobileNav, setMobileNav] = useState(false);
  const { saved } = useSaved();
  const { items } = useCalculator();

  return (
    <div className="flex min-h-screen w-full bg-ivory">
      <Sidebar active={view} onChange={setView} mobileOpen={mobileNav} onCloseMobile={() => setMobileNav(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-ivory/85 px-4 py-3 backdrop-blur sm:px-8">
          <div className="flex items-center gap-3">
            <button
              className="grid h-10 w-10 place-items-center rounded-full bg-card shadow-sm lg:hidden"
              onClick={() => setMobileNav(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <button
              onClick={() => setView("Classes")}
              className="flex items-center gap-3 rounded-full transition-opacity hover:opacity-80"
              aria-label="Go to home"
            >
              <Logo withWordmark={false} size={48} />
              <span className="font-display text-lg font-bold tracking-tight text-foreground sm:text-xl">
                Class Scout NYC
              </span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setView("Saved")}
              className="relative grid h-10 w-10 place-items-center rounded-full bg-card text-foreground shadow-sm hover:bg-secondary"
              aria-label="Saved"
            >
              <Heart className="h-4 w-4" />
              {saved.length > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-[1.25rem] place-items-center rounded-full bg-orange px-1 text-[10px] font-bold text-orange-foreground">
                  {saved.length}
                </span>
              )}
            </button>
            <button
              className="grid h-10 w-10 place-items-center rounded-full bg-card text-foreground shadow-sm hover:bg-secondary"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
            </button>
            <button
              onClick={() => setView("Calculator")}
              className="relative hidden items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background hover:bg-foreground/90 sm:flex"
            >
              Calculator
              {items.length > 0 && (
                <span className="grid h-5 min-w-[1.25rem] place-items-center rounded-full bg-orange px-1 text-[10px] font-bold text-orange-foreground">
                  {items.length}
                </span>
              )}
            </button>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-8 sm:py-10">
          <div className="mx-auto max-w-[1400px] animate-fade-in">
            {(view === "Classes" || view === "Camps" || view === "Birthday Parties" || view === "Drop-In Activities") && (
              <DiscoverView category={view} onOpen={setOpenProvider} onShare={setShareProvider} />
            )}
            {view === "Saved" && <SavedView onOpen={setOpenProvider} onShare={setShareProvider} />}
            {view === "Calculator" && <CalculatorView />}
            <TrustStrip />
            <footer className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
              Class Scout NY · Trusted. Local. For NYC families. · Demo prices for planning purposes only.
            </footer>
          </div>
        </main>
      </div>

      <ProviderProfile
        provider={openProvider}
        onClose={() => setOpenProvider(null)}
        onShare={setShareProvider}
        onOpenAnother={(p) => setOpenProvider(p)}
      />
      <ShareDialog provider={shareProvider} onClose={() => setShareProvider(null)} />
    </div>
  );
};

export default Index;
