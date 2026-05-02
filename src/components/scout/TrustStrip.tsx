import { MapPin, ShieldCheck, Heart, Calculator } from "lucide-react";

const ITEMS = [
  { icon: MapPin, title: "Local Experts", text: "NYC-focused listings by borough and neighborhood." },
  { icon: ShieldCheck, title: "Vetted Providers", text: "Helpful provider details in one easy place." },
  { icon: Heart, title: "Parent Approved", text: "Built for busy families comparing options." },
  { icon: Calculator, title: "Save & Compare", text: "Save favorites and estimate your total activity cost." },
];

export function TrustStrip() {
  return (
    <section className="mt-12 rounded-3xl bg-secondary p-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex items-start gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-card text-teal shadow-sm">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="font-display text-sm font-semibold text-foreground">{title}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
