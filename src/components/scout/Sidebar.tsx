import { GraduationCap, Tent, PartyPopper, Sparkles, Heart, Calculator, Bot, Users, X, Home, UserCircle, CalendarDays } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Category } from "@/types/provider";

export type ViewKey =
  | Category
  | "Saved"
  | "Calculator"
  | "Scout AI Assistant"
  | "Meet-Up Groups"
  | "Home"
  | "My Account"
  | "Family Events"
  | "Event Checkout";

const ITEMS: { key: ViewKey; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: "Home", icon: Home },
  { key: "Classes", icon: GraduationCap },
  { key: "Camps", icon: Tent },
  { key: "Birthday Parties", icon: PartyPopper },
  { key: "Drop-In Activities", icon: Sparkles },
  { key: "Family Events", icon: CalendarDays },
  { key: "Meet-Up Groups", icon: Users },
  { key: "Scout AI Assistant", icon: Bot },
  { key: "Saved", icon: Heart },
  { key: "Calculator", icon: Calculator },
  { key: "My Account", icon: UserCircle },
];

interface Props {
  active: ViewKey;
  onChange: (v: ViewKey) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export function Sidebar({ active, onChange, mobileOpen, onCloseMobile }: Props) {
  const handle = (k: ViewKey) => {
    onChange(k);
    onCloseMobile();
  };
  return (
    <>
      {/* Backdrop on mobile */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-foreground/50 lg:hidden" onClick={onCloseMobile} aria-hidden />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-sidebar text-sidebar-foreground transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between p-6">
          <button
            onClick={() => handle("Home")}
            className="rounded-lg transition-opacity hover:opacity-80"
            aria-label="Go to home"
          >
            <Logo />
          </button>
          <button
            className="rounded-md p-2 text-sidebar-foreground/70 hover:bg-sidebar-accent lg:hidden"
            onClick={onCloseMobile}
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

          <nav className="flex-1 bg-sidebar px-4 py-2" aria-label="Main">
          <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-sidebar-foreground/50">Discover</p>
          <ul className="space-y-1">
            {ITEMS.slice(0, 8).map(({ key, icon: Icon }) => (
              <li key={key}>
                <button
                  onClick={() => handle(key)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                    active === key
                      ? "bg-teal text-teal-foreground shadow-sm"
                      : "text-sidebar-foreground/85 hover:bg-sidebar-accent",
                  )}
                  aria-current={active === key ? "page" : undefined}
                >
                  <Icon className="h-4 w-4" />
                  {key}
                </button>
              </li>
            ))}
          </ul>

          <p className="px-3 pb-2 pt-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-sidebar-foreground/50">My tools</p>
          <ul className="space-y-1">
            {ITEMS.slice(8).map(({ key, icon: Icon }) => (
              <li key={key}>
                <button
                  onClick={() => handle(key)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                    active === key
                      ? "bg-teal text-teal-foreground shadow-sm"
                      : "text-sidebar-foreground/85 hover:bg-sidebar-accent",
                  )}
                  aria-current={active === key ? "page" : undefined}
                >
                  <Icon className="h-4 w-4" />
                  {key}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="m-4 rounded-lg bg-sidebar-accent p-5">
          <p className="font-display text-sm font-semibold text-sidebar-foreground">List your program</p>
          <p className="mt-1 text-xs leading-relaxed text-sidebar-foreground/70">
            Reach more NYC families with a featured listing.
          </p>
          <Button size="sm" variant="secondary" className="mt-3 w-full bg-ivory text-foreground hover:bg-ivory/90">
            Get in touch
          </Button>
        </div>
      </aside>
    </>
  );
}
