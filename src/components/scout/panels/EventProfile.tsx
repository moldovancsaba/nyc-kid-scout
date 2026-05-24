import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, Calendar, Ticket, Mail, MessageCircle, X } from "lucide-react";
import type { FamilyEvent } from "@/types/event";
import { useSaved } from "@/store/useScout";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { EVENTS } from "@/data/events";
import { EventCard } from "../EventCard";

interface Props {
  event: FamilyEvent | null;
  onClose: () => void;
  onShare: (e: FamilyEvent) => void;
  onTickets: (e: FamilyEvent) => void;
  onOpenAnother: (e: FamilyEvent) => void;
}

export function EventProfile({ event, onClose, onShare, onTickets, onOpenAnother }: Props) {
  const { isSaved, toggle } = useSaved();
  if (!event) return null;
  const saved = isSaved(event.id);

  const similar = EVENTS.filter(
    (e) => e.id !== event.id && (e.borough === event.borough || e.eventTypes.some((t) => event.eventTypes.includes(t))),
  ).slice(0, 3);

  const summary = `${event.name} — ${event.neighborhood}, ${event.borough}. ${event.when}.`;
  const url = `https://classscoutny.app/events/${event.id}`;

  return (
    <Dialog open={!!event} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[92vh] max-w-3xl overflow-y-auto p-0">
        <div className="relative h-64 w-full overflow-hidden rounded-t-lg sm:h-80">
          <img src={event.image} alt={event.name} className="h-full w-full object-cover" />
          <button
            onClick={onClose}
            className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-card/95 backdrop-blur hover:bg-card"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            {event.tags.slice(0, 3).map((t) => (
              <span key={t} className="rounded-full bg-teal px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-teal-foreground shadow-sm">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-6 p-6 sm:p-8">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">{event.name}</h2>
            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{event.neighborhood}, {event.borough}</span>
              <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{event.when}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {event.eventTypes.map((t) => (
              <span key={t} className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">{t}</span>
            ))}
            {event.ageRanges.map((a) => (
              <span key={a} className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">Ages {a}</span>
            ))}
          </div>

          <div className="flex flex-wrap items-end justify-between gap-4 rounded-2xl bg-secondary/40 p-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Price</p>
              {event.price === 0 ? (
                <p className="font-display text-3xl font-bold text-teal">Free</p>
              ) : (
                <p className="font-display text-3xl font-bold text-orange">${event.price}<span className="ml-1 text-sm font-medium text-muted-foreground">/ticket</span></p>
              )}
            </div>
            <Button
              onClick={() => onTickets(event)}
              className="bg-teal text-teal-foreground hover:bg-teal/90"
              size="lg"
            >
              <Ticket className="h-4 w-4" />
              Tickets
            </Button>
          </div>

          <div>
            <h3 className="mb-2 font-display text-lg font-semibold">About this event</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{event.shortDescription}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{event.longDescription}</p>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            <Button
              variant="outline"
              onClick={() => {
                toggle(event.id);
                toast.success(saved ? "Removed from saved" : "Saved");
              }}
            >
              <Heart className={cn("h-4 w-4", saved && "fill-orange text-orange")} />
              {saved ? "Saved" : "Save"}
            </Button>
            <Button
              variant="outline"
              onClick={() => window.open(`mailto:?subject=${encodeURIComponent(event.name)}&body=${encodeURIComponent(summary + "\n\n" + url)}`)}
            >
              <Mail className="h-4 w-4" /> Email
            </Button>
            <Button
              variant="outline"
              onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(summary + " " + url)}`, "_blank")}
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </Button>
          </div>

          {similar.length > 0 && (
            <div>
              <h3 className="mb-3 font-display text-lg font-semibold">Similar events nearby</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {similar.map((s) => (
                  <EventCard
                    key={s.id}
                    event={s}
                    onOpen={onOpenAnother}
                    onShare={onShare}
                    onTickets={onTickets}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}