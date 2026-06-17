import logo from "@/assets/logo.png";

export function Logo({ size = 128, withWordmark = true, className = "" }: { size?: number; withWordmark?: boolean; className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img src={logo} alt="Class Scout NY logo" width={size} height={size} className="rounded-full" />
      {withWordmark && (
        <div className="leading-tight">
          <div className="font-display text-2xl font-bold tracking-tight text-sidebar-foreground">Class Scout</div>
          <div className="font-sans text-[11px] font-semibold tracking-[0.25em] text-teal uppercase">New York</div>
        </div>
      )}
    </div>
  );
}
