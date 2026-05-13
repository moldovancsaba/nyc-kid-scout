import { useMemo, useState } from "react";
import {
  Heart,
  Share2,
  Plus,
  X,
  Eye,
  Minus,
  MapPin,
  Mail,
  ArrowRight,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { PROVIDERS } from "@/data/providers";
import { MEETUP_GROUPS } from "@/data/meetupGroups";
import { useSaved, useCalculator } from "@/store/useScout";
import type { Provider, Borough, Category } from "@/types/provider";
import type { MeetupGroup } from "@/types/meetup";

type TabKey =
  | "Saved Providers & Groups"
  | "My Activity Plan"
  | "Family Preferences"
  | "My Neighborhood"
  | "Alerts & Email Settings";

const TABS: TabKey[] = [
  "Saved Providers & Groups",
  "My Activity Plan",
  "Family Preferences",
  "My Neighborhood",
  "Alerts & Email Settings",
];

const FILTER_CHIPS = ["All", "Classes", "Camps", "Birthdays", "Drop-Ins", "Meet-Up Groups"] as const;
type FilterChip = (typeof FILTER_CHIPS)[number];

const SAMPLE_PROVIDER_NAMES = [
  "Bright Brush Art Studio",
  "Camp City Sprouts",
  "Playroom Party Studio",
  "PlayLab NYC",
];

const PLAN_SAMPLE = [
  { name: "Bright Brush Art Studio", price: 40, qty: 2, unit: "class" },
  { name: "Brooklyn Soccer Lab", price: 75, qty: 1, unit: "class" },
  { name: "Tiny Tutus Ballet", price: 55, qty: 2, unit: "class" },
];

const AGE_OPTIONS = ["0–2", "3–5", "6–8", "9–12", "Teens"];
const INTEREST_OPTIONS = [
  "Classes", "Camps", "Birthday Parties", "Drop-Ins", "Meet-Up Groups",
  "Sports", "Art", "Music", "STEM", "Dance", "Gymnastics", "Indoor Play",
];
const TIME_OPTIONS = ["Weekday", "Weekend", "Morning", "Afternoon", "After-school", "Evening"];

const NEARBY = ["Upper West Side", "Lincoln Square", "Hell's Kitchen", "Columbus Circle", "Upper East Side", "Chelsea"];

const ALERT_OPTIONS = [
  "Weekly neighborhood picks",
  "New classes near me",
  "Camp updates",
  "Birthday party ideas",
  "Weekend drop-in activities",
  "New meet-up groups",
  "Updates from saved providers and groups",
];

interface Props {
  onNavigate: (view: Category | "Saved" | "Calculator" | "Meet-Up Groups", location?: { borough?: Borough; neighborhood?: string }) => void;
  onOpenProvider: (p: Provider) => void;
  onShareProvider: (p: Provider) => void;
  onOpenGroup: (g: MeetupGroup) => void;
  onShareGroup: (g: MeetupGroup) => void;
}

function badgeFor(cat: string) {
  switch (cat) {
    case "Classes": return { label: "Class", filter: "Classes", tone: "bg-teal-soft text-teal" };
    case "Camps": return { label: "Camp", filter: "Camps", tone: "bg-[hsl(140_40%_92%)] text-[hsl(150_50%_30%)]" };
    case "Birthday Parties": return { label: "Birthday", filter: "Birthdays", tone: "bg-[hsl(340_70%_94%)] text-[hsl(340_60%_45%)]" };
    case "Drop-In Activities": return { label: "Drop-In", filter: "Drop-Ins", tone: "bg-[hsl(40_90%_92%)] text-[hsl(35_85%_45%)]" };
    case "Meet-Up Group": return { label: "Meet-Up Group", filter: "Meet-Up Groups", tone: "bg-[hsl(210_80%_94%)] text-[hsl(210_70%_45%)]" };
    default: return { label: cat, filter: "All", tone: "bg-secondary text-foreground" };
  }
}

export function MyAccountView({ onNavigate, onOpenProvider, onShareProvider, onOpenGroup, onShareGroup }: Props) {
  const [tab, setTab] = useState<TabKey>("Saved Providers & Groups");
  const [filter, setFilter] = useState<FilterChip>("All");
  const { saved, toggle: toggleSaved } = useSaved();
  const { add: addToCalc } = useCalculator();

  // Build saved items: real saved providers + sample fallbacks + 1 meetup group
  const savedProviders: Provider[] = useMemo(() => {
    const real = PROVIDERS.filter((p) => saved.includes(p.id));
    if (real.length > 0) return real;
    return SAMPLE_PROVIDER_NAMES
      .map((n) => PROVIDERS.find((p) => p.name === n))
      .filter(Boolean) as Provider[];
  }, [saved]);

  const sampleGroup: MeetupGroup | undefined =
    MEETUP_GROUPS.find((g) => g.name.toLowerCase().includes("park slope")) ?? MEETUP_GROUPS[0];

  type Item =
    | { kind: "provider"; data: Provider; categoryFilter: string }
    | { kind: "group"; data: MeetupGroup; categoryFilter: string };

  const items: Item[] = useMemo(() => {
    const list: Item[] = savedProviders.map((p) => ({
      kind: "provider" as const,
      data: p,
      categoryFilter: badgeFor(p.category).filter,
    }));
    if (sampleGroup) list.push({ kind: "group", data: sampleGroup, categoryFilter: "Meet-Up Groups" });
    return list;
  }, [savedProviders, sampleGroup]);

  const filtered = filter === "All" ? items : items.filter((i) => i.categoryFilter === filter);

  return (
    <div className="space-y-8">
      {/* Header */}
      <header>
        <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">My Account</h1>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          Manage your saved items, plan activities, and personalize your experience.
        </p>
      </header>

      {/* Tabs */}
      <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <div className="flex min-w-max gap-2 border-b border-border">
          {TABS.map((t) => {
            const active = t === tab;
            return (
              <button
                key={t}
                onClick={() => {
                  setTab(t);
                  document.getElementById(`section-${t}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className={cn(
                  "relative whitespace-nowrap px-4 py-3 text-sm font-semibold transition-colors",
                  active ? "text-teal" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {t}
                {active && <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-teal" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION 1: Saved */}
      <section
        id="section-Saved Providers & Groups"
        className={cn("rounded-3xl bg-[hsl(36_35%_94%)] p-6 sm:p-8", tab !== "Saved Providers & Groups" && "hidden")}
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">Saved Providers & Groups</h2>
            <p className="mt-1 text-sm text-muted-foreground">Everything you've saved in one place.</p>
          </div>
          <Button
            variant="outline"
            className="rounded-full border-foreground/15 bg-card hover:bg-secondary"
            onClick={() => onNavigate("Saved")}
          >
            View all saved <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {FILTER_CHIPS.map((c) => {
            const active = c === filter;
            return (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                  active
                    ? "border-teal bg-teal text-teal-foreground"
                    : "border-border bg-card text-foreground hover:border-teal hover:text-teal",
                )}
              >
                {c}
              </button>
            );
          })}
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.length === 0 && (
            <p className="col-span-full rounded-2xl bg-card p-8 text-center text-sm text-muted-foreground">
              No saved items in this category yet.
            </p>
          )}
          {filtered.map((item) =>
            item.kind === "provider" ? (
              <SavedProviderCard
                key={`p-${item.data.id}`}
                provider={item.data}
                onView={() => onOpenProvider(item.data)}
                onShare={() => onShareProvider(item.data)}
                onAddToPlan={() => {
                  addToCalc(item.data.id);
                  toast.success(`Added ${item.data.name} to your plan`);
                }}
                onRemove={() => {
                  if (saved.includes(item.data.id)) {
                    toggleSaved(item.data.id);
                    toast(`Removed ${item.data.name}`);
                  } else {
                    toast("Sample item — sign in saves persist locally");
                  }
                }}
              />
            ) : (
              <SavedGroupCard
                key={`g-${item.data.id}`}
                group={item.data}
                onView={() => onOpenGroup(item.data)}
                onShare={() => onShareGroup(item.data)}
                onRemove={() => toast(`Removed ${item.data.name}`)}
              />
            ),
          )}
        </div>
      </section>

      {/* Lower sections grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ActivityPlanCard tab={tab} onNavigate={onNavigate} />
        <FamilyPreferencesCard tab={tab} />
        <NeighborhoodCard tab={tab} onNavigate={onNavigate} />
        <AlertsCard tab={tab} />
      </div>

      {/* Footer privacy strip */}
      <div className="rounded-2xl bg-[hsl(36_35%_94%)] px-6 py-5 text-center">
        <p className="text-sm font-medium text-foreground">
          We respect your privacy. Your information is never shared.
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Questions? Email us at <a href="mailto:hello@classscoutny.com" className="font-semibold text-teal hover:underline">hello@classscoutny.com</a>
        </p>
      </div>
    </div>
  );
}

/* ---------- Saved cards ---------- */

function SavedProviderCard({
  provider, onView, onShare, onAddToPlan, onRemove,
}: {
  provider: Provider;
  onView: () => void;
  onShare: () => void;
  onAddToPlan: () => void;
  onRemove: () => void;
}) {
  const b = badgeFor(provider.category);
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl bg-card shadow-card">
      <div className="relative h-36 overflow-hidden">
        <img src={provider.image} alt={provider.name} loading="lazy" className="h-full w-full object-cover" />
        <span className={cn("absolute left-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide shadow-sm", b.tone)}>
          {b.label}
        </span>
        <span className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-card/95 text-orange shadow-sm" aria-label="Saved">
          <Heart className="h-4 w-4 fill-orange" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-base font-semibold leading-snug text-foreground">{provider.name}</h3>
        <p className="mt-0.5 text-xs text-muted-foreground">{provider.neighborhood}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Ages {provider.ageRanges[0]} · {provider.activityTypes[0]}
        </p>
        <p className="mt-2 text-sm font-bold text-orange">
          ${provider.pricePerClass}
          <span className="text-[11px] font-normal text-muted-foreground">
            {" "}/ {provider.category === "Camps" ? "week" : provider.category === "Birthday Parties" ? "party" : provider.category === "Drop-In Activities" ? "visit" : "class"}
          </span>
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Button size="sm" variant="outline" className="rounded-full" onClick={onView}>
            <Eye className="h-3.5 w-3.5" /> View
          </Button>
          <Button size="sm" variant="outline" className="rounded-full" onClick={onShare}>
            <Share2 className="h-3.5 w-3.5" /> Share
          </Button>
          <Button size="sm" className="rounded-full bg-teal text-teal-foreground hover:bg-teal/90" onClick={onAddToPlan}>
            <Plus className="h-3.5 w-3.5" /> Add to Plan
          </Button>
          <Button size="sm" variant="ghost" className="rounded-full text-muted-foreground hover:text-foreground" onClick={onRemove}>
            <X className="h-3.5 w-3.5" /> Remove
          </Button>
        </div>
      </div>
    </article>
  );
}

function SavedGroupCard({
  group, onView, onShare, onRemove,
}: { group: MeetupGroup; onView: () => void; onShare: () => void; onRemove: () => void }) {
  const b = badgeFor("Meet-Up Group");
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl bg-card shadow-card">
      <div className="relative grid h-36 place-items-center bg-[hsl(210_80%_94%)]">
        <Users className="h-12 w-12 text-[hsl(210_70%_45%)]" />
        <span className={cn("absolute left-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide shadow-sm", b.tone)}>
          {b.label}
        </span>
        <span className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-card/95 text-orange shadow-sm" aria-label="Saved">
          <Heart className="h-4 w-4 fill-orange" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-base font-semibold leading-snug text-foreground">{group.name}</h3>
        <p className="mt-0.5 text-xs text-muted-foreground">{group.neighborhood}</p>
        <p className="mt-1 text-xs text-muted-foreground">Ages {group.ageRange} · Meet-Up Group</p>
        <p className="mt-2 text-sm font-bold text-orange">Free</p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <Button size="sm" variant="outline" className="rounded-full" onClick={onView}>
            <Eye className="h-3.5 w-3.5" /> View
          </Button>
          <Button size="sm" variant="outline" className="rounded-full" onClick={onShare}>
            <Share2 className="h-3.5 w-3.5" /> Share
          </Button>
          <Button size="sm" variant="ghost" className="rounded-full text-muted-foreground hover:text-foreground" onClick={onRemove}>
            <X className="h-3.5 w-3.5" /> Remove
          </Button>
        </div>
      </div>
    </article>
  );
}

/* ---------- Activity Plan ---------- */

function ActivityPlanCard({ tab, onNavigate }: { tab: TabKey; onNavigate: Props["onNavigate"] }) {
  const [plan, setPlan] = useState(PLAN_SAMPLE);
  const total = plan.reduce((s, i) => s + i.price * i.qty, 0);

  const setQty = (idx: number, qty: number) => {
    setPlan((p) => p.map((it, i) => (i === idx ? { ...it, qty: Math.max(1, qty) } : it)));
  };
  const remove = (idx: number) => setPlan((p) => p.filter((_, i) => i !== idx));

  return (
    <section
      id="section-My Activity Plan"
      className={cn(
        "rounded-3xl bg-[hsl(36_35%_94%)] p-6 sm:p-7",
        tab !== "Saved Providers & Groups" && tab !== "My Activity Plan" && "hidden",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">My Activity Plan</h2>
          <p className="mt-1 text-sm text-muted-foreground">Estimate your total cost.</p>
        </div>
      </div>

      {plan.length === 0 ? (
        <p className="mt-5 rounded-2xl bg-card p-6 text-center text-sm text-muted-foreground">
          Add saved providers to estimate your total activity cost.
        </p>
      ) : (
        <>
          <ul className="mt-5 space-y-2">
            {plan.map((it, idx) => (
              <li key={it.name} className="flex items-center justify-between gap-3 rounded-2xl bg-card p-3">
                <div className="min-w-0">
                  <p className="truncate font-display text-sm font-semibold text-foreground">{it.name}</p>
                  <p className="text-xs text-muted-foreground">${it.price} / {it.unit}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center rounded-full border border-border">
                    <button onClick={() => setQty(idx, it.qty - 1)} className="grid h-7 w-7 place-items-center text-muted-foreground hover:text-foreground" aria-label="Decrease">
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-6 text-center text-sm font-semibold">{it.qty}</span>
                    <button onClick={() => setQty(idx, it.qty + 1)} className="grid h-7 w-7 place-items-center text-muted-foreground hover:text-foreground" aria-label="Increase">
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <p className="w-16 text-right text-sm font-bold text-orange">${it.price * it.qty}</p>
                  <button onClick={() => remove(idx)} className="grid h-7 w-7 place-items-center rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground" aria-label="Remove">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex items-center justify-between rounded-2xl bg-card p-4">
            <span className="font-display text-sm font-semibold text-foreground">Estimated total</span>
            <span className="font-display text-2xl font-bold text-orange">${total}</span>
          </div>
        </>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        <Button onClick={() => onNavigate("Calculator")} className="rounded-full bg-teal text-teal-foreground hover:bg-teal/90">
          View full plan
        </Button>
        <Button variant="outline" onClick={() => setPlan([])} className="rounded-full">
          Clear plan
        </Button>
      </div>
    </section>
  );
}

/* ---------- Family Preferences ---------- */

function PillToggle({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
        active
          ? "border-teal bg-teal text-teal-foreground"
          : "border-border bg-card text-foreground hover:border-teal hover:text-teal",
      )}
    >
      {label}
    </button>
  );
}

function FamilyPreferencesCard({ tab }: { tab: TabKey }) {
  const [ages, setAges] = useState<string[]>(["3–5"]);
  const [interests, setInterests] = useState<string[]>([
    "Classes", "Camps", "Birthday Parties", "Drop-Ins", "Meet-Up Groups", "Art",
  ]);
  const [times, setTimes] = useState<string[]>(["Weekday", "Weekend", "After-school"]);

  const toggle = (set: string[], v: string, setter: (n: string[]) => void) =>
    setter(set.includes(v) ? set.filter((x) => x !== v) : [...set, v]);

  return (
    <section
      id="section-Family Preferences"
      className={cn(
        "rounded-3xl bg-[hsl(36_35%_94%)] p-6 sm:p-7",
        tab !== "Saved Providers & Groups" && tab !== "Family Preferences" && "hidden",
      )}
    >
      <h2 className="font-display text-xl font-bold text-foreground">Family Preferences</h2>
      <p className="mt-1 text-sm text-muted-foreground">Update your family's interests.</p>

      <div className="mt-5 space-y-5">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Child age range</p>
          <div className="flex flex-wrap gap-2">
            {AGE_OPTIONS.map((a) => (
              <PillToggle key={a} label={a} active={ages.includes(a)} onClick={() => toggle(ages, a, setAges)} />
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Interests</p>
          <div className="flex flex-wrap gap-2">
            {INTEREST_OPTIONS.map((a) => (
              <PillToggle key={a} label={a} active={interests.includes(a)} onClick={() => toggle(interests, a, setInterests)} />
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Preferred times</p>
          <div className="flex flex-wrap gap-2">
            {TIME_OPTIONS.map((a) => (
              <PillToggle key={a} label={a} active={times.includes(a)} onClick={() => toggle(times, a, setTimes)} />
            ))}
          </div>
        </div>
      </div>

      <Button
        className="mt-6 rounded-full bg-teal text-teal-foreground hover:bg-teal/90"
        onClick={() => toast.success("Preferences saved")}
      >
        Edit preferences
      </Button>
    </section>
  );
}

/* ---------- Neighborhood ---------- */

function NeighborhoodCard({ tab, onNavigate }: { tab: TabKey; onNavigate: Props["onNavigate"] }) {
  return (
    <section
      id="section-My Neighborhood"
      className={cn(
        "rounded-3xl bg-[hsl(36_35%_94%)] p-6 sm:p-7",
        tab !== "Saved Providers & Groups" && tab !== "My Neighborhood" && "hidden",
      )}
    >
      <h2 className="font-display text-xl font-bold text-foreground">My Neighborhood</h2>
      <p className="mt-1 text-sm text-muted-foreground">Your home base for local picks.</p>

      <div className="mt-5 rounded-2xl bg-card p-5">
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-orange/15 text-orange">
            <MapPin className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-display text-base font-semibold text-foreground">555 W 60th Street</p>
            <p className="text-sm text-muted-foreground">New York, NY 10023</p>
            <p className="mt-2 text-xs text-muted-foreground">
              Detected neighborhood:{" "}
              <span className="font-semibold text-foreground">Upper West Side / Lincoln Square</span> · Manhattan
            </p>
          </div>
          <Button size="sm" variant="outline" className="rounded-full" onClick={() => toast("Update address coming soon")}>
            Update address
          </Button>
        </div>
      </div>

      <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Nearby neighborhoods</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {NEARBY.map((n) => (
          <button
            key={n}
            onClick={() => onNavigate("Classes", { borough: "Manhattan", neighborhood: n })}
            className="rounded-full border border-border bg-card px-3.5 py-1.5 text-sm text-foreground transition-colors hover:border-teal hover:text-teal"
          >
            {n}
          </button>
        ))}
      </div>

      <Button
        className="mt-6 rounded-full bg-teal text-teal-foreground hover:bg-teal/90"
        onClick={() => onNavigate("Classes", { borough: "Manhattan", neighborhood: "Upper West Side" })}
      >
        Browse activities near me <ArrowRight className="h-4 w-4" />
      </Button>
    </section>
  );
}

/* ---------- Alerts ---------- */

function AlertsCard({ tab }: { tab: TabKey }) {
  const [alerts, setAlerts] = useState<Record<string, boolean>>(
    Object.fromEntries(ALERT_OPTIONS.map((a) => [a, true])),
  );
  const [freq, setFreq] = useState<"Weekly" | "Only important updates" | "Pause emails">("Weekly");

  return (
    <section
      id="section-Alerts & Email Settings"
      className={cn(
        "rounded-3xl bg-[hsl(36_35%_94%)] p-6 sm:p-7",
        tab !== "Saved Providers & Groups" && tab !== "Alerts & Email Settings" && "hidden",
      )}
    >
      <h2 className="font-display text-xl font-bold text-foreground">Alerts & Email Settings</h2>
      <p className="mt-1 text-sm text-muted-foreground">Choose what you want to hear about.</p>

      <div className="mt-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email alerts</p>
        <ul className="space-y-2">
          {ALERT_OPTIONS.map((a) => (
            <li key={a} className="flex items-center gap-3 rounded-xl bg-card px-3 py-2">
              <Checkbox
                id={`alert-${a}`}
                checked={alerts[a]}
                onCheckedChange={(v) => setAlerts((s) => ({ ...s, [a]: !!v }))}
                className="data-[state=checked]:border-teal data-[state=checked]:bg-teal data-[state=checked]:text-teal-foreground"
              />
              <label htmlFor={`alert-${a}`} className="cursor-pointer text-sm text-foreground">{a}</label>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email frequency</p>
        <div className="flex flex-wrap gap-2">
          {(["Weekly", "Only important updates", "Pause emails"] as const).map((f) => {
            const active = f === freq;
            return (
              <button
                key={f}
                onClick={() => setFreq(f)}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                  active
                    ? "border-teal bg-teal text-teal-foreground"
                    : "border-border bg-card text-foreground hover:border-teal hover:text-teal",
                )}
              >
                {f}
              </button>
            );
          })}
        </div>
      </div>

      <Button
        className="mt-6 rounded-full bg-teal text-teal-foreground hover:bg-teal/90"
        onClick={() => toast.success("Settings saved")}
      >
        <Mail className="h-4 w-4" /> Save settings
      </Button>
    </section>
  );
}