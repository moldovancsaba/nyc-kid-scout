import { useState } from "react";
import type { FamilyEvent } from "@/types/event";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Minus, Plus, MapPin, Calendar, CheckCircle2, Ticket } from "lucide-react";
import { AGE_RANGES } from "@/data/providers";
import { toast } from "sonner";

interface Props {
  event: FamilyEvent;
  onBack: () => void;
}

export function EventCheckoutView({ event, onBack }: Props) {
  const [qty, setQty] = useState(1);
  const [confirmed, setConfirmed] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    childAge: "" as string,
    notes: "",
  });

  const total = event.price * qty;
  const isFree = event.price === 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email) {
      toast.error("Please fill in your name and email");
      return;
    }
    setConfirmed(true);
  };

  if (confirmed) {
    return (
      <div className="mx-auto max-w-xl space-y-6">
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to Family Events
        </button>
        <div className="rounded-3xl bg-card p-10 text-center shadow-card">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-teal-soft">
            <CheckCircle2 className="h-7 w-7 text-teal" />
          </div>
          <h1 className="mt-4 font-display text-2xl font-bold text-foreground">
            {isFree ? "Your spot is reserved!" : "Your tickets are reserved!"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            You're all set for <span className="font-semibold text-foreground">{event.name}</span>. A confirmation has been sent to {form.email}.
          </p>
          <div className="mt-6 rounded-2xl bg-secondary/40 p-5 text-left text-sm">
            <p className="flex items-center gap-2"><Calendar className="h-4 w-4 text-teal" />{event.when}</p>
            <p className="mt-1 flex items-center gap-2"><MapPin className="h-4 w-4 text-teal" />{event.neighborhood}, {event.borough}</p>
            <p className="mt-1 flex items-center gap-2"><Ticket className="h-4 w-4 text-teal" />{qty} {qty === 1 ? "ticket" : "tickets"}{!isFree && ` · $${total}`}</p>
          </div>
          <Button onClick={onBack} className="mt-6 bg-foreground text-background hover:bg-foreground/90">
            Browse more events
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to Family Events
      </button>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl bg-card p-6 shadow-card sm:p-8">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Reserve your spot</h1>
            <p className="mt-1 text-sm text-muted-foreground">{event.name}</p>
          </div>

          <div>
            <Label className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Tickets</Label>
            <div className="mt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card hover:border-teal"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-[2ch] text-center font-display text-xl font-semibold">{qty}</span>
              <button
                type="button"
                onClick={() => setQty(qty + 1)}
                className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card hover:border-teal"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="firstName">First name</Label>
              <Input id="firstName" required value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="lastName">Last name</Label>
              <Input id="lastName" required value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="childAge">Child age</Label>
              <select
                id="childAge"
                value={form.childAge}
                onChange={(e) => setForm({ ...form, childAge: e.target.value })}
                className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Select age range</option>
                {AGE_RANGES.map((a) => (
                  <option key={a} value={a}>Ages {a}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="notes">Notes (optional)</Label>
              <Textarea id="notes" rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Anything we should know?" />
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full bg-teal text-teal-foreground hover:bg-teal/90">
            {isFree ? "Reserve Spot" : "Complete Purchase"}
          </Button>
        </form>

        <aside className="space-y-4 rounded-3xl bg-card p-6 shadow-card sm:p-8 lg:sticky lg:top-24 lg:self-start">
          <div className="overflow-hidden rounded-2xl">
            <img src={event.image} alt={event.name} className="h-40 w-full object-cover" />
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-foreground">{event.name}</h2>
            <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />{event.neighborhood}, {event.borough}
            </p>
            <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />{event.when}
            </p>
          </div>
          <div className="space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Price per ticket</span>
              <span>{isFree ? "Free" : `$${event.price}`}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Quantity</span>
              <span>{qty}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-base font-semibold text-foreground">
              <span>Total</span>
              <span>{isFree ? "Free" : `$${total}`}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}