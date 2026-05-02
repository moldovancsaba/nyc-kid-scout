import { useCalculator } from "@/store/useScout";
import { PROVIDERS } from "@/data/providers";
import { Button } from "@/components/ui/button";
import { Calculator, Minus, Plus, Trash2, X } from "lucide-react";
import { EmptyState } from "../EmptyState";

export function CalculatorView() {
  const { items, setClasses, remove, clear } = useCalculator();

  const rows = items
    .map((i) => {
      const p = PROVIDERS.find((x) => x.id === i.providerId);
      if (!p) return null;
      return { ...i, provider: p, subtotal: p.pricePerClass * i.classes };
    })
    .filter((x): x is NonNullable<typeof x> => !!x);

  const total = rows.reduce((sum, r) => sum + r.subtotal, 0);

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Activity cost calculator</h1>
          <p className="mt-1 text-sm text-muted-foreground">Estimate your total monthly activity spend across providers.</p>
        </div>
        {rows.length > 0 && (
          <Button variant="outline" onClick={clear}>
            <Trash2 className="h-4 w-4" /> Clear all
          </Button>
        )}
      </header>

      {rows.length === 0 ? (
        <EmptyState
          icon={Calculator}
          title="Calculator is empty"
          message="Add providers to estimate your total activity cost."
        />
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-3">
            {rows.map((r) => (
              <div key={r.providerId} className="flex items-center gap-4 rounded-2xl bg-card p-4 shadow-card">
                <img src={r.provider.image} alt="" className="h-16 w-16 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display font-semibold text-foreground">{r.provider.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {r.provider.neighborhood}, {r.provider.borough} · ${r.provider.pricePerClass}/class
                  </p>
                </div>
                <div className="flex items-center gap-1 rounded-full border border-border bg-card p-1">
                  <button
                    onClick={() => setClasses(r.providerId, r.classes - 1)}
                    className="grid h-7 w-7 place-items-center rounded-full hover:bg-secondary"
                    aria-label="Decrease classes"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold">{r.classes}</span>
                  <button
                    onClick={() => setClasses(r.providerId, r.classes + 1)}
                    className="grid h-7 w-7 place-items-center rounded-full hover:bg-secondary"
                    aria-label="Increase classes"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="w-20 text-right font-display font-bold text-orange">${r.subtotal}</div>
                <button
                  onClick={() => remove(r.providerId)}
                  aria-label={`Remove ${r.provider.name}`}
                  className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <aside className="h-fit rounded-2xl bg-card p-6 shadow-card lg:sticky lg:top-6">
            <h3 className="font-display text-base font-semibold text-foreground">Estimated monthly cost</h3>
            <p className="mt-1 text-xs text-muted-foreground">Based on the providers and classes you've added.</p>
            <div className="mt-5 space-y-2 border-t border-border pt-5 text-sm">
              {rows.map((r) => (
                <div key={r.providerId} className="flex justify-between">
                  <span className="truncate pr-2 text-muted-foreground">
                    {r.provider.name} × {r.classes}
                  </span>
                  <span className="font-medium text-foreground">${r.subtotal}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-baseline justify-between border-t border-border pt-5">
              <span className="font-display text-sm font-semibold text-foreground">Estimated total</span>
              <span className="font-display text-3xl font-bold text-orange">${total}</span>
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
              Demo prices for planning only. Confirm rates with each provider.
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}
