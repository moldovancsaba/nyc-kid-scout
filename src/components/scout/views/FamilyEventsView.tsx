import { useMemo, useState } from "react";
import { BoroughBar } from "../BoroughBar";
import { NeighborhoodChips } from "../NeighborhoodChips";
import { EventCard } from "../EventCard";
import { EmptyState } from "../EmptyState";
import { EVENTS, EVENT_TYPES } from "@/data/events";
import { NEIGHBORHOODS } from "@/data/locations";
import { AGE_RANGES } from "@/data/providers";
import type { Borough, AgeRange } from "@/types/provider";
import type { FamilyEvent } from "@/types/event";
import { MapPin, Sparkles, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";

type PriceFilter = "all" | "Free" | "Paid";

interface Props {
  onOpen: (e: FamilyEvent) => void;
  onShare: (e: FamilyEvent) => void;
  onTickets: (e: FamilyEvent) => void;
  initialBorough?: Borough | null;
  initialNeighborhood?: string | null;
}

export function FamilyEventsView({ onOpen, onShare, onTickets, initialBorough, initialNeighborhood }: Props) {
  const [borough, setBorough] = useState<Borough | null>(initialBorough ?? "Manhattan");
  const [neighborhood, setNeighborhood] = useState<string | null>(initialNeighborhood ?? null);
  const [age, setAge] = useState<AgeRange | null>(null);
  const [eventType, setEventType] = useState<string | null>(null);
  const [price, setPrice] = useState<PriceFilter>("all");

  const filtered = useMemo(() => {
    return EVENTS
      .filter((e) => (borough ? e.borough === borough : true))
      .filter((e) => (neighborhood ? e.neighborhood === neighborhood : true))
      .filter((e) => (age ? e.ageRanges.includes(age) : true))
      .filter((e) => (eventType ? e.eventTypes.includes(eventType as any) : true))
      .filter((e) => (price === "all" ? true : e.priceLabel === price));
  }, [borough, neighborhood, age, eventType, price]);

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl bg-card shadow-card">
        <div className="grid items-center gap-6 p-8 sm:p-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-teal">
              <CalendarDays className="h-4 w-4" /> Family Events
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold leading-[1.1] text-foreground sm:text-4xl md:text-5xl">
              NYC family events,<br />curated by neighborhood
            </h1>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
              Pop-ups, workshops, storytimes, nature walks, and meetups. Browse by borough and grab tickets in seconds.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <BoroughBar value={borough} onChange={(b) => { setBorough(b); setNeighborhood(null); }} />
        {borough && (
          <NeighborhoodChips
            options={NEIGHBORHOODS[borough]}
            value={neighborhood}
            onChange={setNeighborhood}
          />
        )}

        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Price</p>
          <div className="flex flex-wrap gap-2">
            {(["all", "Free", "Paid"] as PriceFilter[]).map((p) => (
              <Chip key={p} active={price === p} onClick={() => setPrice(p)}>
                {p === "all" ? "All prices" : p}
              </Chip>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Age</p>
          <div className="flex flex-wrap gap-2">
            <Chip active={age === null} onClick={() => setAge(null)}>Any</Chip>
            {AGE_RANGES.map((a) => (
              <Chip key={a} active={age === a} onClick={() => setAge(a)}>{a}</Chip>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Event type</p>
          <div className="flex flex-wrap gap-2">
            <Chip active={eventType === null} onClick={() => setEventType(null)}>Any</Chip>
            {EVENT_TYPES.map((t) => (
              <Chip key={t} active={eventType === t} onClick={() => setEventType(t)}>{t}</Chip>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-foreground">
            <Sparkles className="h-5 w-5 text-orange" />
            {neighborhood ? `Events in ${neighborhood}` : borough ? `Events in ${borough}` : "All family events"}
          </h2>
          <span className="text-sm text-muted-foreground">{filtered.length} results</span>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon={MapPin}
            title="No family events here yet"
            message="No family events added here yet. Try another nearby neighborhood."
          />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((e) => (
              <EventCard key={e.id} event={e} onOpen={onOpen} onShare={onShare} onTickets={onTickets} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function Chip({ active, onClick, children }: { active?: boolean; onClick: () => void; children: React.ReactNode }) {
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
      {children}
    </button>
  );
}