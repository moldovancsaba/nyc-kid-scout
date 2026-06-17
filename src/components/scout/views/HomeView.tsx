import { useState } from "react";
import {
  GraduationCap,
  Tent,
  PartyPopper,
  Sparkles,
  Users,
  ArrowRight,
  MapPin,
  ListChecks,
  Heart,
  ShieldCheck,
  Compass,
  Mail,
  Star,
  Building2,
  Send,
  Bot,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { Borough, Category, Provider } from "@/types/provider";
import type { MeetupGroup } from "@/types/meetup";
import { PROVIDERS } from "@/data/providers";
import { MEETUP_GROUPS } from "@/data/meetupGroups";
import { toast } from "sonner";
import heroImg from "@/assets/home-hero.jpg";
import guideUws from "@/assets/guide-uws.jpg";
import guideParkSlope from "@/assets/guide-parkslope.jpg";
import guideChelsea from "@/assets/guide-chelsea.jpg";
import guideBkHeights from "@/assets/guide-bkheights.jpg";

const POPULAR: Record<Borough, string[]> = {
  Manhattan: ["Upper West Side", "Upper East Side", "Chelsea", "West Village", "Tribeca", "Harlem", "Inwood"],
  Brooklyn: ["Park Slope", "Brooklyn Heights", "Williamsburg", "Prospect Heights", "DUMBO", "Greenpoint"],
  Queens: ["Astoria", "Long Island City", "Forest Hills", "Sunnyside", "Jackson Heights", "Flushing"],
  Bronx: ["Riverdale", "Fordham", "Pelham Bay", "Kingsbridge", "South Bronx", "Throgs Neck"],
  "Staten Island": ["St. George", "Great Kills", "New Dorp", "Tottenville", "Westerleigh", "Port Richmond"],
};

const CATEGORIES: {
  key: Category | "Meet-Up Groups";
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  tone: "orange" | "teal" | "pink" | "amber" | "blue";
}[] = [
  { key: "Classes", icon: GraduationCap, description: "Dance, sports, art, STEM, music, gymnastics, tutoring & more", tone: "orange" },
  { key: "Camps", icon: Tent, description: "Summer, school break, holiday & specialty camps", tone: "teal" },
  { key: "Birthday Parties", icon: PartyPopper, description: "Venues, entertainers, art parties, and play spaces", tone: "pink" },
  { key: "Drop-In Activities", icon: Sparkles, description: "Indoor play, weekend events, open gym, toddler time & more", tone: "amber" },
  { key: "Meet-Up Groups", icon: Users, description: "Parent groups, playdates, new-parent circles, and neighborhood meet-ups", tone: "blue" },
];

const TONE_BG: Record<string, string> = {
  orange: "bg-orange/15 text-orange",
  teal: "bg-teal-soft text-teal",
  pink: "bg-[hsl(340_70%_94%)] text-[hsl(340_60%_45%)]",
  amber: "bg-[hsl(40_90%_92%)] text-[hsl(35_85%_45%)]",
  blue: "bg-[hsl(210_80%_94%)] text-[hsl(210_70%_45%)]",
};

const TONE_LINK: Record<string, string> = {
  orange: "text-orange",
  teal: "text-teal",
  pink: "text-[hsl(340_60%_45%)]",
  amber: "text-[hsl(35_85%_45%)]",
  blue: "text-[hsl(210_70%_45%)]",
};

const GUIDES = [
  { title: "Upper West Side Kids Activity Guide", desc: "Classes, birthday ideas, toddler programs, and weekend picks.", borough: "Manhattan" as Borough, neighborhood: "Upper West Side", img: guideUws, tone: "orange" },
  { title: "Park Slope Family Guide", desc: "Local classes, camps, drop-ins, and parent groups.", borough: "Brooklyn" as Borough, neighborhood: "Park Slope", img: guideParkSlope, tone: "teal" },
  { title: "Chelsea Kids Classes & Camps", desc: "Art, movement, after-school, and weekend options.", borough: "Manhattan" as Borough, neighborhood: "Chelsea", img: guideChelsea, tone: "pink" },
  { title: "Brooklyn Heights Parent Picks", desc: "Classes, meet-ups, toddler activities, and birthday ideas.", borough: "Brooklyn" as Borough, neighborhood: "Brooklyn Heights", img: guideBkHeights, tone: "blue" },
];

interface Props {
  onNavigate: (view: Category | "Saved" | "Calculator" | "Meet-Up Groups", location?: { borough?: Borough; neighborhood?: string }) => void;
  onOpenProvider: (p: Provider) => void;
  onOpenGroup: (g: MeetupGroup) => void;
  onAiSearch?: (query: string) => void;
}

export function HomeView({ onNavigate, onOpenProvider, onOpenGroup, onAiSearch }: Props) {
  const [borough, setBorough] = useState<Borough>("Manhattan");
  const [email, setEmail] = useState("");
  const [aiQuery, setAiQuery] = useState("");

  const AI_CHIPS = [
    "Weekend activities for my 5-year-old",
    "Art classes on the Upper West Side",
    "Summer camps for an 8-year-old in Manhattan",
    "Birthday party ideas in Brooklyn",
    "Indoor drop-ins near Tribeca",
  ];

  const submitAi = (q: string) => {
    const trimmed = q.trim();
    if (!trimmed || !onAiSearch) return;
    onAiSearch(trimmed);
    setAiQuery("");
  };

  const popularPicks = [
    PROVIDERS.find((p) => p.name.includes("Bright Brush")),
    PROVIDERS.find((p) => p.name.includes("Mini Maestros")) ?? PROVIDERS.find((p) => p.activityTypes.includes("Music")),
    PROVIDERS.find((p) => p.name.includes("Brooklyn Soccer")) ?? PROVIDERS.find((p) => p.activityTypes.includes("Soccer")),
    PROVIDERS.find((p) => p.category === "Birthday Parties"),
    PROVIDERS.find((p) => p.activityTypes.includes("Gymnastics")),
  ].filter(Boolean) as Provider[];

  const popularGroup = MEETUP_GROUPS[0];

  const scrollToNeighborhoods = () => {
    document.getElementById("home-neighborhoods")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="space-y-16">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-[2rem] bg-[hsl(24_45%_94%)]">
        <div className="grid items-center gap-8 p-8 sm:p-12 md:grid-cols-[1.1fr_1fr] md:p-16">
          <div className="relative z-10">
            <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Discover kids activities near you in NYC
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
              Find classes, camps, birthday parties, drop-ins, and parent meet-up groups by borough and neighborhood.
            </p>

            {/* AI Search */}
            <div className="mt-8 max-w-xl">
              <div className="rounded-[2rem] border border-border bg-card p-6 shadow-elevated">
                <div className="mb-4 flex items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-teal-soft">
                    <Sparkles className="h-4 w-4 text-teal" />
                  </span>
                  <span className="font-display text-xl text-foreground">
                    Scout AI
                  </span>
                  <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Beta
                  </span>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    submitAi(aiQuery);
                  }}
                >
                  <div className="flex items-center gap-2 rounded-full border-2 border-border bg-background p-2 pl-5 transition-colors focus-within:border-teal focus-within:shadow-[0_0_0_4px_hsl(var(--teal-soft))]">
                    <Bot className="h-5 w-5 shrink-0 text-teal" />
                    <input
                      value={aiQuery}
                      onChange={(e) => setAiQuery(e.target.value)}
                      type="text"
                      placeholder="What are you looking for today?"
                      aria-label="Ask Scout AI"
                      className="min-w-0 flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
                    />
                    <Button
                      type="submit"
                      disabled={!aiQuery.trim()}
                      className="h-11 shrink-0 rounded-full bg-teal px-5 text-sm font-semibold text-teal-foreground hover:bg-teal/90"
                    >
                      <Send className="h-4 w-4" />
                      Ask
                    </Button>
                  </div>
                </form>
                <div className="mt-4 flex flex-wrap gap-2">
                  {AI_CHIPS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => submitAi(c)}
                      className="rounded-full border border-border bg-secondary/60 px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-teal hover:bg-teal-soft hover:text-teal"
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button
                size="lg"
                className="rounded-full bg-foreground px-6 text-background hover:bg-foreground/90"
                onClick={() => onNavigate("Classes")}
              >
                Start exploring <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-foreground/20 bg-card px-6 text-foreground hover:bg-secondary"
                onClick={scrollToNeighborhoods}
              >
                Browse by neighborhood
              </Button>
            </div>
            <p className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-orange/15 text-orange">
                <Sparkles className="h-3.5 w-3.5" />
              </span>
              Curated. Local. Parent-friendly. Built for busy NYC families.
            </p>
          </div>
          <div className="relative">
            <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] shadow-elevated">
              <img
                src={heroImg}
                alt="Parent and child looking out at the New York City skyline"
                width={1280}
                height={1024}
                className="h-full w-full object-cover"
              />
            </div>
            <span className="absolute -right-2 -top-2 hidden text-orange md:block" aria-hidden>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path d="M24 4v10M40 12l-7 7M44 28H34M12 12l7 7M4 28h10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </span>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section>
        <h2 className="text-center font-display text-3xl font-bold text-foreground sm:text-4xl">What are you looking for?</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {CATEGORIES.map(({ key, icon: Icon, description, tone }) => (
            <button
              key={key}
              onClick={() =>
                onNavigate(key === "Meet-Up Groups" ? "Meet-Up Groups" : (key as Category))
              }
              className="group flex flex-col items-center rounded-3xl border border-border bg-card p-6 text-center shadow-card transition-all hover:-translate-y-1 hover:shadow-elevated"
            >
              <span className={cn("grid h-16 w-16 place-items-center rounded-full", TONE_BG[tone])}>
                <Icon className="h-7 w-7" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{key}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
              <span className={cn("mt-4 inline-flex items-center gap-1 text-sm font-semibold", TONE_LINK[tone])}>
                Explore <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* NEIGHBORHOOD DISCOVERY */}
      <section id="home-neighborhoods" className="relative overflow-hidden rounded-[2rem] bg-secondary px-6 py-12 sm:px-12 sm:py-14">
        <Building2 className="pointer-events-none absolute -left-4 top-6 h-32 w-32 text-foreground/[0.04]" aria-hidden />
        <Building2 className="pointer-events-none absolute -right-4 bottom-6 h-32 w-32 text-foreground/[0.04]" aria-hidden />
        <h2 className="text-center font-display text-2xl font-bold text-foreground sm:text-3xl">
          Find activities in your neighborhood
        </h2>
        <div className="mt-7 flex flex-wrap justify-center gap-2">
          {(Object.keys(POPULAR) as Borough[]).map((b) => {
            const active = b === borough;
            return (
              <button
                key={b}
                onClick={() => setBorough(b)}
                className={cn(
                  "rounded-full border px-5 py-2 text-sm font-semibold transition-colors",
                  active
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-card text-foreground hover:border-foreground",
                )}
              >
                {b}
              </button>
            );
          })}
        </div>
        <p className="mt-6 text-center text-sm font-medium text-muted-foreground">
          Popular neighborhoods in {borough}
        </p>
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {POPULAR[borough].map((n) => (
            <button
              key={n}
              onClick={() => onNavigate("Classes", { borough, neighborhood: n })}
              className="rounded-full border border-border bg-card px-4 py-1.5 text-sm text-foreground transition-colors hover:border-teal hover:text-teal"
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => onNavigate("Classes", { borough })}
            className="rounded-full border border-border bg-card px-4 py-1.5 text-sm text-foreground transition-colors hover:border-teal hover:text-teal"
          >
            View all
          </button>
        </div>
      </section>

      {/* GUIDES */}
      <section>
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">Featured neighborhood guides</h2>
          <button
            onClick={() => onNavigate("Classes")}
            className="hidden items-center gap-1 text-sm font-semibold text-foreground hover:text-teal sm:inline-flex"
          >
            View all guides <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {GUIDES.map((g) => (
            <button
              key={g.title}
              onClick={() => onNavigate("Classes", { borough: g.borough, neighborhood: g.neighborhood })}
              className="group flex flex-col overflow-hidden rounded-2xl bg-card text-left shadow-card transition-all hover:-translate-y-0.5 hover:shadow-elevated"
            >
              <div className="relative h-36 overflow-hidden">
                <img
                  src={g.img}
                  alt={g.title}
                  loading="lazy"
                  width={800}
                  height={512}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className={cn("absolute -bottom-4 left-4 grid h-10 w-10 place-items-center rounded-full ring-4 ring-card", TONE_BG[g.tone])}>
                  <Building2 className="h-4 w-4" />
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5 pt-6">
                <h3 className="font-display text-base font-semibold leading-snug text-foreground">{g.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{g.desc}</p>
                <span className={cn("mt-4 inline-flex items-center gap-1 text-sm font-semibold", TONE_LINK[g.tone])}>
                  Explore guide <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section>
        <h2 className="text-center font-display text-2xl font-bold text-foreground sm:text-3xl">How Class Scout NY works</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            { n: 1, title: "Choose your neighborhood", desc: "Start with where your family actually spends time.", icon: MapPin, tone: "orange" },
            { n: 2, title: "Compare local options", desc: "See ages, prices, schedules, activity types, and parent-friendly notes.", icon: ListChecks, tone: "teal" },
            { n: 3, title: "Save, share & plan", desc: "Keep favorites, send ideas to another parent, and estimate total cost.", icon: Heart, tone: "pink" },
          ].map(({ n, title, desc, icon: Icon, tone }) => (
            <div key={n} className="rounded-3xl border border-border bg-card p-6 shadow-card">
              <div className="flex items-start gap-4">
                <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-bold", TONE_BG[tone])}>
                  {n}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-base font-semibold text-foreground">{title}</h3>
                    <Icon className={cn("h-5 w-5", TONE_LINK[tone])} />
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="rounded-[2rem] bg-[hsl(24_45%_94%)] px-6 py-8 sm:px-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Local by design", desc: "NYC-focused listings organized by borough and neighborhood.", icon: Compass, tone: "orange" },
            { title: "Helpful details", desc: "Provider details in one easy place.", icon: ShieldCheck, tone: "teal" },
            { title: "Parent-friendly", desc: "Built for busy families comparing the best options.", icon: Users, tone: "pink" },
            { title: "Save & compare", desc: "Favorite providers and estimate total activity costs.", icon: Heart, tone: "blue" },
          ].map(({ title, desc, icon: Icon, tone }) => (
            <div key={title} className="flex items-start gap-3">
              <span className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-full", TONE_BG[tone])}>
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-display text-sm font-semibold text-foreground">{title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* POPULAR PICKS */}
      <section>
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">Popular picks to get you started</h2>
          <button
            onClick={() => onNavigate("Classes")}
            className="inline-flex items-center gap-1 text-sm font-semibold text-foreground hover:text-teal"
          >
            View all <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 scrollbar-hide sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3 xl:grid-cols-6">
          {popularPicks.map((p) => (
            <PreviewCard key={p.id} provider={p} onOpen={onOpenProvider} />
          ))}
          {popularGroup && (
            <button
              onClick={() => onOpenGroup(popularGroup)}
              className="group flex w-64 shrink-0 snap-start flex-col overflow-hidden rounded-2xl bg-card text-left shadow-card transition-all hover:-translate-y-0.5 hover:shadow-elevated sm:w-auto"
            >
              <div className="relative grid h-32 place-items-center bg-[hsl(210_80%_94%)]">
                <Users className="h-10 w-10 text-[hsl(210_70%_45%)]" />
                <span className="absolute left-2 top-2 rounded-full bg-[hsl(210_70%_45%)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                  Parent Favorite
                </span>
              </div>
              <div className="flex flex-1 flex-col p-3">
                <h3 className="line-clamp-1 font-display text-sm font-semibold text-foreground">{popularGroup.name}</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">{popularGroup.neighborhood}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">Ages {popularGroup.ageRange} · Meet-Up Group</p>
                <p className="mt-2 text-sm font-semibold text-orange">Free</p>
              </div>
            </button>
          )}
        </div>
      </section>

      {/* EMAIL */}
      <section className="overflow-hidden rounded-[2rem] bg-[hsl(340_70%_96%)] px-6 py-10 sm:px-12">
        <div className="grid items-center gap-6 md:grid-cols-[auto_1fr_auto]">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-[hsl(340_70%_88%)] text-[hsl(340_60%_40%)]">
            <Mail className="h-6 w-6" />
          </span>
          <div>
            <h2 className="font-display text-xl font-bold text-foreground sm:text-2xl">
              Get the latest kids activity picks for your neighborhood
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              New classes, camps, parties, and parent groups — delivered to your inbox.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!email) return;
              toast.success("You're on the list! We'll be in touch soon.");
              setEmail("");
            }}
            className="flex w-full flex-col gap-2 sm:flex-row md:w-auto"
          >
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="h-11 rounded-full border-border bg-card sm:w-64"
            />
            <Button type="submit" className="h-11 rounded-full bg-foreground px-6 text-background hover:bg-foreground/90">
              Sign me up!
            </Button>
          </form>
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground md:text-left">
          No spam. Unsubscribe anytime.
        </p>
      </section>
    </div>
  );
}

function PreviewCard({ provider, onOpen }: { provider: Provider; onOpen: (p: Provider) => void }) {
  const badge = provider.badges[0];
  return (
    <button
      onClick={() => onOpen(provider)}
      className="group flex w-64 shrink-0 snap-start flex-col overflow-hidden rounded-2xl bg-card text-left shadow-card transition-all hover:-translate-y-0.5 hover:shadow-elevated sm:w-auto"
    >
      <div className="relative h-32 overflow-hidden">
        <img
          src={provider.image}
          alt={provider.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {badge && (
          <span className="absolute left-2 top-2 rounded-full bg-card/95 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-foreground shadow-sm backdrop-blur">
            {badge}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-3">
        <h3 className="line-clamp-1 font-display text-sm font-semibold text-foreground">{provider.name}</h3>
        <p className="mt-0.5 text-xs text-muted-foreground">{provider.neighborhood}</p>
        <p className="mt-1 text-[11px] text-muted-foreground">
          Ages {provider.ageRanges[0]} · {provider.activityTypes[0]}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm font-semibold text-orange">
            ${provider.pricePerClass}
            <span className="text-[10px] font-normal text-muted-foreground">/class</span>
          </span>
          <Star className="h-3.5 w-3.5 fill-orange text-orange" />
        </div>
      </div>
    </button>
  );
}
