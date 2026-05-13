import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import type { Provider } from "@/types/provider";
import { Heart, Plus, Mail, Globe, Phone, MapPin, Star, Share2, MessageCircle } from "lucide-react";
import { useSaved, useCalculator } from "@/store/useScout";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { PROVIDERS } from "@/data/providers";
import { ProviderCard } from "../ProviderCard";
import { ProviderMap } from "./ProviderMap";

export function ProviderProfile({
  provider,
  onClose,
  onShare,
  onOpenAnother,
}: {
  provider: Provider | null;
  onClose: () => void;
  onShare: (p: Provider) => void;
  onOpenAnother: (p: Provider) => void;
}) {
  const { isSaved, toggle } = useSaved();
  const { add } = useCalculator();
  if (!provider) return null;
  const saved = isSaved(provider.id);

  const similar = PROVIDERS.filter(
    (p) => p.id !== provider.id && p.borough === provider.borough && p.category === provider.category,
  ).slice(0, 3);

  const shareEmail = () => {
    const body = `Check out ${provider.name} — ${provider.category} in ${provider.neighborhood}, ${provider.borough}.\n\n${provider.shortDescription}\nFrom $${provider.pricePerClass}/class.\n\nhttps://classscoutny.app/p/${provider.id}`;
    window.open(`mailto:?subject=${encodeURIComponent(provider.name + " on Class Scout NY")}&body=${encodeURIComponent(body)}`);
  };
  const shareWhatsapp = () => {
    const text = `${provider.name} (${provider.category}) in ${provider.neighborhood}, ${provider.borough} — $${provider.pricePerClass}/class. ${provider.shortDescription} https://classscoutny.app/p/${provider.id}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <Sheet open={!!provider} onOpenChange={(o) => !o && onClose()}>
      <SheetContent side="right" className="w-full overflow-y-auto p-0 sm:max-w-xl bg-background">
        <div className="relative h-64 w-full overflow-hidden">
          <img src={provider.image} alt={provider.name} className="h-full w-full object-cover" />
          {provider.badges[0] && (
            <span className="absolute left-5 top-5 rounded-full bg-teal px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-teal-foreground">
              {provider.badges[0]}
            </span>
          )}
        </div>

        <div className="space-y-6 p-6 pb-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">{provider.category}</p>
            <h2 className="mt-1 font-display text-2xl font-bold text-foreground">{provider.name}</h2>
            <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {provider.address}
            </p>
            <div className="mt-3 flex items-center gap-3 text-sm">
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-orange text-orange" />
                <span className="font-semibold text-foreground">{provider.rating}</span>
                <span className="text-muted-foreground">({provider.reviewCount} reviews)</span>
              </span>
              <span className="text-border">|</span>
              <span className="font-display text-base">
                <span className="font-bold text-orange">${provider.pricePerClass}</span>
                <span className="text-xs text-muted-foreground">/class</span>
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {provider.activityTypes.map((t) => (
              <span key={t} className="rounded-full bg-teal-soft px-3 py-1 text-xs font-medium text-teal">{t}</span>
            ))}
            {provider.ageRanges.map((a) => (
              <span key={a} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">Ages {a}</span>
            ))}
            {provider.dayTimeTags.map((d) => (
              <span key={d} className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">{d}</span>
            ))}
          </div>

          <p className="text-sm leading-relaxed text-foreground/85">{provider.longDescription}</p>

          <div className="grid grid-cols-2 gap-2">
            <Button
              className="bg-foreground text-background hover:bg-foreground/90"
              onClick={() => {
                add(provider.id);
                toast.success(`${provider.name} added to calculator`);
              }}
            >
              <Plus className="h-4 w-4" /> Add to calculator
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                toggle(provider.id);
                toast.success(saved ? "Removed from saved" : "Saved");
              }}
            >
              <Heart className={cn("h-4 w-4", saved && "fill-orange text-orange")} />
              {saved ? "Saved" : "Save"}
            </Button>
            <Button variant="outline" onClick={shareEmail}>
              <Mail className="h-4 w-4" /> Email
            </Button>
            <Button variant="outline" onClick={shareWhatsapp}>
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </Button>
          </div>

          <div className="rounded-2xl bg-secondary p-5">
            <h3 className="font-display text-sm font-semibold text-foreground">Contact this provider</h3>
            <div className="mt-3 space-y-2 text-sm">
              <a href={`mailto:${provider.email}`} className="flex items-center gap-2 text-foreground hover:text-teal">
                <Mail className="h-4 w-4 text-muted-foreground" /> {provider.email}
              </a>
              <a href={provider.website} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-foreground hover:text-teal">
                <Globe className="h-4 w-4 text-muted-foreground" /> {provider.website}
              </a>
              <a href={`tel:${provider.phone}`} className="flex items-center gap-2 text-foreground hover:text-teal">
                <Phone className="h-4 w-4 text-muted-foreground" /> {provider.phone}
              </a>
            </div>
          </div>

          <ProviderMap address={provider.address} borough={provider.borough} />

          {similar.length > 0 && (
            <div>
              <h3 className="font-display text-base font-semibold text-foreground">Similar providers nearby</h3>
              <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {similar.map((p) => (
                  <ProviderCard key={p.id} provider={p} onOpen={onOpenAnother} onShare={onShare} />
                ))}
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
