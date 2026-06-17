import { BOROUGHS } from "@/data/locations";
import type { Borough } from "@/types/provider";
import { cn } from "@/lib/utils";

export function BoroughBar({ value, onChange }: { value: Borough | null; onChange: (b: Borough) => void }) {
  return (
    <div>
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Borough</p>
      <div className="flex flex-wrap gap-2">
        {BOROUGHS.map((b) => {
          const active = value === b;
          return (
            <button
              key={b}
              onClick={() => onChange(b)}
              className={cn(
                "rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors",
                active
                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                  : "border-border bg-card text-foreground hover:border-primary hover:bg-background",
              )}
              aria-pressed={active}
            >
              {b}
            </button>
          );
        })}
      </div>
    </div>
  );
}
