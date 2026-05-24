import { Heart, Share2, MapPin, Calendar, Ticket } from "lucide-react";
import type { FamilyEvent } from "@/types/event";
import { Button } from "@/components/ui/button";
import { useSaved } from "@/store/useScout";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Props {
  event: FamilyEvent;
  onOpen: (e: FamilyEvent) => void;
  onShare: (e: FamilyEvent) => void;
  onTickets: (e: FamilyEvent) => void;
}

export function EventCard({ event, onOpen, onShare, onTickets }: Props) {
  const { isSaved, toggle } = useSaved();
  const saved = isSaved(event.id);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-card shadow-card transition-all hover:-translate-y-0.5 hover:shadow-elevated">
      <div className="relative h-44 overflow-hidden">
        <img
          src={event.image}
          alt={event.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {event.tags[0] && (
          <span className="absolute left-3 top-3 rounded-full bg-teal px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-teal-foreground shadow-sm">
            {event.tags[0]}
          </span>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggle(event.id);
            toast.success(saved ? "Removed from saved" : "Saved");
          }}
          aria-label={saved ? "Remove from saved" : "Save event"}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-card/95 backdrop-blur transition-colors hover:bg-card"
        >
          <Heart className={cn("h-4 w-4", saved ? "fill-orange text-orange" : "text-foreground")} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <button onClick={() => onOpen(event)} className="text-left">
          <h3 className="font-display text-lg font-semibold text-foreground transition-colors group-hover:text-teal">
            {event.name}
          </h3>
        </button>
        <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          {event.neighborhood}, {event.borough}
        </p>
        <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          {event.when}
        </p>

        <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{event.shortDescription}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {event.eventTypes.slice(0, 2).map((t) => (
            <span key={t} className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground">
              {t}
            </span>
          ))}
          {event.ageRanges.slice(0, 2).map((a) => (
            <span key={a} className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
              Ages {a}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <div>
            {event.price === 0 ? (
              <span className="font-display text-lg font-bold text-teal">Free</span>
            ) : (
              <>
                <span className="font-display text-lg font-bold text-orange">${event.price}</span>
                <span className="text-xs text-muted-foreground">/ticket</span>
              </>
            )}
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <Button
            onClick={() => onTickets(event)}
            className="flex-1 bg-teal text-teal-foreground hover:bg-teal/90"
            aria-label={`Get tickets for ${event.name}`}
          >
            <Ticket className="h-4 w-4" />
            Tickets
          </Button>
          <Button onClick={() => onOpen(event)} variant="outline" className="flex-1">
            View details
          </Button>
          <Button variant="outline" size="icon" aria-label="Share event" onClick={() => onShare(event)}>
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </article>
  );
}