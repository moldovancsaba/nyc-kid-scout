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
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                active
                  ? "border-teal bg-teal text-teal-foreground"
                  : "border-border bg-card text-foreground hover:border-teal hover:text-teal",
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
