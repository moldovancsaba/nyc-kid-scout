import { cn } from "@/lib/utils";

export function NeighborhoodChips({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string | null;
  onChange: (n: string | null) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Neighborhood</p>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onChange(null)}
          className={cn(
            "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
            value === null
              ? "border-orange bg-orange-soft text-foreground"
              : "border-border bg-card text-muted-foreground hover:border-orange hover:text-foreground",
          )}
        >
          All
        </button>
        {options.map((n) => {
          const active = value === n;
          return (
            <button
              key={n}
              onClick={() => onChange(n)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                active
                  ? "border-orange bg-orange text-orange-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-orange hover:text-foreground",
              )}
              aria-pressed={active}
            >
              {n}
            </button>
          );
        })}
      </div>
    </div>
  );
}
