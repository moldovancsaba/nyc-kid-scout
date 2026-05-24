import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail, MessageCircle, Link2 } from "lucide-react";
import type { FamilyEvent } from "@/types/event";
import { toast } from "sonner";

export function EventShareDialog({ event, onClose }: { event: FamilyEvent | null; onClose: () => void }) {
  if (!event) return null;
  const url = `https://classscoutny.app/events/${event.id}`;
  const summary = `${event.name} — ${event.neighborhood}, ${event.borough}. ${event.when}. ${event.priceLabel === "Free" ? "Free" : `$${event.price}`}. ${event.shortDescription}`;

  return (
    <Dialog open={!!event} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">Share {event.name}</DialogTitle>
          <DialogDescription>Send this family event to a friend or co-parent.</DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => window.open(`mailto:?subject=${encodeURIComponent(event.name)}&body=${encodeURIComponent(summary + "\n\n" + url)}`)}
          >
            <Mail className="h-4 w-4" /> Share via email
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(summary + " " + url)}`, "_blank")}
          >
            <MessageCircle className="h-4 w-4" /> Share via WhatsApp
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => {
              navigator.clipboard.writeText(url);
              toast.success("Link copied");
            }}
          >
            <Link2 className="h-4 w-4" /> Copy link
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}