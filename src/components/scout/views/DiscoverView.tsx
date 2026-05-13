import { useMemo, useState } from "react";
import { BoroughBar } from "../BoroughBar";
import { NeighborhoodChips } from "../NeighborhoodChips";
import { Filters, EMPTY_FILTERS, type FilterState } from "../Filters";
import { ProviderCard } from "../ProviderCard";
import { EmptyState } from "../EmptyState";
import { PROVIDERS } from "@/data/providers";
import { NEIGHBORHOODS } from "@/data/locations";
import type { Borough, Provider, Category } from "@/types/provider";
import { MapPin, Compass, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero-nyc.jpg";

interface Props {
  category: Category;
  onOpen: (p: Provider) => void;
  onShare: (p: Provider) => void;
}

export function DiscoverView({ category, onOpen, onShare }: Props) {
  const [borough, setBorough] = useState<Borough | null>("Manhattan");
  const [neighborhood, setNeighborhood] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);

  const filtered = useMemo(() => {
    return PROVIDERS.filter((p) => p.category === category)
      .filter((p) => (borough ? p.borough === borough : true))
      .filter((p) => (neighborhood ? p.neighborhood === neighborhood : true))
      .filter((p) => (filters.ages.length ? p.ageRanges.some((a) => filters.ages.includes(a)) : true))
      .filter((p) => (filters.times.length ? p.dayTimeTags.some((t) => filters.times.includes(t)) : true))
      .filter((p) => (filters.activity ? p.activityTypes.includes(filters.activity) : true));
  }, [category, borough, neighborhood, filters]);

  const featured = useMemo(
    () => filtered.filter((p) => p.badges.includes("Featured") || p.badges.includes("Staff Pick")).slice(0, 3),
    [filtered],
  );

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl bg-card shadow-card">
        <div className="grid items-center gap-6 p-8 sm:p-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal">Your local class scout</p>
            <h1 className="mt-2 font-display text-3xl font-bold leading-[1.1] text-foreground sm:text-4xl md:text-5xl">
              Discover the best<br />kids activities in NYC
            </h1>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
              Find {category.toLowerCase()}, camps, birthday parties, and drop-in activities by borough and neighborhood. Curated. Local. Built by parents.
            </p>
          </div>
          <img
            src={heroImg}
            alt="NYC skyline with Brooklyn Bridge"
            width={1024}
            height={640}
            className="ml-auto hidden h-44 w-full max-w-md rounded-2xl object-cover md:block"
          />
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
        <Filters value={filters} onChange={setFilters} />
      </section>

      {featured.length > 0 && (
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-foreground">
              <Sparkles className="h-5 w-5 text-orange" />
              Featured providers
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {featured.map((p) => (
              <ProviderCard key={p.id} provider={p} onOpen={onOpen} onShare={onShare} />
            ))}
          </div>
        </section>
      )}

      <section>
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="font-display text-xl font-semibold text-foreground">
            {neighborhood ? `${category} in ${neighborhood}` : borough ? `${category} in ${borough}` : `All ${category}`}
          </h2>
          <span className="text-sm text-muted-foreground">{filtered.length} results</span>
        </div>

        {!borough ? (
          <EmptyState icon={Compass} title="Choose a borough" message="Choose a borough to start exploring kids activities near you." />
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={MapPin}
            title="No providers here yet"
            message="No providers found here yet. Try another nearby neighborhood or adjust your filters."
          />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((p) => (
              <ProviderCard key={p.id} provider={p} onOpen={onOpen} onShare={onShare} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
