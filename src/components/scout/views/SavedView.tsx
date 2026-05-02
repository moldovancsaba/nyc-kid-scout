import { useSaved } from "@/store/useScout";
import { PROVIDERS } from "@/data/providers";
import { ProviderCard } from "../ProviderCard";
import { EmptyState } from "../EmptyState";
import { Heart } from "lucide-react";
import type { Provider } from "@/types/provider";

export function SavedView({ onOpen, onShare }: { onOpen: (p: Provider) => void; onShare: (p: Provider) => void }) {
  const { saved } = useSaved();
  const providers = PROVIDERS.filter((p) => saved.includes(p.id));

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-bold text-foreground">Saved providers</h1>
        <p className="mt-1 text-sm text-muted-foreground">Everything you've bookmarked, in one place.</p>
      </header>

      {providers.length === 0 ? (
        <EmptyState icon={Heart} title="No saved providers yet" message="Save providers you like and they'll appear here." />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {providers.map((p) => (
            <ProviderCard key={p.id} provider={p} onOpen={onOpen} onShare={onShare} />
          ))}
        </div>
      )}
    </div>
  );
}
