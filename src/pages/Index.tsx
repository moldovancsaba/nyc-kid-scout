import { useState } from "react";
import { Sidebar, type ViewKey } from "@/components/scout/Sidebar";
import { DiscoverView } from "@/components/scout/views/DiscoverView";
import { SavedView } from "@/components/scout/views/SavedView";
import { CalculatorView } from "@/components/scout/views/CalculatorView";
import { ScoutAssistantView } from "@/components/scout/views/ScoutAssistantView";
import { MeetupGroupsView } from "@/components/scout/views/MeetupGroupsView";
import { HomeView } from "@/components/scout/views/HomeView";
import { MyAccountView } from "@/components/scout/views/MyAccountView";
import { ProviderProfile } from "@/components/scout/panels/ProviderProfile";
import { ShareDialog } from "@/components/scout/panels/ShareDialog";
import { MeetupGroupProfile } from "@/components/scout/panels/MeetupGroupProfile";
import { MeetupShareDialog } from "@/components/scout/panels/MeetupShareDialog";
import { TrustStrip } from "@/components/scout/TrustStrip";
import { Logo } from "@/components/scout/Logo";
import type { Provider, Borough, Category } from "@/types/provider";
import type { MeetupGroup } from "@/types/meetup";
import { Menu, Heart, Bell, UserCircle } from "lucide-react";
import { useSaved, useCalculator } from "@/store/useScout";

const Index = () => {
  const [view, setView] = useState<ViewKey>("Home");
  const [openProvider, setOpenProvider] = useState<Provider | null>(null);
  const [shareProvider, setShareProvider] = useState<Provider | null>(null);
  const [openGroup, setOpenGroup] = useState<MeetupGroup | null>(null);
  const [shareGroup, setShareGroup] = useState<MeetupGroup | null>(null);
  const [mobileNav, setMobileNav] = useState(false);
  const [pendingLocation, setPendingLocation] = useState<{ borough?: Borough; neighborhood?: string } | null>(null);
  const { saved } = useSaved();
  const { items } = useCalculator();

  const handleNavigate = (
    next: Category | "Saved" | "Calculator" | "Meet-Up Groups" | "My Account",
    location?: { borough?: Borough; neighborhood?: string },
  ) => {
    if (location) setPendingLocation(location);
    else setPendingLocation(null);
    setView(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const discoverKey = pendingLocation
    ? `${pendingLocation.borough ?? ""}-${pendingLocation.neighborhood ?? ""}`
    : "default";

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
              onClick={() => setView("Home")}
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
              onClick={() => setView("Meet-Up Groups")}
              className="hidden rounded-full px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary md:inline-block"
            >
              Meet-Up Groups
            </button>
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
            <button
              onClick={() => setView("My Account")}
              className={`grid h-10 w-10 place-items-center rounded-full text-foreground shadow-sm hover:bg-secondary ${
                view === "My Account" ? "bg-teal text-teal-foreground" : "bg-card"
              }`}
              aria-label="My Account"
            >
              <UserCircle className="h-5 w-5" />
            </button>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-8 sm:py-10">
          <div className="mx-auto max-w-[1400px] animate-fade-in">
            {view === "Home" && (
              <HomeView onNavigate={handleNavigate} onOpenProvider={setOpenProvider} onOpenGroup={setOpenGroup} />
            )}
            {(view === "Classes" || view === "Camps" || view === "Birthday Parties" || view === "Drop-In Activities") && (
              <DiscoverView
                key={`${view}-${discoverKey}`}
                category={view}
                onOpen={setOpenProvider}
                onShare={setShareProvider}
                initialBorough={pendingLocation?.borough ?? null}
                initialNeighborhood={pendingLocation?.neighborhood ?? null}
              />
            )}
            {view === "Saved" && <SavedView onOpen={setOpenProvider} onShare={setShareProvider} />}
            {view === "Calculator" && <CalculatorView />}
            {view === "Scout AI Assistant" && <ScoutAssistantView />}
            {view === "Meet-Up Groups" && (
              <MeetupGroupsView onOpen={setOpenGroup} onShare={setShareGroup} />
            )}
            {view === "My Account" && (
              <MyAccountView
                onNavigate={handleNavigate}
                onOpenProvider={setOpenProvider}
                onShareProvider={setShareProvider}
                onOpenGroup={setOpenGroup}
                onShareGroup={setShareGroup}
              />
            )}
            {view !== "Home" && <TrustStrip />}
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
      <MeetupGroupProfile
        group={openGroup}
        onClose={() => setOpenGroup(null)}
        onShare={setShareGroup}
        onOpenAnother={(g) => setOpenGroup(g)}
      />
      <MeetupShareDialog group={shareGroup} onClose={() => setShareGroup(null)} />
    </div>
  );
};

export default Index;
